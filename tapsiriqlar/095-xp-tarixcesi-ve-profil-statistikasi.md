# 095 — XP tarixçəsi və profil sayğacları

**Status:** [ ] · **Faza:** 6 · **Əvvəl bitməli:** 083, 037, 079

## Qısaca
Profil ekranı üçün XP tarixçəsi və qısa statistika.

## Saytda (profil)
- "ПРОГРЕСС 150 XP"
- "2 завершённых игр · 0 избранных матчей"
- "История XP": "Quiz Battle · 2 верных +100", "Quiz Battle · 1 верных +50"

## Endpoint-lər
| Metod | Yol | Cavab |
|---|---|---|
| GET | /me/xp-history | jurnal sətirləri: miqdar, mənbə, əlavə (`correct: 2`), vaxt |
| GET | /me | `counters`: bitmiş oyunlar, seçilmişlər |

## Nə edəcəksən
1. Tarixçə = `xp_ledger`, yenidən köhnəyə, cursor ilə (031-dəki qayda).
2. "Quiz Battle · 2 верных" mətnini **frontend** qurur (mənbə + əlavə məlumatdan). Backend hazır mətn qaytarmır.
3. Sayğaclar: hər dəfə `COUNT` (kiçik ədədlər üçün OK). Böyüyəndə balans cədvəlinə köçür.

## Hazır olduğunu necə yoxlayarsan
- [ ] 2 duel-dən sonra tarixçədə 2 sətir, hər birində düzgün cavab sayı.
