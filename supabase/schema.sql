-- =============================================================================
-- TOMLEE HOMECARE LLC — SUPABASE POSTGRESQL SCHEMA & INITIAL DATA SEED
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- 1. SERVICES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_description TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_private_pay BOOLEAN NOT NULL DEFAULT true,
    is_medicaid BOOLEAN NOT NULL DEFAULT false,
    is_waiver BOOLEAN NOT NULL DEFAULT false,
    image_url TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    who_is_this_for JSONB NOT NULL DEFAULT '[]'::jsonb,
    benefits JSONB NOT NULL DEFAULT '[]'::jsonb,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- 2. RESOURCES (BLOG / GUIDES) TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.resources (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT NOT NULL,
    read_time TEXT NOT NULL DEFAULT '5 min read',
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'draft')),
    author TEXT NOT NULL DEFAULT 'TomLee Care Team',
    published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- 3. FAQS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.faqs (
    id TEXT PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'draft')),
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- 4. LEADS (INTAKE & TRIAGE) TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.leads (
    id TEXT PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    preferred_contact_method TEXT NOT NULL DEFAULT 'phone',
    best_time_to_contact TEXT NOT NULL DEFAULT 'morning',
    relationship_to_recipient TEXT NOT NULL,
    recipient_name TEXT NOT NULL,
    recipient_age INTEGER,
    recipient_location_city TEXT,
    recipient_location_state TEXT NOT NULL DEFAULT 'GA',
    recipient_zip_code TEXT NOT NULL,
    services_requested JSONB NOT NULL DEFAULT '[]'::jsonb,
    current_living_situation TEXT,
    primary_diagnoses JSONB NOT NULL DEFAULT '[]'::jsonb,
    desired_schedule_type TEXT,
    desired_hours_per_week INTEGER,
    desired_start_date TEXT,
    urgency_level TEXT NOT NULL DEFAULT 'within_week',
    payment_method TEXT NOT NULL DEFAULT 'private_pay',
    budget_range TEXT,
    is_switching_provider BOOLEAN NOT NULL DEFAULT false,
    current_provider_name TEXT,
    reason_for_switching TEXT,
    special_care_requirements TEXT,
    additional_notes TEXT,
    qualification_score INTEGER NOT NULL DEFAULT 0,
    qualification_tier TEXT NOT NULL DEFAULT 'REVIEW',
    qualification_flags JSONB NOT NULL DEFAULT '[]'::jsonb,
    estimated_monthly_value NUMERIC(10, 2) DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'NEW' CHECK (status IN ('NEW', 'CONTACTED', 'ASSESSMENT_SCHEDULED', 'ASSESSMENT_COMPLETED', 'PROPOSAL_SENT', 'CONVERTED', 'CLOSED_LOST')),
    assigned_to TEXT,
    source TEXT NOT NULL DEFAULT 'web_wizard',
    ip_address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    contacted_at TIMESTAMPTZ,
    converted_at TIMESTAMPTZ
);

