# 038 — Feed əlçatmazlığı (503 FEED_UNAVAILABLE)

**Faza:** 2 · **Asılılıq:** 025, 029 · **Status:** [ ]

## Məqsəd
Provayder dayananda sistem dürüst davransın: köhnə məlumatı "canlı" kimi göstərməsin, handoff-u bağlasın, amma lent və çat işləməyə davam etsin.

## Niyə
- Sənəd (bölmə 8): 503 `FEED_UNAVAILABLE`. Bölmə 10: "Məlumat axınının əlçatmazlığına ... alarmlar qurulmalıdır". Bölmə 11: "tərəfdaşın əlçatmazlığı yoxlanılıb".
- Bölmə 2: "Xəta vəziyyətinin göstərilməsi əvvəl yüklənmiş məzmunu silmir."

## Necə edəcəksən
1. Feed sağlamlığı: son uğurlu yeniləmənin vaxtı Redis-də (`feed:{tenant}:last_ok`). Hədd keçibsə → "degraded".
2. Degraded rejimdə davranış:
   | Endpoint | Davranış |
   |---|---|
   | GET /events | 200, köhnə məlumat + `feed_status: "degraded"`, bütün outcome-lar `available: false` |
   | POST /handoffs | 503 `FEED_UNAVAILABLE` |
   | Çat, oyunlar | normal |
   Lent 503 qaytarmalıdır, yoxsa 200 + status? Sənəd 503-ü verir, amma "əvvəlki məzmunu silmir" qaydası 200 + status-u dəstəkləyir. Qərar ver və əsaslandır.
3. Circuit breaker pattern haqqında oxu: provayder dayananda hər sorğuda ona müraciət etmə.
4. Monitorinq üçün metrik (task 125): `feed_lag_seconds`.

## Qəbul meyarları
- [ ] Demo feed dayandırılanda 15+ san. sonra outcome-lar əlçatmaz olur, lent isə işləyir.
- [ ] Feed bərpa olunanda avtomatik normal rejimə qayıdır.
