# Supabase Custom SMTP Setup Guide

## 🔧 How to Configure Custom SMTP in Supabase

### Step 1: Go to Supabase Dashboard
1. Open your Supabase project: https://nhdtjjyelesqbmdzyuuv.supabase.co
2. Click on **Settings** (gear icon in sidebar)
3. Navigate to **Authentication** → **Email Templates**

### Step 2: Configure SMTP Settings
1. In the same **Authentication** settings, find **SMTP Settings**
2. Enable **"Enable Custom SMTP"**
3. Fill in your SMTP details:

#### Recommended SMTP Providers:

**Option 1: Gmail (Free, Easy)**
```
SMTP Host: smtp.gmail.com
SMTP Port: 587
SMTP User: your-email@gmail.com
SMTP Password: [App Password - see below]
Sender Email: your-email@gmail.com
Sender Name: World in Context
```

**How to get Gmail App Password:**
1. Go to Google Account → Security
2. Enable 2-Step Verification
3. Go to App Passwords
4. Generate password for "Mail"
5. Use that password in Supabase

**Option 2: SendGrid (Professional)**
```
SMTP Host: smtp.sendgrid.net
SMTP Port: 587
SMTP User: apikey
SMTP Password: [Your SendGrid API Key]
Sender Email: noreply@worldincontext.uz
Sender Name: World in Context
```

**Option 3: Mailgun**
```
SMTP Host: smtp.mailgun.org
SMTP Port: 587
SMTP User: [Your Mailgun SMTP username]
SMTP Password: [Your Mailgun SMTP password]
Sender Email: noreply@worldincontext.uz
Sender Name: World in Context
```

**Option 4: AWS SES (Scalable)**
```
SMTP Host: email-smtp.us-east-1.amazonaws.com
SMTP Port: 587
SMTP User: [Your AWS SES SMTP username]
SMTP Password: [Your AWS SES SMTP password]
Sender Email: noreply@worldincontext.uz
Sender Name: World in Context
```

### Step 3: Test SMTP Configuration
1. Click **"Send Test Email"** in Supabase
2. Check if email arrives
3. If not, verify credentials and port settings

## 📧 Custom Email Templates

### Where to Add Templates:
1. Go to **Authentication** → **Email Templates**
2. You'll see these templates:
   - **Confirm signup**
   - **Invite user**
   - **Magic Link**
   - **Change Email Address**
   - **Reset Password**

### Available Variables:
- `{{ .ConfirmationURL }}` - Confirmation link
- `{{ .Token }}` - Verification token
- `{{ .TokenHash }}` - Token hash
- `{{ .SiteURL }}` - Your site URL
- `{{ .Email }}` - User's email

## 🎨 How to Apply Custom Templates

1. Click on **"Confirm signup"** template
2. Replace the HTML with the template below
3. Click **Save**
4. Repeat for other templates as needed

## 📝 Notes

- **Subject Line**: Can be customized for each template
- **HTML Support**: Full HTML/CSS supported
- **Inline CSS**: Required (no external stylesheets)
- **Testing**: Always send test emails before going live
- **Spam**: Use proper sender domain to avoid spam folder

## 🚀 Quick Start (Gmail)

For quick testing with Gmail:
1. Use your Gmail account
2. Enable 2FA
3. Generate App Password
4. Use in Supabase SMTP settings
5. Test with your email

## ⚠️ Production Recommendations

For production:
- ✅ Use professional SMTP service (SendGrid, Mailgun)
- ✅ Use custom domain (noreply@worldincontext.uz)
- ✅ Set up SPF, DKIM, DMARC records
- ✅ Monitor email delivery rates
- ✅ Keep templates consistent with brand
