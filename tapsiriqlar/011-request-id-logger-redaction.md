# 011 — Loglar: səliqəli və təhlükəsiz

**Status:** [x] Həll olunub · **Faza:** 0 · **Əvvəl bitməli:** 008

## Qısaca
Loglar strukturlu olsun, hər sətirdə `request_id` olsun və **gizli məlumat** (token, mesaj mətni) loglara düşməsin.

## Niyə lazımdır?
- Sənəd (bölmə 10): "loqların tokenlərdən və mesaj mətnindən qorunması tələb olunur".
- Loglar çox yerdə saxlanır və çox adam görür. Token loga düşsə, o adam istifadəçinin adından daxil ola bilər.

## Nə edəcəksən
1. Fastify-ın logger-i Pino-dur. Pino-nun `redact` seçimini araşdır. Bunları gizlət:
   - `Authorization` başlığı;
   - `launch_token`, `access_token`, `handoff_token`, `ticket`;
   - mesaj mətni (`text`).
2. Lokalda oxunaqlı log (`pino-pretty`), production-da JSON. Bunu `NODE_ENV`-ə görə seç.
3. Log səviyyəsi env-dən gəlsin (`LOG_LEVEL`).
4. Auth-dan sonra hər log sətrinə `user_id` və `tenant_id` əlavə et (`req.log.child` araşdır).

## Diqqət
`external_user_id` (bukmekerdəki istifadəçi ID-si) də həssasdır. Loglarda bizim daxili `user_id`-ni istifadə et.

## Hazır olduğunu necə yoxlayarsan
- [x] `/auth/exchange` sorğusundan sonra logda launch token görünmür (standart log body yazmır; `redact` sığorta kimi var).
- [x] `Authorization` başlığı loga düşmür (Fastify onu yazmır); yazılsa belə `[REDACTED]` olur (8 halın hamısı sınanıb).
- [x] Giriş etmiş istifadəçinin `request completed` və handler loglarında `user_id` və `tenant_id` var (`/events` üçün; `/me` üçün task 016-dan sonra).

---

## Bağlanış qeydi: nə edildi
- **`src/config/logger.ts`** (yeni): bütün log ayarları bir yerdədir, `app.ts`-də yalnız `logger: loggerOptions`.
- **`redact`**: həssas açarların siyahısı (`launch_token`, `access_token`, `refresh_token`, `handoff_token`, `ticket`, `token`, `password`, `text`, `authorization`, `cookie`). Pino-da `*` yalnız **bir** səviyyəni əvəz etdiyi üçün hər açara 3 dərinlik yazılır: `key`, `*.key`, `*.*.key` (siyahı koda `flatMap` ilə avtomatik yığılır).
- **URL maskalaması**: `req` serializer-i `url`-dəki `?ticket=`, `?token=` və s. parametrlərin dəyərini `[REDACTED]` edir (task 040-da WebSocket bileti URL-də gedəcək).
- **`LOG_LEVEL`** env-dən (`fatal`...`silent`, default `info`), `env.ts`-də zod ilə yoxlanılır, `.env.example`-ə əlavə olunub.
- **Dev-də oxunaqlı log**: `pino-pretty` yalnız `NODE_ENV=development`-də. Production-da `transport` sahəsi **ümumiyyətlə yoxdur** (`exactOptionalPropertyTypes` səbəbindən `transport: undefined` yazmaq olmur, buna görə `...(isDevelopment && {...})`).
- **`user_id` və `tenant_id`**: `jwt_preHandler` giriş yoxlanandan sonra uşaq logger yaradır (`req.log.child(...)`). `external_user_id` bilərəkdən yazılmır (həssasdır).

## Yoxlama nəticələri (8 + 1 hal)
Uydurma secret dəyərləri ilə sınandı, hamısı **0 dəfə** loga düşdü:
top-level `launch_token`, `body.launch_token`, `req.headers.authorization`, `headers.authorization`, `req.body.launch_token`, `body.text`, top-level `text`, `err.config.token` (iki səviyyə dərinlikdə), URL-dəki `?ticket=`. Real JWT (`eyJ...`) də logda yoxdur.

## Öyrənilən dərslər
- Fastify-ın **standart** logu başlıqları və body-ni yazmır. Əsas risk: **URL** (query string ilə birlikdə yazılır) və **sənin özünün yazdığın** `log.info(...)` çağırışları.
- `*` bir səviyyə əvəz edir. Top-level açar üçün ulduzsuz yol, iki səviyyə üçün `*.*.` lazımdır.
- `req.headers.authorization` yolu Fastify-ın `req` serializer-i səbəbindən əslində loga heç düşmürdü. `redact` burada **sığortadır**, əsas müdafiə deyil.
- `request.log` və `reply.log` **ayrı** sahələrdir. `request completed` sətrinə `user_id` düşməsi üçün ikisini də dəyişmək lazımdır.
- `exactOptionalPropertyTypes: true` aktivdirsə, ixtiyari sahəyə açıq `undefined` yazmaq olmur. Sahəni **ümumiyyətlə əlavə etməmək** lazımdır.
- TypeScript `Fastify({...})`-də ayar uyğunsuzluğu olanda xətanı sonuncu (HTTP/2) overload üzərindən göstərir və 9 xəta kaskad edir. **Ən yuxarı xətanı düzəlt.**

## Bilməli olduğun məhdudiyyətlər
- `incoming request` sətrində `user_id` **olmur**: o, giriş yoxlanmamışdan əvvəl yazılır. Sorğunun bütün sətirlərini `reqId` birləşdirir.
- `/me` hələ `jwt_preHandler` istifadə etmir (əl ilə `jwtVerify`), ona görə orada `user_id` yoxdur. Task 016 (vahid auth plugin) bunu həll edəcək.
- Redact **adla** işləyir. Adı siyahıda olmayan həssas sahə (məs. `secretValue`) gizlənməz. Əsas qayda: həssas məlumatı ümumiyyətlə **loglama**.

## Sonraya saxlananlar
- [ ] `/me` üçün `user_id`/`tenant_id` (task 016).
- [ ] Yeni həssas açar əlavə olunsa (məs. 036-da Idempotency-Key) `SENSITIVE_KEYS`-ə yaz.

