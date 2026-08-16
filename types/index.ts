export type LeadIntent =
  | 'first_time'
  | 'unhappy_with_current_provider'
  | 'additional_care'
  | 'comparing_providers'
  | 'temporary_respite'
  | 'general_information'
  | 'other';

export type CareRecipientRelationship =
  | 'parent'
  | 'myself'
  | 'spouse_partner'
  | 'grandparent'
  | 'other_family_member'
  | 'client_friend'
  | 'other';

export type PaymentMethod =
  | 'private_pay'
  | 'medicaid'
  | 'waiver'
  | 'not_sure'
  | 'other';

export type Urgency =
  | 'immediately'
  | 'within_a_few_days'
  | 'within_1_2_weeks'
  | 'within_a_month'
  | 'planning_ahead'
  | 'not_sure';

export type PreferredContactMethod = 'phone' | 'email' | 'text';

export type QualificationStatus =
  | 'QUALIFIED'
  | 'NEEDS_REVIEW'
  | 'NOT_CURRENTLY_QUALIFIED';

export type RoutingStatus =
  | 'new'
  | 'contacted'
  | 'assessment_scheduled'
  | 'assessment_completed'
  | 'care_started'
  | 'archived';

export interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  preferred_contact_method: PreferredContactMethod;
  best_time_to_contact?: string;
  lead_intent: LeadIntent;
  care_recipient_relationship: CareRecipientRelationship;
  services_requested: string[];
  city: string;
  state: string;
  zip_code: string;
  service_area_status: 'in_area' | 'out_of_area' | 'review';
  payment_method: PaymentMethod;
  urgency: Urgency;
  qualification_score: number;
  qualification_status: QualificationStatus;
  qualification_reasons?: string[];
  is_switching_provider?: boolean;
  routing_status: RoutingStatus;
  internal_notes?: string;
  consent: boolean;
  source?: string;
  created_at: string;
  updated_at: string;
}

export type ServiceStatus = 'active' | 'draft' | 'future' | 'archived';
export type ServiceCategory =
  | 'personal_care'
  | 'companion_care'
  | 'specialized_care'
  | 'support_services';

export interface Service {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  category: ServiceCategory;
  status: ServiceStatus;
  is_featured: boolean;
  is_private_pay: boolean;
  is_medicaid: boolean;
  is_waiver: boolean;
  image_url: string;
  sort_order: number;
  features: string[];
  who_is_this_for: string[];
  benefits: string[];
  seo_title: string;
  seo_description: string;
  created_at: string;
  updated_at: string;
}

export type ResourceCategory =
  | 'Home Care'
  | 'Family Resources'
  | 'Caregiving'
  | 'Caregiving Guides'
  | 'Private Pay'
  | 'Private Pay & Costs'
  | 'Guides'
  | 'Switching Agencies'
  | 'Memory Care'
  | 'Dementia Care'
  | 'Senior Safety'
  | 'Care Planning';

export type ResourceStatus = 'published' | 'draft' | 'archived';

export interface Resource {
  id: string;
  title: string;
  slug: string;
  category: ResourceCategory;
  excerpt: string;
  content: string;
  image_url: string;
  read_time: string;
  status: ResourceStatus;
  author: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export type FAQCategory =
  | 'General'
  | 'Services'
  | 'Private Pay & Costs'
  | 'Caregivers'
  | 'Caregivers & Vetting'
  | 'Switching Agencies'
  | 'Getting Started'
  | 'Family Communication';

export type FAQStatus = 'published' | 'draft' | 'archived';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  status: FAQStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface QualificationRule {
  id: string;
  name: string;
  field: string;
  operator: 'equals' | 'contains' | 'in' | 'greater_than' | 'is_true' | 'is_not_empty';
  value: string | number | boolean | string[];
  score: number;
  result_status?: QualificationStatus;
  is_active: boolean;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  business_name: string;
  tagline: string;
  phone: string;
  email: string;
  notification_email: string;
  service_area_state: string;
  service_area_description: string;
  service_area_cities: string[];
  service_area_zips: string[];
  business_hours: string;
  primary_cta_text: string;
  is_live: boolean;
  address_line?: string;
}

export type UserRole = 'ADMIN' | 'EDITOR';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  created_at: string;
}
