import { index, pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";
import { tenants } from "./tenants.schema.js";
import { users } from "./users.schema.js";
import { events } from "./events.schema.js";

export const favorites = pgTable(
  "favorites",
  {
    tenantId: uuid("tenant_id")
      .references(() => tenants.id)
      .notNull(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    eventId: uuid("event_id")
      .references(() => events.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.tenantId, table.userId, table.eventId] }),
    index("favorites_tenant_user_idx").on(table.tenantId, table.userId),
  ]
);