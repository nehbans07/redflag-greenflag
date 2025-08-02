import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, BarChart3, Trophy, Clock, LogOut } from 'lucide-react';
import { useAuthStore, useAppStore } from '../store';
import { authService } from '../services/supabase';
import type { UserProgress } from '../types';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();
  const { userProgress, fetchUserProgress } = useAppStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserProgress(user.id);
    }
  }, [user]);

  const handleSignOut = async () => {
    setLoading(true);
    await signOut();
    navigate('/');
  };

  const getStats = () => {
    const completed = userProgress.length;
    const correct = userProgress.filter((p: UserProgress) => p.is_correct).length;
    const accuracy = completed > 0 ? Math.round((correct / completed) * 100) : 0;
    const totalTime = userProgress.reduce((sum: number, p: UserProgress) => sum + p.time_spent_seconds, 0);
    const avgTime = completed > 0 ? Math.round(totalTime / completed) : 0;

    return { completed, correct, accuracy, avgTime };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/scenarios')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">GreenFlag</span>
            </div>
            <button
              onClick={handleSignOut}
              disabled={loading}
              className="btn-secondary flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Info */}
        <div className="card mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              {user?.avatar_url ? (
                <img 
                  src={user.avatar_url} 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full"
                />
              ) : (
                <span className="text-2xl font-bold text-primary-600">
                  {user?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {user?.full_name || 'User'}
              </h1>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-sm text-gray-500">
                Member since {new Date(user?.created_at || '').toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="h-8 w-8 text-primary-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.completed}</div>
            <div className="text-sm text-gray-600">Scenarios Completed</div>
          </div>

          <div className="card text-center">
            <div className="flex items-center justify-center mb-2">
              <BarChart3 className="h-8 w-8 text-primary-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.accuracy}%</div>
            <div className="text-sm text-gray-600">Accuracy Rate</div>
          </div>

          <div className="card text-center">
            <div className="flex items-center justify-center mb-2">
              <Heart className="h-8 w-8 text-primary-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.correct}</div>
            <div className="text-sm text-gray-600">Correct Answers</div>
          </div>

          <div className="card text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-8 w-8 text-primary-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.avgTime}s</div>
            <div className="text-sm text-gray-600">Avg Time per Scenario</div>
          </div>
        </div>

        {/* Progress Chart */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Progress</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Overall Progress</span>
              <span className="text-sm font-medium text-gray-900">
                {stats.completed} of 10 scenarios
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-primary-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(stats.completed / 10) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              {stats.completed === 10 ? '🎉 Congratulations! You\'ve completed all scenarios!' : 
               `Keep going! You have ${10 - stats.completed} scenarios left to complete.`}
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        {userProgress.length > 0 && (
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {userProgress.slice(0, 5).map((progress: UserProgress) => (
                <div key={progress.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${progress.is_correct ? 'bg-primary-500' : 'bg-danger-500'}`}></div>
                    <span className="text-sm text-gray-700">
                      Scenario {progress.scenario_id}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`text-sm font-medium ${progress.is_correct ? 'text-primary-600' : 'text-danger-600'}`}>
                      {progress.is_correct ? 'Correct' : 'Incorrect'}
                    </span>
                    <span className="text-sm text-gray-500">
                      {progress.time_spent_seconds}s
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/scenarios')}
            className="btn-primary text-lg px-8 py-4"
          >
            Continue Learning
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage; 