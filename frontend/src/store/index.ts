import { create } from 'zustand';
import { Profile } from '../services/supabase';

interface AuthState {
  user: Profile | null;
  loading: boolean;
  setUser: (user: Profile | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));

interface ProgressState {
  completedScenarios: number[];
  correctAnswers: number[];
  addCompletedScenario: (scenarioId: number, correct: boolean) => void;
  isScenarioCompleted: (scenarioId: number) => boolean;
  isAnswerCorrect: (scenarioId: number) => boolean;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  completedScenarios: [],
  correctAnswers: [],
  addCompletedScenario: (scenarioId, correct) => {
    set((state) => ({
      completedScenarios: [...state.completedScenarios, scenarioId],
      correctAnswers: correct 
        ? [...state.correctAnswers, scenarioId]
        : state.correctAnswers
    }));
  },
  isScenarioCompleted: (scenarioId) => {
    return get().completedScenarios.includes(scenarioId);
  },
  isAnswerCorrect: (scenarioId) => {
    return get().correctAnswers.includes(scenarioId);
  },
})); 