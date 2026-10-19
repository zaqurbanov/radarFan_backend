# 070 — Demo bot mesajları

**Faza:** 4 · **Asılılıq:** 053, 026 · **Status:** [ ]

## Məqsəd
Demo rejimdə otaqlar "canlı" görünsün: açıq işarələnmiş bot mesajları.

## Niyə
- Sayt: "Alex · демо", "Marta · демо" mesajları. Hər otaqda son mesaj ("Пять очков — ещё ничего не решено.", "Пока Ливерпуль чаще атакует.").
- Sənəd (bölmə 4): "MVP-də ... production-da uydurma iştirakçıların avtomatik cavabları yoxdur." Deməli **yalnız demo tenant-da** və həmişə işarəli.

## Necə edəcəksən
1. Demo bot istifadəçiləri: `users` cədvəlində `is_bot: true` sütunu (yeni) + nickname. Seed-də yarat (Alex, Marta, ...).
2. Mesajlar `messages.is_demo = true`. API-də `user.is_demo: true` → frontend "· демо" yazır.
3. Bot nə vaxt yazır? Variantlar: seed-də sabit mesajlar; job ilə vaxtaşırı; matç hadisəsinə reaksiya (qol olanda "Гол!").
4. **Qoruma:** demo bot kodu yalnız `tenants.mode = demo` olduqda işləyir. Production tenant üçün bot yaratmaq mümkün olmamalıdır.
5. Bot mesajları rate limit-ə və challenge-lərə düşmür.

## Qəbul meyarları
- [ ] Demo otaqlarda bot mesajları var, hamısı `is_demo: true`.
- [ ] Production tenant-da bot mesajı yaradıla bilmir (test).
