# 010 — Input validasiyası

**Faza:** 0 · **Asılılıq:** 009 · **Status:** [ ]
(Köhnə `TASKS.md`: T7)

## Məqsəd
Hər endpoint-in body, query və params-ı runtime-da yoxlansın. Etibarsız giriş 400 `INVALID_INPUT` qaytarsın.

## Niyə
- `req.body as {launch_token: string}` yalnız TypeScript-i susdurur. Runtime-da body `null`, rəqəm, massiv ola bilər. İndi etibarsız token 500 qaytarır.
- Sənəd (bölmə 10): "girişlərin yoxlanması" production tələbidir. Bölmə 4: mesaj validasiyası "müştəridə və serverdə eynidir".
- Yaxşı sxemlər task 122-də (OpenAPI) avtomatik sənədə çevriləcək.

## Necə edəcəksən
1. Yanaşma seç:
   - Fastify-ın daxili JSON Schema (Ajv) + `@fastify/type-provider-typebox`;
   - və ya `zod` + `fastify-type-provider-zod`.
   Hər ikisi OpenAPI çıxarır. Task 001-də zod seçmisənsə, ardıcıllıq üçün zod.
2. Hər route üçün `body`, `querystring`, `params`, `response` sxemlərini təyin et. `response` sxemi niyə vacibdir? (Səhvən artıq sahə, məs. `correct_option_id`, sızmasın — task 074!)
3. `/events` üçün: `sport` yalnız enum dəyəri, `limit` 1–50 tam ədəd, `favorites` boolean, `cursor` string. `limitHelper` artıq lazım olmayacaq.
4. Sxemləri modul daxilində ayrıca faylda saxla (`events.schemas.ts`).

## Tələlər
- Query-də hər şey string gəlir. `limit=10` → `"10"`. Coerce lazımdır.
- Əlavə (naməlum) sahələri nə edirsən: atırsan, yoxsa rədd edirsən? Server `xp_delta` kimi sahələri **nəzərə almamalıdır** (bölmə 10).

## Qəbul meyarları
- [ ] `/auth/exchange` boş body ilə → 400 `INVALID_INPUT`, etibarsız token ilə → 401.
- [ ] `/events?sport=tennis` → 400.
- [ ] `/events?limit=500` → 400 və ya 50-yə endirilir (qərarını yaz).
