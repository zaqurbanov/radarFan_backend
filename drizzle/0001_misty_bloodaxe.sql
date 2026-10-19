CREATE TYPE "public"."event_status" AS ENUM('scheduled', 'live', 'finished', 'postponed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."market_status" AS ENUM('open', 'suspended', 'closed');--> statement-breakpoint
CREATE TYPE "public"."market_type" AS ENUM('football_1x2', 'basketball_moneyline');--> statement-breakpoint
CREATE TYPE "public"."outcome_status" AS ENUM('active', 'suspended');--> statement-breakpoint
CREATE TYPE "public"."sport" AS ENUM('football', 'basketball');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('user', 'moderator', 'admin');--> statement-breakpoint
CREATE TYPE "public"."user_status" AS ENUM('active', 'muted', 'banned');--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"provider_id" varchar(100) NOT NULL,
	"sport" "sport" NOT NULL,
	"league" varchar(150) NOT NULL,
	"teams" jsonb NOT NULL,
	"status" "event_status" DEFAULT 'scheduled' NOT NULL,
	"score" jsonb,
	"period" varchar(50),
	"editorial_note" varchar(255),
	"start_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "events_tenant_provider_unique" UNIQUE("tenant_id","provider_id")
);
--> statement-breakpoint
CREATE TABLE "markets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_id" uuid NOT NULL,
	"provider_id" varchar(100) NOT NULL,
	"type" "market_type" NOT NULL,
	"rules" varchar(255) NOT NULL,
	"status" "market_status" DEFAULT 'open' NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "outcomes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"market_id" uuid NOT NULL,
	"provider_id" varchar(100) NOT NULL,
	"key" varchar(20) NOT NULL,
	"price" varchar(20) NOT NULL,
	"status" "outcome_status" DEFAULT 'active' NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "favorites" (
	"tenant_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"event_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "favorites_tenant_id_user_id_event_id_pk" PRIMARY KEY("tenant_id","user_id","event_id")
);
--> statement-breakpoint
ALTER TABLE "tenants" RENAME COLUMN "rulesVersion" TO "rules_version";--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "markets" ADD CONSTRAINT "markets_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "outcomes" ADD CONSTRAINT "outcomes_market_id_markets_id_fk" FOREIGN KEY ("market_id") REFERENCES "public"."markets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "events_tenant_status_start_idx" ON "events" USING btree ("tenant_id","status","start_at");--> statement-breakpoint
CREATE INDEX "favorites_tenant_user_idx" ON "favorites" USING btree ("tenant_id","user_id");