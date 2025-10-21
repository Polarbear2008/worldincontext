-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Create newsletter_campaigns table (for broadcast messages)
CREATE TABLE IF NOT EXISTS newsletter_campaigns (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'broadcast' CHECK (type IN ('broadcast', 'new_article')),
  article_id INTEGER REFERENCES articles(id),
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'scheduled')),
  sent_count INTEGER DEFAULT 0,
  created_by VARCHAR(255) DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sent_at TIMESTAMP WITH TIME ZONE
);

-- Create newsletter_logs table (track who received what)
CREATE TABLE IF NOT EXISTS newsletter_logs (
  id SERIAL PRIMARY KEY,
  campaign_id INTEGER REFERENCES newsletter_campaigns(id) ON DELETE CASCADE,
  subscriber_email VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'opened')),
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  opened_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_logs ENABLE ROW LEVEL SECURITY;

-- Policies for newsletter_subscribers
CREATE POLICY "Anyone can subscribe" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update their own subscription" ON newsletter_subscribers
  FOR UPDATE USING (true);

CREATE POLICY "Admins can view all subscribers" ON newsletter_subscribers
  FOR SELECT USING (true);

CREATE POLICY "Admins can delete subscribers" ON newsletter_subscribers
  FOR DELETE USING (true);

-- Policies for newsletter_campaigns
CREATE POLICY "Admins can manage campaigns" ON newsletter_campaigns
  FOR ALL USING (true);

-- Policies for newsletter_logs
CREATE POLICY "Admins can view logs" ON newsletter_logs
  FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_status ON newsletter_subscribers(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_campaigns_status ON newsletter_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_logs_campaign ON newsletter_logs(campaign_id);
CREATE INDEX IF NOT EXISTS idx_newsletter_logs_email ON newsletter_logs(subscriber_email);
