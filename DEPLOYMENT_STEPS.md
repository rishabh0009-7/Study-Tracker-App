# 🚀 Deploy Study Tracker App to Vercel

## Quick Deployment Guide (10 Minutes)

### Step 1: Go to Vercel
1. Visit: https://vercel.com
2. Click **"Sign Up"** or **"Log In"**
3. Sign in with your **GitHub account**

### Step 2: Import Your Project
1. Click **"Add New"** → **"Project"**
2. Find your repository: **"Study-Tracker-App"**
3. Click **"Import"**

### Step 3: Configure Environment Variables

Before clicking "Deploy", add these environment variables:

```env
DATABASE_URL=postgresql://postgres:dnnXXmMc2UhO5XZk@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres

NEXT_PUBLIC_SUPABASE_URL=https://stdqhbqpcrcccguaqxuq.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0ZHFoYnFwY3JjY2NndWFxeHVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3NzIyODIsImV4cCI6MjA3MzM0ODI4Mn0.NBX5-exgG4IpDBOJcHxhaarZ2VmMEQ3qDeu3UTSlvRs

SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0ZHFoYnFwY3JjY2NndWFxeHVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Nzc3MjI4MiwiZXhwIjoyMDczMzQ4MjgyfQ.uVE2KLl0fkrW8O8oQUFaHm-5WFRdOdPmRsMk46tHRos

NODE_ENV=production
```

**How to add them:**
- Click **"Environment Variables"** section
- Add each variable one by one:
  - Name: `DATABASE_URL`
  - Value: `postgresql://postgres:dnnXXmMc2UhO5XZk@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres`
- Click "Add" for each one

### Step 4: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like: `https://study-tracker-app-xyz.vercel.app`

### Step 5: Setup Your Girlfriend's Account
1. Share the Vercel URL with your girlfriend
2. She clicks **"Get Started"** or **"Sign In"**
3. She creates an account with her email
4. Done! All her data will be saved

---

## ✅ What She Gets:

- ✅ All 6 CS Executive subjects (or whatever subjects are in your database)
- ✅ Chapter tracking with 3 revisions
- ✅ Mock tests for each subject
- ✅ Study timer to track her study sessions
- ✅ Study history with charts
- ✅ Progress tracking
- ✅ Countdown to exam date
- ✅ Works on any device (phone, tablet, laptop)
- ✅ Data syncs across all her devices

---

## 🎯 After Deployment:

1. **Test it yourself first** - Go to the Vercel URL and sign up
2. **Make sure everything works** - Check subjects, timer, progress
3. **Share with your girlfriend** - Send her the link
4. **She creates her account** - Her own email and password
5. **She starts studying!** 📚

---

## 🆘 If Something Goes Wrong:

- Check Vercel build logs for errors
- Make sure all environment variables are set correctly
- Database should connect perfectly from Vercel (no network issues like on your local machine)

---

**The app will work 100x better on Vercel than locally because Vercel has no network restrictions!** 🚀


