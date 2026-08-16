import {
  Service,
  Resource,
  FAQ,
  QualificationRule,
  SiteSettings,
  Lead,
  AdminUser,
} from '@/types';
import {
  INITIAL_SERVICES,
  INITIAL_RESOURCES,
  INITIAL_FAQS,
  INITIAL_QUALIFICATION_RULES,
  INITIAL_SITE_SETTINGS,
  INITIAL_SAMPLE_LEADS,
} from './data/initial-data';
import { calculateQualificationScore, EvaluationInput } from './qualification';
import {
  dbGetLeads,
  dbInsertLead,
  dbUpdateLead,
  dbDeleteLead,
  dbGetServices,
  dbUpsertService,
  dbDeleteService,
  dbGetResources,
  dbUpsertResource,
  dbDeleteResource,
  dbGetFAQs,
  dbUpsertFAQ,
  dbDeleteFAQ,
  dbGetQualificationRules,
  dbUpsertQualificationRule,
  dbDeleteQualificationRule,
  dbGetSiteSettings,
  dbUpdateSiteSettings,
} from './supabase/db';

class DataStore {
  private services: Service[] = [...INITIAL_SERVICES];
  private resources: Resource[] = [...INITIAL_RESOURCES];
  private faqs: FAQ[] = [...INITIAL_FAQS];
  private qualificationRules: QualificationRule[] = [
    ...INITIAL_QUALIFICATION_RULES,
  ];
  private siteSettings: SiteSettings = { ...INITIAL_SITE_SETTINGS };
  private leads: Lead[] = [...INITIAL_SAMPLE_LEADS];
  private adminUsers: AdminUser[] = [
    {
      id: 'admin-1',
      email: 'admin@tomleehomecare.com',
      name: 'TomLee Administrator',
      role: 'ADMIN',
      created_at: '2026-01-01T00:00:00Z',
    },
    {
      id: 'editor-1',
      email: 'coordinator@tomleehomecare.com',
      name: 'Care Coordinator',
      role: 'EDITOR',
      created_at: '2026-01-01T00:00:00Z',
    },
  ];

  // ==========================================
  // ASYNC DATABASE SYNCHRONIZATION
  // ==========================================
  public async syncWithSupabase() {
    try {
      const [leads, services, resources, faqs, rules, settings] = await Promise.all([
        dbGetLeads(),
        dbGetServices(true),
        dbGetResources(true),
        dbGetFAQs(true),
        dbGetQualificationRules(),
        dbGetSiteSettings(),
      ]);

      if (leads && leads.length > 0) this.leads = leads;
      if (services && services.length > 0) this.services = services;
      if (resources && resources.length > 0) this.resources = resources;
      if (faqs && faqs.length > 0) this.faqs = faqs;
      if (rules && rules.length > 0) this.qualificationRules = rules;
      if (settings) this.siteSettings = settings;
    } catch (err) {
      console.warn('Sync with Supabase skipped or running fallback:', err);
    }
  }

  // ==========================================
  // SERVICES
  // ==========================================
  public getServices(includeInactive = false): Service[] {
    if (includeInactive) {
      return [...this.services].sort((a, b) => a.sort_order - b.sort_order);
    }
    return this.services
      .filter((s) => s.status === 'active')
      .sort((a, b) => a.sort_order - b.sort_order);
  }

  public async getServicesAsync(includeInactive = false): Promise<Service[]> {
    const services = await dbGetServices(includeInactive);
    if (services && services.length > 0) {
      this.services = services;
    }
    return this.getServices(includeInactive);
  }

  public getServiceBySlug(slug: string): Service | undefined {
    return this.services.find((s) => s.slug === slug);
  }

  public getServiceById(id: string): Service | undefined {
    return this.services.find((s) => s.id === id);
  }

