// /types/index.ts
// All shared TypeScript types for the CTC platform

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: ProductCategory;
  imageUrl: string;
  slug: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ProductCategory = 'bible' | 'book' | 'clothing' | 'accessory' | 'other';

export interface DailyVerse {
  id: string;
  verseText: string;
  reference: string;
  translation: string;
  scheduledDate: string;
  reflectionNote?: string;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  relatedProductId?: string;
  status: EnquiryStatus;
  createdAt: string;
}

export type EnquiryStatus = 'new' | 'read' | 'responded';

export interface EnquiryFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  relatedProductId?: string;
}

export interface Advertisement {
  id: string;
  brandName: string;
  imageUrl: string;
  linkUrl: string;
  placement: AdvertPlacement;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  createdAt: string;
}

export type AdvertPlacement = 'homepage' | 'shop' | 'sidebar' | 'footer';

// API response wrapper type
export interface ApiResponse<T> {
  data?: T;
  error?: string;
}
