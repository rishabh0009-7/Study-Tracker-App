# Single User Study Tracker Setup

This app has been simplified to work for a single user (your girlfriend) with Neon database. No authentication required!

## What's Changed

✅ **Removed Authentication**: No more Supabase or NextAuth setup needed
✅ **Single User Mode**: App works directly without user management
✅ **Neon Database**: Uses PostgreSQL via Neon for data persistence
✅ **All Features Preserved**: Timer, progress tracking, subjects, history - everything works!

## Quick Setup

### 1. Environment Variables

Create a `.env.local` file with your Neon database URL:

```env
DATABASE_URL="postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Database

```bash
npx prisma migrate deploy
npx prisma db seed
```

### 4. Start the App

```bash
npm run dev
```

## Features Available

🎯 **Dashboard**: Overview of all subjects and progress
📚 **Subjects**: 7 CS Executive subjects with chapters and mock tests
⏱️ **Study Timer**: Track study sessions with timer
📊 **Progress Tracking**: Visual progress bars and completion tracking
📈 **Study History**: Charts and analytics of study patterns
🔄 **Revision System**: 3 revision cycles for each chapter

## Database Schema

The app now uses a simplified schema without user management:

- **Subjects**: 7 CS Executive subjects
- **Chapters**: Multiple chapters per subject
- **Chapter Progress**: Completion + 3 revision cycles
- **Mock Tests**: 2 mock tests per subject
- **Study Sessions**: Timer history and analytics

## Deployment

The app is ready to deploy to Vercel with just the `DATABASE_URL` environment variable set.

## For Your Girlfriend

When she opens the app:

1. She'll see the beautiful landing page
2. Click "Get Started" to go to the dashboard
3. All subjects will be pre-loaded with CS Executive curriculum
4. She can start tracking her study progress immediately
5. All data persists in the Neon database

No login required - just open and start studying! 🚀
