import { supabase, supabaseAdmin, Article, Category, FileRecord, ContactMessage, NewsletterSubscriber, NewsletterCampaign } from './supabase'

// Test Supabase connection
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('categories').select('count').single()
    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      throw error
    }
    return true
  } catch (error) {
    console.error('Supabase connection test failed:', error)
    return false
  }
}

// Articles service functions
export const articlesService = {
  // Get all articles with optional filtering
  async getArticles(filters?: {
    category?: string
    status?: 'draft' | 'published'
    limit?: number
    offset?: number
  }) {
    try {
      let query = supabase.from('articles').select('*')

      if (filters?.category) {
        query = query.eq('category', filters.category)
      }

      if (filters?.status) {
        query = query.eq('status', filters.status)
      }

      if (filters?.limit) {
        query = query.limit(filters.limit)
      }

      if (filters?.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error
      return data as Article[]
    } catch (error) {
      console.error('Error fetching articles:', error)
      throw error
    }
  },

  // Get single article by ID
  async getArticle(id: number) {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data as Article
    } catch (error) {
      console.error('Error fetching article:', error)
      throw error
    }
  },

  // Create new article
  async createArticle(article: Omit<Article, 'id' | 'created_at' | 'updated_at' | 'view_count'>) {
    try {
      const { data, error } = await supabaseAdmin
        .from('articles')
        .insert([article])
        .select()
        .single()

      if (error) throw error
      return data as Article
    } catch (error) {
      console.error('Error creating article:', error)
      throw error
    }
  },

  // Update article
  async updateArticle(id: number, updates: Partial<Article>) {
    try {
      const { data, error } = await supabaseAdmin
        .from('articles')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data as Article
    } catch (error) {
      console.error('Error updating article:', error)
      throw error
    }
  },

  // Delete article
  async deleteArticle(id: number) {
    try {
      const { error } = await supabaseAdmin
        .from('articles')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Error deleting article:', error)
      throw error
    }
  },

  // Increment view count
  async incrementViewCount(id: number) {
    try {
      // First get current view count
      const { data: currentArticle, error: fetchError } = await supabase
        .from('articles')
        .select('view_count')
        .eq('id', id)
        .single()

      if (fetchError) throw fetchError

      // Update with incremented count
      const { data, error } = await supabaseAdmin
        .from('articles')
        .update({ view_count: (currentArticle.view_count || 0) + 1 })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data as Article
    } catch (error) {
      console.error('Error incrementing view count:', error)
      throw error
    }
  }
}

// Categories service functions
export const categoriesService = {
  // Get all categories
  async getCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name')

      if (error) throw error
      return data as Category[]
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw error
    }
  },

  // Get category by slug
  async getCategoryBySlug(slug: string) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .single()

      if (error) throw error
      return data as Category
    } catch (error) {
      console.error('Error fetching category:', error)
      throw error
    }
  }
}

