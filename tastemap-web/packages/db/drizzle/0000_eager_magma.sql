-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
DO $$ BEGIN
 CREATE TYPE "key_status" AS ENUM('default', 'valid', 'invalid', 'expired');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "key_type" AS ENUM('aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_type" AS ENUM('totp', 'webauthn');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_status" AS ENUM('unverified', 'verified');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "aal_level" AS ENUM('aal1', 'aal2', 'aal3');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "code_challenge_method" AS ENUM('s256', 'plain');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('User', 'Admin', 'Market', 'Vendor');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "promotion" (
	"id" varchar(20) PRIMARY KEY NOT NULL,
	"image_url" varchar(2000),
	"name" text NOT NULL,
	"name_th" text,
	"description" text NOT NULL,
	"description_th" text,
	"price" integer NOT NULL,
	"expiry_date" timestamp NOT NULL,
	"vendor_id" varchar NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" varchar(20) PRIMARY KEY NOT NULL,
	"external_id" varchar NOT NULL,
	"username" varchar(50),
	"firstName" text,
	"lastName" text,
	"role" text,
	"imageUrl" varchar(2000),
	"birthday" varchar,
	"telephone" varchar(10),
	"email" text NOT NULL,
	"email_verified" varchar,
	"created_at" timestamp DEFAULT now(),
	"preferences" varchar(20),
	CONSTRAINT "user_external_id_unique" UNIQUE("external_id"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "market" (
	"id" varchar(20) PRIMARY KEY NOT NULL,
	"banner_url" varchar(2000),
	"type" varchar(50) NOT NULL,
	"name" text NOT NULL,
	"name_th" text,
	"about" text NOT NULL,
	"about_th" text,
	"history" text NOT NULL,
	"history_th" text,
	"created_at" timestamp DEFAULT now(),
	"code" varchar(4) NOT NULL,
	"latitude" numeric,
	"longitude" numeric,
	"is_verified" boolean DEFAULT false,
	CONSTRAINT "market_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tag" (
	"id" varchar(20) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"type" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "opening_hour" (
	"id" varchar(20) PRIMARY KEY NOT NULL,
	"market_id" varchar,
	"day_of_week" varchar(50) NOT NULL,
	"open" time NOT NULL,
	"close" time NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"vendor_id" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "event_banner" (
	"id" varchar(20) PRIMARY KEY NOT NULL,
	"image_url" varchar(2000),
	"name" text,
	"date" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "review" (
	"id" varchar(20) PRIMARY KEY NOT NULL,
	"rating" integer NOT NULL,
	"content" text NOT NULL,
	"market_id" varchar,
	"author" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"vendor_id" varchar,
	CONSTRAINT "review_author_market_id_unique" UNIQUE("market_id","author"),
	CONSTRAINT "review_author_vendor_id_unique" UNIQUE("author","vendor_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "review_like" (
	"id" varchar(20) PRIMARY KEY NOT NULL,
	"review_id" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "review_aspect" (
	"id" varchar(20) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"rating" integer NOT NULL,
	"review_id" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "review_aspect_id_review_id_unique" UNIQUE("id","review_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "media_files" (
	"id" varchar(20) PRIMARY KEY NOT NULL,
	"media_url" varchar(2000) NOT NULL,
	"type" text NOT NULL,
	"vendor_id" varchar NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "favourites" (
	"id" varchar(20) PRIMARY KEY NOT NULL,
	"market_id" varchar,
	"user_id" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"vendor_id" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_preferences" (
	"id" varchar(20) PRIMARY KEY NOT NULL,
	"user_id" varchar(20),
	"interests" jsonb,
	"dietary_requirements" jsonb,
	"age_group" varchar,
	"country" varchar(50),
	"gender" varchar(20),
	"other_preferences" jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vendor" (
	"id" varchar(20) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"name_th" text,
	"about" text NOT NULL,
	"about_th" text,
	"price_range" varchar NOT NULL,
	"market_id" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"code" varchar(4) NOT NULL,
	"banner_url" varchar(2000),
	"logo_url" varchar(2000),
	"ingredients" text,
	"ingredients_th" text,
	"owner_name" text,
	"owner_telephone" text,
	"is_verified" boolean DEFAULT false,
	CONSTRAINT "vendor_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payment_option" (
	"id" varchar(20) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"name_th" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "information_item" (
	"id" varchar(20) PRIMARY KEY NOT NULL,
	"vendor_id" varchar,
	"imageUrl" varchar(2000),
	"name" text,
	"description" text,
	"sequence" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "unique_service" (
	"id" varchar(20) PRIMARY KEY NOT NULL,
	"market_id" varchar NOT NULL,
	"image_url" varchar(2000),
	"name" varchar(100) NOT NULL,
	"name_th" varchar(100),
	"about" text NOT NULL,
	"about_th" text,
	"price" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "native_user" (
	"id" bigint PRIMARY KEY NOT NULL,
	"phone_number" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "native_user_phone_number_key" UNIQUE("phone_number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "native_book" (
	"id" bigint PRIMARY KEY NOT NULL,
	"user_id" bigint NOT NULL,
	"date" timestamp with time zone DEFAULT now() NOT NULL,
	"type" text NOT NULL,
	"category" text NOT NULL,
	"amount" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "markets_on_tags" (
	"market_id" varchar NOT NULL,
	"tag_id" varchar NOT NULL,
	CONSTRAINT markets_on_tags_market_id_tag_id_pk PRIMARY KEY("market_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vendor_on_payment_option" (
	"vendor_id" varchar NOT NULL,
	"payment_option_id" varchar NOT NULL,
	CONSTRAINT vendor_on_payment_option_vendor_id_payment_option_id_pk PRIMARY KEY("vendor_id","payment_option_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vendors_on_tags" (
	"vendor_id" varchar NOT NULL,
	"tag_id" varchar NOT NULL,
	CONSTRAINT vendors_on_tags_vendor_id_tag_id_pk PRIMARY KEY("vendor_id","tag_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "promotion" ADD CONSTRAINT "promotion_vendor_id_vendor_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "opening_hour" ADD CONSTRAINT "opening_hour_market_id_market_id_fk" FOREIGN KEY ("market_id") REFERENCES "market"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "opening_hour" ADD CONSTRAINT "opening_hour_vendor_id_vendor_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "review" ADD CONSTRAINT "review_author_user_external_id_fk" FOREIGN KEY ("author") REFERENCES "user"("external_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "review" ADD CONSTRAINT "review_market_id_market_id_fk" FOREIGN KEY ("market_id") REFERENCES "market"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "review" ADD CONSTRAINT "review_vendor_id_vendor_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "review_like" ADD CONSTRAINT "review_like_review_id_review_id_fk" FOREIGN KEY ("review_id") REFERENCES "review"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "review_like" ADD CONSTRAINT "review_like_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "review_aspect" ADD CONSTRAINT "review_aspect_review_id_review_id_fk" FOREIGN KEY ("review_id") REFERENCES "review"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "media_files" ADD CONSTRAINT "media_files_vendor_id_vendor_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favourites" ADD CONSTRAINT "favourites_market_id_market_id_fk" FOREIGN KEY ("market_id") REFERENCES "market"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favourites" ADD CONSTRAINT "favourites_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favourites" ADD CONSTRAINT "favourites_vendor_id_vendor_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vendor" ADD CONSTRAINT "vendor_market_id_market_id_fk" FOREIGN KEY ("market_id") REFERENCES "market"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "information_item" ADD CONSTRAINT "information_item_vendor_id_vendor_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "unique_service" ADD CONSTRAINT "unique_service_market_id_market_id_fk" FOREIGN KEY ("market_id") REFERENCES "market"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "native_book" ADD CONSTRAINT "native_book_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "native_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "markets_on_tags" ADD CONSTRAINT "markets_on_tags_market_id_market_id_fk" FOREIGN KEY ("market_id") REFERENCES "market"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "markets_on_tags" ADD CONSTRAINT "markets_on_tags_tag_id_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vendor_on_payment_option" ADD CONSTRAINT "vendor_on_payment_option_payment_option_id_payment_option_id_fk" FOREIGN KEY ("payment_option_id") REFERENCES "payment_option"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vendor_on_payment_option" ADD CONSTRAINT "vendor_on_payment_option_vendor_id_vendor_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vendors_on_tags" ADD CONSTRAINT "vendors_on_tags_tag_id_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vendors_on_tags" ADD CONSTRAINT "vendors_on_tags_vendor_id_vendor_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/