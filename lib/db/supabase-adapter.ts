import { createClient } from '@supabase/supabase-js';
import type {
  DatabaseAdapter,
  AuthResponse,
  Profile,
  OfferRequest,
  Session,
} from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseAdapter: DatabaseAdapter = {
  auth: {
    async signUp(email: string, password: string): Promise<AuthResponse> {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      return {
        user: data.user ? {
          id: data.user.id,
          email: data.user.email!,
          created_at: data.user.created_at,
        } : null,
        session: data.session ? {
          user: {
            id: data.session.user.id,
            email: data.session.user.email!,
          },
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
          expires_at: data.session.expires_at,
        } : null,
        error: error as Error | null,
      };
    },

    async signIn(email: string, password: string): Promise<AuthResponse> {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return {
        user: data.user ? {
          id: data.user.id,
          email: data.user.email!,
          created_at: data.user.created_at,
        } : null,
        session: data.session ? {
          user: {
            id: data.session.user.id,
            email: data.session.user.email!,
          },
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
          expires_at: data.session.expires_at,
        } : null,
        error: error as Error | null,
      };
    },

    async signOut() {
      const { error } = await supabase.auth.signOut();
      return { error: error as Error | null };
    },

    async getSession() {
      const { data, error } = await supabase.auth.getSession();
      return {
        session: data.session ? {
          user: {
            id: data.session.user.id,
            email: data.session.user.email!,
          },
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
          expires_at: data.session.expires_at,
        } : null,
        error: error as Error | null,
      };
    },

    onAuthStateChange(callback: (session: Session | null) => void) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          callback(
            session ? {
              user: {
                id: session.user.id,
                email: session.user.email!,
              },
              access_token: session.access_token,
              refresh_token: session.refresh_token,
              expires_at: session.expires_at,
            } : null
          );
        }
      );

      return {
        unsubscribe: () => subscription.unsubscribe(),
      };
    },
  },

  profiles: {
    async create(profile: Omit<Profile, 'created_at' | 'updated_at'>) {
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          id: profile.id,
          email: profile.email,
          full_name: profile.full_name,
          company_name: profile.company_name,
          language: profile.language,
        })
        .select()
        .maybeSingle();

      return {
        data: data as Profile | null,
        error: error as Error | null,
      };
    },

    async getById(id: string) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      return {
        data: data as Profile | null,
        error: error as Error | null,
      };
    },

    async update(id: string, updates: Partial<Profile>) {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', id)
        .select()
        .maybeSingle();

      return {
        data: data as Profile | null,
        error: error as Error | null,
      };
    },
  },

  offerRequests: {
    async create(request: Omit<OfferRequest, 'id' | 'created_at'>) {
      const { data, error } = await supabase
        .from('offer_requests')
        .insert({
          user_id: request.user_id || null,
          email: request.email,
          full_name: request.full_name,
          company_name: request.company_name || null,
          phone: request.phone || null,
          selected_modules: request.selected_modules,
          user_count: request.user_count,
          estimated_price: request.estimated_price || null,
          message: request.message || null,
          status: request.status || 'pending',
        })
        .select()
        .maybeSingle();

      return {
        data: data as OfferRequest | null,
        error: error as Error | null,
      };
    },

    async getById(id: string) {
      const { data, error } = await supabase
        .from('offer_requests')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      return {
        data: data as OfferRequest | null,
        error: error as Error | null,
      };
    },

    async getByUserId(userId: string) {
      const { data, error } = await supabase
        .from('offer_requests')
        .select('*')
        .eq('user_id', userId);

      return {
        data: (data as OfferRequest[]) || [],
        error: error as Error | null,
      };
    },
  },
};
