# Vercel Deployment Guide

## 🚨 Critical: Video File Setup

Your hero video is currently set to `/videos/hero-video.mp4` (local file). **This won't work on Vercel** because:
- The `public/videos/.gitignore` excludes video files from git
- Vercel only deploys files in your repository

### Solutions (Choose One)

#### Option A: Use External CDN (Recommended)
Upload your video to a CDN and update the source:

**Good CDN options:**
- Cloudflare R2 (free tier)
- AWS S3 + CloudFront
- Vercel Blob Storage
- Bunny CDN

**Update in [`HeroSequence.tsx`](file:///Users/suryatejlalam/Brahmi antigravity/src/components/hero/HeroSequence.tsx#L225):**
```tsx
<video
  src="https://your-cdn.com/hero-video.mp4"
  // ... rest of props
/>
```

#### Option B: Include Video in Git
1. Remove video from gitignore:
```bash
# Edit public/videos/.gitignore
# Comment out or remove: *.mp4
```

2. Add and commit your video:
```bash
git add public/videos/hero-video.mp4
git commit -m "Add hero video for deployment"
```

⚠️ **Warning**: Only do this if your video is < 5MB. Large files will slow down deployments.

#### Option C: Use Placeholder Video
Temporarily use a public video URL:
```tsx
src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
```

## 📋 Pre-Deployment Checklist

### 1. Test Build Locally
```bash
npm run build
npm start
# Visit http://localhost:3000 and verify everything works
```

### 2. Update `.gitignore` (if needed)
The current `.gitignore` is good, but verify:
```bash
cat .gitignore
```

Should include:
```
# dependencies
/node_modules

# next.js
/.next/
/out/

# env files
.env*

# vercel
.vercel
```

### 3. Check `package.json` Scripts
Your scripts are already configured:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  }
}
```

### 4. Create `vercel.json` (Optional)
For custom configuration:
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install --legacy-peer-deps",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

## 🚀 Deployment Steps

### Deploy via Vercel Dashboard (Easiest)

1. **Push to GitHub**
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

2. **Connect to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "Add New Project"
- Import your GitHub repository
- Vercel auto-detects Next.js

3. **Configure Build**
- Framework Preset: Next.js (auto-detected)
- Build Command: `npm run build`
- Install Command: `npm install --legacy-peer-deps`
- Output Directory: `.next` (auto)

4. **Environment Variables** (if needed)
Currently, your project doesn't use any. Skip this step.

5. **Deploy**
Click "Deploy" - Vercel will build and deploy automatically!

### Deploy via Vercel CLI (Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# For production
vercel --prod
```

## ⚙️ Vercel Configuration

### Build Settings
- **Install Command**: `npm install --legacy-peer-deps`
  - Required because of peer dependency warnings
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Node Version**: 20.x (recommended)

### Custom Domain (Optional)
After deployment:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

## 🐛 Common Issues & Fixes

### Issue: Video not loading
**Solution**: Use a CDN URL instead of local file

### Issue: Build fails with peer dependency errors
**Solution**: Already fixed with `--legacy-peer-deps` flag

### Issue: Fonts not loading
**Solution**: Your fonts are in `public/` - they'll work fine

### Issue: GSAP import errors
**Solution**: Already using dynamic imports - good to go!

### Issue: Hydration mismatch
**Current Warning**: There's a hydration mismatch in your app
**Impact**: Doesn't break functionality, but should be fixed
**Fix**: Check `layout.tsx` body className generation

## 📊 Post-Deployment

### Monitor Performance
- Vercel Analytics (free)
- Core Web Vitals
- Check Vercel dashboard for build logs

### Optimize for Production
1. **Enable Image Optimization**
   - Replace `<img>` with `<Image />` from `next/image`
   - Currently in Collections carousel

2. **Add Compression**
   - Vercel handles this automatically

3. **Monitor Bundle Size**
   - Check Vercel build output
   - Current bundle: ~2MB (good)

## 🎯 Deployment Command Summary

```bash
# 1. Fix video source (choose one solution above)

# 2. Test build
npm run build

# 3. Commit and push
git add .
git commit -m "Ready for deployment"
git push origin main

# 4. Deploy to Vercel
# Either use dashboard or:
vercel --prod
```

## 📝 Important Notes

- ✅ Your build passes (tested)
- ✅ No critical lint errors
- ✅ SSR compatible (dynamic imports)
- ⚠️ **Fix video source before deploying**
- 💡 Consider using Vercel Blob for videos

## 🔗 Useful Links

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Blob Storage](https://vercel.com/docs/storage/vercel-blob)
