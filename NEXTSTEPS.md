# Green Flag Guide - Next Steps for GitHub Pages Deployment

## 🚀 **Detailed Next Steps for GitHub Pages Deployment**

### **Step 1: Set up Supabase Project (30-45 minutes)**

#### 1.1 Create Supabase Project
```bash
# 1. Go to https://supabase.com and sign up/login
# 2. Click "New Project"
# 3. Choose organization (create one if needed)
# 4. Fill in project details:
#    - Name: greenflag-guide
#    - Database Password: [create a strong password]
#    - Region: Choose closest to your users
# 5. Click "Create new project"
```

#### 1.2 Configure Database Schema
```bash
# 1. In your Supabase dashboard, go to SQL Editor
# 2. Click "New query"
# 3. Copy the entire content from supabase/schema.sql
# 4. Paste into the SQL editor
# 5. Click "Run" to execute the schema
# 6. Verify tables are created in Table Editor
```

#### 1.3 Configure Authentication
```bash
# 1. Go to Authentication > Settings
# 2. Add Site URL: https://[your-username].github.io/greenflag-guide
# 3. Add Redirect URLs:
#    - https://[your-username].github.io/greenflag-guide/auth/callback
#    - http://localhost:3000/auth/callback
# 4. Save settings
```

#### 1.4 Get API Keys
```bash
# 1. Go to Settings > API
# 2. Copy the following values:
#    - Project URL (e.g., https://abcdefghijklmnop.supabase.co)
#    - anon public key (starts with eyJ...)
# 3. Save these for the next step
```

### **Step 2: Configure Frontend Environment (15-20 minutes)**

#### 2.1 Install Dependencies
```bash
cd frontend
npm install
```

#### 2.2 Create Environment File
```bash
# Copy the example environment file
cp env.example .env.local

# Edit .env.local with your Supabase credentials:
VITE_SUPABASE_URL=https://your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_APP_NAME=Green Flag Guide
VITE_APP_DESCRIPTION=Learn to spot red flags & celebrate green flags in relationships!
```

#### 2.3 Test Locally
```bash
npm run dev
# Visit http://localhost:3000 to test the application
# Test authentication, scenarios, and all features
```

### **Step 3: Prepare for GitHub Pages Deployment (20-30 minutes)**

