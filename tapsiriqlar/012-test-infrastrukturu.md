# 012 — Test infrastrukturu

**Faza:** 0 · **Asılılıq:** 006, 007 · **Status:** [ ]

## Məqsəd
Avtomatik testlər yazmaq üçün baza hazır olsun: test DB, test Redis, app-i şəbəkəsiz test etmək.

## Niyə
- Sənəd (bölmə 11, təhvil): "kritik ssenarilərin avtomatik yoxlamaları". Qəbul meyarlarının çoxu (iki paralel claim bir ledger qeydi yaradır, eyni `client_message_id` dublikat yaratmır) **yalnız** testlə etibarlı yoxlanır.
- Bundan sonrakı hər task-ın qəbul meyarlarını test kimi yazmağı tövsiyə edirəm.

## Necə edəcəksən
1. Runner seç: `vitest` (ESM və TS ilə problemsiz) tövsiyə olunur.
2. `buildApp()` artıq ayrıca funksiyadır, bu yaxşıdır. Testdə `app.inject()` ilə HTTP sorğusu göndər, port açmadan.
3. Test DB: hər test faylından əvvəl migration, hər testdən əvvəl cədvəlləri təmizlə (`TRUNCATE ... CASCADE`) və ya hər testi tranzaksiyada işlət və rollback et. Fərqlərini araşdır.
4. Redis: ayrıca DB nömrəsi (`/1`) və ya test zamanı `FLUSHDB`.
5. Helper-lər: `createTenant()`, `createUser()`, `loginAs(user)` (access token qaytarır). Bunlar bütün sonrakı testlərdə lazım olacaq.
6. `db` və `redis` hazırda modul səviyyəsində singleton-dur. Test üçün başqa URL-ə qoşulmaları necə təmin edəcəksən? (Task 001-dəki env modulu.)
7. İlk testlər: `/health`, `/auth/exchange` (uğur, təkrar nonce, etibarsız token), `/events` tenant izolyasiyası.

## Öyrən
- Vitest: `beforeAll`, `beforeEach`, `globalSetup`
- Fastify `inject`
- Test piramidası: unit və integration

## Qəbul meyarları
- [ ] `npm test` lokal DB-ni deyil, test DB-ni istifadə edir.
- [ ] Ən azı 5 test keçir.
- [ ] Testlər iki dəfə ardıcıl işlədiləndə də keçir (məlumat qalmır).
