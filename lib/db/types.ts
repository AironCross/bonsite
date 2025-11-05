export interface User {
  id: string;
  email: string;
  created_at?: string;
}

export interface Session {
  user: User;
  access_token?: string;
  refresh_token?: string;
  expires_at?: number;
}

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: Error | null;
}

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  company_name?: string;
  language: string;
  created_at?: string;
  updated_at?: string;
}

export interface OfferRequest {
  id?: string;
  user_id?: string;
  email: string;
  full_name: string;
  company_name?: string;
  phone?: string;
  selected_modules: string[];
  user_count: number;
  estimated_price?: number;
  message?: string;
  status?: string;
  created_at?: string;
}

export interface DatabaseAdapter {
  auth: {
    signUp(email: string, password: string): Promise<AuthResponse>;
    signIn(email: string, password: string): Promise<AuthResponse>;
    signOut(): Promise<{ error: Error | null }>;
    getSession(): Promise<{ session: Session | null; error: Error | null }>;
    onAuthStateChange(callback: (session: Session | null) => void): {
      unsubscribe: () => void;
    };
  };

  profiles: {
    create(profile: Omit<Profile, 'created_at' | 'updated_at'>): Promise<{ data: Profile | null; error: Error | null }>;
    getById(id: string): Promise<{ data: Profile | null; error: Error | null }>;
    update(id: string, updates: Partial<Profile>): Promise<{ data: Profile | null; error: Error | null }>;
  };

  offerRequests: {
    create(request: Omit<OfferRequest, 'id' | 'created_at'>): Promise<{ data: OfferRequest | null; error: Error | null }>;
    getById(id: string): Promise<{ data: OfferRequest | null; error: Error | null }>;
    getByUserId(userId: string): Promise<{ data: OfferRequest[]; error: Error | null }>;
  };
}
