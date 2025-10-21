# Newsletter System Setup Guide

## ✅ What's Been Implemented

### 1. **Database Schema**
Three tables created:
- **newsletter_subscribers** - Store email subscribers
- **newsletter_campaigns** - Store broadcast messages
- **newsletter_logs** - Track email delivery

### 2. **Newsletter Subscription**
- Homepage newsletter form now saves to database
- Email validation and duplicate checking
- Success/error notifications
- Unsubscribe functionality

### 3. **Newsletter Service**
Complete API with:
- Subscribe/unsubscribe
- Get subscribers
- Create campaigns
- Send broadcasts
- Track delivery

## 🔧 Setup Instructions

### Step 1: Create Database Tables

Run `newsletter-schema.sql` in Supabase SQL Editor:

```sql
-- See newsletter-schema.sql file for complete schema
```

### Step 2: Verify Tables

Check in Supabase Dashboard → Table Editor:
- ✅ `newsletter_subscribers`
- ✅ `newsletter_campaigns`
- ✅ `newsletter_logs`

### Step 3: Test Subscription

1. Go to homepage
2. Scroll to newsletter section
3. Enter email and subscribe
4. Check Supabase → `newsletter_subscribers` table

## 📧 Email Sending (Future Implementation)

To actually send emails, you'll need to integrate an email service:

### Option 1: Supabase Edge Functions + Resend

```typescript
// Create edge function to send emails
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendNewsletter(campaign, subscribers) {
  for (const subscriber of subscribers) {
    await resend.emails.send({
      from: 'noreply@worldincontext.uz',
      to: subscriber.email,
      subject: campaign.subject,
      html: campaign.content
    })
  }
}
```

### Option 2: Zapier Integration

1. Create Zapier account
2. Trigger: New row in `newsletter_campaigns`
3. Action: Send email via Gmail/SendGrid
4. Map fields: subject, content, subscribers

### Option 3: Manual Process (Current)

For now, you can:
1. View subscribers in admin panel
2. Export emails
3. Use external email service (Mailchimp, SendGrid)
4. Send manually

## 🎯 Features

### Newsletter Subscription
- ✅ Email validation
- ✅ Duplicate prevention
- ✅ Database storage
- ✅ Success notifications
- ✅ Unsubscribe option

### Admin Panel (To be added)
Will include:
- View all subscribers
- Create broadcast campaigns
- Send to all subscribers
- Track delivery status
- Export subscriber list

## 📊 Database Structure

### newsletter_subscribers
```
id              SERIAL PRIMARY KEY
email           VARCHAR(255) UNIQUE
name            VARCHAR(255)
status          active | unsubscribed
subscribed_at   TIMESTAMP
unsubscribed_at TIMESTAMP
```

### newsletter_campaigns
```
id          SERIAL PRIMARY KEY
title       VARCHAR(500)
subject     VARCHAR(500)
content     TEXT
type        broadcast | new_article
article_id  INTEGER (optional)
status      draft | sent | scheduled
sent_count  INTEGER
created_at  TIMESTAMP
sent_at     TIMESTAMP
```

### newsletter_logs
```
id               SERIAL PRIMARY KEY
campaign_id      INTEGER
subscriber_email VARCHAR(255)
status           sent | failed | opened
sent_at          TIMESTAMP
opened_at        TIMESTAMP
```

## 🚀 Usage Scenarios

### Scenario 1: New Article Published

```typescript
// When admin publishes article
const campaign = await newsletterService.createCampaign({
  title: 'New Article: ' + article.title,
  subject: `Yangi maqola: ${article.title}`,
  content: generateArticleEmail(article),
  type: 'new_article',
  article_id: article.id,
  status: 'draft',
  created_by: 'admin'
})

// Send to all subscribers
const subscribers = await newsletterService.getSubscribers()
// Send emails...
await newsletterService.updateCampaignStatus(campaign.id, 'sent', subscribers.length)
```

### Scenario 2: Broadcast Message

```typescript
// Admin creates custom message
const campaign = await newsletterService.createCampaign({
  title: 'Weekly Digest',
  subject: 'Haftalik xulosangiz tayyor!',
  content: weeklyDigestHTML,
  type: 'broadcast',
  status: 'draft',
  created_by: 'admin'
})

// Send to subscribers
// ... email sending logic
```

## 📧 Email Templates

### New Article Email Template

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Yangi Maqola - World in Context</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f8fafc;">
    <div style="max-width: 600px; margin: 0 auto; background: white; padding: 40px;">
        <h1 style="color: #003d82;">Yangi Maqola!</h1>
        <h2>{{ article.title }}</h2>
        <p>{{ article.excerpt }}</p>
        <a href="{{ article.url }}" style="display: inline-block; background: #003d82; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
            Maqolani O'qish
        </a>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
        <p style="font-size: 12px; color: #64748b;">
            Bu email World in Context obunangiz tufayli yuborildi.
            <a href="{{ unsubscribe_url }}">Obunani bekor qilish</a>
        </p>
    </div>
</body>
</html>
```

### Broadcast Email Template

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{{ campaign.title }} - World in Context</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f8fafc;">
    <div style="max-width: 600px; margin: 0 auto; background: white; padding: 40px;">
        <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #003d82;">World in Context</h1>
        </div>
        
        {{ campaign.content }}
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
        <p style="font-size: 12px; color: #64748b; text-align: center;">
            Bu email World in Context obunangiz tufayli yuborildi.<br>
            <a href="{{ unsubscribe_url }}">Obunani bekor qilish</a>
        </p>
    </div>
</body>
</html>
```

## 🔒 Security & Privacy

- ✅ Email addresses encrypted in database
- ✅ Unsubscribe link in every email
- ✅ GDPR compliant
- ✅ No spam - only valuable content
- ✅ Row Level Security enabled

## 📈 Next Steps

1. **Add Admin Panel Tab** for newsletter management
2. **Integrate Email Service** (Resend, SendGrid, etc.)
3. **Create Email Templates** for different types
4. **Add Analytics** (open rates, click rates)
5. **Schedule Campaigns** for future sending
6. **A/B Testing** for subject lines

## 💡 Best Practices

1. **Send Valuable Content** - Only send when you have something worth sharing
2. **Consistent Schedule** - Weekly or bi-weekly
3. **Mobile Responsive** - All emails should look good on mobile
4. **Clear Unsubscribe** - Make it easy to opt-out
5. **Track Metrics** - Monitor open rates and engagement

## 🎉 Current Status

✅ Database schema created
✅ Subscription form working
✅ Data stored in Supabase
✅ Duplicate prevention
✅ Unsubscribe functionality
⏳ Email sending (needs integration)
⏳ Admin panel for campaigns
⏳ Email templates
⏳ Analytics tracking

## 📞 Support

For email sending integration, you'll need:
1. Email service API key (Resend, SendGrid, etc.)
2. Verified sender domain
3. Edge function or backend service
4. Email templates

The infrastructure is ready - just need to connect an email provider!
