# 087 — Başlanğıc coin bonusu (300 ◈)

**Faza:** 6 · **Asılılıq:** 086 · **Status:** [ ]

## Məqsəd
Yeni istifadəçi bir dəfə 300 ◈ alsın.

## Niyə
Sayt: "300 ◈ на старте."

## Necə edəcəksən
1. Nə vaxt? İlk `/auth/exchange`-də istifadəçi yaradılanda, eyni tranzaksiyada.
2. `source_type = starting_bonus`, `source_id = user_id`. Unique constraint ikinci dəfəni bloklayır.
3. Miqdar tenant config-dən (`economy.starting_coins`).
4. Mövcud istifadəçilər (bu funksiya əlavə olunmazdan əvvəl yaradılanlar)? Migration/backfill skripti, və ya ilk `/me`-də lazy. Qərar ver.

## Qəbul meyarları
- [ ] Yeni istifadəçinin balansı 300.
- [ ] Təkrar exchange bonusu təkrar vermir.
