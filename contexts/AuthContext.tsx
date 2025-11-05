'use client';

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { createClient } from '@/utils/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const profileSyncRef = useRef<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    const syncProfile = async () => {
      if (!user || loading) {
        profileSyncRef.current = null;
        return;
      }

      if (profileSyncRef.current === user.id) {
        return;
      }

      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .maybeSingle();

      if (fetchError) {
        console.error('Failed to read profile', fetchError);
        return;
      }

      if (!existingProfile) {
        const metadata = user.user_metadata || {};
        const { error: upsertError } = await supabase
          .from('profiles')
          .upsert(
            {
              id: user.id,
              email: user.email ?? '',
              full_name: metadata.full_name ?? null,
              company_name: metadata.company_name ?? null,
              language: metadata.language ?? 'hu',
            },
            { onConflict: 'id' }
          );

        if (upsertError) {
          console.error('Failed to ensure profile', upsertError);
          return;
        }
      }

      profileSyncRef.current = user.id;
    };

    syncProfile();
  }, [user, supabase, loading]);

  return (
    <AuthContext.Provider value={{ user, session, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
