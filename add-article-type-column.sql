-- Add article_type column to articles table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'articles' 
        AND column_name = 'article_type'
    ) THEN
        ALTER TABLE articles 
        ADD COLUMN article_type VARCHAR(20) DEFAULT 'text' 
        CHECK (article_type IN ('text', 'file'));
        
        RAISE NOTICE 'article_type column added successfully';
    ELSE
        RAISE NOTICE 'article_type column already exists';
    END IF;
END $$;

-- Add file_id column to articles table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'articles' 
        AND column_name = 'file_id'
    ) THEN
        ALTER TABLE articles 
        ADD COLUMN file_id INTEGER REFERENCES files(id);
        
        RAISE NOTICE 'file_id column added successfully';
    ELSE
        RAISE NOTICE 'file_id column already exists';
    END IF;
END $$;
