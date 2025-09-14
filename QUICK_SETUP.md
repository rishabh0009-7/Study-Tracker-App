# 🚀 Quick Setup Guide

## Step 1: Create Environment File

Create a `.env.local` file in the `tracker` directory with your actual values:

```env
# Database (Replace with your Supabase URL)
DATABASE_URL="postgresql://postgres:[YOUR_PASSWORD]@db.stdqhbqpcrcccguaqxuq.supabase.co:5432/postgres"

# Clerk Authentication (Replace with your Clerk keys)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_[YOUR_PUBLISHABLE_KEY]"
CLERK_SECRET_KEY="sk_test_[YOUR_SECRET_KEY]"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
```

## Step 2: Set up Supabase Database

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase-schema.sql`
4. Run the SQL to create all tables

## Step 3: Set up Clerk Authentication

1. Go to your Clerk dashboard
2. Create a new application
3. Copy the publishable key and secret key
4. Update the `.env.local` file with your keys

## Step 4: Run the Application

```bash
# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Start development server
npm run dev
```

## Step 5: Test the Application

1. Open http://localhost:3000
2. Click "Get Started" to sign up
3. Complete the sign-up process
4. You should be redirected to the dashboard
5. The database will be automatically seeded with CS Executive subjects

## Features Available

✅ **Dashboard**: Countdown timer, progress tracking, subject overview
✅ **Subjects**: All 5 CS Executive subjects with chapters and mock tests
✅ **Study Timer**: Start/stop study sessions with time tracking
✅ **Study History**: Visual analytics with charts and session history
✅ **Chapter Tracking**: Complete + 3 revisions per chapter
✅ **Mock Tests**: 2 mock tests per subject
✅ **Progress Calculation**: Real-time progress updates

## Troubleshooting

- Make sure your `.env.local` file has the correct values
- Ensure your Supabase database is accessible
- Check that your Clerk keys are correct
- Verify all dependencies are installed with `npm install`
