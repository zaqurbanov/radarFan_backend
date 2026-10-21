# 011 — Loglar: səliqəli və təhlükəsiz

**Status:** [ ] · **Faza:** 0 · **Əvvəl bitməli:** 008

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
- [ ] `/auth/exchange` sorğusundan sonra logda launch token görünmür.
- [ ] `Authorization` başlığı logda `[Redacted]` kimi görünür.
- [ ] Giriş etmiş istifadəçinin sorğu logunda `user_id` və `tenant_id` var.
