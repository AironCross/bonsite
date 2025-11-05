import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function runMigrations() {
  try {
    console.log('Starting migrations...');

    const { error: profilesError } = await supabase.rpc('exec_sql', {
      sql: `
        -- Create profiles table
        CREATE TABLE IF NOT EXISTS profiles (
          id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
          email text UNIQUE NOT NULL,
          full_name text,
          company_name text,
          language text DEFAULT 'hu' NOT NULL,
          created_at timestamptz DEFAULT now() NOT NULL,
          updated_at timestamptz DEFAULT now() NOT NULL
        );

        -- Create offer_requests table
        CREATE TABLE IF NOT EXISTS offer_requests (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
          email text NOT NULL,
          full_name text NOT NULL,
          company_name text,
          phone text,
          selected_modules jsonb NOT NULL DEFAULT '[]'::jsonb,
          user_count integer NOT NULL,
          estimated_price numeric(10, 2),
          message text,
          status text DEFAULT 'pending' NOT NULL,
          created_at timestamptz DEFAULT now() NOT NULL
        );

        -- Enable RLS
        ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
        ALTER TABLE offer_requests ENABLE ROW LEVEL SECURITY;
      `,
    });

    if (profilesError) {
      console.error('Migration error:', profilesError);
      return false;
    }

    console.log('Migrations completed successfully!');
    return true;
  } catch (error) {
    console.error('Migration failed:', error);
    return false;
  }
}
