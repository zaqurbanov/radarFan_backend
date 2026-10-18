import { pgEnum } from "drizzle-orm/pg-core";


export const userRoleEnum = pgEnum('user_role', ['user', 'moderator', 'admin']);

export const userStatusEnum = pgEnum('user_status', ['active', 'muted', 'banned']);

export const sportEnum = pgEnum('sport', ['football', 'basketball']);

export const eventStatusEnum = pgEnum("event_status", [
  "scheduled",
  "live",
  "finished",
  "postponed",
  "cancelled",
]);

export const marketTypeEnum = pgEnum("market_type", [
  "football_1x2",
  "basketball_moneyline",
]);
export const marketStatusEnum = pgEnum("market_status", [
  "open",
  "suspended",
  "closed",
]);
export const outcomeStatusEnum = pgEnum("outcome_status", [
  "active",
  "suspended",
]);