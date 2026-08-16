import { createServerClient } from './server';
import {
  Service,
  Resource,
  FAQ,
  QualificationRule,
  SiteSettings,
  Lead,
} from '@/types';
import {
  INITIAL_SERVICES,
  INITIAL_RESOURCES,
  INITIAL_FAQS,
  INITIAL_QUALIFICATION_RULES,
  INITIAL_SITE_SETTINGS,
  INITIAL_SAMPLE_LEADS,
} from '../data/initial-data';

// ==========================================
// LEADS
// ==========================================
export async function dbGetLeads(): Promise<Lead[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return INITIAL_SAMPLE_LEADS;
    }
    return data as Lead[];
  } catch (err) {
    console.error('dbGetLeads error:', err);
    return INITIAL_SAMPLE_LEADS;
  }
}

export async function dbGetLeadById(id: string): Promise<Lead | null> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return data as Lead;
  } catch (err) {
    console.error('dbGetLeadById error:', err);
    return null;
  }
}

export async function dbInsertLead(lead: Lead): Promise<Lead> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('leads')
      .insert(lead)
      .select()
      .single();

    if (error) {
      console.error('dbInsertLead error:', error);
      return lead;
    }
    return (data as Lead) || lead;
  } catch (err) {
    console.error('dbInsertLead exception:', err);
    return lead;
  }
}

export async function dbUpdateLead(id: string, updates: Partial<Lead>): Promise<Lead | null> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('leads')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('dbUpdateLead error:', error);
      return null;
    }
    return data as Lead;
  } catch (err) {
    console.error('dbUpdateLead exception:', err);
    return null;
  }
}

export async function dbDeleteLead(id: string): Promise<boolean> {
  try {
    const supabase = createServerClient();
    const { error } = await supabase.from('leads').delete().eq('id', id);
    return !error;
  } catch (err) {
    console.error('dbDeleteLead exception:', err);
    return false;
  }
}

// ==========================================
// SERVICES
// ==========================================
export async function dbGetServices(includeInactive = false): Promise<Service[]> {
  try {
    const supabase = createServerClient();
    let query = supabase.from('services').select('*').order('sort_order', { ascending: true });

    if (!includeInactive) {
      query = query.eq('status', 'active');
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return includeInactive
        ? INITIAL_SERVICES
        : INITIAL_SERVICES.filter((s) => s.status === 'active');
    }
    return data as Service[];
  } catch (err) {
    console.error('dbGetServices error:', err);
    return INITIAL_SERVICES;
  }
}

export async function dbGetServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return INITIAL_SERVICES.find((s) => s.slug === slug) || null;
    }
    return data as Service;
  } catch (err) {
    console.error('dbGetServiceBySlug error:', err);
    return INITIAL_SERVICES.find((s) => s.slug === slug) || null;
  }
}

export async function dbUpsertService(service: Service): Promise<Service> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('services')
      .upsert(service, { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      console.error('dbUpsertService error:', error);
      return service;
    }
    return (data as Service) || service;
  } catch (err) {
    console.error('dbUpsertService exception:', err);
    return service;
  }
}

export async function dbDeleteService(id: string): Promise<boolean> {
  try {
    const supabase = createServerClient();
    const { error } = await supabase.from('services').delete().eq('id', id);
    return !error;
  } catch (err) {
    console.error('dbDeleteService exception:', err);
    return false;
  }
}

// ==========================================
// RESOURCES
// ==========================================
export async function dbGetResources(includeDrafts = false): Promise<Resource[]> {
  try {
    const supabase = createServerClient();
    let query = supabase.from('resources').select('*').order('created_at', { ascending: false });

    if (!includeDrafts) {
      query = query.eq('status', 'published');
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return includeDrafts
        ? INITIAL_RESOURCES
        : INITIAL_RESOURCES.filter((r) => r.status === 'published');
    }
    return data as Resource[];
  } catch (err) {
    console.error('dbGetResources error:', err);
    return INITIAL_RESOURCES;
  }
}

