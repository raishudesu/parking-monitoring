# Parking Monitoring System - Installation Guide

## Prerequisites

- Node.js 16.8 or higher
- npm or yarn
- Git
- PostgreSQL (Supabase)

## Installation Steps

**If you already have a copy of the source code locally, you can skip Step 1.**

1. Clone the repository:

```
git clone https://github.com/raishudesu/parking-monitoring
cd parking-monitoring
```

2. Install dependencies:

```
npm install
```

or

```
yarn install
```

3. Setup environment variables:

   ```
   cp .env.example .env.local
   ```

   # Update the following in .env.local:

   - DATABASE_URL (Supabase PostgreSQL connection string)
   - NEXTAUTH_SECRET
   - NEXTAUTH_URL
   - Other auth provider credentials

4. Setup Prisma:
   npx prisma generate
   npx prisma db push

## Required Dependencies

- Next.js 13 (App Router)
- Prisma (ORM)
- NextAuth.js
- Supabase (PostgreSQL)
- Other project-specific packages

## Configuration

1. Update Prisma schema if needed (prisma/schema.prisma)
2. Configure authentication providers in app/api/auth/[...nextauth]/route.ts
3. Setup Supabase project and get connection details

## Running the System

1. Development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```
2. Access the application:
   http://localhost:3000

## Build for Production

    npm run build
    npm start
    # or
    yarn build
    yarn start

## Troubleshooting

- Verify Supabase connection string
- Check NextAuth configuration
- Ensure Prisma schema is in sync with database
- Review Next.js logs in console

For additional support, please refer to the documentation or create an issue on GitHub.
