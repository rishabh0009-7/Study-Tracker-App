# Study Tracker App

A comprehensive study tracking application built with Next.js, Supabase, and Clerk authentication.

## Quick Setup

### 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key-here

# Database URL (Required)
DATABASE_URL="postgresql://postgres:[YOUR_PASSWORD]@db.your-project-id.supabase.co:5432/postgres"

# Clerk Authentication (Optional - if using Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_[YOUR_PUBLISHABLE_KEY]"
CLERK_SECRET_KEY="sk_test_[YOUR_SECRET_KEY]"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
```

**To get your Supabase credentials:**

1. Go to [supabase.com](https://supabase.com) and create a project
2. Navigate to Settings > API
3. Copy your Project URL and anon public key
4. Update the environment variables above

### 2. Database Setup

Run the following commands to set up your database:

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push
```

### 3. Start Development Server

```bash
npm run dev
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
