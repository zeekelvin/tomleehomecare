# TomLee Homecare LLC

A modern, high-performance web platform and lead intake portal for TomLee Homecare LLC — a private-pay home care provider serving families across Georgia.

## Tech Stack
- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4, Motion (Framer Motion)
- **Icons**: Lucide React
- **Database & Sync**: Supabase (PostgreSQL, Row-Level Security, Edge API)

## Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm, pnpm, or bun

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your Supabase credentials in `.env.local` if connecting to cloud persistence:
```env
NEXT_PUBLIC_SUPABASE_URL="https://mzgkdkhclebxothqzjtd.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

### 3. Start Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
- `app/` — Next.js App Router pages and API routes
- `components/` — Reusable UI, SEO, Layout, and Feature components
- `lib/` — Data store, qualification engine, utilities, and Supabase integration
- `public/` — Static assets, icons, and local photography
- `types/` — TypeScript data models and interfaces
