export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  label: 'Demo Concept' | 'Personal Project';
  image: string;
  technologies: string[];
  features: string[];
  liveDemoType: 'hotel' | 'gym' | 'devtools';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend & Scripting' | 'Integrations & Tools';
  level: string;
  description: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  basePriceUSD: number | null;
  priceDisplay: string;
  targetAudience: string;
  features: string[];
  isPopular?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  businessName: string;
  projectType: string;
  budget: string;
  message: string;
}
