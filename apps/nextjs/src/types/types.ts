export interface Author {
  id: string;
  firstName: string;
  lastName: string;
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

export const banners = [
  {
    id: "1",
    name: "Test Banner",
    name_th: "แบนเนอร์ทดสอบ",
    description: "Test Description",
    description_th: "คำอธิบายทดสอบ",

    image: "https://placehold.co/600x400/png",

    end_date: "2021-01-01T00:00:00.000Z",
    created_at: "2021-01-01T00:00:00.000Z",
    updated_at: "2021-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    name: "Test Banner 2",
    name_th: "แบนเนอร์ทดสอบ 2",
    description: "Test Description 2",
    description_th: "คำอธิบายทดสอบ 2",

    image: "https://placehold.co/600x400/png",

    end_date: "2021-01-01T00:00:00.000Z",
    created_at: "2021-01-01T00:00:00.000Z",
    updated_at: "2021-01-01T00:00:00.000Z",
  },
];

export interface Banner {
  id: string;
  name: string;
  name_th: string;
  description: string;
  description_th: string;

  image: string;

  end_date: string;
  created_at: string;
  updated_at: string;
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
}

export interface OpeningHour {
  dayOfWeek: string;
  open: string;
  close: string;
}

export interface Vendor {
  id: string;
  code: string;
  bannerUrl: string;
  logoUrl: string;
  name: string;
  nameTH: string;
  about: string;
  aboutTH: string;
  priceRange: string;
  marketId: string;
  createdAt: string;
  ratings: Ratings;
}
