import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, X, CheckCircle } from 'lucide-react';
import { useAppStore, useAuthStore, useAnalyticsStore } from '../store';
import { scenarioService } from '../services/supabase';
import type { Scenario, Character, Message } from '../types';

const ChatMessage: React.FC<{
  message: Message;
  character: Character;
  isLast: boolean;
}> = ({ message, character, isLast }) => {
  return (
    <div className={`flex ${message.speaker === character.name ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.speaker === character.name ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {character.name.charAt(0)}
            </span>
          </div>
        </div>
        <div className={`rounded-lg px-4 py-2 ${message.speaker === character.name ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
          <div className="text-sm font-medium mb-1">{message.speaker}</div>
          <div className="text-sm">{message.text}</div>
        </div>
      </div>
    </div>
  );
};

const DecisionButtons: React.FC<{
  onDecision: (answer: 'green' | 'red') => void;
  disabled?: boolean;
}> = ({ onDecision, disabled }) => {
  return (
    <div className="flex space-x-4 justify-center">
      <button
        onClick={() => onDecision('red')}
        disabled={disabled}
        className="btn-danger flex items-center space-x-2 px-8 py-4 text-lg"
      >
        <X className="h-5 w-5" />
        <span>Red Flag</span>
      </button>
      <button
        onClick={() => onDecision('green')}
        disabled={disabled}
        className="btn-primary flex items-center space-x-2 px-8 py-4 text-lg"
      >
        <Heart className="h-5 w-5" />
        <span>Green Flag</span>
      </button>
    </div>
  );
};

const FeedbackCard: React.FC<{
  scenario: Scenario;
  userAnswer: 'green' | 'red';
  isCorrect: boolean;
  onContinue: () => void;
}> = ({ scenario, userAnswer, isCorrect, onContinue }) => {
  return (
    <div className="card max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-4">
          {isCorrect ? (
            <CheckCircle className="h-12 w-12 text-primary-600" />
          ) : (
            <X className="h-12 w-12 text-danger-600" />
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isCorrect ? 'You matched it right!' : 'Not quite right'}
        </h2>
        <p className="text-lg text-gray-600">
          This is a {scenario.correct_answer === 'green' ? 'green flag' : 'red flag'}.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-700">{scenario.explanation}</p>
        </div>

        <div className="border-l-4 border-primary-500 pl-4">
          <div className="flex items-center space-x-2 mb-2">
            <Heart className="h-5 w-5 text-primary-600" />
            <span className="font-semibold text-gray-900">Truth to Keep:</span>
          </div>
          <p className="text-gray-700 italic">"{scenario.truth_to_keep}"</p>
        </div>

        <div className="border-l-4 border-blue-500 pl-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-blue-600 font-semibold">🤔</span>
            <span className="font-semibold text-gray-900">Reflection:</span>
          </div>
          <p className="text-gray-700">{scenario.reflection_question}</p>
        </div>

        <button
          onClick={onContinue}
          className="btn-primary w-full py-3"
        >
          Back to Scenarios
        </button>
      </div>
    </div>
  );
};

const ScenarioInteraction: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { trackEvent } = useAnalyticsStore();
  const { saveProgress } = useAppStore();

  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userAnswer, setUserAnswer] = useState<'green' | 'red' | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());

  useEffect(() => {
    if (!id) return;

    const fetchScenario = async () => {
      try {
        setLoading(true);
        const { data, error } = await scenarioService.getScenario(parseInt(id));
        
        if (error) throw error;
        if (!data) throw new Error('Scenario not found');

        setScenario(data);
        
        // Track scenario start
        if (user) {
          trackEvent({
            user_id: user.id,
            event_type: 'scenario_started',
            event_data: {
              scenario_id: parseInt(id),
            }
          });
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchScenario();
  }, [id, user]);

  const handleDecision = async (answer: 'green' | 'red') => {
    if (!scenario || !user) return;

    setUserAnswer(answer);
    
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    const isCorrect = answer === scenario.correct_answer;

    // Track decision
    trackEvent({
      user_id: user.id,
      event_type: 'scenario_completed',
      event_data: {
        scenario_id: scenario.id,
        user_answer: answer,
        time_spent: timeSpent,
      }
    });

    // Save progress
    await saveProgress({
      user_id: user.id,
      scenario_id: scenario.id,
      user_answer: answer,
      is_correct: isCorrect,
      time_spent_seconds: timeSpent,
    });

    setShowFeedback(true);
  };

  const handleContinue = () => {
    navigate('/scenarios');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading scenario...</p>
        </div>
      </div>
    );
  }

  if (error || !scenario) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <X className="h-12 w-12 text-danger-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading scenario</h3>
          <p className="text-gray-600 mb-4">{error || 'Scenario not found'}</p>
          <button onClick={() => navigate('/scenarios')} className="btn-primary">
            Back to Scenarios
          </button>
        </div>
      </div>
    );
  }

  if (showFeedback) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeedbackCard
            scenario={scenario}
            userAnswer={userAnswer!}
            isCorrect={userAnswer === scenario.correct_answer}
            onContinue={handleContinue}
          />
        </div>
      </div>
    );
  }

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
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Scenario Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Scenario Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{scenario.title}</h1>
          <div className="flex items-center justify-center space-x-4">
            {scenario.characters.map((character, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {character.name.charAt(0)}
                  </span>
                </div>
                <span className="text-sm text-gray-600">{character.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Interface */}
        <div className="card mb-8">
          <div className="space-y-4">
            {scenario.conversation.map((message, index) => {
              const character = scenario.characters.find(c => c.name === message.speaker);
              if (!character) return null;
              
              return (
                <ChatMessage
                  key={index}
                  message={message}
                  character={character}
                  isLast={index === scenario.conversation.length - 1}
                />
              );
            })}
          </div>
        </div>

        {/* Decision Section */}
        <div className="text-center">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">What do you think?</h2>
            <p className="text-gray-600">Is this behavior a green flag or red flag?</p>
          </div>
          
          <DecisionButtons
            onDecision={handleDecision}
            disabled={userAnswer !== null}
          />
        </div>
      </main>
    </div>
  );
};

export default ScenarioInteraction; 