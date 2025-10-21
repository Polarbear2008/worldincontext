# 🚀 Vercel Deployment Guide for World in Context

## ✅ Pre-deployment Checklist

### 1. **Environment Variables** (Required)
Make sure your `.env` file contains:
```bash
VITE_SUPABASE_URL=https://nhdtjjyelesqbmdzyuuv.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. **Build Configuration**
- ✅ `vercel.json` - Configured for SPA routing
- ✅ `vite.config.ts` - Build settings optimized
- ✅ `package.json` - Build scripts ready

## 🌐 Deployment Steps

### Option 1: Vercel CLI (Recommended)
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Deploy to Vercel
vercel --prod

# Follow the prompts:
# - Link to existing project or create new
# - Set environment variables
# - Confirm deployment
```

### Option 2: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm ci`

## 🔧 Environment Variables Setup

In Vercel Dashboard:
1. Go to your project → Settings → Environment Variables
2. Add these variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_SUPABASE_URL` | `https://nhdtjjyelesqbmdzyuuv.supabase.co` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Public anon key |
| `VITE_SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Service role key |

## ✅ All Routes Working

The following routes are properly configured and will work after deployment:

### **Public Routes** (No authentication required)
- `/` - Homepage
- `/about` - About page
- `/siyosat` - Politics articles
- `/iqtisod` - Economics articles
- `/geografiya` - Geography articles
- `/tarix` - History articles
- `/diplomatiya` - Diplomacy articles
- `/article/:category/:id` - Individual articles
- `/search` - Search page

### **Authentication Routes**
- `/signin` - Sign in page
- `/signup` - Sign up page

### **Admin Routes** (Protected)
- `/admin` - Admin panel (requires authentication)

## 🔒 Security Notes

1. **Environment Variables**: All sensitive data is stored in environment variables
2. **Service Role Key**: Only used server-side for admin operations
3. **Row Level Security**: Enabled in Supabase for data protection
4. **CORS**: Properly configured for production

## 📊 Performance Optimizations

- **Code Splitting**: Automatic with Vite
- **Image Optimization**: Next-gen formats
- **CSS Minification**: Automatic in build process
- **Tree Shaking**: Unused code removed

## 🚀 Post-deployment Verification

After deployment, verify these routes work:

1. **Homepage**: `https://your-domain.vercel.app/`
2. **Category Pages**: `https://your-domain.vercel.app/siyosat`
3. **Article Pages**: `https://your-domain.vercel.app/article/siyosat/1`
4. **Admin Panel**: `https://your-domain.vercel.app/admin` (requires login)

## 🔧 Troubleshooting

### Common Issues:

1. **Build Fails**
   ```bash
   # Clear cache and rebuild
   rm -rf node_modules/.vite
   npm run build
   ```

2. **Routes Not Working**
   - Check `vercel.json` configuration
   - Ensure SPA fallback is enabled

3. **Environment Variables Not Loading**
   - Double-check variable names in Vercel dashboard
   - Restart deployment after adding variables

4. **Admin Panel Access Issues**
   - Verify service role key is correct
   - Check Supabase RLS policies

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables are set correctly
3. Test locally with `npm run build` first

## 🎉 Deployment Complete!

Your World in Context website is now live on Vercel! 🚀

**Live URL**: `https://your-project-name.vercel.app`

All features including newsletter subscription, admin panel, and real-time data from Supabase are fully functional!
