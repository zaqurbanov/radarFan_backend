import { CustomErrorCodes } from "../constants/errorCodes.js";

const {
  ACCESS_DENIED,
  NOT_FOUND,
  USER_RESTRICTED,
  ALREADY_OWNED,
  BATTLE_EXPIRED,
  RATE_LIMITED,
  ANSWER_LOCKED,
  CHALLENGE_NOT_READY,
  FEED_UNAVAILABLE,
  IDEMPOTENCY_CONFLICT,
  INSUFFICIENT_COINS,
  INTERNAL,
  INVALID_INPUT,
  ODDS_CHANGED,
  OUTCOME_UNAVAILABLE,
  SESSION_EXPIRED,
} = CustomErrorCodes;

// 1. T = unknown əlavə edildi ki, TypeScript T-ni tanısın
export class AppErrors<T = unknown> extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: string = "APP_ERROR",
    public retryable: boolean = false,
    public details?: T
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NotFoundError<T = unknown> extends AppErrors<T> {
  constructor(message: string = NOT_FOUND.message, details?: T) {
    super(message, NOT_FOUND.statusCode, NOT_FOUND.code, NOT_FOUND.retryable, details);
  }
}

export class BadRequestError<T = unknown> extends AppErrors<T> {
  constructor(message: string = INVALID_INPUT.message, details?: T) {
    super(message, INVALID_INPUT.statusCode, INVALID_INPUT.code, INVALID_INPUT.retryable, details);
  }
}

export class UnauthorizedError<T = unknown> extends AppErrors<T> {
  constructor(message: string = "Unauthorized", details?: T) {
    super(message, 401, "UNAUTHORIZED", false, details);
  }
}

export class SessionExpiredError<T = unknown> extends AppErrors<T> {
  constructor(message: string = SESSION_EXPIRED.message, details?: T) {
    super(message, SESSION_EXPIRED.statusCode, SESSION_EXPIRED.code, SESSION_EXPIRED.retryable, details);
  }
}

export class AccessDenied<T = unknown> extends AppErrors<T> {
  constructor(message: string = ACCESS_DENIED.message, details?: T) {
    super(message, ACCESS_DENIED.statusCode, ACCESS_DENIED.code, ACCESS_DENIED.retryable, details);
  }
}

export class UserRestricted<T = unknown> extends AppErrors<T> {
  constructor(message: string = USER_RESTRICTED.message, details?: T) {
    super(message, USER_RESTRICTED.statusCode, USER_RESTRICTED.code, USER_RESTRICTED.retryable, details);
  }
}

export class AlreadyOwned<T = unknown> extends AppErrors<T> {
  constructor(message: string = ALREADY_OWNED.message, details?: T) {
    super(message, ALREADY_OWNED.statusCode, ALREADY_OWNED.code, ALREADY_OWNED.retryable, details);
  }
}

export class BattleExpired<T = unknown> extends AppErrors<T> {
  constructor(message: string = BATTLE_EXPIRED.message, details?: T) {
    super(message, BATTLE_EXPIRED.statusCode, BATTLE_EXPIRED.code, BATTLE_EXPIRED.retryable, details);
  }
}

export class RateLimited<T = unknown> extends AppErrors<T> {
  constructor(message: string = RATE_LIMITED.message, details?: T) {
    super(message, RATE_LIMITED.statusCode, RATE_LIMITED.code, RATE_LIMITED.retryable, details);
  }
}

export class AnswerLocked<T = unknown> extends AppErrors<T> {
  constructor(message: string = ANSWER_LOCKED.message, details?: T) {
    super(message, ANSWER_LOCKED.statusCode, ANSWER_LOCKED.code, ANSWER_LOCKED.retryable, details);
  }
}

export class ChallengeNotReady<T = unknown> extends AppErrors<T> {
  constructor(message: string = CHALLENGE_NOT_READY.message, details?: T) {
    super(message, CHALLENGE_NOT_READY.statusCode, CHALLENGE_NOT_READY.code, CHALLENGE_NOT_READY.retryable, details);
  }
}

export class FeedUnavailable<T = unknown> extends AppErrors<T> {
  constructor(message: string = FEED_UNAVAILABLE.message, details?: T) {
    super(message, FEED_UNAVAILABLE.statusCode, FEED_UNAVAILABLE.code, FEED_UNAVAILABLE.retryable, details);
  }
}

export class IdempotencyConflict<T = unknown> extends AppErrors<T> {
  constructor(message: string = IDEMPOTENCY_CONFLICT.message, details?: T) {
    super(message, IDEMPOTENCY_CONFLICT.statusCode, IDEMPOTENCY_CONFLICT.code, IDEMPOTENCY_CONFLICT.retryable, details);
  }
}

export class InsufficientCoins<T = unknown> extends AppErrors<T> {
  constructor(message: string = INSUFFICIENT_COINS.message, details?: T) {
    super(message, INSUFFICIENT_COINS.statusCode, INSUFFICIENT_COINS.code, INSUFFICIENT_COINS.retryable, details);
  }
}

export class InternalError<T = unknown> extends AppErrors<T> {
  constructor(message: string = INTERNAL.message, details?: T) {
    super(message, INTERNAL.statusCode, INTERNAL.code, INTERNAL.retryable, details);
  }
}

export class OddsChanged<T = unknown> extends AppErrors<T> {
  constructor(message: string = ODDS_CHANGED.message, details?: T) {
    super(message, ODDS_CHANGED.statusCode, ODDS_CHANGED.code, ODDS_CHANGED.retryable, details);
  }
}

export class OutcomeUnavailable<T = unknown> extends AppErrors<T> {
  constructor(message: string = OUTCOME_UNAVAILABLE.message, details?: T) {
    super(message, OUTCOME_UNAVAILABLE.statusCode, OUTCOME_UNAVAILABLE.code, OUTCOME_UNAVAILABLE.retryable, details);
  }
}