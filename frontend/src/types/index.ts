export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Scenario {
  id: number;
  title: string;
  characters: Character[];
  status: 'Not Attempted' | 'Completed' | 'In Progress';
  conversation: Message[];
  correctAnswer: 'green' | 'red';
  feedback: Feedback;
}

export interface Character {
  name: string;
  profilePicture: string;
}

export interface Message {
  speaker: string;
  text: string;
}

export interface Feedback {
  explanation: string;
  truthToKeep: string;
  reflection: string;
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

export interface AnalyticsEvent {
  id: string;
  user_id: string;
  event_type: 'scenario_started' | 'scenario_completed' | 'answer_selected' | 'feedback_viewed';
  event_data: Record<string, any>;
  created_at: string;
} 