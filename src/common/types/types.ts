import type { eventStatusEnum, marketStatusEnum, marketTypeEnum, outcomeStatusEnum, sportEnum, userRoleEnum, userStatusEnum } from "../enums/enums.js";

export type UserRoleType =(typeof userRoleEnum.enumValues)[number]

export type UserStatusType =(typeof userStatusEnum.enumValues)[number]

export type SportType =(typeof sportEnum.enumValues)[number]

export type EventStatusType =(typeof eventStatusEnum.enumValues)[number]

export type MarketTypeType =(typeof marketTypeEnum.enumValues)[number]

export type MarketStatusType =(typeof marketStatusEnum.enumValues)[number]

export type OutcomeStatusType =(typeof outcomeStatusEnum.enumValues)[number]

