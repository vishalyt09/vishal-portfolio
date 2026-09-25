import { Project, Service, SkillItem, PricingPlan, FAQItem } from '../types/index.ts';
import skyHotelImg from '../assets/images/project_sky_hotel_1790332573237.jpg';
import gymStudioImg from '../assets/images/project_gym_studio_1790332593539.jpg';
import devtoolsHubImg from '../assets/images/project_devtools_hub_1790332609584.jpg';

export const PERSONAL_INFO = {
  name: 'Vishal',
  role: 'Web Developer',
  brand: 'VISHAL.DEV',
  email: 'vishalgaming993414@gmail.com',
  statusBadge: 'Available for Web Projects',
  heroHeading: '“I build modern, fast and mobile-friendly websites for businesses.”',
  heroSupportingText:
    'Specializing in custom business websites, high-converting landing pages, and web solutions designed to build trust and attract clients in the USA and worldwide.',
  heroTagline: 'Web Development • Responsive Design • AI/API Integration',
  aboutHeading: 'About Me',
  aboutText:
    'I’m Vishal, a web developer who enjoys turning ideas into useful, modern websites. I focus on clean design, responsive experiences and practical functionality.',
  contactHeading: 'Have a Project in Mind?',
  contactText:
    'Tell me what you’re building and I’ll get back to you with the next steps.',
  footerTagline: 'Building modern websites for ideas and businesses.',
  copyright: '© 2026 Vishal. All rights reserved.',
};

export const ABOUT_CARDS = [
  {
    number: '01',
    title: 'Design',
    description: 'Clean and modern interfaces.',
    detail: 'Visual hierarchy, typography, intuitive layouts, and mobile-first composition tailored to your brand.'
  },
  {
    number: '02',
    title: 'Development',
    description: 'Fast and responsive websites.',
    detail: 'Production-ready code, lightweight assets, cross-browser compatibility, and seamless performance.'
  },
  {
    number: '03',
    title: 'Problem Solving',
    description: 'Turning business requirements into practical web solutions.',
    detail: 'Direct communication, focused milestones, and pragmatic architecture that solves real business needs.'
  },
];

export const INITIAL_SKILLS: SkillItem[] = [
  {
    id: 'html',
    name: 'HTML',
    category: 'Frontend',
    level: 'Core',
    description: 'Semantic markup, accessible structure, SEO fundamentals and modern HTML5 standards.'
  },
  {
    id: 'css',
    name: 'CSS',
    category: 'Frontend',
    level: 'Core',
    description: 'Tailwind CSS, CSS Grid/Flexbox, responsive layouts, animations and custom properties.'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Frontend',
    level: 'Core',
    description: 'Modern ES6+, async operations, DOM manipulation, clean architecture and state handling.'
  },
  {
    id: 'react',
    name: 'React',
    category: 'Frontend',
    level: 'Advanced',
    description: 'Component-driven UI, custom hooks, performant rendering, and modern reactive patterns.'
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Backend & Scripting',
    level: 'Specialized',
    description: 'Backend utilities, scripting, data automation, and server integrations.'
  },
  {
    id: 'apis',
    name: 'APIs',
    category: 'Integrations & Tools',
    level: 'Specialized',
    description: 'RESTful API integration, webhook endpoints, payment gateways and data synchronization.'
  },
  {
    id: 'ai-integration',
    name: 'AI Integration',
    category: 'Integrations & Tools',
    level: 'Specialized',
    description: 'Connecting websites with LLM models, intelligent search, chatbots and automated workflows.'
  },
  {
    id: 'responsive-design',
    name: 'Responsive Web Design',
    category: 'Frontend',
    level: 'Core',
    description: 'Mobile-first workflows, fluid typography, touch ergonomics and cross-device testing.'
  },
  {
    id: 'git-github',
    name: 'Git/GitHub',
    category: 'Integrations & Tools',
    level: 'Core',
    description: 'Version control, collaborative workflows, CI/CD automated deployments and release management.'
  },
];

