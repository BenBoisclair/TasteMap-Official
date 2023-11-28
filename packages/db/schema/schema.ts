import { relations } from "drizzle-orm";
import {
  integer,
  numeric,
  pgTable,
  primaryKey,
  text,
  time,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),
  externalId: varchar("external_id").notNull().unique(),
  username: varchar("username", { length: 50 }),
  firstName: text("firstName"),
  lastName: text("lastName"),
  role: text("role"),
  imageUrl: varchar("imageUrl", { length: 2000 }),
  birthday: varchar("birthday"),
  telephone: varchar("telephone", { length: 10 }),
  email: text("email").notNull().unique(),
  emailVerified: varchar("email_verified"),

  createdAt: timestamp("created_at").defaultNow(),
});

export const userRelations = relations(users, ({ many }) => ({
  reviews: many(review),
  reviewLikes: many(reviewLike),
  favourites: many(favourites),
  promotionUsages: many(promotionUsage),
}));

export const favourites = pgTable("favourites", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),
  marketId: varchar("market_id").references(() => market.id),
  vendorId: varchar("vendor_id").references(() => vendor.id),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id),

  createdAt: timestamp("created_at").defaultNow(),
});

export const favouritesRelations = relations(favourites, ({ one }) => ({
  user: one(users, {
    fields: [favourites.userId],
    references: [users.id],
  }),
  market: one(market, {
    fields: [favourites.marketId],
    references: [market.id],
  }),
  vendor: one(vendor, {
    fields: [favourites.vendorId],
    references: [vendor.id],
  }),
}));

export const market = pgTable("market", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),
  code: varchar("code", { length: 4 }).notNull().unique(),

  bannerUrl: varchar("banner_url", { length: 2000 }),
  type: varchar("type", { length: 50 }).notNull(),

  name: text("name").notNull(),
  nameTH: text("name_th"),

  about: text("about").notNull(),
  aboutTH: text("about_th"),

  history: text("history").notNull(),
  historyTH: text("history_th"),

  latitude: numeric("latitude"),
  longitude: numeric("longitude"),

  createdAt: timestamp("created_at").defaultNow(),
});

export const marketRelations = relations(market, ({ many }) => ({
  marketTags: many(marketsOnTags),
  openingHours: many(openingHour),
  reviews: many(review),
  userFavourites: many(favourites),
  vendors: many(vendor),
  uniqueServices: many(uniqueService),
}));

export const uniqueService = pgTable("unique_service", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),
  marketId: varchar("market_id")
    .notNull()
    .references(() => market.id),

  imageUrl: varchar("image_url", { length: 2000 }),

  name: varchar("name", { length: 100 }).notNull(),
  nameTH: varchar("name_th", { length: 100 }),

  about: text("about").notNull(),
  aboutTH: text("about_th"),

  price: integer("price").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

export const uniqueServiceRelations = relations(uniqueService, ({ one }) => ({
  market: one(market, {
    fields: [uniqueService.marketId],
    references: [market.id],
  }),
}));

export const tag = pgTable("tag", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),

  name: text("name").notNull(),
  type: varchar("type", { length: 50 }).notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

export const tagRelation = relations(tag, ({ many }) => ({
  markets: many(marketsOnTags),
  vendors: many(vendorsOnTags),
}));

export const marketsOnTags = pgTable(
  "markets_on_tags",
  {
    marketId: varchar("market_id")
      .notNull()
      .references(() => market.id),
    tagId: varchar("tag_id")
      .notNull()
      .references(() => tag.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.marketId, t.tagId] }),
  }),
);

export const marketOnTagsRelation = relations(marketsOnTags, ({ one }) => ({
  market: one(market, {
    fields: [marketsOnTags.marketId],
    references: [market.id],
  }),
  tag: one(tag, {
    fields: [marketsOnTags.tagId],
    references: [tag.id],
  }),
}));

export const openingHour = pgTable("opening_hour", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),
  marketId: varchar("market_id").references(() => market.id),
  vendorId: varchar("vendor_id").references(() => vendor.id),

  dayOfWeek: varchar("day_of_week", { length: 50 }).notNull(),
  open: time("open").notNull(),
  close: time("close").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

export const openingHourRelation = relations(openingHour, ({ one }) => ({
  market: one(market, {
    fields: [openingHour.marketId],
    references: [market.id],
  }),
  vendor: one(vendor, {
    fields: [openingHour.vendorId],
    references: [vendor.id],
  }),
}));

export const review = pgTable("review", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),

  rating: integer("rating").notNull(),
  content: text("content").notNull(),

  marketReviewedID: varchar("market_id").references(() => market.id),
  vendorReviewedID: varchar("vendor_id").references(() => vendor.id),
  authorId: varchar("author")
    .notNull()
    .references(() => users.id),

  createdAt: timestamp("created_at").defaultNow(),
});