  public saveService(serviceData: Partial<Service> & { name: string }): Service {
    const existingIndex = this.services.findIndex((s) => s.id === serviceData.id);
    const now = new Date().toISOString();

    if (existingIndex >= 0) {
      const updated: Service = {
        ...this.services[existingIndex],
        ...serviceData,
        updated_at: now,
      };
      this.services[existingIndex] = updated;
      dbUpsertService(updated).catch(console.error);
      return updated;
    } else {
      const slug =
        serviceData.slug ||
        serviceData.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

      const newService: Service = {
        id: `srv-${Date.now()}`,
        name: serviceData.name,
        slug,
        short_description: serviceData.short_description || '',
        description: serviceData.description || '',
        category: serviceData.category || 'personal_care',
        status: serviceData.status || 'draft',
        is_featured: serviceData.is_featured || false,
        is_private_pay: serviceData.is_private_pay !== undefined ? serviceData.is_private_pay : true,
        is_medicaid: serviceData.is_medicaid || false,
        is_waiver: serviceData.is_waiver || false,
        image_url:
          serviceData.image_url ||
          '/images/services/personal-care.jpg',
        sort_order: serviceData.sort_order || this.services.length + 1,
        features: serviceData.features || [],
        who_is_this_for: serviceData.who_is_this_for || [],
        benefits: serviceData.benefits || [],
        seo_title: serviceData.seo_title || `${serviceData.name} | TomLee Homecare`,
        seo_description: serviceData.seo_description || serviceData.short_description || '',
        created_at: now,
        updated_at: now,
      };
      this.services.push(newService);
      dbUpsertService(newService).catch(console.error);
      return newService;
    }
  }

  public deleteService(id: string): boolean {
    const initialLen = this.services.length;
    this.services = this.services.filter((s) => s.id !== id);
    dbDeleteService(id).catch(console.error);
    return this.services.length < initialLen;
  }

