import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { markets } from "./markets.schema.js";
import { outcomeStatusEnum } from "@/common/enums/enums.js";
export const outcomes = pgTable("outcomes", {
    id: uuid("id").defaultRandom().primaryKey(),
    marketId: uuid("market_id")
        .references(() => markets.id, { onDelete: "cascade" })
        .notNull(),
    providerId: varchar("provider_id", { length: 100 }).notNull(),
    key: varchar("key", { length: 20 }).notNull(), // 'home' | 'draw' | 'away'
    price: varchar("price", { length: 20 }).notNull(), // Məsələn: "1.72"
    status: outcomeStatusEnum("status").default("active").notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
});
//# sourceMappingURL=outcomes.schema.js.map