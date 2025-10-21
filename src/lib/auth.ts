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
          }
        }
      })

      if (authError) throw authError

      // Insert user data into users table
      if (authData.user) {
        const { error: dbError } = await supabase
          .from('users')
          .insert([
            {
              id: authData.user.id,
              email: data.email,
              full_name: data.fullName,
              role: 'reader'
            }
          ])

        if (dbError) {
          console.error('Error inserting user data:', dbError)
          // Don't throw here, auth user is already created
        }
      }

      return { user: authData.user, session: authData.session }
    } catch (error: any) {
      console.error('Sign up error:', error)
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
