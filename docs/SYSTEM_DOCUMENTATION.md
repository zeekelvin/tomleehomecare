# TomLee Homecare LLC — System & Technical Architecture Documentation

## Executive Overview
TomLee Homecare LLC is a private-pay in-home care platform designed for Georgia families. The platform integrates an intelligent lead qualification and triage engine, a 48-Hour Zero-Gap Transition Protocol for families switching from unreliable agencies, dynamic CMS capabilities for care services, educational resources, and FAQs, backed by Supabase PostgreSQL.

---

## 1. Technical Stack

- **Framework**: Next.js 15 (App Router, Server & Client Components)
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS v4, Motion (Framer Motion)
- **Icons & Graphics**: Lucide React + Local Scalable Vector Graphics
- **Database & Persistence**: Supabase PostgreSQL (`eu-north-1`) with Row-Level Security (RLS)
- **Security & Privacy**: Strict Content Security Policy (CSP), sliding-window rate limiting, Honeypot bot defense, input sanitization, and Zero-PHI transmission policy.

---

## 2. Core Architectural Principles & Routing

### The Primary Value Proposition
The platform answers the key questions families ask when seeking private-pay home care:
1. **Can you help my loved one?** Comprehensive care across Personal Care, Companion Care, Meal Preparation, 24-Hour/Live-In Care, Respite Care, Recovery Care, and Memory/Dementia Care.
2. **Can I switch from an unreliable provider?** Dedicated **48-Hour Zero-Gap Transition Protocol** designed to replace call-out prone agencies with zero lapse in client routine.
3. **Can I trust your caregivers?** 100% W-2 employees (not 1099 contractors), thoroughly background-checked (FBI/Georgia state registries), insured, bonded, and supervised by registered nurses.
4. **How quickly can care start?** Same-day virtual or in-home assessment, with qualified care matching within 24 to 48 hours.
5. **What happens if a caregiver is sick?** Guaranteed on-call backup caregiver response.

---

## 3. Lead Qualification & Triage Engine (`lib/qualification.ts`)

Every inquiry submitted through the 7-step wizard (`/request-care`) or quick intake forms is evaluated against 6 scoring rules and Georgia geographic parameters:

### Evaluation Inputs:
- **Lead Intent**: `first_time`, `unhappy_with_current_provider`, `additional_care`, `comparing_providers`, `temporary_respite`, `general_information`.
- **Payment Method**: `private_pay`, `medicaid`, `waiver`, `not_sure`.
- **Urgency**: `immediately`, `within_a_few_days`, `within_1_2_weeks`, `within_a_month`, `planning_ahead`.
- **Service Area**: Validated against Georgia ZIP codes (30000–39999) and core Metro Atlanta counties/cities.

### Qualification Statuses:
- **`QUALIFIED`** (Score ≥ 80): High-intent private pay, immediate or near-term start in Georgia service area.
- **`NEEDS_REVIEW`** (Score 50–79): Out-of-area or uncertain payment method requiring care coordinator triage.
- **`NOT_CURRENTLY_QUALIFIED`** (Score < 50): Medicaid-only seeking waiver services (agency provides helpful redirection resources).

---

## 4. Database Schema (`Supabase PostgreSQL`)

### Tables:
1. **`services`**:
   - `id`, `name`, `slug`, `short_description`, `description`, `category`, `status`, `is_featured`, `is_private_pay`, `is_medicaid`, `is_waiver`, `image_url`, `sort_order`, `features` (JSONB), `who_is_this_for` (JSONB), `benefits` (JSONB), `seo_title`, `seo_description`, `created_at`, `updated_at`.
2. **`resources`**:
   - `id`, `title`, `slug`, `category`, `excerpt`, `content`, `image_url`, `read_time`, `status`, `author`, `published_at`, `created_at`, `updated_at`.
3. **`faqs`**:
   - `id`, `question`, `answer`, `category`, `status`, `sort_order`, `created_at`, `updated_at`.
4. **`qualification_rules`**:
   - `id`, `name`, `field`, `operator`, `value` (JSONB), `score`, `result_status`, `is_active`, `description`, `created_at`, `updated_at`.
5. **`site_settings`**:
   - `id`, `business_name`, `tagline`, `phone`, `email`, `notification_email`, `service_area_state`, `service_area_description`, `service_area_cities` (JSONB), `service_area_zips` (JSONB), `business_hours`, `primary_cta_text`, `is_live`, `address_line`, `updated_at`.
6. **`leads`**:
   - `id`, `first_name`, `last_name`, `email`, `phone`, `preferred_contact_method`, `best_time_to_contact`, `lead_intent`, `care_recipient_relationship`, `services_requested` (JSONB), `city`, `state`, `zip_code`, `service_area_status`, `payment_method`, `urgency`, `qualification_score`, `qualification_status`, `qualification_reasons` (JSONB), `is_switching_provider`, `routing_status`, `internal_notes`, `consent`, `source`, `created_at`, `updated_at`.
7. **`admin_users`**:
   - `id`, `email`, `name`, `role`, `password_hash`, `salt`, `created_at`, `last_login_at`.

---

## 5. Security Posture

1. **Row-Level Security (RLS)**: Enabled across all 7 database tables. Public access is restricted to read-only for active content and insert-only for incoming inquiries.
2. **Admin Authentication**: Passwords encrypted with **PBKDF2 SHA-512** and salt. Sessions secured with signed **HMAC SHA-256 tokens** delivered in `HTTP-only`, `SameSite=Lax` cookies.
3. **Zero PHI Storage Policy**: Forms collect only intake scheduling logistics and high-level non-medical requirements; no sensitive medical histories or diagnostic records are accepted over unauthenticated web forms.
4. **Rate Limiting & Honeypots**: In-memory sliding-window limiter prevents DDoS/brute-force attacks; hidden honeypot fields silently neutralize bot submissions.
5. **Content Security Policy**: Restricts script execution to same-origin with inline nonces, disallows third-party framing, and forces HTTPS.

---

## 6. Verification Checklist Summary

- [x] Homepage complete with switching-agency focus and trust indicators
- [x] Dynamic service pages with full SEO metadata and JSON-LD schema
- [x] Dynamic resource center with markdown rendering and structured articles
- [x] Searchable, categorized FAQ engine with schema markup
- [x] Multi-step Request Care wizard with live qualification scoring
- [x] Admin triage dashboard with status updates, notes, and filters
- [x] Supabase live database connection verified
- [x] Next.js production build (`next build`) passing with 0 errors
