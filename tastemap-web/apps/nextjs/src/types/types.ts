import { createInsertSchema } from "drizzle-zod";

import { review, reviewAspect } from "@acme/db/schema/schema";

export interface Author {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
}

export interface Review {
  id: string;
  rating: number;
  content: string;
  marketReviewedID: string;
  vendorReviewedID: string | null;
  authorId: string;
  createdAt: string;
  author: Author;
}

export interface ReviewsResponse {
  reviews: Review[];
  total: number;
  average: number;
  reviewAspects: ReviewAspect[];
}

export interface ReviewAspect {
  name: string;
  average: number;
}

export type InsertReviewAspect = typeof reviewAspect.$inferInsert;

export interface UniqueService {
  id: string;
  marketId: string;
  imageUrl: string;
  name: string;
  nameTH: string;
  about: string;
  aboutTH: string;
  price: number;
  createdAt: string;
}

export interface EventBanner {
  id: string;
  imageUrl: string | null;
  name: string | null;
  date: string | null;

  created_at: string;
}

export interface Tag {
  id: string;
  name: string;
  type: string;
}

export interface MarketTag {
  id: string;
  name: string;
  type: string;
}

export interface Ratings {
  total: number;
  average: number;
}

export interface Market {
  id: string;
  code: string;
  bannerUrl: string;
  type: string;
  name: string;
  nameTH: string;
  about: string;
  aboutTH: string;
  history: string;
  historyTH: string;
  latitude: string;
  longitude: string;
  createdAt: string;
  marketTags: MarketTag[] | null;
  openingHours: OpeningHour[];
  ratings: Ratings;
  tags: MarketTag[];
  isVerified: boolean;
}

export interface OpeningHour {
  dayOfWeek: string;
  open: string;
  close: string;
}

export interface Vendor {
  id: string;
  code: string;
  bannerUrl: string | null;
  logoUrl: string | null;
  name: string;
  nameTH: string | null;
  ingredients: string | null;
  ingredients_th: string | null;
  owner_name: string | null;
  owner_telephone: string | null;
  about: string;
  aboutTH: string | null;
  priceRange: string;
  marketId: string;
  createdAt: string;
  ratings: Ratings;
  tags: Tag[] | [];
  media: Media[] | [];
  paymentOptions: PaymentOption[] | [];
  informationItems: InformationItems[] | [];
  isVerified: boolean;
}

export interface InformationItems {
  id: string;
  imageUrl: string | null;
  name: string | null;
  description: string | null;
  sequence: number | null;
}

export interface Media {
  id: string;
  mediaUrl: string;
  type: string;
}

export interface PaymentOption {
  id: string;
  name: string;
}

// Zod Validators
export const insertReviewSchema = createInsertSchema(review);
export const insertReviewAspectSchema = createInsertSchema(reviewAspect);
