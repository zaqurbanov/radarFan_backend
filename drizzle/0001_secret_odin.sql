CREATE TABLE "tenant_launch_keys" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"kid" varchar(100) NOT NULL,
	"algorithm" varchar(20) NOT NULL,
	"public_key" text NOT NULL,
	"issuer" varchar(255) NOT NULL,
	"status" varchar(20) DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"retired_at" timestamp with time zone,
	CONSTRAINT "tenant_launch_keys_tenant_kid_unique" UNIQUE("tenant_id","kid")
);
--> statement-breakpoint
ALTER TABLE "tenant_launch_keys" ADD CONSTRAINT "tenant_launch_keys_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;