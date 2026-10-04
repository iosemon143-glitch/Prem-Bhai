export type TemplateType = 'agency' | 'portfolio' | 'ecommerce' | 'restaurant' | 'saas';

export type Language = 'bn' | 'en';

export type ThemeColor = 'indigo' | 'emerald' | 'amber' | 'rose' | 'slate' | 'cyan';

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  metric?: string;
  metricLabel?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  metric: string;
  linkText: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  badge?: string;
  rating: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  popular?: boolean;
  ctaText: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarText: string;
  metric: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface SectionVisibility {
  hero: boolean;
  services: boolean;
  portfolio: boolean;
  products: boolean;
  metrics: boolean;
  pricing: boolean;
  testimonials: boolean;
  faq: boolean;
  contact: boolean;
}

export interface SiteConfig {
  template: TemplateType;
  lang: Language;
  themeColor: ThemeColor;
  brandName: string;
  tagline: string;
  heroKicker: string;
  heroHeadline: string;
  heroDescription: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  heroImage: string;
  servicesTitle: string;
  servicesSubtitle: string;
  services: ServiceItem[];
  portfolioTitle: string;
  portfolioSubtitle: string;
  projects: ProjectItem[];
  productsTitle: string;
  productsSubtitle: string;
  products: ProductItem[];
  pricingTitle: string;
  pricingSubtitle: string;
  pricingPlans: PricingPlan[];
  testimonialsTitle: string;
  testimonials: TestimonialItem[];
  faqs: FAQItem[];
  contactTitle: string;
  contactSubtitle: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  sections: SectionVisibility;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}
