# Fix Registration and Sign In Issues

## Problem
Users cannot register or sign in because the `users` table has Row Level Security (RLS) enabled but no policies allow inserting new users.

## Solution

### Step 1: Run the SQL Fix in Supabase Dashboard

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **SQL Editor** (left sidebar)
4. Copy and paste the contents of `fix-users-table-policies.sql`
5. Click **Run** to execute the SQL

### Step 2: Disable Email Confirmation (Optional - for Development)

By default, Supabase requires email confirmation for new signups. For development/testing, you can disable this:

1. Go to **Authentication** > **Settings** in Supabase Dashboard
2. Scroll down to **Email Auth**
3. **Uncheck** "Enable email confirmations"
4. Click **Save**

### Step 3: Test Registration

1. Go to your website's signup page: `/signup`
2. Fill in the form with:
   - Name: Test User
   - Email: test@example.com
   - Password: test123456
   - Confirm Password: test123456
3. Click "Ro'yxatdan o'tish" (Sign Up)
4. You should see a success message

### Step 4: Verify in Database

1. Go to **Table Editor** in Supabase Dashboard
2. Select the `users` table
3. You should see the new user with:
   - id (UUID from auth.users)
   - email
   - full_name
   - role: 'reader'

## What Was Fixed

### 1. Added RLS Policies for Users Table
The SQL file adds these policies:
- Users can view their own data
- Users can insert their own data during signup
- Users can update their own data
- Public can insert users (needed for signup flow)

### 2. Improved Auth Service
Updated `src/lib/auth.ts` to:
- Use `upsert` instead of `insert` to handle duplicate entries
- Better error handling and logging
- More specific error messages in Uzbek
- Added email redirect URL

## Troubleshooting

### Issue: "new row violates row-level security policy"
**Solution**: Make sure you ran the SQL fix in Step 1

### Issue: "User already registered"
**Solution**: This is expected if you try to register with the same email twice. Use a different email.

### Issue: "Email confirmation required"
**Solution**: Either:
- Check your email for confirmation link, OR
- Disable email confirmation (Step 2)

### Issue: User created in auth.users but not in users table
**Solution**: Check the browser console for detailed error messages. The auth service now logs detailed errors.

## Production Considerations

For production, you should:
1. **Enable email confirmation** for security
2. **Restrict the "Public can insert users" policy** to only allow inserts where `id = auth.uid()`
3. **Add email verification** before allowing full access
4. **Implement rate limiting** to prevent spam registrations

## Testing Checklist

- [ ] Run SQL fix in Supabase
- [ ] Disable email confirmation (dev only)
- [ ] Test signup with new email
- [ ] Verify user appears in users table
- [ ] Test signin with registered user
- [ ] Check browser console for any errors
