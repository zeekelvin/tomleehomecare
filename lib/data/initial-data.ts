import {
  Service,
  Resource,
  FAQ,
  QualificationRule,
  SiteSettings,
  Lead,
} from '@/types';

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'srv-personal-care',
    name: 'Personal Care Assistance',
    slug: 'personal-care',
    short_description:
      'Dignified, hands-on assistance with daily living activities including bathing, grooming, dressing, and hygiene.',
    description:
      'Our dedicated caregivers provide respectful, compassionate support for essential daily personal routines. We prioritize individual dignity and comfort, empowering older adults to feel fresh, confident, and safe in their own homes.',
    category: 'personal_care',
    status: 'active',
    is_featured: true,
    is_private_pay: true,
    is_medicaid: false,
    is_waiver: false,
    image_url: '/images/services/personal-care.jpg',
    sort_order: 1,
    features: [
      'Bathing and shower safety assistance',
      'Grooming, oral care, and hair care',
      'Dressing and wardrobe selection',
      'Personal hygiene and skincare maintenance',
      'Morning wake-up and evening bedtime assistance',
    ],
    who_is_this_for: [
      'Seniors recovering from surgery or hospitalization',
      'Individuals with reduced mobility or joint stiffness',
      'Older adults wanting to maintain independence safely at home',
    ],
    benefits: [
      'Maintains personal dignity and self-esteem',
      'Reduces bathroom slip and fall hazards',
      'Relieves stress for family caregivers',
    ],
    seo_title: 'Personal Care Assistance | TomLee Homecare Georgia',
    seo_description:
      'Compassionate and dignified personal care assistance for Georgia seniors. Bathing, dressing, grooming, and hygiene support.',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'srv-companion-care',
    name: 'Companion Care & Social Engagement',
    slug: 'companion-care',
    short_description:
      'Meaningful companionship, engaging conversation, cognitive stimulation, and accompaniment for daily routines.',
    description:
      'Loneliness and social isolation significantly impact health and emotional well-being. TomLee companion caregivers foster genuine human connection through stimulating conversations, recreational hobbies, light walks, and uplifting daily companionship.',
    category: 'companion_care',
    status: 'active',
    is_featured: true,
    is_private_pay: true,
    is_medicaid: false,
    is_waiver: false,
    image_url: '/images/services/companion-care.jpg',
    sort_order: 2,
    features: [
      'Friendly conversation and active listening',
      'Playing cards, puzzles, and engaging in hobbies',
      'Accompaniment on neighborhood walks and light exercise',
      'Assistance with mail organization and correspondence',
      'Social interaction and emotional support',
    ],
    who_is_this_for: [
      'Seniors living alone seeking meaningful companionship',
      'Older adults experiencing social isolation',
      'Individuals who enjoy shared hobbies and structured routines',
    ],
    benefits: [
      'Combats depression and feelings of loneliness',
      'Keeps the mind active and socially connected',
      'Provides reassuring peace of mind for distant families',
    ],
    seo_title: 'Companion Care & Social Engagement | TomLee Homecare',
    seo_description:
      'Trusted companion care services in Georgia. Compassionate socialization, daily engagement, and companionship for seniors.',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'srv-meal-preparation',
    name: 'Nutritious Meal Preparation',
    slug: 'meal-preparation',
    short_description:
      'Customized meal planning, delicious home cooking adhering to dietary guidelines, and kitchen cleanup.',
    description:
      'Proper nutrition is critical for senior vitality and health management. Our caregivers prepare fresh, appetizing meals tailored to personal taste preferences, physician-recommended diets (e.g., low-sodium, diabetic-friendly), and ensure the kitchen is kept spotless.',
    category: 'support_services',
    status: 'active',
    is_featured: true,
    is_private_pay: true,
    is_medicaid: false,
    is_waiver: false,
    image_url: '/images/services/meal-prep.jpg',
    sort_order: 3,
    features: [
      'Weekly grocery planning and pantry organization',
      'Fresh, home-cooked breakfast, lunch, and dinner',
      'Specialized dietary compliance (low sodium, diabetic, soft foods)',
      'Hydration monitoring and gentle reminders',
      'Post-meal kitchen cleaning and dishwashing',
    ],
    who_is_this_for: [
      'Seniors who find cooking tiring or physically difficult',
      'Individuals needing encouragement to maintain consistent nutrition',
      'Those managing dietary restrictions or chronic conditions',
    ],
    benefits: [
      'Ensures consistent, well-balanced daily nutrition',
      'Reduces kitchen stove and burn hazards',
      'Enjoys home-cooked flavors without physical strain',
    ],
    seo_title: 'Senior Meal Preparation Services | TomLee Homecare',
    seo_description:
      'Healthy, customized meal preparation for older adults in Georgia. Diet-specific cooking, hydration monitoring, and kitchen support.',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'srv-light-housekeeping',
    name: 'Light Housekeeping & Organization',
    slug: 'light-housekeeping',
    short_description:
      'Maintaining a clean, clutter-free, and hygienic living space to minimize fall hazards and promote wellbeing.',
    description:
      'A tidy home environment fosters comfort and prevents accidental slips or falls. Our caregivers assist with routine household upkeep, keeping high-traffic areas orderly, managing laundry, and maintaining clean living spaces.',
    category: 'support_services',
    status: 'active',
    is_featured: false,
    is_private_pay: true,
    is_medicaid: false,
    is_waiver: false,
    image_url: '/images/services/live-in-care.jpg',
    sort_order: 4,
    features: [
      'Dusting and surface sanitization',
      'Sweeping, mopping, and vacuuming walkways',
      'Bed making and linen changes',
      'Personal laundry and folding assistance',
      'Trash removal and walkway decluttering',
    ],
    who_is_this_for: [
      'Seniors unable to perform heavy bending or lifting',
      'Households needing assistance with everyday tidying',
      'Individuals prone to tripping over floor clutter',
    ],
    benefits: [
      'Reduces tripping and fall hazards in the home',
      'Maintains sanitary and healthy living conditions',
      'Eliminates the physical fatigue of household chores',
    ],
    seo_title: 'Light Housekeeping Services for Seniors | TomLee Homecare',
    seo_description:
      'Professional light housekeeping and home organization for Georgia seniors. Clean, safe, and comfortable living spaces.',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'srv-medication-reminders',
    name: 'Medication Reminders & Routine Support',
    slug: 'medication-reminders',
    short_description:
      'Reliable verbal prompts and timing reminders ensuring essential medications are taken on schedule.',
    description:
      'Keeping track of complex medication schedules can be challenging. TomLee caregivers provide punctual verbal reminders and routine checks to ensure your loved one takes their prescribed dosages at the right time. (Non-medical reminder support only; does not include medication administration).',
    category: 'support_services',
    status: 'active',
    is_featured: true,
    is_private_pay: true,
    is_medicaid: false,
    is_waiver: false,
    image_url: '/images/services/respite-care.jpg',
    sort_order: 5,
    features: [
      'Verbal reminders according to prescription schedule',
      'Hydration prompts with medication intake',
      'Logging medication compliance in daily care notes',
      'Notifying family if refills or schedule adjustments are noted',
    ],
    who_is_this_for: [
      'Seniors with multiple daily prescription schedules',
      'Individuals prone to forgetting morning or evening doses',
      'Families desiring reassurance that schedules are observed',
    ],
    benefits: [
      'Helps maintain adherence to doctor-prescribed regimens',
      'Prevents missed doses or accidental double-dosing',
      'Provides daily documentation for family transparency',
    ],
    seo_title: 'Medication Reminder Support | TomLee Homecare',
    seo_description:
      'Dependable non-medical medication reminder services in Georgia. Timely prompts and daily routine tracking.',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'srv-mobility-transfers',
    name: 'Mobility & Transfer Assistance',
    slug: 'mobility-transfers',
    short_description:
      'Safe transfer techniques, steady walking support, and mobility assistance to prevent slips and falls.',
    description:
      'Safe movement around the home is fundamental to preserving independence. Our caregivers are trained in safe body mechanics and transfer techniques, assisting clients moving between bed, wheelchair, favorite chair, and bathroom safely.',
    category: 'personal_care',
    status: 'active',
    is_featured: false,
    is_private_pay: true,
    is_medicaid: false,
    is_waiver: false,
    image_url: '/images/services/recovery-care.jpg',
    sort_order: 6,
    features: [
      'Bed-to-chair and chair-to-wheelchair transfers',
      'Steady hands-on walking assistance and gait belt support',
      'Assistance entering and exiting vehicles',
      'Encouraging gentle range-of-motion routines',
      'Active identification of walkway trip hazards',
    ],
    who_is_this_for: [
      'Individuals with unsteady balance or Parkinsonism',
      'Seniors recovering from hip, knee, or joint surgery',
      'Clients using walkers, canes, or wheelchairs',
    ],
    benefits: [
      'Significantly lowers the risk of dangerous falls',
      'Builds confidence during movement around the house',
      'Protects family caregivers from physical back strain',
    ],
    seo_title: 'Senior Mobility & Transfer Support | TomLee Homecare',
    seo_description:
      'Expert mobility and safe transfer assistance for seniors across Georgia. Safe movement, transfer support, and fall prevention.',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'srv-toileting-incontinence',
    name: 'Toileting & Incontinence Care',
    slug: 'toileting-incontinence-care',
    short_description:
      'Compassionate, sensitive, and discreet personal hygiene care preserving maximum dignity.',
    description:
      'Incontinence care requires immense patience, gentleness, and discretion. Our caregivers handle toileting needs and brief changes with the utmost respect and sanitation, protecting skin integrity and prioritizing client comfort.',
    category: 'personal_care',
    status: 'active',
    is_featured: false,
    is_private_pay: true,
    is_medicaid: false,
    is_waiver: false,
    image_url: '/images/services/memory-care.jpg',
    sort_order: 7,
    features: [
      'Assistance getting to and from the restroom safely',
      'Scheduled bathroom visits to prevent accidents',
      'Discreet brief, pad, and garment changing',
      'Skin cleansing and barrier cream application',
      'Sanitary disposal and clean linen replacement',
    ],
    who_is_this_for: [
      'Seniors experiencing urinary or bowel incontinence',
      'Individuals needing assistance with clothing readjustment',
      'Clients requiring gentle perineal skincare maintenance',
    ],
    benefits: [
      'Preserves dignity and emotional comfort',
      'Prevents skin breakdown and urinary tract issues',
      'Eliminates embarrassment and anxiety for seniors',
    ],
    seo_title: 'Toileting & Incontinence Care | TomLee Homecare',
    seo_description:
      'Discreet, compassionate toileting and incontinence assistance for seniors in Georgia with dignity-first care.',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'srv-dementia-support',
    name: "Dementia & Alzheimer's Care",
    slug: 'dementia-alzheimers-support',
    short_description:
      'Specialized non-medical memory care, calming redirection techniques, and structured daily routines.',
    description:
      'Navigating memory loss requires specialized empathy and consistent routines. Our caregivers provide a calm, reassuring environment, using gentle communication and redirection to reduce anxiety, wandering, and agitation in familiar home surroundings.',
    category: 'specialized_care',
    status: 'active',
    is_featured: true,
    is_private_pay: true,
    is_medicaid: false,
    is_waiver: false,
    image_url: '/images/services/medication-reminders.jpg',
    sort_order: 8,
    features: [
      'Consistent daily schedule to minimize confusion',
      'Gentle redirection and memory cueing',
      'Engagement in soothing familiar music, photo albums, and crafts',
      'Supervision to prevent wandering and disorientation',
      'Patience-centered communication during sundowning hours',
    ],
    who_is_this_for: [
      'Individuals with early to mid-stage Alzheimer’s or dementia',
      'Seniors experiencing memory decline or disorientation',
      'Family members needing guidance and respite from 24/7 supervision',
    ],
    benefits: [
      'Allows seniors to remain in their cherished home environment',
      'Reduces agitation and emotional distress',
      'Provides experienced guidance for exhausted family caregivers',
    ],
    seo_title: 'Dementia & Memory Care Support | TomLee Homecare',
    seo_description:
      'Compassionate in-home dementia and memory care support across Georgia. Patient, structured routines tailored to cognitive needs.',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'srv-respite-care',
    name: 'Respite Care for Family Caregivers',
    slug: 'respite-care',
    short_description:
      'Short-term, flexible care giving primary family caregivers the time to recharge, work, or travel.',
    description:
      'Caring for an aging parent or spouse is an act of deep love, but family caregiver burnout is real. TomLee respite care steps in seamlessly for a few hours, days, or weekends so you can rest, handle personal matters, and return refreshed.',
    category: 'specialized_care',
    status: 'active',
    is_featured: true,
    is_private_pay: true,
    is_medicaid: false,
    is_waiver: false,
    image_url: '/images/services/hospital-transition.jpg',
    sort_order: 9,
    features: [
      'Flexible scheduling: half-day, full-day, or multi-day coverage',
      'Seamless continuation of existing family care routines',
      'Comprehensive personal care and companionship during your absence',
      'Detailed care updates and notes after each shift',
    ],
    who_is_this_for: [
      'Family members juggling work and caregiving responsibilities',
      'Caregivers planning vacations, medical appointments, or personal time',
      'Families experiencing fatigue or physical strain from caregiving',
    ],
    benefits: [
      'Prevents family caregiver burnout and exhaustion',
      'Maintains steady, uninterrupted care for your loved one',
      'Offers flexible booking without long-term binding contracts',
    ],
    seo_title: 'Respite Care for Family Caregivers | TomLee Homecare',
    seo_description:
      'Flexible in-home respite care for Georgia families. Reliable relief for family caregivers with seamless care continuity.',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'srv-overnight-weekend',
    name: 'Overnight & Weekend Care',
    slug: 'overnight-weekend-care',
    short_description:
      'Dedicated attentive support during evening hours, overnight monitoring, and full weekend assistance.',
    description:
      'Care needs don’t stop at 5 PM. Our overnight and weekend care offers attentive supervision through the night, assisting with late-night bathroom trips, managing sleep disruption, and providing full weekend availability.',
    category: 'specialized_care',
    status: 'active',
    is_featured: false,
    is_private_pay: true,
    is_medicaid: false,
    is_waiver: false,
    image_url: '/images/services/overnight-care.jpg',
    sort_order: 10,
    features: [
      'Bedtime preparation and settling in for sleep',
      'Attentive overnight monitoring for nighttime waking',
      'Safe transfer assistance for nighttime restroom trips',
      'Morning routine, medication reminders, and breakfast preparation',
      'Full Saturday and Sunday scheduling flexibility',
    ],
    who_is_this_for: [
      'Seniors with sleep disruptions or sundowning tendencies',
      'Individuals at risk of falling during nighttime bathroom visits',
      'Families needing overnight rest and weekend support',
    ],
    benefits: [
      'Ensures continuous safety and immediate nighttime response',
      'Allows family members to sleep peacefully through the night',
      'Provides seamless weekend coverage without disruption',
    ],
    seo_title: 'Overnight & Weekend Home Care | TomLee Homecare',
    seo_description:
      'Dependable overnight and weekend care in Georgia. Nighttime monitoring, bedtime routines, and weekend assistance.',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  // Future Waiver/Medicaid Services (Hidden on public, configurable in Admin)
  {
    id: 'srv-medicaid-ccsp',
    name: 'Georgia CCSP Waiver Program Support',
    slug: 'georgia-ccsp-waiver',
    short_description:
      'Future offering: Community Care Services Program (CCSP) support for qualified Medicaid-eligible Georgia seniors.',
    description:
      'Future service capability: The Community Care Services Program (CCSP) helps eligible Georgia residents receive in-home personal support services as an alternative to nursing facility placement. Currently in architected future status.',
    category: 'specialized_care',
    status: 'future',
    is_featured: false,
    is_private_pay: false,
    is_medicaid: true,
    is_waiver: true,
    image_url: '/images/services/personal-care.jpg',
    sort_order: 11,
    features: [
      'Personal support services (PSS)',
      'In-home respite care',
      'Emergency response support coordination',
    ],
    who_is_this_for: [
      'Medicaid-eligible individuals seeking community-based waiver care',
    ],
    benefits: [
      'Provides subsidized community home care for qualifying seniors',
    ],
    seo_title: 'CCSP Waiver Home Care Support | TomLee Homecare',
    seo_description: 'Future Georgia CCSP Medicaid waiver care support.',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'srv-medicaid-source',
    name: 'Georgia SOURCE Waiver Program Support',
    slug: 'georgia-source-waiver',
    short_description:
      'Future offering: Service Options Using Resources in a Community Environment (SOURCE) waiver integration.',
    description:
      'Future service capability: SOURCE integrates primary medical care and in-home personal support for eligible frail elderly and disabled Georgians.',
    category: 'specialized_care',
    status: 'future',
    is_featured: false,
    is_private_pay: false,
    is_medicaid: true,
    is_waiver: true,
    image_url: '/images/services/companion-care.jpg',
    sort_order: 12,
    features: [
      'Comprehensive in-home personal care',
      'Case management collaboration',
      'Alternative living support',
    ],
    who_is_this_for: [
      'Eligible Georgia residents requiring coordinated community support',
    ],
    benefits: [
      'Comprehensive home support under the Georgia SOURCE framework',
    ],
    seo_title: 'SOURCE Waiver Program Support | TomLee Homecare',
    seo_description: 'Future Georgia SOURCE Medicaid waiver care support.',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
];

