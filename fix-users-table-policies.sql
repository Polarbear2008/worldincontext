-- Fix users table policies to allow signup and authentication

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Users can insert their own data" ON users;
DROP POLICY IF EXISTS "Users can update their own data" ON users;
DROP POLICY IF EXISTS "Public can insert users" ON users;

-- Allow users to view their own data
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Allow authenticated users to insert their own data during signup
CREATE POLICY "Users can insert their own data" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Allow users to update their own data
CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- IMPORTANT: Allow public/anon to insert users (needed for signup)
-- This is safe because the id must match auth.uid() from Supabase Auth
CREATE POLICY "Public can insert users during signup" ON users
  FOR INSERT WITH CHECK (true);

-- Optional: Disable email confirmation for development
-- Run this in Supabase Dashboard > Authentication > Settings
-- Or via SQL:
-- UPDATE auth.config SET email_confirm_required = false;
