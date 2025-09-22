# Supabase Setup Guide

## Environment Variables

Add these environment variables to your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key

# Database URL (e.g., from Supabase or Vercel Postgres)
DATABASE_URL="postgresql://..."
```

## Getting Supabase Credentials

1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project or use an existing one
3. Go to Settings > API
4. Copy your Project URL and anon public key
5. Update the environment variables above

## Database Setup

If using Supabase as your database:

1. Go to Settings > Database
2. Copy the connection string
3. Update DATABASE_URL in your environment variables

## Vercel Deployment

Make sure to add these same environment variables to your Vercel project settings.
