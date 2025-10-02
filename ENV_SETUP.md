# 🔧 Environment Setup - FIX DATABASE CONNECTION

## ⚡ Quick Fix (2 Minutes)

Your app is running but using demo data because the `.env` file has the wrong database password.

### Step 1: Create `.env` File

In your project root (`Study-Tracker-App` folder), create a new file called **`.env`** (just .env, no extension)

### Step 2: Copy This Content Into `.env`

```env
# Database Configuration
DATABASE_URL="postgresql://postgres:7838lightninglord@db.stdqhbqpcrcccguaqxuq.supabase.co:5432/postgres"

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://stdqhbqpcrcccguaqxuq.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0ZHFoYnFwY3JjY2NndWFxeHVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3NzIyODIsImV4cCI6MjA3MzM0ODI4Mn0.NBX5-exgG4IpDBOJcHxhaarZ2VmMEQ3qDeu3UTSl2Rs"

# Next.js Configuration
NEXTAUTH_URL="http://localhost:3000"
NODE_ENV="development"
```

### Step 3: Restart Your Server

1. **Stop the current server** (press `Ctrl+C` in the terminal)
2. **Start it again:**
   ```bash
   npm run dev
   ```

### Step 4: Test It

1. Go to http://localhost:3000
2. Login
3. The **red error banner should be GONE**
4. Your **real data will load** instead of demo data

---

## 📝 Alternative: Create via Terminal

If you prefer using the terminal:

```bash
# Navigate to your project directory
cd C:\Users\risha\Desktop\Projects\Tracker-app\tracker\Study-Tracker-App

# Create the .env file with content
echo DATABASE_URL="postgresql://postgres:7838lightninglord@db.stdqhbqpcrcccguaqxuq.supabase.co:5432/postgres" > .env
echo NEXT_PUBLIC_SUPABASE_URL="https://stdqhbqpcrcccguaqxuq.supabase.co" >> .env
echo NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0ZHFoYnFwY3JjY2NndWFxeHVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3NzIyODIsImV4cCI6MjA3MzM0ODI4Mn0.NBX5-exgG4IpDBOJcHxhaarZ2VmMEQ3qDeu3UTSl2Rs" >> .env
echo NEXTAUTH_URL="http://localhost:3000" >> .env
echo NODE_ENV="development" >> .env

# Restart server
npm run dev
```

---

## ✅ What This Fixes

- ❌ **Before:** Database connection fails → Demo data shows
- ✅ **After:** Database connects → Real data loads
- ✅ **After:** Red error banner disappears
- ✅ **After:** Your progress is saved to database
- ✅ **After:** Each user gets their own isolated data

---

## 🎯 Current Status

Your app is **working perfectly** with the fallback system! You're seeing:

- ✅ Dashboard with 6 demo subjects
- ✅ Full navigation
- ✅ Authentication working
- ❌ Database connection failing (will be fixed with .env file)

Once you create the `.env` file and restart, everything will connect to your real Supabase database!

