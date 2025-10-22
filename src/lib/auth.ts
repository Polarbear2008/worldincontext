import { supabase } from './supabase'

export interface SignUpData {
  email: string
  password: string
  fullName: string
}

export interface SignInData {
  email: string
  password: string
}

export const authService = {
  // Sign up new user
  async signUp(data: SignUpData) {
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
          },
          emailRedirectTo: window.location.origin
        }
      })

      if (authError) {
        console.error('Auth signup error:', authError)
        throw authError
      }

      if (!authData.user) {
        throw new Error('Foydalanuvchi yaratilmadi')
      }

      // Insert user data into users table
      // Use upsert to handle cases where user might already exist
      const { error: dbError } = await supabase
        .from('users')
        .upsert([
          {
            id: authData.user.id,
            email: data.email,
            full_name: data.fullName,
            role: 'reader'
          }
        ], {
          onConflict: 'id'
        })

      if (dbError) {
        console.error('Error inserting user data into users table:', dbError)
        console.error('Error details:', JSON.stringify(dbError, null, 2))
        // Log but don't throw - auth user is already created
        // The user can still sign in even if the users table insert fails
      }

      return { user: authData.user, session: authData.session }
    } catch (error: any) {
      console.error('Sign up error:', error)
      
      // Provide more specific error messages
      if (error.message?.includes('already registered')) {
        throw new Error('Bu email allaqachon ro\'yxatdan o\'tgan')
      } else if (error.message?.includes('Invalid email')) {
        throw new Error('Noto\'g\'ri email formati')
      } else if (error.message?.includes('Password')) {
        throw new Error('Parol juda qisqa (kamida 6 ta belgi)')
      }
      
      throw new Error(error.message || 'Ro\'yxatdan o\'tishda xatolik yuz berdi')
    }
  },

  // Sign in existing user
  async signIn(data: SignInData) {
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) throw error

      return { user: authData.user, session: authData.session }
    } catch (error: any) {
      console.error('Sign in error:', error)
      throw new Error(error.message || 'Kirishda xatolik yuz berdi')
    }
  },

  // Sign out
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error: any) {
      console.error('Sign out error:', error)
      throw new Error(error.message || 'Chiqishda xatolik yuz berdi')
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      return user
    } catch (error: any) {
      console.error('Get current user error:', error)
      return null
    }
  },

  // Get current session
  async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error
      return session
    } catch (error: any) {
      console.error('Get session error:', error)
      return null
    }
  },

  // Listen to auth state changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback)
  }
}