  // ==========================================
  // LEADS
  // ==========================================
  public getLeads(): Lead[] {
    return [...this.leads].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  public async getLeadsAsync(): Promise<Lead[]> {
    const leads = await dbGetLeads();
    if (leads && leads.length > 0) {
      this.leads = leads;
    }
    return this.getLeads();
  }

  public getLeadById(id: string): Lead | undefined {
    return this.leads.find((l) => l.id === id);
  }

  public createLead(rawLead: Omit<Lead, 'id' | 'created_at' | 'updated_at' | 'qualification_score' | 'qualification_status' | 'service_area_status' | 'routing_status'> & { routing_status?: Lead['routing_status'] }): Lead {
    const now = new Date().toISOString();
    const evaluationInput: EvaluationInput = {
      lead_intent: rawLead.lead_intent,
      care_recipient_relationship: rawLead.care_recipient_relationship,
      services_requested: rawLead.services_requested,
      city: rawLead.city,
      state: rawLead.state,
      zip_code: rawLead.zip_code,
      payment_method: rawLead.payment_method,
      urgency: rawLead.urgency,
      phone: rawLead.phone,
      first_name: rawLead.first_name,
    };

    const evaluation = calculateQualificationScore(
      evaluationInput,
      this.qualificationRules
    );

    const newLead: Lead = {
      ...rawLead,
      id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      service_area_status: evaluation.serviceAreaStatus,
      qualification_score: evaluation.score,
      qualification_status: evaluation.status,
      qualification_reasons: evaluation.appliedRules.map((r) => r.name),
      routing_status: rawLead.routing_status || 'new',
      created_at: now,
      updated_at: now,
    };

    this.leads.unshift(newLead);
    dbInsertLead(newLead).catch(console.error);
    return newLead;
  }

  public updateLead(id: string, updates: Partial<Lead>): Lead | undefined {
    const index = this.leads.findIndex((l) => l.id === id);
    if (index === -1) return undefined;

    const updated: Lead = {
      ...this.leads[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    this.leads[index] = updated;
    dbUpdateLead(id, updates).catch(console.error);
    return updated;
  }

  public deleteLead(id: string): boolean {
    const initialLen = this.leads.length;
    this.leads = this.leads.filter((l) => l.id !== id);
    dbDeleteLead(id).catch(console.error);
    return this.leads.length < initialLen;
  }

  // ==========================================
  // RESOURCES
  // ==========================================
  public getResources(includeDrafts = false): Resource[] {
    if (includeDrafts) {
      return [...this.resources];
    }
    return this.resources.filter((r) => r.status === 'published');
  }

  public async getResourcesAsync(includeDrafts = false): Promise<Resource[]> {
    const resources = await dbGetResources(includeDrafts);
    if (resources && resources.length > 0) {
      this.resources = resources;
    }
    return this.getResources(includeDrafts);
  }

  public getResourceBySlug(slug: string): Resource | undefined {
    return this.resources.find((r) => r.slug === slug);
  }

  public getResourceById(id: string): Resource | undefined {
    return this.resources.find((r) => r.id === id);
  }

  public saveResource(resourceData: Partial<Resource> & { title: string }): Resource {
    const existingIndex = this.resources.findIndex((r) => r.id === resourceData.id);
    const now = new Date().toISOString();

    if (existingIndex >= 0) {
      const updated: Resource = {
        ...this.resources[existingIndex],
        ...resourceData,
        updated_at: now,
      };
      this.resources[existingIndex] = updated;
      dbUpsertResource(updated).catch(console.error);
      return updated;
    } else {
      const slug =
        resourceData.slug ||
        resourceData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

      const newResource: Resource = {
        id: `res-${Date.now()}`,
        title: resourceData.title,
        slug,
        category: resourceData.category || 'Guides',
        excerpt: resourceData.excerpt || '',
        content: resourceData.content || '',
        image_url:
          resourceData.image_url ||
          '/images/services/personal-care.jpg',
        read_time: resourceData.read_time || '5 min read',
        status: resourceData.status || 'published',
        author: resourceData.author || 'TomLee Care Coordination Team',
        published_at: resourceData.published_at || new Date().toISOString().split('T')[0],
        created_at: now,
        updated_at: now,
      };
      this.resources.unshift(newResource);
      dbUpsertResource(newResource).catch(console.error);
      return newResource;
    }
  }

  public deleteResource(id: string): boolean {
    const initialLen = this.resources.length;
    this.resources = this.resources.filter((r) => r.id !== id);
    dbDeleteResource(id).catch(console.error);
    return this.resources.length < initialLen;
  }

  // ==========================================
  // FAQS
  // ==========================================
  public getFAQs(includeDrafts = false): FAQ[] {
    if (includeDrafts) {
      return [...this.faqs].sort((a, b) => a.sort_order - b.sort_order);
    }
    return this.faqs
      .filter((f) => f.status === 'published')
      .sort((a, b) => a.sort_order - b.sort_order);
  }

  public async getFAQsAsync(includeDrafts = false): Promise<FAQ[]> {
    const faqs = await dbGetFAQs(includeDrafts);
    if (faqs && faqs.length > 0) {
      this.faqs = faqs;
    }
    return this.getFAQs(includeDrafts);
  }

  public saveFAQ(faqData: Partial<FAQ> & { question: string; answer: string }): FAQ {
    const existingIndex = this.faqs.findIndex((f) => f.id === faqData.id);
    const now = new Date().toISOString();

    if (existingIndex >= 0) {
      const updated: FAQ = {
        ...this.faqs[existingIndex],
        ...faqData,
        updated_at: now,
      };
      this.faqs[existingIndex] = updated;
      dbUpsertFAQ(updated).catch(console.error);
      return updated;
    } else {
      const newFAQ: FAQ = {
        id: `faq-${Date.now()}`,
        question: faqData.question,
        answer: faqData.answer,
        category: faqData.category || 'General',
        status: faqData.status || 'published',
        sort_order: faqData.sort_order || this.faqs.length + 1,
        created_at: now,
        updated_at: now,
      };
      this.faqs.push(newFAQ);
      dbUpsertFAQ(newFAQ).catch(console.error);
      return newFAQ;
    }
  }

  public getFaqs(includeDrafts = false): FAQ[] {
    return this.getFAQs(includeDrafts);
  }

  public getFaqById(id: string): FAQ | undefined {
    return this.faqs.find((f) => f.id === id);
  }

  public saveFaq(faqData: Partial<FAQ> & { question: string; answer: string }): FAQ {
    return this.saveFAQ(faqData);
  }

  public deleteFAQ(id: string): boolean {
    const initialLen = this.faqs.length;
    this.faqs = this.faqs.filter((f) => f.id !== id);
    dbDeleteFAQ(id).catch(console.error);
    return this.faqs.length < initialLen;
  }

  public deleteFaq(id: string): boolean {
    return this.deleteFAQ(id);
  }

  // ==========================================
  // QUALIFICATION RULES
  // ==========================================
  public getQualificationRules(): QualificationRule[] {
    return [...this.qualificationRules];
  }

  public async getQualificationRulesAsync(): Promise<QualificationRule[]> {
    const rules = await dbGetQualificationRules();
    if (rules && rules.length > 0) {
      this.qualificationRules = rules;
    }
    return this.getQualificationRules();
  }

  public saveRule(ruleData: Partial<QualificationRule> & { name: string; field: string }): QualificationRule {
    const existingIndex = this.qualificationRules.findIndex((r) => r.id === ruleData.id);
    const now = new Date().toISOString();

    if (existingIndex >= 0) {
      const updated: QualificationRule = {
        ...this.qualificationRules[existingIndex],
        ...ruleData,
        updated_at: now,
      };
      this.qualificationRules[existingIndex] = updated;
      dbUpsertQualificationRule(updated).catch(console.error);
      return updated;
    } else {
      const newRule: QualificationRule = {
        id: `rule-${Date.now()}`,
        name: ruleData.name,
        field: ruleData.field,
        operator: ruleData.operator || 'equals',
        value: ruleData.value !== undefined ? ruleData.value : true,
        score: ruleData.score || 0,
        result_status: ruleData.result_status,
        is_active: ruleData.is_active !== undefined ? ruleData.is_active : true,
        description: ruleData.description || '',
        created_at: now,
        updated_at: now,
      };
      this.qualificationRules.push(newRule);
      dbUpsertQualificationRule(newRule).catch(console.error);
      return newRule;
    }
  }

  public saveQualificationRule(ruleData: Partial<QualificationRule> & { name: string; field: string }): QualificationRule {
    return this.saveRule(ruleData);
  }

  public deleteRule(id: string): boolean {
    const initialLen = this.qualificationRules.length;
    this.qualificationRules = this.qualificationRules.filter((r) => r.id !== id);
    dbDeleteQualificationRule(id).catch(console.error);
    return this.qualificationRules.length < initialLen;
  }

  public deleteQualificationRule(id: string): boolean {
    return this.deleteRule(id);
  }

  // ==========================================
  // SITE SETTINGS
  // ==========================================
  public getSiteSettings(): SiteSettings {
    return { ...this.siteSettings };
  }

  public async getSiteSettingsAsync(): Promise<SiteSettings> {
    const settings = await dbGetSiteSettings();
    if (settings) {
      this.siteSettings = settings;
    }
    return this.getSiteSettings();
  }

  public updateSiteSettings(updates: Partial<SiteSettings>): SiteSettings {
    this.siteSettings = {
      ...this.siteSettings,
      ...updates,
    };
    dbUpdateSiteSettings(this.siteSettings).catch(console.error);
    return { ...this.siteSettings };
  }

  // ==========================================
  // ADMIN USERS
  // ==========================================
  public getAdminUsers(): AdminUser[] {
    return [...this.adminUsers];
  }
}

export const store = new DataStore();