export const SERVICES: Service[] = [
  {
    id: 'business-websites',
    title: 'Business Websites',
    description:
      'Modern websites for local businesses such as hotels, gyms, restaurants and service companies.',
    deliverables: [
      'Multi-page structure (Home, Services, About, Contact)',
      'Brand-matched visual identity & modern typography',
      'Location maps, hours & business details',
      'Mobile-first responsive architecture'
    ],
    icon: 'Building2'
  },
  {
    id: 'landing-pages',
    title: 'Landing Pages',
    description:
      'High-quality landing pages for products, services and campaigns.',
    deliverables: [
      'Conversion-focused visual hierarchy',
      'Fast-loading hero & clear call-to-actions',
      'Feature highlights & social proof displays',
      'Integrated lead capture forms'
    ],
    icon: 'Rocket'
  },
  {
    id: 'ai-api-integration',
    title: 'AI & API Integration',
    description:
      'Connect websites with AI models and external APIs.',
    deliverables: [
      'AI assistant & content generation capabilities',
      'Third-party API connectors (Weather, Maps, Stripe, CRM)',
      'Automated contact notifications & data forwarding',
      'Secure server-side API proxying'
    ],
    icon: 'Cpu'
  },
  {
    id: 'website-improvements',
    title: 'Website Improvements',
    description:
      'Improve responsive design, UI, performance and existing websites.',
    deliverables: [
      'Fix mobile display & layout glitches',
      'Lighthouse speed & Core Web Vitals optimization',
      'Accessibility & semantic HTML upgrades',
      'UI modernization & refreshed typography'
    ],
    icon: 'Sparkles'
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'sky-hotel',
    title: 'Sky Hotel & Resort',
    category: 'Hotel Website Demo',
    description:
      'A premium hotel website concept featuring rooms, gallery, facilities, location and enquiry sections.',
    label: 'Demo Concept',
    image: skyHotelImg,
    technologies: ['React', 'Responsive Design', 'Booking Flow UI', 'CSS Grid'],
    features: [
      'Interactive room suite selector & availability preview',
      'Curated amenities gallery (Infinity Pool, Spa, Ocean Dining)',
      'Integrated reservation enquiry simulator',
      'Interactive location & concierge guide'
    ],
    liveDemoType: 'hotel'
  },
  {
    id: 'gym-fitness',
    title: 'Gym & Fitness Studio',
    category: 'Business Website Demo',
    description:
      'A modern fitness studio website concept featuring memberships, classes, trainers and contact functionality.',
    label: 'Demo Concept',
    image: gymStudioImg,
    technologies: ['React', 'Mobile-First', 'Class Timetable', 'Form Handling'],
    features: [
      'Tiered membership comparison selector',
      'Weekly class schedule filter (HIIT, Strength, Pilates)',
      'Trainer profiles & specialty breakdowns',
      'Direct trial session signup form'
    ],
    liveDemoType: 'gym'
  },
  {
    id: 'devtools-hub',
    title: 'DevTools Hub',
    category: 'Developer Tools',
    description:
      'A collection of useful web-based developer utilities and productivity tools.',
    label: 'Personal Project',
    image: devtoolsHubImg,
    technologies: ['TypeScript', 'Client-side Utilities', 'RegEx Parser', 'Tailwind'],
    features: [
      'Real-time JSON Formatter & Validator',
      'Base64 Text Encoder / Decoder',
      'Interactive CSS Gradient generator',
      'URL Slug & Query String Inspector'
    ],
    liveDemoType: 'devtools'
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    basePriceUSD: 499,
    priceDisplay: '$499+',
    targetAudience: 'For simple business websites.',
    features: [
      'Responsive design',
      'Up to 3 pages',
      'Contact section',
      'Basic SEO',
      'Mobile optimization'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    basePriceUSD: 799,
    priceDisplay: '$799+',
    targetAudience: 'For growing businesses.',
    isPopular: true,
    features: [
      'Up to 7 pages',
      'Custom design',
      'Contact/enquiry form',
      'Google Maps',
      'Responsive design',
      'Basic SEO'
    ]
  },
  {
    id: 'custom',
    name: 'Custom',
    basePriceUSD: null,
    priceDisplay: "Let's Talk",
    targetAudience: 'For advanced requirements.',
    features: [
      'Custom functionality',
      'API/AI integration',
      'Booking systems',
      'Advanced features'
    ]
  }
];

export const PRICING_DISCLAIMER =
  'Final pricing depends on project requirements. Domain, hosting and paid third-party services may be charged separately.';

export const PROCESS_STEPS = [
  {
    number: '01',
    name: 'Discover',
    tagline: 'Understand the project requirements.',
    description:
      'We discuss your business goals, target audience, preferred branding, and essential features to map out a clear project roadmap.'
  },
  {
    number: '02',
    name: 'Design',
    tagline: 'Create the visual direction and page structure.',
    description:
      'I structure the layout, select typography, and establish a modern aesthetic tailored specifically to your clients and brand personality.'
  },
  {
    number: '03',
    name: 'Develop',
    tagline: 'Build the responsive website and functionality.',
    description:
      'I code your website using modern, clean code standards with responsive layouts, fast load speeds, and all interactive features.'
  },
  {
    number: '04',
    name: 'Launch',
    tagline: 'Test, deploy and hand over the completed website.',
    description:
      'Thorough testing across desktop and mobile devices, domain configuration, SEO verification, and complete handover with clear guidance.'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'How much does a website cost?',
    answer: 'Projects start from $499+, depending on requirements.'
  },
  {
    question: 'How long does a website take?',
    answer: 'Timeline depends on the number of pages, content and functionality.'
  },
  {
    question: 'Do you work with international clients?',
    answer: 'Yes, project requirements and communication can be handled online.'
  },
  {
    question: 'Can you integrate APIs or AI?',
    answer: "Yes, depending on the project's technical requirements."
  }
];
