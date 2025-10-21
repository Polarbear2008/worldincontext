# Supabase Authentication Setup

## ✅ What's Been Implemented

### 1. **Authentication Service** (`src/lib/auth.ts`)
Created a complete authentication service with:
- **Sign Up**: Creates user in Supabase Auth + stores data in `users` table
- **Sign In**: Authenticates user with email/password
- **Sign Out**: Logs out current user
- **Get Current User**: Retrieves authenticated user
- **Get Session**: Retrieves current session
- **Auth State Listener**: Monitors authentication changes

### 2. **Sign Up Page Integration**
- Uses Supabase Auth to create new users
- Stores user data in `users` table with:
  - `id` (UUID from Supabase Auth)
  - `email`
  - `full_name`
  - `role` (defaults to 'reader')
  - `created_at`
- Password validation (minimum 6 characters)
- Password confirmation matching
- Email verification prompt
- Error handling with toast notifications

### 3. **Sign In Page Integration**
- Authenticates users via Supabase
- Creates session for logged-in users
- Redirects to home page on success
- Shows welcome message with user email
- Error handling for invalid credentials

## 📋 Database Schema

The `users` table should already exist from your `database-setup.sql`:

```sql
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'reader' CHECK (role IN ('admin', 'translator', 'reader')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🔐 How It Works

### Sign Up Flow:
1. User fills form (name, email, password)
2. Frontend validates password match and length
3. Calls `authService.signUp()`
4. Supabase creates auth user
5. User data inserted into `users` table
6. Success message shown
7. Redirects to sign in page after 2 seconds

### Sign In Flow:
1. User enters email and password
2. Calls `authService.signIn()`
3. Supabase validates credentials
4. Session created and stored
5. Welcome message shown
6. Redirects to home page

## 🎯 Features

- ✅ **Real Supabase Authentication**
- ✅ **User data stored in database**
- ✅ **Session management**
- ✅ **Password validation**
- ✅ **Error handling**
- ✅ **Toast notifications**
- ✅ **Form validation**
- ✅ **Email verification support**

## 📧 Email Verification

Supabase sends verification emails automatically. Users need to:
1. Sign up with valid email
2. Check their inbox
3. Click verification link
4. Then they can sign in

## 🔧 Configuration

The authentication uses:
- **Supabase URL**: `https://nhdtjjyelesqbmdzyuuv.supabase.co`
- **Anon Key**: Already configured in `src/lib/supabase.ts`
- **Auth Provider**: Email/Password

## 🚀 Testing

1. **Sign Up**: Go to `/signup`
   - Enter name, email, password
   - Click "Ro'yxatdan o'tish"
   - Check Supabase dashboard for new user

2. **Sign In**: Go to `/signin`
   - Enter registered email and password
   - Click "Kirish"
   - Should redirect to home page

3. **Check Database**:
   - Go to Supabase Dashboard
   - Check `Authentication > Users` for auth users
   - Check `Table Editor > users` for user data

## 📊 User Roles

- **reader**: Default role for all new users
- **translator**: Can be assigned manually
- **admin**: Can be assigned manually

## 🔒 Security Notes

- Passwords are hashed by Supabase (never stored in plain text)
- Sessions are managed securely
- Email verification recommended for production
- Row Level Security (RLS) policies already configured

## 🎉 Ready to Use!

Users can now:
- ✅ Register new accounts
- ✅ Sign in with credentials
- ✅ Data stored in Supabase
- ✅ Sessions maintained
- ✅ Secure authentication

Test it at: **http://localhost:8081/signup**
