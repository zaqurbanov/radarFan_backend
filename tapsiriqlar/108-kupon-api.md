# 108 — Kupon endpoint-ləri

**Status:** [ ] · **Faza:** 9 · **Əvvəl bitməli:** 107, 029

## Qısaca
Kupona seçim əlavə et, sil, təmizlə, oxu.

## Saytda
Əmsala klik → kupona əlavə. Eyni matçın başqa əmsalı → köhnəni **əvəz edir**. "Удалить", "Очистить купон".

## Endpoint-lər
| Metod | Yol | Nə edir |
|---|---|---|
| GET | /coupon | seçimlər + **cari** qiymətlər + dəyişib? + əlçatandır? + ümumi əmsal |
| PUT | /coupon/selections/{event_id} | `{ outcome_id }`: əlavə və ya əvəz |
| DELETE | /coupon/selections/{event_id} | bir seçimi sil |
| DELETE | /coupon | hamısını sil |

## Nə edəcəksən
1. Əlavə edəndə: əmsal var, əlçatandır (029), `betting_handoff` icazəsi var (022).
2. **GET-də canlı yoxla:** seçimdən sonra qiymət dəyişibsə → `price_changed: true` + yeni qiymət. Bağlanıbsa → `available: false`. Ümumi əmsal **cari** qiymətlərlə.
3. Bitmiş matçın seçimi: avtomatik sil, yoxsa "əlçatmaz" göstər? İkincisi daha şəffafdır.

## Hazır olduğunu necə yoxlayarsan
- [ ] Eyni matçın ikinci seçimi birincini əvəz edir.
- [ ] Qiymət dəyişəndə GET bunu göstərir.
- [ ] 2.85 × 1.72 → "4.90".
