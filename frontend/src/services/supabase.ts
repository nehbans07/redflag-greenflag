import { createClient } from '@supabase/supabase-js';
import type { User, Scenario, UserProgress, AnalyticsEvent } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  scenario_id: number;
  completed: boolean;
  correct_answer: boolean;
  created_at: string;
  updated_at: string;
}

// Auth functions
export const authService = {
  // Sign in with Google
  signInWithGoogle: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    return { data, error };
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Get current user
  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  // Get user profile
  getUserProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  },

  // Update user profile
  updateUserProfile: async (userId: string, updates: Partial<User>) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    return { data, error };
  }
};

// Scenario functions
export const scenarioService = {
  // Get all active scenarios
  getScenarios: async () => {
    const { data, error } = await supabase
      .from('scenarios')
      .select('*')
      .eq('is_active', true)
      .order('id', { ascending: true });
    return { data, error };
  },

  // Get single scenario
  getScenario: async (id: number) => {
    const { data, error } = await supabase
      .from('scenarios')
      .select('*')
      .eq('id', id)
      .single();
    return { data, error };
  },

  // Create scenario (admin only)
  createScenario: async (scenario: Omit<Scenario, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('scenarios')
      .insert(scenario)
      .select()
      .single();
    return { data, error };
  },

  // Update scenario (admin only)
  updateScenario: async (id: number, updates: Partial<Scenario>) => {
    const { data, error } = await supabase
      .from('scenarios')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  // Delete scenario (admin only)
  deleteScenario: async (id: number) => {
    const { error } = await supabase
      .from('scenarios')
      .delete()
      .eq('id', id);
    return { error };
  }
};

// Progress functions
export const progressService = {
  // Get user progress
  getUserProgress: async (userId: string) => {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false });
    return { data, error };
  },

  // Save user progress
  saveProgress: async (progress: Omit<UserProgress, 'id'>) => {
    const { data, error } = await supabase
      .from('user_progress')
      .upsert(progress, { onConflict: 'user_id,scenario_id' })
      .select()
      .single();
    return { data, error };
  },

  // Get user progress for specific scenario
  getScenarioProgress: async (userId: string, scenarioId: number) => {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('scenario_id', scenarioId)
      .single();
    return { data, error };
  }
};

// Analytics functions
export const analyticsService = {
  // Track event
  trackEvent: async (event: Omit<AnalyticsEvent, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('analytics_events')
      .insert(event)
      .select()
      .single();
    return { data, error };
  },

  // Get user analytics
  getUserAnalytics: async (userId: string) => {
    const { data, error } = await supabase
      .from('analytics_events')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  // Get admin analytics (admin only)
  getAdminAnalytics: async () => {
    const { data, error } = await supabase
      .from('analytics_events')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  }
};

// Admin functions
export const adminService = {
  // Get admin stats
  getAdminStats: async () => {
    // Get total users
    const { count: totalUsers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    // Get total scenarios
    const { count: totalScenarios } = await supabase
      .from('scenarios')
      .select('*', { count: 'exact', head: true });

    // Get total completions
    const { count: totalCompletions } = await supabase
      .from('user_progress')
      .select('*', { count: 'exact', head: true });

    return {
      totalUsers: totalUsers || 0,
      totalScenarios: totalScenarios || 0,
      totalCompletions: totalCompletions || 0,
    };
  },

  // Get all users (admin only)
  getAllUsers: async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  }
};

// Real-time subscriptions
export const realtimeService = {
  // Subscribe to user progress changes
  subscribeToProgress: (userId: string, callback: (payload: any) => void) => {
    return supabase
      .channel('user_progress')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_progress',
          filter: `user_id=eq.${userId}`
        },
        callback
      )
      .subscribe();
  }
}; 