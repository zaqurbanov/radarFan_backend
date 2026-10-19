# 108 — Kupon API

**Faza:** 9 · **Asılılıq:** 107, 029 · **Status:** [ ]

## Məqsəd
Kupona outcome əlavə et, sil, təmizlə, oxu.

## Niyə
Sayt: kartda əmsala klik → kupona əlavə ("Выбери коэффициент, чтобы добавить исход в демо-купон."), eyni matçın başqa outcome-u → əvəz edir, "Удалить", "Очистить купон".

## Endpoint-lər
| Metod | Yol | Body | Qeyd |
|---|---|---|---|
| GET | /coupon | | seçimlər + hər birinin **cari** qiyməti, dəyişib-dəyişmədiyi, mövcudluğu + ümumi əmsal |
| PUT | /coupon/selections/{event_id} | `{ outcome_id }` | əlavə və ya əvəz (idempotent) |
| DELETE | /coupon/selections/{event_id} | | |
| DELETE | /coupon | | təmizlə |

## Necə edəcəksən
1. Əlavə edəndə: outcome mövcuddur, `available` (029), entitlement `betting_handoff` (022)?
2. **GET zamanı canlı yoxlama:** seçimdən sonra qiymət dəyişibsə → `price_changed: true`, `current_price`; suspended → `available: false`. Ümumi əmsal cari qiymətlərlə.
3. Bitmiş matçın seçimi avtomatik silinsin? Yoxsa "əlçatmaz" kimi göstərilsin? İkincisi daha şəffafdır.
4. Analitika: `outcome_selected` (119).

## Qəbul meyarları
- [ ] Eyni matçın ikinci outcome-u birincini əvəz edir.
- [ ] Qiymət dəyişəndə GET bunu göstərir.
- [ ] Ümumi əmsal: 2.85 × 1.72 → "4.90".
