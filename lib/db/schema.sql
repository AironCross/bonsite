-- B OnSite Database Schema
-- Futtasd ezt a szkriptet a Supabase SQL Editor-ban

-- Profiles tábla
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  company_name text,
  language text DEFAULT 'hu' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Offer requests tábla
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

-- RLS Policies - Profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS Policies - Offer Requests
DROP POLICY IF EXISTS "Users can view own offer requests" ON offer_requests;
CREATE POLICY "Users can view own offer requests"
  ON offer_requests FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Authenticated users can create offer requests" ON offer_requests;
CREATE POLICY "Authenticated users can create offer requests"
  ON offer_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Anonymous users can create offer requests" ON offer_requests;
CREATE POLICY "Anonymous users can create offer requests"
  ON offer_requests FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for profiles
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Demo Admin User
-- Email: admin@bonsite.hu
-- Password: Admin123!
-- FONTOS: Ezt a felhasználót manuálisan kell létrehozni a Supabase Authentication UI-ban
-- Authentication > Users > Add user
-- Vagy használd az alábbi SQL-t (ha van service role key)
