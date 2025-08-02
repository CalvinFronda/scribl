export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Prompt {
  id: string;
  prompt_text: string;
  date: string;
  created_at: string;
  is_active: boolean;
}

export interface PromtpCategories {
  id: number;
  name: string;
}

export interface Response {
  id: string;
  user_id: string;
  prompt_id: string;
  response_text: string;
  is_public: boolean;
  type: string;
  start_time: string;
  end_time: string;
  word_count: number;
  updated_at: string;
  created_at: string;
}

export type ResponseWithCategories = Response & {
  prompts: PromptWithCategories;
};

export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  update_at: string;
  created_at: string;
}

export interface PublicResponse {
  id: string;
  response_text: string;
  created_at: string;
  user_email?: string; // Anonymized
}

export interface UserStats {
  totalSubmissions: number;
  currentStreak: number;
  longestStreak: number;
  joinDate: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export type PromptWithCategories = Prompt & {
  prompt_categories: {
    category: Category;
  }[];
};