export const INITIAL_QUALIFICATION_RULES: QualificationRule[] = [
  {
    id: 'rule-payment-private-pay',
    name: 'Payment Method: Private Pay',
    field: 'payment_method',
    operator: 'equals',
    value: 'private_pay',
    score: 50,
    is_active: true,
    description: 'Current business model focuses on private-pay home care.',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'rule-service-requested',
    name: 'Active Service Requested',
    field: 'services_requested',
    operator: 'is_not_empty',
    value: true,
    score: 30,
    is_active: true,
    description: 'Client selected at least one active in-home service category.',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'rule-service-area-ga',
    name: 'Georgia Service Area Match',
    field: 'service_area_status',
    operator: 'equals',
    value: 'in_area',
    score: 20,
    is_active: true,
    description: 'ZIP code or city confirmed within primary Georgia service area.',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'rule-urgency-high',
    name: 'Immediate or High Urgency Need',
    field: 'urgency',
    operator: 'in',
    value: ['immediately', 'within_a_few_days', 'within_1_2_weeks'],
    score: 10,
    is_active: true,
    description: 'Care is required urgently or within the next 2 weeks.',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'rule-switching-agency',
    name: 'High-Intent Switching Provider Lead',
    field: 'lead_intent',
    operator: 'equals',
    value: 'unhappy_with_current_provider',
    score: 15,
    is_active: true,
    description:
      'Prospective client actively dissatisfied with current agency seeking better reliability.',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'rule-contact-complete',
    name: 'Complete Contact Details Provided',
    field: 'phone',
    operator: 'is_not_empty',
    value: true,
    score: 10,
    is_active: true,
    description: 'Valid phone number and name submitted for follow-up.',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
];

export const INITIAL_FAQS: FAQ[] = [
  {
    id: 'faq-1',
    question: 'What is private-pay home care, and when will services and insurance be available?',
    answer:
      'Private-pay home care means services are arranged directly and paid out-of-pocket by the client or their family, or reimbursed through Long-Term Care Insurance (LTCI). We are actively working on onboarding with insurance providers while preparing our upcoming private-pay service rollout in Georgia.',
    category: 'Private Pay & Costs',
    status: 'published',
    sort_order: 1,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'faq-2',
    question: 'How quickly can home care services begin for my loved one?',
    answer:
      'In many situations, care can begin within 24 to 48 hours following your initial phone consultation and in-home care assessment. We understand urgent needs arise quickly, especially after hospital discharges or unexpected caregiver absences.',
    category: 'Getting Started',
    status: 'published',
    sort_order: 2,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'faq-3',
    question: 'I am unhappy with my current home care agency. How easy is it to switch to TomLee?',
    answer:
      'Switching to TomLee is seamless. Many families contact us because of frequent caregiver tardiness, unannounced cancellations, or poor agency communication. We conduct a personalized transition assessment, match you with dependable caregivers, and coordinate the start date so there is zero gap in your loved one’s care.',
    category: 'Switching Agencies',
    status: 'published',
    sort_order: 3,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'faq-4',
    question: 'What happens if our assigned caregiver gets sick or has an emergency?',
    answer:
      'Reliability is our hallmark. We maintain backup caregiver protocols so that if your primary caregiver is ever unavailable, an oriented backup caregiver steps in. You receive proactive notification, ensuring your family never experiences an unexpected no-show.',
    category: 'Caregivers',
    status: 'published',
    sort_order: 4,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'faq-5',
    question: 'How do you match caregivers with clients?',
    answer:
      'We match caregivers based not only on specific care competencies (such as mobility transfers or memory care) but also on personality traits, communication style, hobbies, and schedule compatibility to build a lasting, comfortable relationship.',
    category: 'Caregivers',
    status: 'published',
    sort_order: 5,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'faq-6',
    question: 'Do you require long-term contracts or commitments?',
    answer:
      'No. We believe in earning your trust on every visit. You are not locked into inflexible long-term contracts; care schedules can be adjusted as your family’s needs change with standard reasonable notice.',
    category: 'Private Pay & Costs',
    status: 'published',
    sort_order: 6,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'faq-7',
    question: 'What geographic areas of Georgia do you serve?',
    answer:
      'TomLee Homecare proudly serves clients and families throughout metro Atlanta and surrounding Georgia communities. Contact us or submit our quick Request Care form to confirm coverage in your specific ZIP code.',
    category: 'General',
    status: 'published',
    sort_order: 7,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'faq-8',
    question: 'How are family members kept informed after visits?',
    answer:
      'We believe consistent family communication is vital. Caregivers log daily shift summaries detailing nutrition, hydration, mood, personal care activities, and routine notes so families always have transparent peace of mind.',
    category: 'Family Communication',
    status: 'published',
    sort_order: 8,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'faq-9',
    question: 'How thorough is your caregiver screening and background check process?',
    answer:
      'Every TomLee caregiver undergoes our rigorous 5-Point Vetting Protocol: multi-state criminal background checks, motor vehicle record screening, verified personal/professional references, CPR/First Aid certification, and hands-on non-medical competency evaluations.',
    category: 'Caregivers & Vetting',
    status: 'published',
    sort_order: 9,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'faq-10',
    question: 'Can our family meet and approve the caregiver before services begin?',
    answer:
      'Yes, absolutely. We prioritize caregiver compatibility. Following the initial in-home assessment, we introduce your matched primary caregiver so your family feels 100% comfortable before care starts.',
    category: 'Getting Started',
    status: 'published',
    sort_order: 10,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'faq-11',
    question: 'Does TomLee assist with Long-Term Care Insurance (LTCI) claim documentation?',
    answer:
      'Yes. While we operate as a direct private-pay agency, we provide itemized, insurance-compliant daily care logs and detailed invoices required by your Long-Term Care Insurance carrier for prompt reimbursement.',
    category: 'Private Pay & Costs',
    status: 'published',
    sort_order: 11,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'faq-12',
    question: 'What is the difference between non-medical home care and home health care?',
    answer:
      'Home health care provides intermittent skilled medical services (wound care, IV therapy, physical therapy) ordered by a physician. Non-medical home care focuses on daily living activities: personal hygiene, bathing, mobility, meal preparation, medication reminders, companionship, and safety supervision to keep seniors safe at home.',
    category: 'General',
    status: 'published',
    sort_order: 12,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'faq-13',
    question: 'Can care hours be adjusted as our family needs change?',
    answer:
      'Yes. Care plans are dynamic. Whether your loved one needs temporary additional hours during post-surgery recovery or needs to transition to overnight or 24/7 care, our care coordinators adjust schedules smoothly without penalties.',
    category: 'Getting Started',
    status: 'published',
    sort_order: 13,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
];

export const INITIAL_RESOURCES: Resource[] = [
  {
    id: 'res-1',
    title: 'Switching Home Care Agencies: A Step-by-Step Guide for Frustrated Families',
    slug: 'switching-home-care-agencies-guide',
    category: 'Switching Agencies',
    excerpt:
      'Dealing with no-show caregivers, poor communication, or high turnover? Here is how to transition smoothly to a reliable home care provider without disrupting your loved one’s routine.',
    content: `
### Why Families Decide to Switch Care Agencies

Arranging home care for an aging parent or loved one is an emotional and stressful process. When you hire an agency, you expect dependability, consistent communication, and respectful care. Unfortunately, many families encounter:

1. **Unannounced Caregiver No-Shows**: Being left stranded at the last minute with no replacement.
2. **Constantly Rotating Caregivers**: Having a different stranger in the home every week.
3. **Lack of Communication**: Office staff failing to answer phone calls or update families on visit notes.
4. **Care Quality Concerns**: Caregivers who are disengaged or lack experience with specific needs.

### 4 Simple Steps to Seamlessly Transition

Switching agencies is far easier and less disruptive than most families fear:

* **Step 1: Document Your Non-Negotiables**: Identify what wasn't working (e.g., exact morning arrival time, consistent caregiver, meal assistance).
* **Step 2: Have an Honest Intake Consultation**: Discuss your current frustrations with the new provider so they can set up safeguards.
* **Step 3: Schedule the In-Home Care Assessment**: Ensure the care plan and compatibility match before locking in shift times.
* **Step 4: Align the Start Date**: Coordinate the first day with TomLee before finalizing the notice period with your outgoing provider, ensuring zero coverage gap.

At TomLee Homecare, we specialize in helping families transition with dignity, reliability, and immediate peace of mind.
    `,
    image_url: '/images/services/personal-care.jpg',
    read_time: '5 min read',
    status: 'published',
    author: 'TomLee Care Coordination Team',
    published_at: '2026-01-15',
    created_at: '2026-01-15T00:00:00Z',
    updated_at: '2026-01-15T00:00:00Z',
  },
  {
    id: 'res-2',
    title: 'The Complete Guide to Arranging Private-Pay Home Care in Georgia',
    slug: 'guide-to-private-pay-home-care-georgia',
    category: 'Private Pay & Costs',
    excerpt:
      'Understand how private-pay home care works, what services are included, how to plan your care budget, and when private pay offers the greatest flexibility.',
    content: `
### Understanding Private-Pay Senior Home Care

Private-pay home care represents non-medical, client-directed care arranged directly between the family and the care agency. Unlike restricted programs that dictate strict hour caps or limited service scopes, private pay gives families 100% control over:

* **Custom Schedules**: From a 4-hour morning check-in to 24/7 overnight assistance.
* **Caregiver Selection**: Hand-matched caregivers aligned with your loved one’s personality.
* **Direct Communication**: Instant access to care coordinators and daily shift reports.

### What is Included in Private-Pay Non-Medical Care?

* Personal Care (bathing, dressing, grooming)
* Companion Care & social engagement
* Nutritious meal preparation & kitchen upkeep
* Light housekeeping & laundry assistance
* Medication reminders & routine support
* Safe mobility, transfers, and fall hazard monitoring

### Budgeting & Financial Planning

Many families utilize personal savings, pension benefits, family cost-sharing, or Long-Term Care Insurance (LTCI) policies to fund private-pay services. We provide detailed, itemized invoices making policy reimbursement straightforward.
    `,
    image_url: '/images/services/companion-care.jpg',
    read_time: '6 min read',
    status: 'published',
    author: 'TomLee Care Leadership',
    published_at: '2026-01-20',
    created_at: '2026-01-20T00:00:00Z',
    updated_at: '2026-01-20T00:00:00Z',
  },
  {
    id: 'res-3',
    title: 'Home Fall Safety Checklist: 10 Adjustments Every Senior Home Needs',
    slug: 'home-fall-safety-checklist-seniors',
    category: 'Senior Safety',
    excerpt:
      'Falls are the leading cause of injury among older adults. Here is an essential room-by-room safety checklist to safeguard your loved one’s living environment.',
    content: `
### The Importance of In-Home Fall Prevention

Over 1 in 4 Americans aged 65 and older falls each year. Most falls occur in the bathroom, bedroom, or along hallways. Making simple, proactive environmental modifications can prevent catastrophic injuries.

### Essential Room-by-Room Checklist:

1. **Remove Throw Rugs**: Unsecured rugs are the #1 tripping hazard. Remove them or use heavy-duty double-sided rug tape.
2. **Improve Pathway Lighting**: Install motion-sensor nightlights in hallways connecting the bedroom to the bathroom.
3. **Bathroom Grab Bars**: Install professionally anchored grab bars inside the shower stall and beside the toilet.
4. **Non-Slip Shower Mats**: Use suction-gripped textured mats inside showers and tubs.
5. **Clear Floor Walkways**: Eliminate extension cords, low coffee tables, and scattered pet toys from primary walking paths.
6. **Stair Handrails**: Ensure handrails on both sides of any interior or exterior staircases are firmly fastened.
7. **Accessible Footwear**: Encourage non-skid, supportive footwear with low heels indoors rather than loose socks.
8. **Keep Items Within Waist-to-Shoulder Height**: Avoid having seniors climb step stools to reach pantry items or pots.
9. **Emergency Response Devices**: Ensure a mobile phone or wearable alert pendant is within reach at all times.
10. **Regular Medication Reviews**: Ask the physician or pharmacist if any medications cause dizziness or low blood pressure upon standing.

Our TomLee caregivers conduct ongoing environmental visual safety sweeps during every visit.
    `,
    image_url: '/images/services/live-in-care.jpg',
    read_time: '4 min read',
    status: 'published',
    author: 'TomLee Safety Advisory',
    published_at: '2026-02-01',
    created_at: '2026-02-01T00:00:00Z',
    updated_at: '2026-02-01T00:00:00Z',
  },
  {
    id: 'res-4',
    title: 'Signs of Family Caregiver Burnout and When to Seek Respite Care',
    slug: 'signs-of-caregiver-burnout-respite-care',
    category: 'Caregiving Guides',
    excerpt:
      'Caring for an aging family member can take an emotional and physical toll. Learn the warning signs of caregiver burnout and how respite care protects both you and your loved one.',
    content: `
### Recognizing the Silent Toll of Family Caregiving

When you are the primary caregiver for a parent or spouse, it is easy to neglect your own physical health, emotional well-being, and personal relationships. Caregiver burnout happens gradually and can lead to severe exhaustion, anxiety, and depression.

### Common Signs of Caregiver Burnout:

* Constant physical exhaustion, even after a full night of sleep
* Feelings of irritability, frustration, or unexpected mood swings
* Withdrawing from friends, social activities, and hobbies you once enjoyed
* Neglecting your own medical checkups, nutrition, or sleep
* Constant anxiety about what might happen next

### How Respite Care Restores Balance

Respite care is not giving up; it is an essential act of sustainability. Scheduling regular respite hours (e.g., two afternoons a week or a full weekend every month) enables you to:

* Rest and recharge mentally without guilt
* Attend your own personal doctor appointments and errands
* Return to your loved one with renewed patience, warmth, and energy

TomLee Homecare provides tailored respite coverage that maintains your loved one's exact routine seamlessly.
    `,
    image_url: '/images/services/hospital-transition.jpg',
    read_time: '5 min read',
    status: 'published',
    author: 'TomLee Care Coordination Team',
    published_at: '2026-02-05',
    created_at: '2026-02-05T00:00:00Z',
    updated_at: '2026-02-05T00:00:00Z',
  },
  {
    id: 'res-5',
    title: '8 Compassionate Communication Strategies for Seniors with Alzheimer’s & Dementia',
    slug: 'dementia-alzheimers-communication-guide',
    category: 'Memory Care',
    excerpt:
      'Connecting with a loved one experiencing cognitive decline requires patience and empathy. Learn practical verbal and non-verbal techniques to reduce agitation and foster comfort.',
    content: `
### Meeting Your Loved One in Their Reality

Alzheimer's and related dementias alter how individuals process spoken words, facial expressions, and auditory stimuli. Frustration and behavioral expressions often occur when a senior feels unheard, overwhelmed, or disoriented.

### 8 Practical Guidelines for Families & Caregivers:

1. **Maintain Eye Contact & Gentle Posture**: Always approach from the front at eye level. Avoid sudden movements or approaching from behind.
2. **Speak in Short, Clear Sentences**: Ask one simple question at a time rather than multi-part instructions.
3. **Avoid Arguing or Correcting**: If your parent believes they need to go to work or asks about a deceased relative, validate their feelings rather than sharply correcting facts.
4. **Use Visual Cues & Demonstrations**: Point to objects, demonstrate brushing hair, or hold out a coat to help bridge comprehension.
5. **Give Extra Time to Respond**: Allow 15–20 seconds for the brain to process words before repeating or rephrasing.
6. **Emphasize Tone Over Words**: Seniors with dementia are remarkably attuned to emotional tone. A warm, unhurried, reassuring voice diffuses anxiety.
7. **Redirect Gently with Enjoyable Activities**: When agitation surfaces, redirect attention toward familiar calming habits (listening to classical music, looking through photo albums, folding towels).
8. **Offer Simple Choices**: Replace "What do you want for lunch?" with "Would you like vegetable soup or a turkey sandwich?"

Our memory care trained caregivers implement these person-centered validation techniques on every shift.
    `,
    image_url: '/images/resources/home-care-vs-home-health.jpg',
    read_time: '6 min read',
    status: 'published',
    author: 'TomLee Memory Care Advisory',
    published_at: '2026-02-08',
    created_at: '2026-02-08T00:00:00Z',
    updated_at: '2026-02-08T00:00:00Z',
  },
  {
    id: 'res-6',
    title: 'ADLs vs. IADLs: Assessing the Exact Level of In-Home Care Needed',
    slug: 'understanding-adls-iadls-care-needs',
    category: 'Care Planning',
    excerpt:
      'Understand the fundamental difference between Activities of Daily Living (ADLs) and Instrumental Activities of Daily Living (IADLs) to pinpoint the right care plan for your parent.',
    content: `
### The Clinical Standard for Care Assessment

When discussing care needs with physicians, social workers, and home care agencies, you will frequently hear the terms **ADLs** and **IADLs**. These standard classifications clarify the exact level of support required.

### 1. Activities of Daily Living (ADLs) — Basic Self-Care

ADLs refer to essential personal functional tasks:

* **Bathing & Showering**: Safely entering/exiting tubs and washing.
* **Dressing**: Selecting clothing, managing buttons, zippers, and socks.
* **Eating**: Transferring food from plate to mouth.
* **Toileting & Continence**: Managing personal hygiene and restroom transfers safely.
* **Mobility & Transfers**: Walking safely, using walkers/canes, transferring from bed to chair.

*If your loved one struggles with 2 or more ADLs, dedicated Personal Care assistance is strongly recommended.*

### 2. Instrumental Activities of Daily Living (IADLs) — Independent Living Skills

IADLs require higher-level thinking and organizational coordination:

* **Meal Preparation**: Planning nutritious recipes, cooking, and food storage.
* **Medication Reminders**: Keeping track of dosages and schedules.
* **Housekeeping & Laundry**: Keeping pathways clean, washing linens, handling dishes.
* **Transportation & Errands**: Grocery shopping and doctor visits.
* **Communication & Technology**: Operating phones, remotes, and emergency devices.

TomLee Homecare customizes daily care plans to support both ADLs and IADLs according to your family's exact needs.
    `,
    image_url: '/images/services/memory-care.jpg',
    read_time: '5 min read',
    status: 'published',
    author: 'TomLee Care Coordination Team',
    published_at: '2026-02-10',
    created_at: '2026-02-10T00:00:00Z',
    updated_at: '2026-02-10T00:00:00Z',
  },
  {
    id: 'res-7',
    title: 'How to Use Long-Term Care Insurance (LTCI) for Private Home Care in Georgia',
    slug: 'long-term-care-insurance-georgia-guide',
    category: 'Private Pay & Costs',
    excerpt:
      'A practical guide for families on how Long-Term Care Insurance policies reimburse private in-home care, elimination periods, and how we handle daily documentation.',
    content: `
### Unlocking Your Family’s LTCI Benefits

Many older adults invested in Long-Term Care Insurance (LTCI) decades ago. However, when the time comes to activate the policy, navigating benefit triggers and claim submission can feel confusing.

### 3 Key Steps to Activating LTCI for Home Care:

1. **Check the Benefit Trigger**: Most LTCI policies trigger coverage when the policyholder needs assistance with at least two ADLs (such as bathing, dressing, or transfers) or has certified cognitive impairment (dementia/Alzheimer's).
2. **Understand the Elimination Period**: Most policies have an "elimination period" (typically 30, 60, or 90 days) during which care is paid out-of-pocket before insurance reimbursement starts.
3. **Verify Agency Licensing**: In Georgia, LTCI carriers require care to be provided by a properly state-licensed, bonded, and insured non-medical home care agency.

### How TomLee Simplifies Your Claims

We provide complete, compliant documentation:

* Detailed daily caregiver notes & shift logs
* Itemized invoices formatted to carrier specifications
* Dedicated assistance communicating with policy claims coordinators

Contact our intake team today to review your LTCI policy details and schedule care.
    `,
    image_url: '/images/resources/choosing-private-pay.jpg',
    read_time: '7 min read',
    status: 'published',
    author: 'TomLee Care Leadership',
    published_at: '2026-02-12',
    created_at: '2026-02-12T00:00:00Z',
    updated_at: '2026-02-12T00:00:00Z',
  },
];

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  business_name: 'TomLee Homecare LLC',
  tagline: 'Reliable Caregivers. Peace of Mind for Families.',
  phone: '(404) 999-7936',
  email: 'info@tomleehomecare.com',
  notification_email: 'care@tomleehomecare.com',
  service_area_state: 'Georgia',
  service_area_description:
    'Proudly serving families across Lawrenceville, Metro Atlanta, and surrounding Georgia communities.',
  service_area_cities: [
    'Lawrenceville',
    'Atlanta',
    'Alpharetta',
    'Marietta',
    'Roswell',
    'Sandy Springs',
    'Decatur',
    'Duluth',
    'Smyrna',
    'Johns Creek',
    'Kennesaw',
    'Cumming',
    'Suwanee',
    'Snellville',
    'Lilburn',
    'Buford',
  ],
  service_area_zips: [
    '30044',
    '30043',
    '30045',
    '30046',
    '30049',
    '30301',
    '30302',
    '30303',
    '30305',
    '30309',
    '30318',
    '30319',
    '30324',
    '30326',
    '30327',
    '30328',
    '30338',
    '30339',
    '30342',
    '30004',
    '30005',
    '30009',
    '30022',
    '30024',
    '30062',
    '30067',
    '30068',
    '30075',
    '30076',
    '30078',
    '30087',
    '30092',
    '30096',
    '30097',
  ],
  business_hours: 'Monday – Sunday: 24/7 Caregiver Support & Intake Availability',
  primary_cta_text: 'Get a Free Care Assessment',
  is_live: true,
  address_line: 'Lawrenceville, GA 30044',
};

export const INITIAL_SAMPLE_LEADS: Lead[] = [
  {
    id: 'lead-sample-1',
    first_name: 'Eleanor',
    last_name: 'Vance',
    email: 'evance.care@example.com',
    phone: '(404) 555-8921',
    preferred_contact_method: 'phone',
    best_time_to_contact: 'Morning (9am - 12pm)',
    lead_intent: 'unhappy_with_current_provider',
    care_recipient_relationship: 'parent',
    services_requested: ['personal-care', 'meal-preparation', 'medication-reminders'],
    city: 'Sandy Springs',
    state: 'GA',
    zip_code: '30328',
    service_area_status: 'in_area',
    payment_method: 'private_pay',
    urgency: 'immediately',
    qualification_score: 95,
    qualification_status: 'QUALIFIED',
    routing_status: 'new',
    internal_notes:
      'Dissatisfied with current agency due to 2 caregiver no-shows last week. Mom (84) needs 6 hours daily for personal care and meal prep.',
    consent: true,
    source: 'Website - Switching Section',
    created_at: '2026-08-14T18:30:00Z',
    updated_at: '2026-08-14T18:30:00Z',
  },
  {
    id: 'lead-sample-2',
    first_name: 'Marcus',
    last_name: 'Holloway',
    email: 'mholloway92@example.com',
    phone: '(770) 555-3419',
    preferred_contact_method: 'email',
    best_time_to_contact: 'Afternoon (1pm - 5pm)',
    lead_intent: 'first_time',
    care_recipient_relationship: 'spouse_partner',
    services_requested: ['companion-care', 'respite-care'],
    city: 'Alpharetta',
    state: 'GA',
    zip_code: '30005',
    service_area_status: 'in_area',
    payment_method: 'private_pay',
    urgency: 'within_1_2_weeks',
    qualification_score: 85,
    qualification_status: 'QUALIFIED',
    routing_status: 'contacted',
    internal_notes:
      'First-time home care inquiry. Seeking companion care and respite support 3 afternoons a week for his wife.',
    consent: true,
    source: 'Website - Homepage Hero',
    created_at: '2026-08-13T14:15:00Z',
    updated_at: '2026-08-13T16:00:00Z',
  },
  {
    id: 'lead-sample-3',
    first_name: 'Sarah',
    last_name: 'Jenkins',
    email: 'sjenkins.family@example.com',
    phone: '(678) 555-7712',
    preferred_contact_method: 'text',
    lead_intent: 'comparing_providers',
    care_recipient_relationship: 'parent',
    services_requested: ['dementia-alzheimers-support', 'overnight-weekend-care'],
    city: 'Marietta',
    state: 'GA',
    zip_code: '30062',
    service_area_status: 'in_area',
    payment_method: 'not_sure',
    urgency: 'within_a_month',
    qualification_score: 65,
    qualification_status: 'NEEDS_REVIEW',
    routing_status: 'new',
    internal_notes:
      'Father diagnosed with mild Alzheimer’s. Comparing private-pay options vs LTCI coverage.',
    consent: true,
    source: 'Website - Request Care Wizard',
    created_at: '2026-08-12T09:45:00Z',
    updated_at: '2026-08-12T09:45:00Z',
  },
];