-- =============================================================================
-- 5. QUALIFICATION RULES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.qualification_rules (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    condition_field TEXT NOT NULL,
    operator TEXT NOT NULL,
    condition_value TEXT NOT NULL,
    score_impact INTEGER NOT NULL,
    is_hard_disqualifier BOOLEAN NOT NULL DEFAULT false,
    priority INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- 6. SYSTEM SETTINGS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.system_settings (
    id TEXT PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    category TEXT NOT NULL DEFAULT 'general',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- INDEXES FOR FAST QUERYING
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_services_status ON public.services(status);
CREATE INDEX IF NOT EXISTS idx_resources_slug ON public.resources(slug);
CREATE INDEX IF NOT EXISTS idx_resources_status ON public.resources(status);
CREATE INDEX IF NOT EXISTS idx_faqs_category ON public.faqs(category);
CREATE INDEX IF NOT EXISTS idx_faqs_status ON public.faqs(status);
CREATE INDEX IF NOT EXISTS idx_leads_tier ON public.leads(qualification_tier);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qualification_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Public Read Policies for Website
CREATE POLICY "Public read active services" ON public.services FOR SELECT USING (status = 'active');
CREATE POLICY "Public read published resources" ON public.resources FOR SELECT USING (status = 'published');
CREATE POLICY "Public read published faqs" ON public.faqs FOR SELECT USING (status = 'published');
CREATE POLICY "Public insert leads" ON public.leads FOR INSERT WITH CHECK (true);

-- Admin Full Access Policies (Service Role / Authenticated)
CREATE POLICY "Admin full access services" ON public.services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access resources" ON public.resources FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access faqs" ON public.faqs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access leads" ON public.leads FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access rules" ON public.qualification_rules FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access settings" ON public.system_settings FOR ALL USING (true) WITH CHECK (true);

-- =============================================================================
-- INITIAL SEED DATA: QUALIFICATION RULES
-- =============================================================================
INSERT INTO public.qualification_rules (id, name, description, category, condition_field, operator, condition_value, score_impact, is_hard_disqualifier, priority, is_active)
VALUES
('rule-state-ga', 'Location: Georgia Service Area', 'Lead is located within Georgia coverage area.', 'location', 'recipient_location_state', 'equals', 'GA', 25, false, 100, true),
('rule-state-not-ga', 'Location: Outside Georgia', 'Out-of-state service requests outside active Georgia license.', 'location', 'recipient_location_state', 'not_equals', 'GA', -100, true, 100, true),
('rule-payment-private-pay', 'Payment Method: Private Pay Coming Soon', 'Inquiry aligned with private-pay care rollout & LTCI reimbursement.', 'payment', 'payment_method', 'equals', 'private_pay', 25, false, 90, true),
('rule-urgency-immediate', 'Timeline: Immediate Start (24-48h)', 'Immediate care need following discharge or agency switch.', 'timeline', 'urgency_level', 'equals', 'immediate', 20, false, 80, true),
('rule-urgency-week', 'Timeline: Within 1-2 Weeks', 'Near-term planned care start.', 'timeline', 'urgency_level', 'equals', 'within_week', 15, false, 80, true),
('rule-switching-agency', 'Switching: Unreliable Agency Switch', 'Transitioning from another provider due to missed shifts or call-outs.', 'intent', 'is_switching_provider', 'equals', 'true', 20, false, 85, true),
('rule-schedule-high-hours', 'Schedule: 20+ Hours / Week', 'Substantial weekly care engagement.', 'schedule', 'desired_hours_per_week', 'greater_than_or_equal', '20', 15, false, 75, true)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    score_impact = EXCLUDED.score_impact,
    updated_at = NOW();

-- =============================================================================
-- INITIAL SEED DATA: SYSTEM SETTINGS
-- =============================================================================
INSERT INTO public.system_settings (id, key, value, description, category)
VALUES
('set-1', 'lead_qualification', '{"qualified_threshold": 80, "review_threshold": 60, "immediate_notification": true, "auto_assign_leads": true}'::jsonb, 'Lead qualification thresholds and alert parameters', 'qualification'),
('set-2', 'company_profile', '{"name": "TomLee Homecare LLC", "phone": "(404) 999-7936", "email": "info@tomleehomecare.com", "address": "Lawrenceville, GA 30044", "license": "Georgia Licensed Non-Medical Personal Care Home Care Provider"}'::jsonb, 'Company contact and licensing information', 'general'),
('set-3', 'service_rates', '{"hourly_rate_min": 28, "hourly_rate_max": 36, "shift_minimum_hours": 4, "weekend_differential": 2, "overnight_flat_rate": 280}'::jsonb, 'Standard service rate card and shift minimums', 'billing')
ON CONFLICT (id) DO UPDATE SET
    value = EXCLUDED.value,
    updated_at = NOW();
