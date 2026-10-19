# 033 — `GET /events/{id}`

**Faza:** 2 · **Asılılıq:** 030 · **Status:** [ ]

## Məqsəd
Bir matçın tam məlumatı: event, bütün market-lər, otaq xülasəsi.

## Niyə
- Sənəd (bölmə 8): `GET /events/{id}` → `event, markets, room_summary`.
- Sayt: "Центр матча" ekranı (hesab, dəqiqə, demo-statistika, əmsallar, "Пульс комьюнити" son mesaj, "Обсудить матч", "Пройти баттл"). Kupondan qayıdanda kartın bərpası üçün də lazımdır (bölmə 2).

## Cavab
- `event`: lentdəki kart ilə eyni sahələr (eyni serializer istifadə et!)
- `markets[]` (outcomes ilə)
- `stats` (task 034)
- `room_summary`: { room_id, active_users, last_message: { nickname, text, created_at } | null, poll_id } (task 050–059-dan sonra doldurulur)
- `is_favorite`

## Necə edəcəksən
1. Event-i həm `id`, həm `tenant_id` ilə axtar. Başqa tenant-ın event-i → **404**, 403 yox. Niyə? (403 "bu mövcuddur, amma sənin deyil" məlumatını verir.)
2. Lent kartı və detal üçün ortaq `serializeEvent()`. İki yerdə fərqli format = frontend xətası.
3. `id` UUID formatında deyilsə → 400 (params validasiyası), yoxsa Postgres xətası 500 verir.

## Qəbul meyarları
- [ ] Başqa tenant-ın event id-si → 404.
- [ ] Etibarsız UUID → 400.
