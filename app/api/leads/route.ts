import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';
import { LeadIntent, PaymentMethod, Urgency, PreferredContactMethod } from '@/types';
import { checkRateLimit, sanitizeInput, isValidEmail, isValidPhone, formatPhoneNumber } from '@/lib/security';

export async function GET(req: NextRequest) {
  try {
    const leads = await store.getLeadsAsync();
    return NextResponse.json({ success: true, leads });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve leads' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Rate limit check based on client IP or fallback
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous';
    const rateCheck = checkRateLimit(clientIp, 12, 60000); // 12 inquiries per minute max
    
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many inquiries submitted from this connection. Please wait a moment or call us directly at (404) 999-7936.',
        },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Honeypot spam trap: Bots usually fill hidden fields
    if (body.website_url || body.honeypot || body.hp_field) {
      return NextResponse.json({
        success: true,
        message: 'Inquiry received successfully. Our care team will reach out promptly.',
      });
    }

    // Validate required fields
    if (!body.first_name || !body.last_name || !body.phone || !body.city || !body.zip_code) {
      return NextResponse.json(
        { success: false, error: 'Missing required contact or location details.' },
        { status: 400 }
      );
    }

    // Validate phone number
    const rawPhone = String(body.phone).trim();
    if (!isValidPhone(rawPhone)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid 10-digit phone number.' },
        { status: 400 }
      );
    }

    // Validate email if provided
    const rawEmail = String(body.email || '').trim();
    if (rawEmail && !isValidEmail(rawEmail)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address format.' },
        { status: 400 }
      );
    }

    // Sanitize and format data
    const leadData = {
      first_name: sanitizeInput(body.first_name, 50),
      last_name: sanitizeInput(body.last_name, 50),
      email: rawEmail ? sanitizeInput(rawEmail, 100) : '',
      phone: formatPhoneNumber(rawPhone),
      preferred_contact_method: (body.preferred_contact_method || 'phone') as PreferredContactMethod,
      best_time_to_contact: body.best_time_to_contact ? sanitizeInput(body.best_time_to_contact, 100) : undefined,
      lead_intent: (body.lead_intent || 'first_time') as LeadIntent,
      care_recipient_relationship: (body.care_recipient_relationship || 'parent') as any,
      services_requested: Array.isArray(body.services_requested)
        ? body.services_requested.map((s: string) => sanitizeInput(s, 50))
        : [],
      city: sanitizeInput(body.city, 60),
      state: sanitizeInput(body.state || 'GA', 2).toUpperCase(),
      zip_code: sanitizeInput(body.zip_code, 10),
      payment_method: (body.payment_method || 'private_pay') as PaymentMethod,
      urgency: (body.urgency || 'within_1_2_weeks') as Urgency,
      internal_notes: body.internal_notes ? sanitizeInput(body.internal_notes, 1000) : undefined,
      consent: Boolean(body.consent !== false),
      source: body.source ? sanitizeInput(body.source, 100) : 'Website Request Care Form',
    };

    const newLead = store.createLead(leadData);

    return NextResponse.json({
      success: true,
      leadId: newLead.id,
      qualificationStatus: newLead.qualification_status,
      qualificationScore: newLead.qualification_score,
      serviceAreaStatus: newLead.service_area_status,
      isSwitchingProvider: newLead.lead_intent === 'unhappy_with_current_provider',
      message: 'Inquiry received successfully. Our care team will reach out promptly.',
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'An error occurred while processing your care inquiry.' },
      { status: 500 }
    );
  }
}
