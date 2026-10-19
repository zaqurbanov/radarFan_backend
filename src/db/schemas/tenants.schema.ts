import { integer, jsonb, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";



export const tenants = pgTable('tenants', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: varchar('slug',{length:100}).notNull().unique(),
  config: jsonb('config').notNull(),
  timezone: varchar('timezone').notNull(),
  rulesVersion: integer('rules_version').default(1).notNull(),
  createdAt: timestamp('created_at',{withTimezone: true}).defaultNow().notNull(),
  updatedAt: timestamp('updated_at',{withTimezone: true}).defaultNow().$onUpdate(() => new Date()).notNull(),
});