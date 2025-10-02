# 🔑 Get Your Supabase Credentials - Fix "Invalid API Key" Error

The "Invalid API key" error means either:

1. Your Supabase ANON key is incorrect
2. Your database password is wrong
3. Your Supabase project is paused

## 📋 Step-by-Step Fix

### Step 1: Go to Your Supabase Project

Visit: **https://supabase.com/dashboard/project/stdqhbqpcrcccguaqxuq**

### Step 2: Get Your API Keys

1. Click **Settings** (gear icon) in the left sidebar
2. Click **API** in the settings menu
3. You'll see:
   - **Project URL**: `https://stdqhbqpcrcccguaqxuq.supabase.co`
   - **anon public** key (starts with `eyJhbGci...`)
   - **service_role** key (starts with `eyJhbGci...`)

### Step 3: Get Your Database Password

1. In Supabase dashboard, click **Settings** → **Database**
2. Look for **Connection String** section
3. You'll see something like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.stdqhbqpcrcccguaqxuq.supabase.co:5432/postgres
   ```
4. Copy the password from there (it might be different from what you remember!)

### Step 4: Check if Your Project is Paused

1. Look at the top of your Supabase dashboard
2. If you see **"Project Paused"** or **"Database Paused"**:
   - Click **"Resume"** or **"Restore Project"**
   - Wait 30-60 seconds for it to wake up

### Step 5: Update Your .env File

Open your `.env` file in the project root and update it with the **correct values from Supabase**:

```env
DATABASE_URL="postgresql://postgres:[PASTE_YOUR_ACTUAL_PASSWORD_HERE]@db.stdqhbqpcrcccguaqxuq.supabase.co:5432/postgres"

NEXT_PUBLIC_SUPABASE_URL="https://stdqhbqpcrcccguaqxuq.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[PASTE_YOUR_ACTUAL_ANON_KEY_HERE]"
SUPABASE_SERVICE_ROLE_KEY="[PASTE_YOUR_ACTUAL_SERVICE_ROLE_KEY_HERE]"

NEXTAUTH_URL="http://localhost:3000"
NODE_ENV="development"
```

### Step 6: Restart Your Server

1. **Stop the server**: Press `Ctrl+C` in the terminal
2. **Start again**: `npm run dev`
3. **Test**: Go to http://localhost:3000 and login

---

## 🎯 Quick Checklist

- [ ] Visited Supabase dashboard
- [ ] Copied the correct **anon public** key
- [ ] Copied the correct **database password**
- [ ] Checked if project is paused (if yes, resumed it)
- [ ] Updated `.env` file with correct values
- [ ] Restarted the dev server
- [ ] Tested the app

---

## 💡 Alternative: Try the Database URL from Supabase Directly

In your Supabase dashboard:

1. Go to **Settings** → **Database**
2. Find **Connection String** section
3. Select **URI** tab
4. Copy the entire connection string
5. Replace the `[YOUR-PASSWORD]` with your actual password
6. Paste it as your `DATABASE_URL` in `.env`

---

## 🆘 Still Having Issues?

The app is currently working with **demo data** - so you can still use it! Once you get the correct credentials and restart, it will connect to your real database.

**What's working now:**

- ✅ Login/Authentication
- ✅ Dashboard with demo subjects
- ✅ Full navigation
- ❌ Database connection (needs correct credentials)
