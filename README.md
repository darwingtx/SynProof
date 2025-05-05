This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

## Features

### Dashboard Page (`/dashboard`)
The dashboard page provides an overview of equipment status and management. Key features include:

- **Authentication**: Users must connect their wallet to access the dashboard
- **Admin Verification**: System checks if the connected wallet has admin privileges
- **Equipment Status Table**: Displays real-time information about:
  - Equipment ID
  - Serial Number
  - Operating System
  - Pending Updates
  - Current Status
- **Loading States**: 
  - Shows loading indicator while verifying admin status
  - Displays loading state while fetching equipment data
- **Error Handling**:
  - Handles authentication errors
  - Manages admin verification failures
  - Handles data fetching errors gracefully

### Details Page (`/details`)
The details page provides in-depth information about specific equipment. Features include:

- **Detailed Equipment Information**:
  - Complete equipment specifications
  - Update history
  - Current status details
- **Real-time Updates**:
  - Live status monitoring
  - Update progress tracking
- **Action Controls**:
  - Update management
  - Status modification
  - Equipment configuration



## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
