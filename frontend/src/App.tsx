import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './services/supabase';
import { useAuthStore } from './store';
import LandingPage from './components/LandingPage';
import ScenarioSelection from './components/ScenarioSelection';
import ScenarioInteraction from './components/ScenarioInteraction';
import ProfilePage from './components/ProfilePage';
import AdminPanel from './components/AdminPanel';
import AuthCallback from './components/AuthCallback';

const App: React.FC = () => {
  const { user, setUser, setLoading } = useAuthStore();

  useEffect(() => {
    // Check for existing session
    const checkUser = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Get user profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            setUser(profile);
          } else {
            // Create profile if it doesn't exist
            const { data: newProfile } = await supabase
              .from('profiles')
              .insert({
                id: session.user.id,
                email: session.user.email,
                full_name: session.user.user_metadata?.full_name,
                avatar_url: session.user.user_metadata?.avatar_url,
              })
              .select()
              .single();

            if (newProfile) {
              setUser(newProfile);
            }
          }
        }
      } catch (error) {
        console.error('Error checking user session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          // Get or create user profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            setUser(profile);
          } else {
            // Create profile
            const { data: newProfile } = await supabase
              .from('profiles')
              .insert({
                id: session.user.id,
                email: session.user.email,
                full_name: session.user.user_metadata?.full_name,
                avatar_url: session.user.user_metadata?.avatar_url,
              })
              .select()
              .single();

            if (newProfile) {
              setUser(newProfile);
            }
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          
          {/* Protected routes */}
          <Route 
            path="/scenarios" 
            element={user ? <ScenarioSelection /> : <Navigate to="/" replace />} 
          />
          <Route 
            path="/scenario/:id" 
            element={user ? <ScenarioInteraction /> : <Navigate to="/" replace />} 
          />
          <Route 
            path="/profile" 
            element={user ? <ProfilePage /> : <Navigate to="/" replace />} 
          />
          
          {/* Admin routes */}
          <Route 
            path="/admin" 
            element={user?.email === 'admin@greenflag.com' ? <AdminPanel /> : <Navigate to="/" replace />} 
          />
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App; 