// Upload service functions
export const uploadService = {
  // Upload file to Supabase storage
  async uploadFile(file: File, bucket: string = 'articles') {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`

      const { data, error } = await supabaseAdmin.storage
        .from(bucket)
        .upload(fileName, file)

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error uploading file:', error)
      throw error
    }
  },

  // Get public URL for uploaded file
  getPublicUrl(bucket: string, fileName: string) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName)

    return data.publicUrl
  }
}

// Files service functions
export const filesService = {
  // Get all files
  async getFiles() {
    try {
      const { data, error } = await supabase
        .from('files')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data as FileRecord[]
    } catch (error) {
      console.error('Error fetching files:', error)
      throw error
    }
  },

  // Get single file by ID
  async getFile(id: number) {
    try {
      const { data, error } = await supabase
        .from('files')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data as FileRecord
    } catch (error) {
      console.error('Error fetching file:', error)
      throw error
    }
  },

  // Create new file record
  async createFile(fileData: Omit<FileRecord, 'id' | 'created_at'>) {
    try {
      const { data, error } = await supabaseAdmin
        .from('files')
        .insert([fileData])
        .select()
        .single()

      if (error) throw error
      return data as FileRecord
    } catch (error) {
      console.error('Error creating file record:', error)
      throw error
    }
  },

  // Delete file record
  async deleteFile(id: number) {
    try {
      const { error } = await supabaseAdmin
        .from('files')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Error deleting file record:', error)
      throw error
    }
  }
}

// Contact messages service functions
export const contactMessagesService = {
  // Get all contact messages
  async getMessages() {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data as ContactMessage[]
    } catch (error) {
      console.error('Error fetching contact messages:', error)
      throw error
    }
  },

  // Create new contact message
  async createMessage(messageData: Omit<ContactMessage, 'id' | 'created_at' | 'status'>) {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([{ ...messageData, status: 'unread' }])
        .select()
        .single()

      if (error) throw error
      return data as ContactMessage
    } catch (error) {
      console.error('Error creating contact message:', error)
      throw error
    }
  },

  // Update message status
  async updateMessageStatus(id: number, status: 'unread' | 'read' | 'replied') {
    try {
      const { error } = await supabaseAdmin
        .from('contact_messages')
        .update({ status })
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Error updating message status:', error)
      throw error
    }
  },

  // Delete message
  async deleteMessage(id: number) {
    try {
      const { error } = await supabaseAdmin
        .from('contact_messages')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Error deleting message:', error)
      throw error
    }
  },

  // Get unread message count
  async getUnreadCount() {
    try {
      const { count, error } = await supabase
        .from('contact_messages')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'unread')

      if (error) throw error
      return count || 0
    } catch (error) {
      console.error('Error getting unread count:', error)
      return 0
    }
  }
}

// Newsletter service functions
export const newsletterService = {
  // Subscribe to newsletter
  async subscribe(email: string, name?: string) {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email, name, status: 'active' }])
        .select()
        .single()

      if (error) throw error
      return data as NewsletterSubscriber
    } catch (error) {
      console.error('Error subscribing to newsletter:', error)
      throw error
    }
  },

  // Unsubscribe from newsletter
  async unsubscribe(email: string) {
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .update({ status: 'unsubscribed', unsubscribed_at: new Date().toISOString() })
        .eq('email', email)

      if (error) throw error
    } catch (error) {
      console.error('Error unsubscribing:', error)
      throw error
    }
  },

  // Get all active subscribers
  async getSubscribers() {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .eq('status', 'active')
        .order('subscribed_at', { ascending: false })

      if (error) throw error
      return data as NewsletterSubscriber[]
    } catch (error) {
      console.error('Error fetching subscribers:', error)
      throw error
    }
  },

  // Get subscriber count
  async getSubscriberCount() {
    try {
      const { count, error } = await supabase
        .from('newsletter_subscribers')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active')

      if (error) throw error
      return count || 0
    } catch (error) {
      console.error('Error getting subscriber count:', error)
      return 0
    }
  },

  // Delete subscriber
  async deleteSubscriber(id: number) {
    try {
      const { error } = await supabaseAdmin
        .from('newsletter_subscribers')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Error deleting subscriber:', error)
      throw error
    }
  },

  // Create campaign
  async createCampaign(campaignData: Omit<NewsletterCampaign, 'id' | 'created_at' | 'sent_count' | 'sent_at'>) {
    try {
      const { data, error } = await supabaseAdmin
        .from('newsletter_campaigns')
        .insert([campaignData])
        .select()
        .single()

      if (error) throw error
      return data as NewsletterCampaign
    } catch (error) {
      console.error('Error creating campaign:', error)
      throw error
    }
  },

  // Get all campaigns
  async getCampaigns() {
    try {
      const { data, error } = await supabase
        .from('newsletter_campaigns')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data as NewsletterCampaign[]
    } catch (error) {
      console.error('Error fetching campaigns:', error)
      throw error
    }
  },

  // Update campaign status
  async updateCampaignStatus(id: number, status: 'draft' | 'sent' | 'scheduled', sentCount?: number) {
    try {
      const updateData: any = { status }
      if (status === 'sent') {
        updateData.sent_at = new Date().toISOString()
        if (sentCount !== undefined) {
          updateData.sent_count = sentCount
        }
      }

      const { error } = await supabaseAdmin
        .from('newsletter_campaigns')
        .update(updateData)
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Error updating campaign status:', error)
      throw error
    }
  },

  // Delete campaign
  async deleteCampaign(id: number) {
    try {
      const { error } = await supabaseAdmin
        .from('newsletter_campaigns')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Error deleting campaign:', error)
      throw error
    }
  }
}
