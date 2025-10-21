import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Supabase configuration
const supabaseUrl = 'https://nhdtjjyelesqbmdzyuuv.supabase.co'
const supabaseServiceRoleKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY

if (!supabaseServiceRoleKey) {
  console.error('❌ VITE_SUPABASE_SERVICE_ROLE_KEY is not set in .env file')
  process.exit(1)
}

// Create Supabase admin client
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function runMigration() {
  try {
    console.log('📖 Reading migration file...')
    const sqlPath = join(__dirname, 'add-article-type-column.sql')
    const sqlContent = readFileSync(sqlPath, 'utf8')

    console.log('🔄 Running migration...')
    console.log('SQL:', sqlContent)

    // Execute the SQL directly using Supabase's SQL editor endpoint
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseServiceRoleKey,
        'Authorization': `Bearer ${supabaseServiceRoleKey}`
      },
      body: JSON.stringify({ sql: sqlContent })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('❌ Migration failed:', error)
      console.log('\n📝 Please run this SQL manually in your Supabase SQL Editor:')
      console.log('1. Go to https://nhdtjjyelesqbmdzyuuv.supabase.co')
      console.log('2. Navigate to SQL Editor')
      console.log('3. Copy and paste the SQL from add-article-type-column.sql')
      console.log('4. Click "Run"')
      process.exit(1)
    }

    console.log('✅ Migration completed successfully!')

    // Verify the column exists
    console.log('🔍 Verifying migration...')
    const { data, error } = await supabaseAdmin
      .from('articles')
      .select('article_type, file_id')
      .limit(1)

    if (error) {
      console.error('❌ Verification failed:', error.message)
      console.log('\n📝 Please add the column manually in Supabase SQL Editor')
    } else {
      console.log('✅ Verification successful! Columns exist.')
      console.log('Sample data:', data)
    }

  } catch (error) {
    console.error('💥 Error:', error.message)
    console.log('\n📝 Manual steps to fix:')
    console.log('1. Go to https://nhdtjjyelesqbmdzyuuv.supabase.co')
    console.log('2. Navigate to SQL Editor')
    console.log('3. Run this SQL:')
    console.log('\nALTER TABLE articles ADD COLUMN IF NOT EXISTS article_type VARCHAR(20) DEFAULT \'text\' CHECK (article_type IN (\'text\', \'file\'));')
    console.log('ALTER TABLE articles ADD COLUMN IF NOT EXISTS file_id INTEGER REFERENCES files(id);')
  }
}

runMigration()
