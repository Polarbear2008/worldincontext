-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  color VARCHAR(50) DEFAULT '#3b82f6',
  icon VARCHAR(50) DEFAULT 'book-open',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  content TEXT,
  excerpt TEXT,
  category VARCHAR(100) NOT NULL,
  author VARCHAR(200) NOT NULL,
  translator VARCHAR(200),
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  article_type VARCHAR(20) DEFAULT 'text' CHECK (article_type IN ('text', 'file')),
  file_id INTEGER REFERENCES files(id),
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table (for admin authentication)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'reader' CHECK (role IN ('admin', 'translator', 'reader')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create files table to track uploaded files
CREATE TABLE IF NOT EXISTS files (
  id SERIAL PRIMARY KEY,
  name VARCHAR(500) NOT NULL,
  original_name VARCHAR(500) NOT NULL,
  size_bytes BIGINT NOT NULL,
  mime_type VARCHAR(100),
  bucket VARCHAR(100) NOT NULL DEFAULT 'articles',
  file_path VARCHAR(500) NOT NULL,
  public_url TEXT,
  uploaded_by VARCHAR(200) DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (name, slug, description, color, icon) VALUES
  ('Siyosat', 'siyosat', 'Xalqaro aloqalar, boshqaruv va siyosiy rivojlanishlar', '#8b5cf6', 'landmark'),
  ('Iqtisod', 'iqtisod', 'Iqtisodiy nazariyalar va moliyaviy tushunchalar', '#10b981', 'trending-up'),
  ('Geografiya', 'geografiya', 'Jismoniy geografiya va atrof muhit tadqiqotlari', '#f59e0b', 'map-pin'),
  ('Tarix', 'tarix', 'Tarixiy voqealar va tsivilizatsiyalar', '#ef4444', 'clock'),
  ('Diplomatiya', 'diplomatiya', 'Xalqaro muzokaralar va diplomatik aloqalar', '#6366f1', 'users')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample articles
INSERT INTO articles (title, content, excerpt, category, author, translator, status, article_type) VALUES
  (
    'Markaziy Osiyo geosiyosatini tushunish',
    'Markaziy Osiyo mintaqasi jahon geosiyosatida muhim o''rin tutadi. Bu hudud tabiiy resurslar, strategik joylashuv va madaniy meros jihatidan boy hisoblanadi.

Qadimdan Buyuk Ipak yo''li orqali Sharq va G''arb sivilizatsiyalarini bog''lagan bu mintaqa, hozirgi kunda ham xalqaro hamkorlik va savdo-sotiq markazi sifatida ahamiyatlidir.

Geosiyosiy nuqtai nazardan, Markaziy Osiyo quyidagi jihatlari bilan muhim:

1. Energetika resurslari - neft, gaz va boshqa tabiiy boyliklar
2. Transport koridorlari - Xitoy-Yevropa yo''llari
3. Xavfsizlik masalalari - chegara va terrorizm tahdidlari
4. Madaniy diplomatiya - qadimiy sivilizatsiyalar merosi

Mintaqa davlatlari o''zaro hamkorlikni kuchaytirish va xalqaro maydonda o''z o''rnini mustahkamlash uchun turli tashabbuslar amalga oshirmoqda.',
    'A comprehensive overview of the strategic importance of Central Asia in global politics...',
    'Siyosat',
    'Farruh Abdullayev',
    NULL,
    'published',
    'text'
  ),
  (
    'Jahon iqtisodiyotida rivojlanayotgan bozorlar',
    'Rivojlanayotgan bozorlar jahon iqtisodiyotini qayta shakllantirmoqda. Bu bozorlar nafaqat o''sish sur''ati, balki innovatsiyalar va raqobatbardoshlik jihatidan ham muhim ahamiyatga ega.

Xitoy, Hindiston va Braziliya kabi davlatlar jahon iqtisodiyotidagi o''zgarishlarni boshqarmoqda. Ularning iqtisodiy o''sishi nafaqat o''zlari uchun, balki butun dunyo uchun yangi imkoniyatlar yaratmoqda.

Rivojlanayotgan bozorlarning asosiy xususiyatlari:

1. Yuqori o''sish sur''ati
2. Yosh aholining ko''pligi
3. Tabiiy resurslar boyligi
4. Raqamli transformatsiya',
    'Analysis of how emerging markets are reshaping the global economic landscape...',
    'Iqtisod',
    'Aziza Karimova',
    NULL,
    'published',
    'text'
  ),
  (
    'Jismoniy geografiya va atrof muhit tadqiqotlari',
    'Jismoniy geografiya Yer yuzasining tabiiy xususiyatlarini o''rganadi. Bu fan tog''lar, daryolar, iqlim va boshqa tabiiy hodisalarni tahlil qiladi.

Atrof muhit tadqiqotlari esa inson faoliyatining tabiatga ta''sirini o''rganadi. Iqlim o''zgarishi, ifloslanish va tabiiy resurslar muammolari zamonaviy geografiyaning asosiy mavzulari hisoblanadi.

Geografiya fanining asosiy yo''nalishlari:

1. Fizik geografiya
2. Iqtisodiy geografiya
3. Siyosiy geografiya
4. Madaniy geografiya',
    'Understanding the physical features of Earth and their environmental impact...',
    'Geografiya',
    'Malika Tashkentova',
    NULL,
    'published',
    'text'
  ),
  (
    'Ipak yo''li: Qadimgi savdo yo''llari',
    'Ipak yo''li qadimdan Sharq va G''arb o''rtasidagi savdo va madaniy aloqalarni ta''minlagan. Bu yo''l nafaqat savdo, balki ilm-fan, din va madaniyat almashinuviga ham hissa qo''shgan.

Qadimgi Xitoy, Markaziy Osiyo va Yevropa o''rtasidagi bu aloqa 2000 yildan ortiq davom etgan. Ipak, ziravorlar, qimmatbaho toshlar va boshqa mahsulotlar bu yo''l orqali tashilgan.

Ipak yo''lining madaniy ahamiyati:

1. Dinlar tarqalishi
2. Ilm-fan almashinuvi
3. Til va madaniyat aralashuvi
4. Siyosiy ittifoqlar shakllanishi',
    'Historical analysis of the Silk Road''s impact on cultural and economic exchange...',
    'Tarix',
    'Otabek Samarkandiy',
    NULL,
    'published',
    'text'
  ),
  (
    'Iqlim o''zgarishi va xalqaro siyosat',
    'Iqlim o''zgarishi bugungi kunning eng muhim xalqaro muammolaridan biridir. Bu masala nafaqat atrof muhit, balki iqtisodiyot, xavfsizlik va migratsiya bilan ham bog''liq.

Xalqaro hamjamiyat bu muammoni hal qilish uchun turli shartnomalar va tashabbuslar ishlab chiqmoqda. Parij kelishuvi va BMTning barqaror rivojlanish maqsadlari bunga misol bo''la oladi.

Iqlim diplomatiyasining asosiy masalalari:

1. Issiqxona gazlari kamaytirish
2. Yashil energetika rivojlantirish
3. Tabiiy ofatlarga tayyorgarlik
4. Xalqaro moliyalashtirish',
    'Examining global efforts to address climate change through diplomatic channels...',
    'Diplomatiya',
    'Malika Tashkentova',
    NULL,
    'published',
    'text'
  );

-- Create storage bucket for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES
  ('articles', 'articles', true),
  ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to published articles and categories
CREATE POLICY "Public can view published articles" ON articles
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view categories" ON categories
  FOR SELECT USING (true);

-- Create policies for authenticated users to create articles
CREATE POLICY "Authenticated users can insert articles" ON articles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can update their own articles" ON articles
  FOR UPDATE USING (true);

CREATE POLICY "Authenticated users can delete their own articles" ON articles
  FOR DELETE USING (true);

-- Allow anon key to perform operations (for admin panel)
-- Note: In production, you'd want more restrictive policies
CREATE POLICY "Anon can perform all operations on articles" ON articles
  FOR ALL USING (true);

CREATE POLICY "Anon can perform all operations on categories" ON categories
  FOR ALL USING (true);

-- File policies
CREATE POLICY "Anyone can view files" ON files
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can upload files" ON files
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can manage their own files" ON files
  FOR UPDATE USING (uploaded_by = current_setting('app.current_user', true));

CREATE POLICY "Users can delete their own files" ON files
  FOR DELETE USING (uploaded_by = current_setting('app.current_user', true));

CREATE POLICY "Anon can perform all operations on files" ON files
  FOR ALL USING (true);
