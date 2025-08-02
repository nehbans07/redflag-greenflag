# Green Flag Guide - Deployment Guide

This guide covers deploying the Green Flag Guide application to production.

## Prerequisites

- Node.js 18+ installed
- Supabase account
- Vercel/Netlify account (for frontend deployment)
- Domain name (optional)

## 1. Supabase Setup

### Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Choose a project name (e.g., "greenflag-guide")
3. Set a database password
4. Choose a region close to your users

### Configure Database

1. Go to the SQL Editor in your Supabase dashboard
2. Copy and paste the contents of `supabase/schema.sql`
3. Run the script to create all tables and sample data

### Configure Authentication

1. Go to Authentication > Settings in your Supabase dashboard
2. Add your domain to the Site URL (e.g., `https://your-app.vercel.app`)
3. Add redirect URLs:
   - `https://your-app.vercel.app/auth/callback`
   - `http://localhost:3000/auth/callback` (for development)

### Get API Keys

1. Go to Settings > API in your Supabase dashboard
2. Copy the Project URL and anon public key
3. Save these for the frontend configuration

## 2. Frontend Setup

### Environment Variables

Create a `.env.local` file in the frontend directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_NAME=Green Flag Guide
VITE_APP_DESCRIPTION=Learn to spot red flags & celebrate green flags in relationships!
```

### Install Dependencies

```bash
cd frontend
npm install
```

### Test Locally

```bash
npm run dev
```

Visit `http://localhost:3000` to test the application.

## 3. Deployment Options

### Option A: Vercel (Recommended)

1. **Connect Repository**
   - Push your code to GitHub/GitLab
   - Go to [vercel.com](https://vercel.com)
   - Import your repository

2. **Configure Environment Variables**
   - In your Vercel project settings, add the environment variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
     - `VITE_APP_NAME`
     - `VITE_APP_DESCRIPTION`

3. **Deploy**
   - Vercel will automatically deploy on every push to main branch
   - Your app will be available at `https://your-project.vercel.app`

### Option B: Netlify

1. **Connect Repository**
   - Push your code to GitHub/GitLab
   - Go to [netlify.com](https://netlify.com)
   - Import your repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18

3. **Configure Environment Variables**
   - Go to Site settings > Environment variables
   - Add the same environment variables as above

4. **Deploy**
   - Netlify will automatically deploy on every push to main branch

### Option C: Manual Deployment

1. **Build the Application**
   ```bash
   cd frontend
   npm run build
   ```

2. **Upload to Web Server**
   - Upload the contents of the `dist` folder to your web server
   - Configure your web server to serve the index.html for all routes

## 4. Domain Configuration

### Custom Domain Setup

1. **Vercel/Netlify**
   - Go to your project settings
   - Add your custom domain
   - Follow the DNS configuration instructions

2. **Update Supabase Settings**
   - Go to your Supabase project
   - Update the Site URL to include your custom domain
   - Add your custom domain to the redirect URLs

## 5. Post-Deployment Checklist

### Security
- [ ] Environment variables are properly set
- [ ] Supabase RLS policies are working
- [ ] Authentication is functioning correctly
- [ ] HTTPS is enabled

### Functionality
- [ ] Landing page loads correctly
- [ ] User registration/login works
- [ ] Scenarios are accessible
- [ ] Progress tracking works
- [ ] Admin panel is accessible (for admin@greenflag.com)

### Performance
- [ ] Images are optimized
- [ ] Bundle size is reasonable
- [ ] Loading times are acceptable
- [ ] Mobile responsiveness works

### Analytics
- [ ] Set up Google Analytics (optional)
- [ ] Test analytics event tracking
- [ ] Monitor user engagement

## 6. Monitoring and Maintenance

### Regular Tasks

1. **Database Monitoring**
   - Monitor Supabase usage and limits
   - Check for any failed queries
   - Review user analytics

2. **Application Monitoring**
   - Monitor error rates
   - Check performance metrics
   - Review user feedback

3. **Content Updates**
   - Add new scenarios as needed
   - Update existing content
   - Monitor user engagement patterns

### Backup Strategy

1. **Database Backups**
   - Supabase provides automatic backups
   - Consider additional manual backups for critical data

2. **Code Backups**
   - Use Git for version control
   - Keep multiple deployment environments

## 7. Troubleshooting

### Common Issues

1. **Authentication Not Working**
   - Check Supabase URL and API key
   - Verify redirect URLs are correct
   - Check browser console for errors

2. **Database Connection Issues**
   - Verify Supabase project is active
   - Check RLS policies are correct
   - Review database logs

3. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review build logs for specific errors

### Support Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 8. Scaling Considerations

### Performance Optimization

1. **Frontend**
   - Implement code splitting
   - Optimize images and assets
   - Use CDN for static assets

2. **Backend**
   - Monitor database performance
   - Implement caching strategies
   - Consider read replicas for high traffic

### Feature Additions

1. **User Engagement**
   - Email notifications
   - Progress reminders
   - Social sharing features

2. **Content Management**
   - Admin interface for content updates
   - A/B testing for scenarios
   - User-generated content

3. **Analytics**
   - Advanced user analytics
   - Learning outcome tracking
   - Personalized recommendations

## 9. Security Best Practices

### Data Protection
- All user data is encrypted at rest
- HTTPS is enforced for all connections
- Row Level Security (RLS) is enabled
- Regular security audits

### Access Control
- Admin access is restricted to specific email
- User data is isolated per user
- API keys are properly secured
- Environment variables are encrypted

## 10. Legal and Compliance

### Privacy Policy
- Create a privacy policy for user data
- Include data collection and usage information
- Specify user rights and data deletion

### Terms of Service
- Define acceptable use of the application
- Include disclaimers for educational content
- Specify intellectual property rights

### GDPR Compliance
- Implement data export functionality
- Provide data deletion options
- Include cookie consent if needed

---

This deployment guide ensures a secure, scalable, and maintainable deployment of the Green Flag Guide application. Regular monitoring and updates will help maintain optimal performance and user experience. 