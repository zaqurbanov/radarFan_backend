import { pgTable, timestamp, unique, uuid, varchar } from "drizzle-orm/pg-core";
import { tenants } from "./tenants.schema.js";
import { userRoleEnum, userStatusEnum } from "@/common/enums/enums.js";

export const users = pgTable('users',{
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId:uuid('tenant_id').references(()=>tenants.id).notNull(),
  externalUserId: varchar('external_user_id',{length:255}).notNull(),
  nickname: varchar('nickname',{length:255}).notNull(),
  role: userRoleEnum('role').notNull().default('user'),
  status: userStatusEnum('status').notNull().default('active'),
  createdAt: timestamp('created_at',{withTimezone: true}).defaultNow().notNull(),
  updatedAt: timestamp('updated_at',{withTimezone: true}).defaultNow().$onUpdate(() => new Date()).notNull(),
},(table)=>[
unique('users_tenant_external_user_unique').on(table.tenantId, table.externalUserId),])