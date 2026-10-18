import { index, jsonb, pgTable, timestamp, unique, uuid, varchar } from "drizzle-orm/pg-core";
import { tenants } from "./tenants.schema.js";
import { eventStatusEnum, sportEnum } from "@/common/enums/enums.js";

export const events = pgTable(
  "events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tenantId: uuid("tenant_id")
      .references(() => tenants.id)
      .notNull(),
    providerId: varchar("provider_id", { length: 100 }).notNull(),
    sport: sportEnum("sport").notNull(),
    league: varchar("league", { length: 150 }).notNull(),
    teams: jsonb("teams").$type<{ home: string; away: string }>().notNull(),
    status: eventStatusEnum("status").default("scheduled").notNull(),
    score: jsonb("score").$type<{ home: number; away: number } | null>(),
    period: varchar("period", { length: 50 }),
    editorialNote: varchar("editorial_note", { length: 255 }),
    startAt: timestamp("start_at", { withTimezone: true }).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    unique("events_tenant_provider_unique").on(table.tenantId, table.providerId),
    index("events_tenant_status_start_idx").on(
      table.tenantId,
      table.status,
      table.startAt,
    ),
  ]
);