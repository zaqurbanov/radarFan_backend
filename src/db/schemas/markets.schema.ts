import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { events } from "./events.schema.js";
import { marketStatusEnum, marketTypeEnum } from "@/db/schema.js";


export const markets = pgTable("markets", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id")
    .references(() => events.id, { onDelete: "cascade" })
    .notNull(),
  providerId: varchar("provider_id", { length: 100 }).notNull(),
  type: marketTypeEnum("type").notNull(),
  rules: varchar("rules", { length: 255 }).notNull(),
  status: marketStatusEnum("status").default("open").notNull(),
  version: integer("version").default(1).notNull(),
});