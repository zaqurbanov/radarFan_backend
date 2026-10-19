# 011 — Request ID, logger və həssas məlumatların gizlədilməsi

**Faza:** 0 · **Asılılıq:** 008 · **Status:** [ ]

## Məqsəd
Loglar strukturlaşdırılmış, sorğu üzrə izlənə bilən olsun və token və mesaj mətni kimi həssas məlumat loglara düşməsin.

## Niyə
- Sənəd (bölmə 10): "loqların tokenlərdən və mesaj mətnindən qorunması tələb olunur". "Hər sorğunun request_id-si, handoff-un correlation_id-si var."
- Fastify logger default olaraq `req.headers`-i loga yazmır, amma sən öz kodunda `req.body`-ni loglasan, `launch_token` loga düşür.

## Necə edəcəksən
1. Pino-nun `redact` seçimini araşdır. Gizlədiləcək yollar: `req.headers.authorization`, `*.launch_token`, `*.access_token`, `*.handoff_token`, `*.text` (mesaj mətni), `*.ticket`.
2. Lokal üçün `pino-pretty`, production üçün JSON. Env-ə görə seç.
3. Log səviyyəsi env-dən (`LOG_LEVEL`).
4. Hər log sətrində `request_id`, mümkünsə `tenant_id` və `user_id` olsun. Auth-dan sonra child logger-ə necə əlavə edərsən? (`req.log.child`)
5. `external_user_id` də həssasdır (bölmə 7: "müştəri analitikasına daxil olmur"). Loglarda daxili `user_id` istifadə et.

## Qəbul meyarları
- [ ] `/auth/exchange` sorğusundan sonra logda launch token görünmür.
- [ ] Authorization başlığı logda `[Redacted]` kimi görünür.
- [ ] Auth olmuş sorğunun logunda `user_id` və `tenant_id` var.
