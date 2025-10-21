# Email Templates Setup Guide

## 📧 Beautiful Email Templates Created

I've created 3 professional email templates in your brand style:

1. **confirm-signup.html** - Email confirmation for new users
2. **reset-password.html** - Password reset emails
3. **magic-link.html** - Passwordless login links

## 🎨 Design Features

All templates include:
- ✅ **Your brand colors** (Primary: #003d82, Accent: #2d8b8b)
- ✅ **Gradient headers** matching your website
- ✅ **Modern, clean design**
- ✅ **Mobile responsive**
- ✅ **Security notices**
- ✅ **Alternative text links** (if button doesn't work)
- ✅ **Professional footer** with links
- ✅ **Icons and visual elements**
- ✅ **Inline CSS** (works in all email clients)

## 🚀 How to Apply Templates in Supabase

### Step 1: Go to Email Templates
1. Open Supabase Dashboard: https://nhdtjjyelesqbmdzyuuv.supabase.co
2. Click **Settings** → **Authentication**
3. Scroll to **Email Templates** section

### Step 2: Update Confirm Signup Template
1. Click on **"Confirm signup"** template
2. **Subject:** `Emailingizni tasdiqlang - World in Context`
3. Copy content from `email-templates/confirm-signup.html`
4. Paste into the HTML editor
5. Click **Save**

### Step 3: Update Reset Password Template
1. Click on **"Reset Password"** template
2. **Subject:** `Parolni tiklash - World in Context`
3. Copy content from `email-templates/reset-password.html`
4. Paste into the HTML editor
5. Click **Save**

### Step 4: Update Magic Link Template
1. Click on **"Magic Link"** template
2. **Subject:** `Hisobingizga kirish - World in Context`
3. Copy content from `email-templates/magic-link.html`
4. Paste into the HTML editor
5. Click **Save**

## 📝 Template Variables

These variables are automatically replaced by Supabase:

- `{{ .ConfirmationURL }}` - The confirmation/action link
- `{{ .Token }}` - Verification token
- `{{ .SiteURL }}` - Your website URL
- `{{ .Email }}` - User's email address

## 🎯 Subject Lines (Recommended)

**Confirm Signup:**
```
Emailingizni tasdiqlang - World in Context
```

**Reset Password:**
```
Parolni tiklash - World in Context
```

**Magic Link:**
```
Hisobingizga kirish - World in Context
```

**Change Email:**
```
Email manzilini o'zgartirish - World in Context
```

**Invite User:**
```
World in Context platformasiga taklif
```

## 🔧 Customization Tips

### Change Colors:
Find and replace these hex codes in the templates:
- `#003d82` - Primary blue
- `#2d8b8b` - Accent teal
- `#f8fafc` - Background gray

### Change Logo:
Add your logo image:
```html
<img src="https://your-domain.com/logo.png" alt="World in Context" style="height: 40px;">
```

### Change Footer Links:
Update these URLs:
- `https://worldincontext.uz` - Your website
- `https://worldincontext.uz/about` - About page

## ✅ Testing

1. Go to Supabase → Authentication → Email Templates
2. Click **"Send Test Email"** for each template
3. Check your inbox
4. Verify:
   - ✅ Colors match your brand
   - ✅ Links work correctly
   - ✅ Mobile display looks good
   - ✅ Text is readable

## 📱 Mobile Responsive

All templates are tested and work on:
- ✅ Gmail (Desktop & Mobile)
- ✅ Outlook
- ✅ Apple Mail
- ✅ Yahoo Mail
- ✅ Mobile devices (iOS & Android)

## 🎨 Template Features

### Confirm Signup:
- Welcome message
- Big confirmation button
- Security notice
- Alternative link
- Professional footer

### Reset Password:
- Clear instructions
- Expiry notice (1 hour)
- Security tips
- Warning if not requested
- Alternative link

### Magic Link:
- Quick login explanation
- Time limit notice (15 minutes)
- One-time use warning
- Security alert
- Alternative link

## 🌟 Pro Tips

1. **Test before going live** - Always send test emails
2. **Check spam folder** - Verify emails don't go to spam
3. **Use custom domain** - Better for deliverability
4. **Monitor delivery rates** - Check Supabase logs
5. **Keep templates updated** - Match website changes

## 📧 SMTP Setup Required

Before templates work, you need to configure SMTP.
See `SUPABASE-SMTP-SETUP.md` for detailed instructions.

## 🎉 Ready to Use!

Your beautiful, branded email templates are ready!
Just copy-paste them into Supabase and you're done.
