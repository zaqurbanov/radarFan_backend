# 010 — Gələn məlumatın yoxlanması (validasiya)

**Status:** [ ] · **Faza:** 0 · **Əvvəl bitməli:** 009

## Qısaca
Hər endpoint-ə gələn məlumat (body, query, URL parametrləri) **işləmə vaxtı** yoxlansın. Səhvdirsə → `400 INVALID_INPUT`.

## Niyə lazımdır?
- `req.body as {...}` yalnız TypeScript-i susdurur. Real sorğuda body `null`, rəqəm, boş ola bilər, TS bunu bilmir.
- İndi səhv `launch_token` göndərsən, server 500 qaytarır. 400 olmalıdır.
- Gələcəkdə OpenAPI sənədi (task 122) bu sxemlərdən **avtomatik** yaranacaq.

## Nə edəcəksən
1. Zod artıq layihədədir (task 001). Fastify ilə işləmək üçün `fastify-type-provider-zod` paketini araşdır.
2. Hər route üçün sxem yaz: `body`, `querystring`, `params`. **Cavab** (`response`) sxemi də yaz.
3. `/events` üçün:
   - `sport`: yalnız `football` və ya `basketball`;
   - `limit`: 1–50 arası tam ədəd, default 20;
   - `favorites`: `true`/`false`.
   Bundan sonra `limitHelper` lazım olmayacaq.
4. Sxemləri modulun öz faylında saxla (məs. `events.schemas.ts`).

## Niyə cavab sxemi də lazımdır?
Səhvən gizli sahə çölə çıxmasın deyə. Məsələn, viktorinada düzgün cavab (`correct_option_id`) cavaba təsadüfən düşsə, sxem onu kəsir.

## Diqqət
- Query parametrləri həmişə **string** gəlir: `limit=10` → `"10"`. Rəqəmə çevirmək lazımdır (zod-da `coerce`).
- İstifadəçi əlavə sahə göndərsə (məs. `xp: 9999`), server onu **nəzərə almamalıdır**.

## Hazır olduğunu necə yoxlayarsan
- [ ] `/auth/exchange` boş body ilə → 400.
- [ ] `/auth/exchange` səhv token ilə → 401 (500 yox).
- [ ] `/events?sport=tennis` → 400.
- [ ] `/events?limit=500` → 400 və ya 50-yə endirilir (birini seç).
