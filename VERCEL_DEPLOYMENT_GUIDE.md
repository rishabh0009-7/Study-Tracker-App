# Vercel Deployment Guide

## Environment Variables Setup

Make sure these environment variables are set in your Vercel dashboard:

### Required Environment Variables:

```bash
# Database
DATABASE_URL="postgresql://postgres:7838LIGHTNINGLORD@db.stdqhbqpcrcccguaqxuq.supabase.co:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://stdqhbqpcrcccguaqxuq.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0ZHFoYnFwY3JjY2NndWFxeHVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3NzIyODIsImV4cCI6MjA3MzM0ODI4Mn0.NBX5-exgG4IpDBOJcHxhaarZ2VmMEQ3qDeu3UTSl2Rs"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0ZHFoYnFwY3JjY2NndWFxeHVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Nzc3MjI4MiwiZXhwIjoyMDczMzQ4MjgyfQ.uVE2KLl0fkrW8O8oQUFaHm-5WFRdOdPmRsMk46tHRos"

# Production URL (set this after deployment)
NEXTAUTH_URL="https://your-app-name.vercel.app"
NODE_ENV="production"
```

## Deployment Steps:

### 1. Push to GitHub

```bash
git add .
git commit -m "Fix dynamic routes and add error handling"
git push origin main
```

### 2. Vercel Dashboard Setup

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Go to Settings → Environment Variables
5. Add all the environment variables listed above

### 3. Build Configuration

The project is already configured with:

- `vercel-build` script in package.json
- Dynamic route configuration
- Proper error handling
- ESLint/TypeScript warnings ignored for build

### 4. Deploy

Click "Deploy" in Vercel dashboard or push to main branch.

## Troubleshooting:

### Build Warnings (Expected)

- ✅ "Dynamic server usage" warnings are expected for authenticated pages
- ✅ "Database not available during build" warnings are handled with fallbacks
- ✅ Node.js API warnings are resolved with runtime configuration

### Runtime Issues

- If you see "Something went wrong" after sign-in, check Vercel function logs
- Ensure all environment variables are set correctly
- Database connection should work automatically with Supabase

### Database Seeding

- New users are automatically seeded with sample data
- If seeding fails, the app continues to work (graceful fallback)

## Success Indicators:

- ✅ Build completes successfully
- ✅ Sign-in redirects to dashboard
- ✅ Subjects and progress data are visible
- ✅ Study timer and history work
- ✅ Each user has isolated data

## Support:

If issues persist, check:

1. Vercel function logs
2. Browser console for client-side errors
3. Database connectivity in Supabase dashboard
