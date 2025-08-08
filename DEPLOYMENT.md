# 🚀 Deployment Guide - Share Your Japanese Verb Learner App

## Quick Deploy Options

### Option 1: Vercel (Recommended - Free & Easy)

1. **Install Vercel CLI** (already done):
   ```bash
   npm install -g vercel
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel
   ```
   - Follow the prompts
   - Choose "Yes" to link to existing project (if you have one)
   - Choose "No" to create a new project
   - Your app will be deployed to a URL like: `https://your-app-name.vercel.app`

3. **Share the URL** with your friends!

### Option 2: Netlify (Alternative - Free)

1. **Build your app**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login
   - Drag and drop your `.next` folder or connect your GitHub repo
   - Get a shareable URL

### Option 3: GitHub Pages

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repo settings
   - Enable GitHub Pages
   - Choose source branch (main)
   - Get your URL: `https://username.github.io/repo-name`

## Local Sharing (Development)

### Share Locally on Your Network

1. **Start development server**:
   ```bash
   npm run dev
   ```

2. **Find your IP address**:
   ```bash
   # On Mac/Linux
   ifconfig | grep "inet " | grep -v 127.0.0.1
   
   # On Windows
   ipconfig
   ```

3. **Share the local URL**:
   - Your local URL: `http://YOUR_IP_ADDRESS:3000`
   - Friends on same network can access: `http://192.168.1.XXX:3000`

### Using ngrok (Tunnel to Internet)

1. **Install ngrok**:
   ```bash
   # Download from https://ngrok.com/download
   # Or use Homebrew on Mac
   brew install ngrok
   ```

2. **Start your app**:
   ```bash
   npm run dev
   ```

3. **Create tunnel**:
   ```bash
   ngrok http 3000
   ```

4. **Share the ngrok URL** (e.g., `https://abc123.ngrok.io`)

## Production Deployment Steps

### 1. Prepare for Production

```bash
# Build the app
npm run build

# Test the build locally
npm start
```

### 2. Environment Variables (if needed)

Create `.env.local` for any API keys or configuration:
```env
NEXT_PUBLIC_APP_NAME="Japanese Verb Learner"
```

### 3. Deploy Commands

**Vercel (Recommended)**:
```bash
vercel --prod
```

**Manual Build**:
```bash
npm run build
npm start
```

## Sharing Features

### What Your Friends Will Get:

✅ **Complete App Access** - All features working
✅ **Practice Mode** - 18 conjugation forms
✅ **Structured Study** - 2-week learning plan
✅ **Mastery Dashboard** - Progress tracking
✅ **100+ Verbs** - Full database
✅ **Responsive Design** - Works on mobile/desktop

### Share Links:

- **App URL**: `https://your-app.vercel.app`
- **GitHub Repo**: `https://github.com/yourusername/japanese-verb-learner`
- **Demo Video**: Record a quick demo and share

## Troubleshooting

### Common Issues:

1. **Build Errors**:
   ```bash
   npm run build
   # Fix any TypeScript errors first
   ```

2. **Deployment Fails**:
   - Check if all dependencies are in `package.json`
   - Ensure no environment variables are missing

3. **App Not Loading**:
   - Check browser console for errors
   - Verify all imports are correct

### Support:

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **GitHub Issues**: Create issues in your repo

## Quick Share Commands

```bash
# Deploy and get URL
vercel --prod

# Share locally
npm run dev
# Then share: http://YOUR_IP:3000

# Build for production
npm run build && npm start
```

## 🎯 Ready to Share!

Once deployed, your friends can:
- Practice Japanese verb conjugations
- Follow the structured study plan
- Track their progress
- Use on any device (mobile/desktop)

**Share your app URL and let them start learning!** 🎉 