export const reviewRelations = relations(review, ({ one, many }) => ({
  market: one(market, {
    fields: [review.marketReviewedID],
    references: [market.id],
  }),
  vendor: one(vendor, {
    fields: [review.vendorReviewedID],
    references: [vendor.id],
  }),
  user: one(users, {
    fields: [review.authorId],
    references: [users.id],
  }),
  reviewLikes: many(reviewLike),
  reviewAspects: many(reviewAspect),
}));

export const reviewLike = pgTable("review_like", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),

  reviewId: varchar("review_id")
    .notNull()
    .references(() => review.id),
  likedBy: varchar("user_id")
    .notNull()
    .references(() => users.id),

  createdAt: timestamp("created_at").defaultNow(),
});

export const reviewLikeRelations = relations(reviewLike, ({ one }) => ({
  review: one(review, {
    fields: [reviewLike.reviewId],
    references: [review.id],
  }),
  user: one(users, {
    fields: [reviewLike.likedBy],
    references: [users.id],
  }),
}));

export const reviewAspect = pgTable("review_aspect", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),

  name: text("name").notNull(),
  rating: integer("rating").notNull(),
  reviewId: varchar("review_id"),

  createdAt: timestamp("created_at").defaultNow(),
});

export const reviewAspectRelations = relations(reviewAspect, ({ one }) => ({
  review: one(review, {
    fields: [reviewAspect.reviewId],
    references: [review.id],
  }),
}));

export const vendor = pgTable("vendor", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),
  code: varchar("code", { length: 4 }).notNull().unique(),

  bannerUrl: varchar("banner_url", { length: 2000 }),
  logoUrl: varchar("logo_url", { length: 2000 }),

  name: text("name").notNull(),
  nameTH: text("name_th"),

  about: text("about").notNull(),
  aboutTH: text("about_th"),

  priceRange: varchar("price_range").notNull(),

  marketId: varchar("market_id")
    .notNull()
    .references(() => market.id),

  createdAt: timestamp("created_at").defaultNow(),
});

export const vendorRelations = relations(vendor, ({ one, many }) => ({
  market: one(market, {
    fields: [vendor.marketId],
    references: [market.id],
  }),
  openingHours: many(openingHour),
  paymentOptions: many(paymentOption),
  reviews: many(review),
  userFavourites: many(favourites),
  tags: many(vendorsOnTags),
  promotions: many(promotion),
}));

export const paymentOption = pgTable("payment_option", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),

  name: text("name").notNull(),
  nameTH: text("name_th"),

  createdAt: timestamp("created_at").defaultNow(),
});

export const paymentOptionRelations = relations(paymentOption, ({ many }) => ({
  vendors: many(vendor),
}));

export const vendorOnPaymentOption = pgTable(
  "vendor_on_payment_option",
  {
    vendorId: varchar("vendor_id")
      .notNull()
      .references(() => vendor.id),
    paymentOptionId: varchar("payment_option_id")
      .notNull()
      .references(() => paymentOption.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.vendorId, t.paymentOptionId] }),
  }),
);

export const vendorOnPaymentOptionRelations = relations(
  vendorOnPaymentOption,
  ({ one }) => ({
    vendor: one(vendor, {
      fields: [vendorOnPaymentOption.vendorId],
      references: [vendor.id],
    }),
    paymentOption: one(paymentOption, {
      fields: [vendorOnPaymentOption.paymentOptionId],
      references: [paymentOption.id],
    }),
  }),
);

export const vendorsOnTags = pgTable(
  "vendors_on_tags",
  {
    vendorId: varchar("vendor_id")
      .notNull()
      .references(() => vendor.id),
    tagId: varchar("tag_id")
      .notNull()
      .references(() => tag.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.vendorId, t.tagId] }),
  }),
);

export const promotion = pgTable("promotion", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),

  imageUrl: varchar("image_url", { length: 2000 }),

  name: text("name").notNull(),
  nameTH: text("name_th"),

  description: text("description").notNull(),
  descriptionTH: text("description_th"),

  price: integer("price").notNull(),

  expiryDate: timestamp("expiry_date").notNull(),

  vendorId: varchar("vendor_id")
    .notNull()
    .references(() => vendor.id),

  createdAt: timestamp("created_at").defaultNow(),
});

export const promotionRelations = relations(promotion, ({ one }) => ({
  vendor: one(vendor, {
    fields: [promotion.vendorId],
    references: [vendor.id],
  }),
}));

export const promotionUsage = pgTable("promotion_usage", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),

  totalPrice: integer("total_price").notNull(),

  userId: varchar("user_id")
    .notNull()
    .references(() => users.id),

  createdAt: timestamp("created_at").defaultNow(),
});

export const promotionUsageRelations = relations(
  promotionUsage,
  ({ one, many }) => ({
    promotions: many(promotion),
    user: one(users, {
      fields: [promotionUsage.userId],
      references: [users.id],
    }),
  }),
);