export async function dbGetResourceBySlug(slug: string): Promise<Resource | null> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return INITIAL_RESOURCES.find((r) => r.slug === slug) || null;
    }
    return data as Resource;
  } catch (err) {
    console.error('dbGetResourceBySlug error:', err);
    return INITIAL_RESOURCES.find((r) => r.slug === slug) || null;
  }
}

export async function dbUpsertResource(resource: Resource): Promise<Resource> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('resources')
      .upsert(resource, { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      console.error('dbUpsertResource error:', error);
      return resource;
    }
    return (data as Resource) || resource;
  } catch (err) {
    console.error('dbUpsertResource exception:', err);
    return resource;
  }
}

export async function dbDeleteResource(id: string): Promise<boolean> {
  try {
    const supabase = createServerClient();
    const { error } = await supabase.from('resources').delete().eq('id', id);
    return !error;
  } catch (err) {
    console.error('dbDeleteResource exception:', err);
    return false;
  }
}

// ==========================================
// FAQS
// ==========================================
export async function dbGetFAQs(includeDrafts = false): Promise<FAQ[]> {
  try {
    const supabase = createServerClient();
    let query = supabase.from('faqs').select('*').order('sort_order', { ascending: true });

    if (!includeDrafts) {
      query = query.eq('status', 'published');
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return includeDrafts ? INITIAL_FAQS : INITIAL_FAQS.filter((f) => f.status === 'published');
    }
    return data as FAQ[];
  } catch (err) {
    console.error('dbGetFAQs error:', err);
    return INITIAL_FAQS;
  }
}

export async function dbUpsertFAQ(faq: FAQ): Promise<FAQ> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('faqs')
      .upsert(faq, { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      console.error('dbUpsertFAQ error:', error);
      return faq;
    }
    return (data as FAQ) || faq;
  } catch (err) {
    console.error('dbUpsertFAQ exception:', err);
    return faq;
  }
}

export async function dbDeleteFAQ(id: string): Promise<boolean> {
  try {
    const supabase = createServerClient();
    const { error } = await supabase.from('faqs').delete().eq('id', id);
    return !error;
  } catch (err) {
    console.error('dbDeleteFAQ exception:', err);
    return false;
  }
}

// ==========================================
// QUALIFICATION RULES
// ==========================================
export async function dbGetQualificationRules(): Promise<QualificationRule[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase.from('qualification_rules').select('*');

    if (error || !data || data.length === 0) {
      return INITIAL_QUALIFICATION_RULES;
    }
    return data as QualificationRule[];
  } catch (err) {
    console.error('dbGetQualificationRules error:', err);
    return INITIAL_QUALIFICATION_RULES;
  }
}

export async function dbUpsertQualificationRule(rule: QualificationRule): Promise<QualificationRule> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('qualification_rules')
      .upsert(rule, { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      console.error('dbUpsertQualificationRule error:', error);
      return rule;
    }
    return (data as QualificationRule) || rule;
  } catch (err) {
    console.error('dbUpsertQualificationRule exception:', err);
    return rule;
  }
}

export async function dbDeleteQualificationRule(id: string): Promise<boolean> {
  try {
    const supabase = createServerClient();
    const { error } = await supabase.from('qualification_rules').delete().eq('id', id);
    return !error;
  } catch (err) {
    console.error('dbDeleteQualificationRule exception:', err);
    return false;
  }
}

// ==========================================
// SITE SETTINGS
// ==========================================
export async function dbGetSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 'default')
      .single();

    if (error || !data) {
      return INITIAL_SITE_SETTINGS;
    }
    return data as SiteSettings;
  } catch (err) {
    console.error('dbGetSiteSettings error:', err);
    return INITIAL_SITE_SETTINGS;
  }
}

export async function dbUpdateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('site_settings')
      .upsert({ id: 'default', ...settings, updated_at: new Date().toISOString() }, { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      console.error('dbUpdateSiteSettings error:', error);
      return { ...INITIAL_SITE_SETTINGS, ...settings };
    }
    return data as SiteSettings;
  } catch (err) {
    console.error('dbUpdateSiteSettings exception:', err);
    return { ...INITIAL_SITE_SETTINGS, ...settings };
  }
}
