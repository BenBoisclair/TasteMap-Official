import {
  bigint,
  boolean,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  time,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

export const keyStatus = pgEnum("key_status", [
  "default",
  "valid",
  "invalid",
  "expired",
]);
export const keyType = pgEnum("key_type", [
  "aead-ietf",
  "aead-det",
  "hmacsha512",
  "hmacsha256",
  "auth",
  "shorthash",
  "generichash",
  "kdf",
  "secretbox",
  "secretstream",
  "stream_xchacha20",
]);
export const factorType = pgEnum("factor_type", ["totp", "webauthn"]);
export const factorStatus = pgEnum("factor_status", ["unverified", "verified"]);
export const aalLevel = pgEnum("aal_level", ["aal1", "aal2", "aal3"]);
export const codeChallengeMethod = pgEnum("code_challenge_method", [
  "s256",
  "plain",
]);
export const role = pgEnum("role", ["User", "Admin", "Market", "Vendor"]);

export const promotion = pgTable("promotion", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),
  imageUrl: varchar("image_url", { length: 2000 }),
  name: text("name").notNull(),
  nameTh: text("name_th"),
  description: text("description").notNull(),
  descriptionTh: text("description_th"),
  price: integer("price").notNull(),
  expiryDate: timestamp("expiry_date", { mode: "string" }).notNull(),
  vendorId: varchar("vendor_id")
    .notNull()
    .references(() => vendor.id),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
});

export const user = pgTable(
  "user",
  {
    id: varchar("id", { length: 20 }).primaryKey().notNull(),
    externalId: varchar("external_id").notNull(),
    username: varchar("username", { length: 50 }),
    firstName: text("firstName"),
    lastName: text("lastName"),
    role: text("role"),
    imageUrl: varchar("imageUrl", { length: 2000 }),
    birthday: varchar("birthday"),
    telephone: varchar("telephone", { length: 10 }),
    email: text("email").notNull(),
    emailVerified: varchar("email_verified"),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
    preferences: varchar("preferences", { length: 20 }),
  },
  (table) => {
    return {
      userExternalIdUnique: unique("user_external_id_unique").on(
        table.externalId,
      ),
      userEmailUnique: unique("user_email_unique").on(table.email),
    };
  },
);

export const market = pgTable(
  "market",
  {
    id: varchar("id", { length: 20 }).primaryKey().notNull(),
    bannerUrl: varchar("banner_url", { length: 2000 }),
    type: varchar("type", { length: 50 }).notNull(),
    name: text("name").notNull(),
    nameTh: text("name_th"),
    about: text("about").notNull(),
    aboutTh: text("about_th"),
    history: text("history").notNull(),
    historyTh: text("history_th"),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
    code: varchar("code", { length: 4 }).notNull(),
    latitude: numeric("latitude"),
    longitude: numeric("longitude"),
    isVerified: boolean("is_verified").default(false),
  },
  (table) => {
    return {
      marketCodeUnique: unique("market_code_unique").on(table.code),
    };
  },
);

export const tag = pgTable("tag", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),
  name: text("name").notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
});

export const openingHour = pgTable("opening_hour", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),
  marketId: varchar("market_id").references(() => market.id),
  dayOfWeek: varchar("day_of_week", { length: 50 }).notNull(),
  open: time("open").notNull(),
  close: time("close").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
  vendorId: varchar("vendor_id").references(() => vendor.id),
});

export const eventBanner = pgTable("event_banner", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),
  imageUrl: varchar("image_url", { length: 2000 }),
  name: text("name"),
  date: text("date"),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
});

export const review = pgTable(
  "review",
  {
    id: varchar("id", { length: 20 }).primaryKey().notNull(),
    rating: integer("rating").notNull(),
    content: text("content").notNull(),
    marketId: varchar("market_id").references(() => market.id),
    author: varchar("author")
      .notNull()
      .references(() => user.externalId),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
    vendorId: varchar("vendor_id").references(() => vendor.id),
  },
  (table) => {
    return {
      reviewAuthorMarketIdUnique: unique("review_author_market_id_unique").on(
        table.marketId,
        table.author,
      ),
      reviewAuthorVendorIdUnique: unique("review_author_vendor_id_unique").on(
        table.author,
        table.vendorId,
      ),
    };
  },
);

