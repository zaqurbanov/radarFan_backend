# 033 — Bir matçın səhifəsi: `GET /events/{id}`

**Status:** [ ] · **Faza:** 2 · **Əvvəl bitməli:** 030

## Qısaca
Bir matçın tam məlumatı: matç, bütün bazarlar, statistika, otaq xülasəsi.

## Saytda
"Центр матча": hesab, dəqiqə, statistika, əmsallar, çatın son mesajı, "Обсудить матч", "Пройти баттл" düymələri.

## Cavab
- `event`: lentdəki kartla **eyni forma**
- `markets`: bütün bazarlar, nəticələrlə
- `stats`: statistika (task 034)
- `room_summary`: otaq ID-si, aktiv say, son mesaj (çat hazır olanda, 050–058)
- `is_favorite`

## Nə edəcəksən
1. Matçı həm `id`, həm `tenant_id` ilə axtar.
2. Lent kartı və bu səhifə üçün **bir** formatlama funksiyası yaz. İki yerdə fərqli format = frontend-də xəta.
3. `id` UUID deyilsə → 400 (yoxsa Postgres 500 verər).

## Diqqət: başqa tenant-ın matçı → 404, 403 yox
403 "bu var, amma sənin deyil" məlumatını verir. 404 heç nə demir. Başqasının resursu üçün həmişə 404.

## Hazır olduğunu necə yoxlayarsan
- [ ] Başqa tenant-ın matç ID-si → 404.
- [ ] Səhv formatlı ID → 400.
