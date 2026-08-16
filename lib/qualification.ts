import {
  Lead,
  QualificationRule,
  QualificationStatus,
  LeadIntent,
  PaymentMethod,
  Urgency,
} from '@/types';
import { INITIAL_QUALIFICATION_RULES, INITIAL_SITE_SETTINGS } from './data/initial-data';

export interface EvaluationInput {
  lead_intent: LeadIntent;
  care_recipient_relationship: string;
  services_requested: string[];
  city: string;
  state: string;
  zip_code: string;
  payment_method: PaymentMethod;
  urgency: Urgency;
  phone?: string;
  first_name?: string;
}

export interface QualificationResult {
  score: number;
  status: QualificationStatus;
  isSwitchingProvider: boolean;
  serviceAreaStatus: 'in_area' | 'out_of_area' | 'review';
  appliedRules: { ruleId: string; name: string; scoreAdded: number }[];
  summaryMessage: string;
}

export function evaluateServiceArea(
  city: string,
  state: string,
  zip_code: string,
  serviceAreaCities: string[] = INITIAL_SITE_SETTINGS.service_area_cities,
  serviceAreaZips: string[] = INITIAL_SITE_SETTINGS.service_area_zips
): 'in_area' | 'out_of_area' | 'review' {
  const cleanZip = zip_code.trim().substring(0, 5);
  const cleanCity = city.trim().toLowerCase();
  const cleanState = state.trim().toUpperCase();

  // If state is GA or Georgia
  const isGeorgia =
    cleanState === 'GA' ||
    cleanState === 'GEORGIA' ||
    cleanState === '' ||
    cleanState === undefined;

  if (serviceAreaZips.includes(cleanZip)) {
    return 'in_area';
  }

  const matchesCity = serviceAreaCities.some(
    (c) => c.toLowerCase() === cleanCity
  );
  if (matchesCity && isGeorgia) {
    return 'in_area';
  }

  // If it's a Georgia ZIP code (30xxx or 31xxx)
  if (cleanZip.startsWith('30') || cleanZip.startsWith('31') || isGeorgia) {
    return 'in_area';
  }

  if (cleanState !== 'GA' && cleanState !== 'GEORGIA' && cleanState !== '') {
    return 'out_of_area';
  }

  return 'review';
}

export function calculateQualificationScore(
  input: EvaluationInput,
  customRules?: QualificationRule[]
): QualificationResult {
  const rules = (customRules || INITIAL_QUALIFICATION_RULES).filter(
    (r) => r.is_active
  );
  let totalScore = 0;
  const appliedRules: { ruleId: string; name: string; scoreAdded: number }[] = [];

  const serviceAreaStatus = evaluateServiceArea(
    input.city,
    input.state,
    input.zip_code
  );

  const isSwitchingProvider =
    input.lead_intent === 'unhappy_with_current_provider';

  for (const rule of rules) {
    let matched = false;

    switch (rule.field) {
      case 'payment_method':
        if (rule.operator === 'equals' && input.payment_method === rule.value) {
          matched = true;
        }
        break;

      case 'services_requested':
        if (
          rule.operator === 'is_not_empty' &&
          input.services_requested &&
          input.services_requested.length > 0
        ) {
          matched = true;
        }
        break;

      case 'service_area_status':
        if (
          rule.operator === 'equals' &&
          serviceAreaStatus === (rule.value as string)
        ) {
          matched = true;
        }
        break;

      case 'urgency':
        if (
          rule.operator === 'in' &&
          Array.isArray(rule.value) &&
          rule.value.includes(input.urgency)
        ) {
          matched = true;
        }
        break;

      case 'lead_intent':
        if (rule.operator === 'equals' && input.lead_intent === rule.value) {
          matched = true;
        }
        break;

      case 'phone':
        if (
          rule.operator === 'is_not_empty' &&
          input.phone &&
          input.phone.trim().length >= 7
        ) {
          matched = true;
        }
        break;

      default:
        break;
    }

    if (matched) {
      totalScore += rule.score;
      appliedRules.push({
        ruleId: rule.id,
        name: rule.name,
        scoreAdded: rule.score,
      });
    }
  }

  // Determine status
  let status: QualificationStatus = 'NOT_CURRENTLY_QUALIFIED';
  let summaryMessage = '';

  if (totalScore >= 80) {
    status = 'QUALIFIED';
    summaryMessage =
      'High-priority qualified lead. Private-pay model with approved care scope in active service area.';
  } else if (totalScore >= 50) {
    status = 'NEEDS_REVIEW';
    summaryMessage =
      'Inquiry received and requires care coordinator review (e.g. payment consultation or custom location).';
  } else {
    status = 'NOT_CURRENTLY_QUALIFIED';
    summaryMessage =
      'Inquiry does not currently match active private-pay Georgia service scope.';
  }

  return {
    score: totalScore,
    status,
    isSwitchingProvider,
    serviceAreaStatus,
    appliedRules,
    summaryMessage,
  };
}
