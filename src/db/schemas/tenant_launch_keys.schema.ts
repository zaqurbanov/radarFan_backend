import { pgTable, text, timestamp, unique, uuid, varchar } from "drizzle-orm/pg-core";
import { tenants } from "./tenants.schema.js";

export const tenantLaunchKeys = pgTable("tenant_launch_keys", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  tenant_id: uuid("tenant_id")
    .notNull()
    .references(() => tenants.id),
  kid: varchar("kid", { length: 100 }).notNull(),
  algorithm: varchar("algorithm", { length: 20 }).notNull(),
  public_key: text('public_key').notNull(),
  issuer: varchar("issuer", { length: 255 }).notNull(),
  status: varchar("status", { length: 20 }).default('active').notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(), 
  retired_at: timestamp("retired_at", { withTimezone: true })
},
(table)=>[
  unique('tenant_launch_keys_tenant_kid_unique').on(table.tenant_id, table.kid),
]
);
