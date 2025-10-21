# Fix Database Schema Issue

## Problem
The `articles` table is missing the `article_type` and `file_id` columns, which causes errors when trying to publish PDF files.

## Solution - Run this SQL in Supabase

1. **Go to your Supabase Dashboard:**
   - URL: https://nhdtjjyelesqbmdzyuuv.supabase.co

2. **Click on "SQL Editor" in the left sidebar**

3. **Copy and paste this SQL code:**

```sql
-- Add article_type column
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS article_type VARCHAR(20) DEFAULT 'text' 
CHECK (article_type IN ('text', 'file'));

-- Add file_id column
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS file_id INTEGER REFERENCES files(id);

-- Update existing articles to have article_type = 'text'
UPDATE articles 
SET article_type = 'text' 
WHERE article_type IS NULL;
```

4. **Click the "RUN" button**

5. **Refresh your browser** on the admin panel page

## What This Does

- Adds `article_type` column to store whether an article is text or a file
- Adds `file_id` column to link articles to uploaded PDF files
- Sets all existing articles to type 'text'

## After Running the SQL

Your admin panel should work correctly and you'll be able to:
- Upload PDF files
- Publish them as articles
- View them on the website with a PDF viewer

## Current Website URL

Your website is running on: **http://localhost:8081/** (not 8080)
