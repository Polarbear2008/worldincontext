import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Read environment variables
const supabaseUrl = 'https://nhdtjjyelesqbmdzyuuv.supabase.co'
const supabaseServiceRoleKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || 'your-actual-service-role-key-here'

if (!supabaseServiceRoleKey || supabaseServiceRoleKey === 'your-actual-service-role-key-here') {
  console.error('❌ VITE_SUPABASE_SERVICE_ROLE_KEY is not set in environment variables')
  console.error('Please set it in your .env file or environment')
  process.exit(1)
}

// Create Supabase admin client
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Read and execute SQL file
async function applyDatabaseSchema() {
  try {
    console.log('📖 Reading database schema file...')
    const sqlPath = join(__dirname, 'database-setup.sql')
    const sqlContent = readFileSync(sqlPath, 'utf8')

    console.log('🔄 Applying database schema...')

    // Split SQL into individual statements (basic split by semicolon)
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt && !stmt.startsWith('--') && stmt !== '')

    console.log(`📝 Found ${statements.length} SQL statements to execute`)

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i]
      if (statement) {
        console.log(`⚡ Executing statement ${i + 1}/${statements.length}...`)
        const { error } = await supabaseAdmin.rpc('exec_sql', { sql: statement })

        if (error) {
          console.error(`❌ Error executing statement ${i + 1}:`, error.message)
          console.error('Statement:', statement)
          throw error
        }
      }
    }

    console.log('✅ Database schema applied successfully!')

    // Test the schema by checking if article_type column exists
    console.log('🔍 Verifying schema...')
    const { data, error } = await supabaseAdmin
      .from('articles')
      .select('article_type')
      .limit(1)

    if (error) {
      console.error('❌ Schema verification failed:', error.message)
    } else {
      console.log('✅ Schema verification successful! article_type column exists.')
    }

  } catch (error) {
    console.error('💥 Failed to apply database schema:', error)
    process.exit(1)
  }
}

// Run the script
applyDatabaseSchema()
