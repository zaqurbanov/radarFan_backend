# 009 — Xəta kodları sistemi

**Faza:** 0 · **Asılılıq:** 008 · **Status:** [ ]
(Köhnə `TASKS.md`: T8-in ikinci hissəsi)

## Məqsəd
Bütün xətalar sənəddəki formatda olsun: `{ error: { code, message, retryable, details }, request_id }`.

## Niyə
- Sənəd (bölmə 8): "Müştəri məntiq üçün code-dan istifadə edir və message-i lokallaşdırır". Frontend `ODDS_CHANGED` gələndə yeni qiyməti göstərməli, `RATE_LIMITED`-də gözləməlidir. Mətn mesajına əsaslanmaq olmaz (dil dəyişir).
- `retryable` frontend-ə "təkrar cəhd düyməsini göstər" deyir (bölmə 2: "təkrar cəhdlə error").

## Kodlar (sənəddən)
| HTTP | code | retryable |
|---|---|---|
| 400 | INVALID_INPUT | false |
| 401 | SESSION_EXPIRED | false (yeniləmə ilə həll olunur) |
| 403 | ACCESS_DENIED, USER_RESTRICTED | false |
| 404 | NOT_FOUND | false |
| 409 | ANSWER_LOCKED, CHALLENGE_NOT_READY, ODDS_CHANGED, OUTCOME_UNAVAILABLE, IDEMPOTENCY_CONFLICT | false |
| 410 | BATTLE_EXPIRED | false |
| 429 | RATE_LIMITED (`details.retry_after_seconds`) | true |
| 500 | INTERNAL | true |
| 503 | FEED_UNAVAILABLE | true |

Saytdan əlavə lazım olacaq: `INSUFFICIENT_COINS` (mağaza, 409), `ALREADY_OWNED` (409), `PREDICTION_CLOSED` (409). Bunları da cədvələ əlavə et.

## Necə edəcəksən
1. `AppErrors`-u yenidən dizayn et: `code`, `statusCode`, `retryable`, `details` sahələri.
2. Kodları bir yerdə saxla (`as const` obyekt və ya enum) ki, yazı xətası olmasın.
3. Error handler-də 3 növ xətanı ayır:
   - `AppError` → olduğu kimi;
   - Fastify validasiya xətası → `INVALID_INPUT` + `details` (hansı sahə);
   - JWT xətası → `SESSION_EXPIRED`;
   - qalan hər şey → 500 `INTERNAL`, mesajda daxili detal **göstərmə**, amma loga tam yaz.
4. 404 route tapılmadıqda (`setNotFoundHandler`) da eyni format.

## Tələlər
- `message` daxili məlumat (SQL, stack) açmamalıdır.
- DB unique pozuntusu (`23505`) çox vaxt 409-a çevrilməlidir, 500-ə yox. Bunu handler-də necə tanıyacaqsan?

## Qəbul meyarları
- [ ] Mövcud olmayan route → 404 `NOT_FOUND` formatında.
- [ ] Etibarsız token → 401 `SESSION_EXPIRED`.
- [ ] Atılmış adi `Error` → 500, cavabda stack yoxdur, logda var.
