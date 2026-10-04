export interface DarazProduct {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice: number;
  discountPercent?: number;
  imageUrl: string;
  affiliateUrl: string;
  rating: number;
  reviewsCount: number;
  soldCount?: string;
  isDarazMall?: boolean;
  freeShipping?: boolean;
  features?: string[];
  clicksCount: number;
}

export interface DarazAffiliateConfig {
  affiliateId: string;
  channelName: string;
  whatsappContact: string;
  enableClickTracking: boolean;
}
