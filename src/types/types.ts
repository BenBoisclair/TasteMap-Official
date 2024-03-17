import { createInsertSchema } from "drizzle-zod";

import { market, review, reviewAspect } from "@/db/schema/schema";
import { z } from "zod";

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
  imageUrl: string | null;
  name: string;
  nameTH: string | null;
  about: string;
  aboutTH: string | null;
  price: number;
  createdAt: Date | null;
}

export interface EventBanner {
  id: string;
  imageUrl: string | null;
  name: string | null;
  date: string | null;

  createdAt: Date | null;
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
  total: number | undefined;
  average: number | undefined;
}

export interface Market {
  id: string;
  code: string;
  type: string;
  name: string;
  nameTH: string | null;
  about: string;
  aboutTH: string | null;
  history: string;
  historyTH: string | null;
  latitude: string | null;
  longitude: string | null;
  createdAt: string | null;
  openingHours: OpeningHour[];
  ratings: Ratings | undefined | null;
  tags: MarketTag[];
  isVerified: boolean | null;
  isFavourite?: boolean;
}

export interface OpeningHour {
  id: string;
  dayOfWeek: string;
  open: string;
  close: string;
}

export interface Vendor {
  id: string;
  code: string;
  market: {
    name: string;
    id?: string;
  } | null;
  name: string;
  nameTH: string | null;
  ingredients: string | null;
  ingredients_th?: string | null;
  owner_name?: string | null;
  owner_telephone?: string | null;
  about: string;
  aboutTH: string | null;
  priceRange: string;
  marketId: string;
  createdAt: string | null;
  ratings: Ratings | undefined | null;
  tags: Tag[] | [];
  media?: Media[] | null;
  paymentOptions?: PaymentOption[] | [];
  informationItems?: InformationItems[] | [];
  isVerified: boolean | null;
  isFavourite: boolean;
  sequence: number | null;
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

export type Favourites = {
  id: string;
  marketId: string | null;
  vendorId: string | null;
  userExternalId: string;
  createdAt: string;
  market: Market | null;
  vendor: Vendor | null;
};

// Zod Validators
export const insertReviewSchema = createInsertSchema(review);
export const insertReviewAspectSchema = createInsertSchema(reviewAspect);

export const insertMarketSchema = createInsertSchema(market);
