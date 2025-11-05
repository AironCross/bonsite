-- ============================================
-- B ONSITE - SUPABASE SETUP SQL
-- ============================================
-- Futtasd ezt az SQL-t a Supabase SQL Editor-ban:
-- https://supabase.com/dashboard/project/xdkfbuycxffuselfefiy/sql/new
-- ============================================

-- 1. PROFILES TÁBLA
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  company_name text,
  language text DEFAULT 'hu' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- 2. OFFER REQUESTS TÁBLA
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

-- 3. ROW LEVEL SECURITY ENGEDÉLYEZÉSE
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE offer_requests ENABLE ROW LEVEL SECURITY;

-- 4. RLS POLICIES - PROFILES
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

-- 5. RLS POLICIES - OFFER REQUESTS
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

-- 6. AUTO-UPDATE TIMESTAMP FUNCTION
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. TRIGGER PROFILES TÁBLÁHOZ
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ELLENŐRZÉS - Futtasd le a végén hogy minden jó-e
-- ============================================
SELECT
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE tablename IN ('profiles', 'offer_requests');

-- Az összes RLS policy megtekintése
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE tablename IN ('profiles', 'offer_requests')
ORDER BY tablename, policyname;
