import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nhdtjjyelesqbmdzyuuv.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oZHRqanllbGVzcWJtZHp5dXV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwMjQ4NTAsImV4cCI6MjA3NjYwMDg1MH0.BMUmO_w3tqyGLPQ82iYdPdCli4qtleqOesrioN_BB_k'

// IMPORTANT: For security, you should use environment variables for the service role key
// For now, using a placeholder - you need to replace this with your actual service role key
const supabaseServiceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || 'your-actual-service-role-key-here'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client with service role for write operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Database types
export interface Category {
  id: number
  name: string
  slug: string
  description: string
  color: string
  icon: string
  created_at: string
}

export interface FileRecord {
  id: number
  name: string
  original_name: string
  size_bytes: number
  mime_type?: string
  bucket: string
  file_path: string
  public_url?: string
  uploaded_by: string
  created_at: string
}

export interface User {
  id: string
  email: string
  full_name?: string
  role: 'admin' | 'translator' | 'reader'
  created_at: string
}

export interface Article {
  id: number
  title: string
  content?: string
  excerpt: string
  category: string
  author: string
  translator?: string
  status: 'draft' | 'published'
  article_type: 'text' | 'file'
  file_id?: number
  view_count?: number
  created_at: string
  updated_at: string
}

export interface ContactMessage {
  id: number
  name: string
  email: string
  subject: string
  message: string
  status: 'unread' | 'read' | 'replied'
  created_at: string
}

export interface NewsletterSubscriber {
  id: number
  email: string
  name?: string
  status: 'active' | 'unsubscribed'
  subscribed_at: string
  unsubscribed_at?: string
}

export interface NewsletterCampaign {
  id: number
  title: string
  subject: string
  content: string
  type: 'broadcast' | 'new_article'
  article_id?: number
  status: 'draft' | 'sent' | 'scheduled'
  sent_count: number
  created_by: string
  created_at: string
  sent_at?: string
}
