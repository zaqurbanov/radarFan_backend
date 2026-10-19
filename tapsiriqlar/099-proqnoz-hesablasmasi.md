# 099 — Proqnoz hesablaşması (settlement)

**Faza:** 7 · **Asılılıq:** 098, 028, 049 · **Status:** [ ]

## Məqsəd
Matç bitəndə pending proqnozlar avtomatik hesablansın.

## Niyə
- Sayt: "Демо-расчёт использует показанный счёт матчей." Düymə: "**Рассчитать демо-прогнозы**". Demo-da istifadəçi hesablaşmanı əl ilə başladır, çünki demo matçlar heç vaxt bitmir.
- Statuslar: Верный (+72 ед. = 100 × 1.72 − 100), Неверный (−100), Возврат (0).

## Qaydalar
| Vəziyyət | Status | return_units | Nəticə (profit) |
|---|---|---|---|
| Outcome qalib | won | stake × price | stake × (price − 1) |
| Outcome uduzdu | lost | 0 | −stake |
| Matç ləğv / market void | void | stake | 0 |

Qalibi təyin edən: `marketDefinitions[type].settle(final_score)` (028). Basketbolda OT daxil.

## Necə edəcəksən
1. Real rejim: event `finished` (feed, 027) → job (049) → `settleEvent(event_id)`:
   - bütün `pending` proqnozları seç (`FOR UPDATE SKIP LOCKED` batch-lərlə);
   - hər biri üçün status + return_units, `settled_at`;
   - idempotent: yalnız `pending`-ləri yeniləyir.
2. `cancelled` event → hamısı `void`.
3. **Demo rejim:** `POST /predictions/demo-settle`. Yalnız demo tenant-da (015). Cari (göstərilən) hesabla hesablayır. Bu, real rejimdə **heç vaxt** mövcud olmamalıdır. Niyə? Matç bitmədən "cari hesabla" hesablaşma = canlı matçda istifadəçi yalnız qalib gələnləri hesablatdıra bilər.
4. Pul hesablaması: `numeric` (027). JS-də `100 * 1.72` = `171.99999999999997`. **JS number ilə hesablama**. DB-də hesabla və ya decimal kitabxanası (`decimal.js`) istifadə et.
5. Feed hesabı sonradan düzəltsə (VAR qolu ləğv etdi)? Re-settlement. MVP üçün qeyd et, etmə.

## Qəbul meyarları
- [ ] 1.72 əmsallı qalib proqnoz → return 172.00, profit 72.00 (dəqiq).
- [ ] Ləğv olunmuş matç → void, profit 0.
- [ ] Settlement iki dəfə işləsə nəticə dəyişmir.
- [ ] Production tenant-da demo-settle → 404.