export const reviewLike = pgTable("review_like", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),
  reviewId: varchar("review_id")
    .notNull()
    .references(() => review.id),
  userId: varchar("user_id")
    .notNull()
    .references(() => user.id),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
});

export const reviewAspect = pgTable(
  "review_aspect",
  {
    id: varchar("id", { length: 20 }).primaryKey().notNull(),
    name: text("name").notNull(),
    rating: integer("rating").notNull(),
    reviewId: varchar("review_id")
      .notNull()
      .references(() => review.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
  },
  (table) => {
    return {
      reviewAspectIdReviewIdUnique: unique(
        "review_aspect_id_review_id_unique",
      ).on(table.id, table.reviewId),
    };
  },
);

export const mediaFiles = pgTable("media_files", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),
  mediaUrl: varchar("media_url", { length: 2000 }).notNull(),
  type: text("type").notNull(),
  vendorId: varchar("vendor_id")
    .notNull()
    .references(() => vendor.id),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
});

export const favourites = pgTable("favourites", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),
  marketId: varchar("market_id").references(() => market.id),
  userId: varchar("user_id")
    .notNull()
    .references(() => user.id),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
  vendorId: varchar("vendor_id").references(() => vendor.id),
});

export const userPreferences = pgTable("user_preferences", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),
  userId: varchar("user_id", { length: 20 }).references(() => user.id),
  interests: jsonb("interests"),
  dietaryRequirements: jsonb("dietary_requirements"),
  ageGroup: varchar("age_group"),
  country: varchar("country", { length: 50 }),
  gender: varchar("gender", { length: 20 }),
  otherPreferences: jsonb("other_preferences"),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }),
});

export const vendor = pgTable(
  "vendor",
  {
    id: varchar("id", { length: 20 }).primaryKey().notNull(),
    name: text("name").notNull(),
    nameTh: text("name_th"),
    about: text("about").notNull(),
    aboutTh: text("about_th"),
    priceRange: varchar("price_range").notNull(),
    marketId: varchar("market_id")
      .notNull()
      .references(() => market.id),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
    code: varchar("code", { length: 4 }).notNull(),
    bannerUrl: varchar("banner_url", { length: 2000 }),
    logoUrl: varchar("logo_url", { length: 2000 }),
    ingredients: text("ingredients"),
    ingredientsTh: text("ingredients_th"),
    ownerName: text("owner_name"),
    ownerTelephone: text("owner_telephone"),
    isVerified: boolean("is_verified").default(false),
  },
  (table) => {
    return {
      vendorCodeUnique: unique("vendor_code_unique").on(table.code),
    };
  },
);

export const paymentOption = pgTable("payment_option", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),
  name: text("name").notNull(),
  nameTh: text("name_th"),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
});

export const informationItem = pgTable("information_item", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),
  vendorId: varchar("vendor_id").references(() => vendor.id),
  imageUrl: varchar("imageUrl", { length: 2000 }),
  name: text("name"),
  description: text("description"),
  sequence: integer("sequence"),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
});

export const uniqueService = pgTable("unique_service", {
  id: varchar("id", { length: 20 }).primaryKey().notNull(),
  marketId: varchar("market_id")
    .notNull()
    .references(() => market.id),
  imageUrl: varchar("image_url", { length: 2000 }),
  name: varchar("name", { length: 100 }).notNull(),
  nameTh: varchar("name_th", { length: 100 }),
  about: text("about").notNull(),
  aboutTh: text("about_th"),
  price: integer("price").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
});

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
  (table) => {
    return {
      marketsOnTagsMarketIdTagIdPk: primaryKey({
        columns: [table.marketId, table.tagId],
        name: "markets_on_tags_market_id_tag_id_pk",
      }),
    };
  },
);

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
  (table) => {
    return {
      vendorOnPaymentOptionVendorIdPaymentOptionIdPk: primaryKey({
        columns: [table.vendorId, table.paymentOptionId],
        name: "vendor_on_payment_option_vendor_id_payment_option_id_pk",
      }),
    };
  },
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
  (table) => {
    return {
      vendorsOnTagsVendorIdTagIdPk: primaryKey({
        columns: [table.vendorId, table.tagId],
        name: "vendors_on_tags_vendor_id_tag_id_pk",
      }),
    };
  },
);
