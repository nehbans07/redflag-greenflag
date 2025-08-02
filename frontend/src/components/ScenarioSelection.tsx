import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, CheckCircle, Clock, ArrowLeft } from 'lucide-react';
import { useAppStore, useAuthStore } from '../store';
import type { Scenario } from '../types';

const ScenarioCard: React.FC<{
  scenario: Scenario;
  userProgress?: any;
  onClick: (scenario: Scenario) => void;
}> = ({ scenario, userProgress, onClick }) => {
  const isCompleted = userProgress?.scenario_id === scenario.id;
  const isCorrect = userProgress?.is_correct;

  return (
    <div
      onClick={() => onClick(scenario)}
      className="card hover:shadow-md transition-shadow duration-200 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              {scenario.title}
            </h3>
            <p className="text-sm text-gray-600">
              {scenario.characters.map(c => c.name).join(' & ')}
            </p>
          </div>
        </div>
        <div className="flex-shrink-0">
          {isCompleted ? (
            <CheckCircle className="h-6 w-6 text-primary-600" />
          ) : (
            <Clock className="h-6 w-6 text-gray-400" />
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {scenario.characters.map((character, index) => (
            <div key={index} className="flex items-center space-x-1">
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">
                  {character.name.charAt(0)}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-sm text-gray-500">
          {isCompleted ? (
            <span className={`font-medium ${isCorrect ? 'text-primary-600' : 'text-danger-600'}`}>
              {isCorrect ? 'Correct' : 'Incorrect'}
            </span>
          ) : (
            <span>Not attempted</span>
          )}
        </div>
      </div>
    </div>
  );
};

const ScenarioSelection: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { scenarios, userProgress, loading, fetchScenarios, fetchUserProgress } = useAppStore();

  useEffect(() => {
    fetchScenarios();
    if (user) {
      fetchUserProgress(user.id);
    }
  }, [user]);

  const handleScenarioClick = (scenario: Scenario) => {
    navigate(`/scenario/${scenario.id}`);
  };

  const getProgressStats = () => {
    if (!userProgress.length) return { completed: 0, total: scenarios.length, percentage: 0 };
    
    const completed = userProgress.length;
    const total = scenarios.length;
    const percentage = Math.round((completed / total) * 100);
    
    return { completed, total, percentage };
  };

  const progress = getProgressStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading scenarios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </button>
              <div className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-primary-600" />
                <span className="text-xl font-bold text-gray-900">GreenFlag</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome, {user?.full_name || user?.email}
              </div>
              <button
                onClick={() => navigate('/profile')}
                className="btn-secondary text-sm"
              >
                Profile
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-900">Choose a Scenario</h1>
            <div className="text-sm text-gray-600">
              {progress.completed} of {progress.total} completed
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress.percentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Select any scenario to practice. Each scenario is independent!
          </p>
        </div>
      </div>

      {/* Scenarios Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario) => {
            const userProgressForScenario = userProgress.find(
              (p: any) => p.scenario_id === scenario.id
            );
            
            return (
              <ScenarioCard
                key={scenario.id}
                scenario={scenario}
                userProgress={userProgressForScenario}
                onClick={handleScenarioClick}
              />
            );
          })}
        </div>

        {scenarios.length === 0 && (
          <div className="text-center py-12">
            <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No scenarios available</h3>
            <p className="text-gray-600">Check back later for new scenarios!</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600">
            <p>Keep practicing to improve your relationship skills!</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ScenarioSelection; 