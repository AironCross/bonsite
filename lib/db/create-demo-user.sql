-- Demo Admin User Létrehozás
-- Email: admin@bonsite.hu
-- Password: Admin123!

-- MÓDSZER 1: Supabase Dashboard használata (AJÁNLOTT)
-- 1. Menj a Authentication > Users menüpontba
-- 2. Kattints "Add user" > "Create new user"
-- 3. Email: admin@bonsite.hu
-- 4. Password: Admin123!
-- 5. Email confirm: OFF (auto-confirm)
-- 6. Kattints "Create user"

-- MÓDSZER 2: SQL Editor használata
-- Ez az SQL script automatikusan létrehozza a demo admin usert

-- 1. Először hozd létre az auth.users bejegyzést
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  recovery_token,
  email_change_token_new,
  email_change
)
SELECT
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@bonsite.hu',
  crypt('Admin123!', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Admin User"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'admin@bonsite.hu'
)
RETURNING id;

-- 2. Majd hozd létre a profiles bejegyzést
INSERT INTO public.profiles (id, email, full_name, company_name, language)
SELECT
  id,
  'admin@bonsite.hu',
  'Admin User',
  'B OnSite Admin',
  'hu'
FROM auth.users
WHERE email = 'admin@bonsite.hu'
ON CONFLICT (id) DO NOTHING;

-- Ellenőrzés
SELECT
  u.id,
  u.email,
  u.email_confirmed_at,
  p.full_name,
  p.company_name
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE u.email = 'admin@bonsite.hu';