#### 3.1 Update Vite Configuration for GitHub Pages
The `vite.config.ts` file has been updated with the base path for GitHub Pages:
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/greenflag-guide/', // GitHub Pages base path
  // ... rest of config
})
```

#### 3.2 Update Router for GitHub Pages
The `App.tsx` file has been updated to use HashRouter for GitHub Pages compatibility:
```typescript
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
```

#### 3.3 GitHub Actions Workflow
The `.github/workflows/deploy.yml` file has been created for automatic deployment.

### **Step 4: GitHub Repository Setup (15-20 minutes)**

#### 4.1 Create GitHub Repository
```bash
# 1. Go to https://github.com and create a new repository
# 2. Repository name: greenflag-guide
# 3. Description: Interactive relationship health education app
# 4. Make it Public (required for GitHub Pages)
# 5. Don't initialize with README (we already have one)
```

#### 4.2 Push Code to GitHub
```bash
# Initialize git and push to GitHub
git init
git add .
git commit -m "Initial commit: Green Flag Guide application"
git branch -M main
git remote add origin https://github.com/[your-username]/greenflag-guide.git
git push -u origin main
```

#### 4.3 Configure GitHub Secrets
```bash
# 1. Go to your repository Settings > Secrets and variables > Actions
# 2. Click "New repository secret"
# 3. Add these secrets:
#    - Name: VITE_SUPABASE_URL
#    - Value: https://your-project-url.supabase.co
# 4. Click "New repository secret" again
# 5. Add:
#    - Name: VITE_SUPABASE_ANON_KEY
#    - Value: your-anon-key-here
```

### **Step 5: Enable GitHub Pages (5-10 minutes)**

#### 5.1 Configure GitHub Pages
```bash
# 1. Go to repository Settings > Pages
# 2. Source: Deploy from a branch
# 3. Branch: gh-pages
# 4. Folder: / (root)
# 5. Click Save
```

#### 5.2 Update Supabase Redirect URLs
```bash
# 1. Go back to your Supabase project
# 2. Authentication > Settings
# 3. Update Site URL to: https://[your-username].github.io/greenflag-guide
# 4. Update Redirect URLs to include:
#    - https://[your-username].github.io/greenflag-guide/#/auth/callback
# 5. Save settings
```

### **Step 6: Test Deployment (10-15 minutes)**

#### 6.1 Trigger Deployment
```bash
# Make a small change and push to trigger deployment
echo "# Updated README" >> README.md
git add README.md
git commit -m "Trigger deployment"
git push
```

#### 6.2 Monitor Deployment
```bash
# 1. Go to your repository Actions tab
# 2. Watch the deployment workflow run
# 3. Check for any errors in the build logs
# 4. Wait for deployment to complete (usually 2-3 minutes)
```

#### 6.3 Test the Live Application
```bash
# 1. Visit https://[your-username].github.io/greenflag-guide
# 2. Test all features:
#    - Landing page loads correctly
#    - Authentication works
#    - Scenarios are accessible
#    - Progress tracking works
#    - Admin panel is accessible
```

### **Step 7: Post-Deployment Verification (15-20 minutes)**

#### 7.1 Test All Features
```bash
# Test the following functionality:
# ✅ Landing page displays correctly
# ✅ Google OAuth authentication works
# ✅ User can navigate to scenarios
# ✅ All 10 scenarios are accessible
# ✅ Decision making (green/red flags) works
# ✅ Feedback system displays correctly
# ✅ Progress tracking saves properly
# ✅ Admin panel is accessible (for admin@greenflag.com)
# ✅ Mobile responsiveness works
```

#### 7.2 Check Performance
```bash
# 1. Use Chrome DevTools > Lighthouse
# 2. Run performance audit
# 3. Check for any console errors
# 4. Test on different devices/browsers
```

#### 7.3 Monitor Analytics
```bash
# 1. Check Supabase dashboard for:
#    - User registrations
#    - Scenario completions
#    - Analytics events
# 2. Monitor for any errors in logs
```

### **Step 8: Final Configuration (10-15 minutes)**

#### 8.1 Add Custom Domain (Optional)
```bash
# If you have a custom domain:
# 1. Go to repository Settings > Pages
# 2. Add custom domain
# 3. Update DNS settings
# 4. Update Supabase redirect URLs
```

#### 8.2 Social Media Meta Tags
The `index.html` file has been updated with social media meta tags for better sharing:
- Open Graph tags for Facebook/LinkedIn
- Twitter Card tags
- SEO meta tags
- Keywords and author information

### **Step 9: Launch and Promote (30-45 minutes)**

#### 9.1 Create Launch Announcement
```bash
# Create a comprehensive README for the repository
# Include:
# - Project description
# - Live demo link
# - Features list
# - Technology stack
# - How to contribute
```

#### 9.2 Share on Social Media
```bash
# Share the application on:
# - Twitter/X
# - LinkedIn
# - Reddit (relevant communities)
# - Facebook groups
# - Instagram stories
```

#### 9.3 Monitor and Respond
```bash
# 1. Monitor user feedback
# 2. Respond to comments and questions
# 3. Track analytics in Supabase
# 4. Address any issues quickly
```

## 📋 **Complete Deployment Checklist**

### **Pre-Deployment**
- [ ] Supabase project created and configured
- [ ] Database schema applied successfully
- [ ] Authentication settings configured
- [ ] Environment variables set up
- [ ] Local testing completed

### **GitHub Setup**
- [ ] Repository created on GitHub
- [ ] Code pushed to main branch
- [ ] GitHub secrets configured
- [ ] GitHub Pages enabled
- [ ] GitHub Actions workflow created

### **Deployment**
- [ ] First deployment triggered
- [ ] Build completed successfully
- [ ] Application accessible at GitHub Pages URL
- [ ] All features tested on live site

### **Post-Deployment**
- [ ] Performance audit completed
- [ ] Mobile responsiveness verified
- [ ] Cross-browser compatibility tested
- [ ] Analytics tracking confirmed
- [ ] Social media meta tags added

### **Launch**
- [ ] README updated with live demo link
- [ ] Social media announcement posted
- [ ] Community engagement initiated
- [ ] Monitoring systems in place

## 🎯 **Expected Timeline**

- **Steps 1-3**: 1-2 hours (Supabase setup and local testing)
- **Steps 4-6**: 30-45 minutes (GitHub setup and deployment)
- **Steps 7-9**: 1 hour (testing and launch)

**Total Time**: 2.5-3.5 hours for complete deployment

## 🌐 **Your Application Will Be Live At**

`https://[your-username].github.io/greenflag-guide`

The application will automatically deploy every time you push changes to the main branch, making it easy to update and maintain!

## 🔧 **Troubleshooting Common Issues**

### **Build Failures**
```bash
# Check GitHub Actions logs for:
# - Missing environment variables
# - TypeScript compilation errors
# - Missing dependencies
# - Build timeout issues
```

### **Authentication Issues**
```bash
# Verify in Supabase:
# - Redirect URLs are correct
# - Site URL is set properly
# - OAuth providers are configured
# - API keys are valid
```

### **Routing Issues**
```bash
# Ensure:
# - HashRouter is being used (not BrowserRouter)
# - Base path is set correctly in Vite config
# - All routes are working with hash routing
```

### **Performance Issues**
```bash
# Optimize:
# - Image sizes and formats
# - Bundle splitting
# - Lazy loading of components
# - CDN usage for static assets
```

## 📊 **Monitoring and Maintenance**

### **Regular Tasks**
- [ ] Monitor GitHub Actions for build failures
- [ ] Check Supabase dashboard for errors
- [ ] Review user analytics and engagement
- [ ] Update dependencies regularly
- [ ] Backup database periodically

### **Performance Monitoring**
- [ ] Use Lighthouse for performance audits
- [ ] Monitor Core Web Vitals
- [ ] Track user engagement metrics
- [ ] Monitor error rates and user feedback

### **Content Updates**
- [ ] Add new scenarios as needed
- [ ] Update existing content based on feedback
- [ ] Improve educational content
- [ ] Add new features based on user needs

---

**Status**: ✅ **READY FOR DEPLOYMENT** - Follow these steps to launch your Green Flag Guide application on GitHub Pages! 