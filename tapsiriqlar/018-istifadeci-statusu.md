# 018 — İstifadəçi statusu (active / muted / banned)

**Faza:** 1 · **Asılılıq:** 016 · **Status:** [ ]

## Məqsəd
Status dəyişikliyi dərhal təsir etsin: `banned` heç nə edə bilməsin, `muted` mesaj yaza bilməsin.

## Niyə
- Sənəd (bölmə 4): moderator "göndərməni müvəqqəti qadağan edə bilər". Bölmə 8: 403 `USER_RESTRICTED`. Bölmə 4: "Server room-a girişi, **hesabın statusunu** və limiti yoxlayır".
- `users.status` enum artıq var (`active, muted, banned`), amma heç yerdə istifadə olunmur.

## Cədvəllər
Mute **müvəqqətidir** (`expires_at`, bölmə 8: `POST /moderation/users/{id}/mute` → reason, expires_at). Tək `status` sütunu bitmə vaxtını saxlamır.

`users`-ə əlavə: `muted_until` timestamptz NULL. Daha yaxşısı: task 068-də `user_restrictions` cədvəli (tarixçə ilə). İndi minimal: `muted_until`.

Qayda: `muted_until > now()` → muted. Beləliklə vaxt bitəndə heç bir fon tapşırığı lazım olmur.

## Necə edəcəksən
1. Auth plugin-də (016) `banned` yoxlaması: hər sorğuda DB-dən oxumaq vs Redis-də "banned set" vs token versiyası. Variantları müqayisə et:
   - DB SELECT hər sorğuda: sadə, ~1 ms;
   - Redis keş: sürətli, amma invalidasiya lazımdır;
   - `users.token_version`: ban zamanı artır, token-də versiya var, uyğunsuzsa → 401.
   Tövsiyə: başlanğıcda sadə DB oxunuşu (user onsuz da çox route-da lazımdır), sonra yük testi (task 124) göstərsə keş.
2. `muted` yoxlaması yalnız yazma əməliyyatlarında: mesaj göndərmə. Səs vermə və like? Qərar ver.
3. `banned` → 403 `USER_RESTRICTED`, `muted` → 403 `USER_RESTRICTED` + `details.until`.

## Qəbul meyarları
- [ ] Ban olunmuş istifadəçinin mövcud token-i növbəti sorğuda 403 alır.
- [ ] `muted_until` keçəndən sonra istifadəçi yenidən yaza bilir, heç bir job olmadan.
