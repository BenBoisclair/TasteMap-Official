import { relations } from "drizzle-orm";
import {
  bigint,
  boolean,
  integer,
  jsonb,
  numeric,
  pgTable,
  primaryKey,
  text,
  time,
  timestamp,
  unique,
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

  preferences: varchar("preferences", { length: 20 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userRelations = relations(users, ({ many, one }) => ({
  reviews: many(review),
  reviewLikes: many(reviewLike),
  favourites: many(favourites),
  preferences: one(userPreferences),
}));

export const userPreferences = pgTable("user_preferences", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),
  userId: varchar("user_id", { length: 20 }).references(() => users.id),
  interests: jsonb("interests"), // Stores an array of interests
  dietaryRequirements: jsonb("dietary_requirements"), // Stores an array of dietary requirements
  ageGroup: varchar("age_group"), // Could be a categorical value like '18-25', '26-35', etc.
  country: varchar("country", { length: 50 }),
  gender: varchar("gender", { length: 20 }),
  otherPreferences: jsonb("other_preferences"), // Flexibility for future data

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const userPreferencesRelations = relations(
  userPreferences,
  ({ one }) => ({
    user: one(users, {
      fields: [userPreferences.userId],
      references: [users.id],
    }),
  }),
);

export const informationItem = pgTable("information_item", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),
  vendorId: varchar("vendor_id").references(() => vendor.id),

  imageUrl: varchar("imageUrl", { length: 2000 }),
  name: text("name"),
  description: text("description"),
  sequence: integer("sequence"),

  createdAt: timestamp("created_at").defaultNow(),
});

export const informationItemRelations = relations(
  informationItem,
  ({ one }) => ({
    vendor: one(vendor, {
      fields: [informationItem.vendorId],
      references: [vendor.id],
    }),
  }),
);

export const favourites = pgTable("favourites", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),
  marketId: varchar("market_id").references(() => market.id),
  vendorId: varchar("vendor_id").references(() => vendor.id),
  userExternalId: varchar("user_external_id")
    .notNull()
    .references(() => users.externalId),

  createdAt: timestamp("created_at").defaultNow(),
}, (t) => ({
  marketIdUserId: unique('marketId_UserId').on(t.marketId, t.userExternalId),
  vendorIdUserId: unique('vendorId_UserId').on(t.vendorId, t.userExternalId)
}));

export const favouritesRelations = relations(favourites, ({ one }) => ({
  user: one(users, {
    fields: [favourites.userExternalId],
    references: [users.externalId],
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

  isVerified: boolean("is_verified").default(false),

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

export const review = pgTable(
  "review",
  {
    id: varchar("id", { length: 20 }).primaryKey().notNull(),

    rating: integer("rating").notNull(),
    content: text("content").notNull(),

    marketReviewedID: varchar("market_id").references(() => market.id),
    vendorReviewedID: varchar("vendor_id").references(() => vendor.id),
    authorId: varchar("author")
      .notNull()
      .references(() => users.externalId),

    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => ({
    authorIdToMarketId: unique().on(t.authorId, t.marketReviewedID),
    authorIdToVendorId: unique().on(t.authorId, t.vendorReviewedID),
  }),
);

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
    references: [users.externalId],
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

export const reviewAspect = pgTable(
  "review_aspect",
  {
    id: varchar("id", { length: 20 }).primaryKey().notNull(),

    name: text("name").notNull(),
    rating: integer("rating").notNull(),
    reviewId: varchar("review_id")
      .references(() => review.id, {
        onDelete: "cascade",
      })
      .notNull(),

    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => ({
    aspectIdToReviewId: unique().on(t.id, t.reviewId),
  }),
);

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

  ingredients: text("ingredients"),
  ingredientsTH: text("ingredients_th"),

  ownerName: text("owner_name"),
  ownerTelephone: text("owner_telephone"),

  about: text("about").notNull(),
  aboutTH: text("about_th"),

  priceRange: varchar("price_range").notNull(),

  marketId: varchar("market_id")
    .notNull()
    .references(() => market.id),

  isVerified: boolean("is_verified").default(false),
  sequence: integer("sequence"),

  createdAt: timestamp("created_at").defaultNow(),
});

export const vendorRelations = relations(vendor, ({ one, many }) => ({
  market: one(market, {
    fields: [vendor.marketId],
    references: [market.id],
  }),
  openingHours: many(openingHour),
  paymentOptions: many(vendorOnPaymentOption),
  reviews: many(review),
  userFavourites: many(favourites),
  tags: many(vendorsOnTags),
  promotions: many(promotion),
  media: many(mediaFiles),
  informationItems: many(informationItem),
}));

export const paymentOption = pgTable("payment_option", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),

  name: text("name").notNull(),
  nameTH: text("name_th"),

  createdAt: timestamp("created_at").defaultNow(),
});

export const paymentOptionRelations = relations(paymentOption, ({ many }) => ({
  vendors: many(vendorOnPaymentOption),
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

export const vendorOnTagsRelation = relations(vendorsOnTags, ({ one }) => ({
  vendor: one(vendor, {
    fields: [vendorsOnTags.vendorId],
    references: [vendor.id],
  }),
  tag: one(tag, {
    fields: [vendorsOnTags.tagId],
    references: [tag.id],
  }),
}));

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

export const eventBanners = pgTable("event_banner", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),
  imageUrl: varchar("image_url", { length: 2000 }),
  name: text("name"),
  date: text("date"),

  createdAt: timestamp("created_at").defaultNow(),
});

export const mediaFiles = pgTable("media_files", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),
  mediaUrl: varchar("media_url", { length: 2000 }).notNull(),
  type: text("type").notNull(),

  vendorId: varchar("vendor_id")
    .notNull()
    .references(() => vendor.id),

  createdAt: timestamp("created_at").defaultNow(),
});

export const mediaFilesRelations = relations(mediaFiles, ({ one }) => ({
  vendor: one(vendor, {
    fields: [mediaFiles.vendorId],
    references: [vendor.id],
  }),
}));

export const nativeUser = pgTable(
  "native_user",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint("id", { mode: "number" }).primaryKey().notNull(),
    phoneNumber: text("phone_number").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      nativeUserPhoneNumberKey: unique("native_user_phone_number_key").on(
        table.phoneNumber,
      ),
    };
  },
);

export const nativeBook = pgTable("native_book", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  userId: bigint("user_id", { mode: "number" })
    .notNull()
    .references(() => nativeUser.id),
  date: timestamp("date", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  type: text("type").notNull(),
  category: text("category").notNull(),
  amount: text("amount").notNull(),
});
