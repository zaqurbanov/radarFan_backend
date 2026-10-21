# 009 — Xəta kodları sistemi

**Status:** [ ] · **Faza:** 0 · **Əvvəl bitməli:** 008

## Qısaca
Hər xəta bu formada qayıtsın:
```
{
  "error": { "code": "ODDS_CHANGED", "message": "...", "retryable": false, "details": { ... } },
  "request_id": "..."
}
```

## Niyə lazımdır?
- Frontend **mətnə** yox, **koda** baxır. Mətn dilə görə dəyişir, kod dəyişmir.
- Məsələn: `ODDS_CHANGED` gəlsə, frontend yeni qiyməti göstərir. `RATE_LIMITED` gəlsə, gözləyir.
- `retryable: true` frontend-ə "Təkrar cəhd et" düyməsini göstərməyi deyir.

## Kodlar
| HTTP | Kod | Nə vaxt |
|---|---|---|
| 400 | `INVALID_INPUT` | Səhv məlumat göndərilib |
| 401 | `SESSION_EXPIRED` | Token yoxdur, səhvdir və ya bitib |
| 403 | `ACCESS_DENIED` | İcazə yoxdur |
| 403 | `USER_RESTRICTED` | İstifadəçi ban və ya mute olunub |
| 404 | `NOT_FOUND` | Tapılmadı |
| 409 | `ANSWER_LOCKED` | Cavab artıq verilib |
| 409 | `CHALLENGE_NOT_READY` | Tapşırıqlar bitməyib |
| 409 | `ODDS_CHANGED` | Əmsal dəyişib |
| 409 | `OUTCOME_UNAVAILABLE` | Əmsal bağlıdır |
| 409 | `IDEMPOTENCY_CONFLICT` | Eyni açar, fərqli məlumat |
| 409 | `INSUFFICIENT_COINS` | Coin çatmır (mağaza) |
| 409 | `ALREADY_OWNED` | Əşya artıq alınıb |
| 410 | `BATTLE_EXPIRED` | Duel vaxtı bitib |
| 429 | `RATE_LIMITED` | Çox tez-tez sorğu (`retryable: true`) |
| 500 | `INTERNAL` | Gözlənilməz xəta (`retryable: true`) |
| 503 | `FEED_UNAVAILABLE` | Matç məlumatı gəlmir (`retryable: true`) |

## Nə edəcəksən
1. `AppErrors` sinfinə `code`, `retryable`, `details` sahələrini əlavə et.
2. Bütün kodları bir faylda saxla ki, yazı xətası olmasın.
3. Error handler-də xətaları növünə görə ayır:
   - bizim `AppError` → olduğu kimi qaytar;
   - validasiya xətası → `INVALID_INPUT` (hansı sahə səhvdir, `details`-də);
   - JWT xətası → `SESSION_EXPIRED`;
   - qalan hər şey → `500 INTERNAL`.
4. Mövcud olmayan route da (404) eyni formada qayıtsın.

## Diqqət
- 500 xətasında istifadəçiyə **heç vaxt** daxili detal göstərmə (SQL, stack trace). Bunlar yalnız loga yazılır.
- DB "unique" xətası (Postgres kodu `23505`) adətən 409 olmalıdır, 500 yox.

## Hazır olduğunu necə yoxlayarsan
- [ ] Mövcud olmayan URL → 404 `NOT_FOUND` formatında.
- [ ] Səhv token → 401 `SESSION_EXPIRED`.
- [ ] Kodda adi `throw new Error()` → 500, cavabda stack yoxdur, logda var.
