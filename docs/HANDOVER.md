# TomLee Homecare LLC — Operations & Handover Guide

This comprehensive guide provides operational and administrative instructions for managing TomLee Homecare LLC's website, intake pipeline, administrative portal, and database architecture.

---

## 1. Quick Start & Local Execution

### Prerequisites
- Node.js 18+
- npm, pnpm, or bun

### Running Locally
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
```

The application is accessible locally at [http://localhost:3000](http://localhost:3000).

---

## 2. Admin Portal & Authentication

### Administrative Access:
- **Login URL**: [`http://localhost:3000/admin/login`](http://localhost:3000/admin/login)
- **Primary Administrator Credentials**:
  - **Email**: `admin@tomleehomecare.com`
  - **Password**: `TomLeeAdmin2026!`
  - **Role**: `ADMIN`

### Authentication & Session Security:
- **Password Security**: Passwords are encrypted using **PBKDF2 SHA-512** with unique cryptographic salts stored in the `admin_users` table in Supabase.
- **Session Tokens**: Authenticated sessions issue a signed **HMAC SHA-256 session token** stored in a secure, `HTTP-only`, `SameSite=Lax` cookie (`tomlee_admin_session`) with a 7-day expiration window.
- **Route Guarding**: All `/admin/*` routes (`/admin/leads`, `/admin/services`, `/admin/resources`, `/admin/faqs`, `/admin/rules`, `/admin/settings`) are guarded against unauthenticated access. Unauthenticated requests are automatically routed to `/admin/login`.
- **Sign Out**: The top navigation bar includes an active **Sign Out** button that immediately clears the session cookie and redirects to `/admin/login`.

---

## 3. Brand Assets & Favicon Configuration

- **Primary Favicon Asset**: Located at [`public/Tomlee favicon.jpeg`](file:///c:/Users/j9ice/Documents/tomlee-homecare/public/Tomlee%20favicon.jpeg).
- **Synchronized Favicon Links**:
  - [`public/favicon.ico`](file:///c:/Users/j9ice/Documents/tomlee-homecare/public/favicon.ico)
  - [`public/favicon.jpeg`](file:///c:/Users/j9ice/Documents/tomlee-homecare/public/favicon.jpeg)
  - [`app/favicon.ico`](file:///c:/Users/j9ice/Documents/tomlee-homecare/app/favicon.ico)
- **Metadata Declaration**: Configured in [`app/layout.tsx`](file:///c:/Users/j9ice/Documents/tomlee-homecare/app/layout.tsx) supporting standard browser tabs, bookmarks, shortcuts, and Apple touch devices.

---

## 4. Managing Leads & Inquiries

Navigate to `/admin/leads` to review, score, and triage all incoming care requests.

### Key Lead Metrics & Triage Protocol:
- **`QUALIFIED` (Green)**: High-intent private-pay prospects within Georgia coverage area. Target response time: **Under 15 minutes**.
- **`NEEDS_REVIEW` (Amber)**: Borderline geographic location or multi-service inquiry. Review notes and follow up via client's preferred contact method.
- **`NOT_CURRENTLY_QUALIFIED` (Slate)**: Medicaid-only or out of service area. Follow standard courtesy referral workflow.
- **`Switching Provider` (Purple badge)**: Family dissatisfied with their current provider due to caregiver call-outs or lack of communication. Prioritize immediate consultation via the **48-Hour Zero-Gap Transition Protocol**.

---

## 5. Managing Content & Settings

### Care Services (`/admin/services`):
- Create, edit, and archive services.
- Toggle `is_featured` to pin to the homepage grid.
- Slugs auto-generate from the service name and immediately create dynamic routes at `/services/[slug]`.

### Educational Guides (`/admin/resources`):
- Full markdown editor for family resources covering home care costs, choosing private-pay, and switching agencies.
- Real-time read-time estimation and author assignment.

### Knowledge Base & FAQs (`/admin/faqs`):
- Add frequently asked questions with category tags.
- Re-order by modifying the `sort_order` integer.

### Qualification Rules (`/admin/rules`):
- Adjust scoring multipliers (e.g., private-pay bonus, immediate urgency, Georgia zip code validation).

### Site Settings (`/admin/settings`):
- Update business phone (`(404) 999-7936`), address (`Lawrenceville, GA 30044`), emergency on-call contact, service area cities/zips, and operational status.

---

## 6. Supabase Database Architecture

- **Project Target**: `mzgkdkhclebxothqzjtd` (`eu-north-1`)
- **Tables (Row-Level Security Enabled)**:
  1. `services` (12 records)
  2. `resources` (7 records)
  3. `faqs` (13 records)
  4. `qualification_rules` (6 records)
  5. `site_settings` (1 record)
  6. `leads` (Active intake records)
  7. `admin_users` (Administrator credentials)

### Environment Variables (`.env.local`):
```env
NEXT_PUBLIC_SUPABASE_URL="https://mzgkdkhclebxothqzjtd.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
APP_URL="http://localhost:3000"
```

---

## 7. Production Deployment & Verification

### Deployment Options:
- **Vercel / Netlify**: Connect Git repository, set the environment variables above, and deploy.
- **Docker / Standalone Node Container**: The project is built with `output: 'standalone'`, creating a lightweight production bundle in `.next/standalone`.

### Production Build Command:
```bash
npm run build
```
*(Verified: 27/27 static and dynamic routes compiled with 0 errors).*
