# 010 — Gələn məlumatın yoxlanması (validasiya)

**Status:** [x] Həll olunub · **Faza:** 0 · **Əvvəl bitməli:** 009

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
- [x] `/auth/exchange` boş body ilə → 400 `INVALID_INPUT`.
- [x] `/auth/exchange` səhv token ilə → 401 `SESSION_EXPIRED` (500 yox).
- [x] `/events?sport=tennis` → 400.
- [x] `/events?limit=500` → 400 (seçilən qayda: rədd etmək, endirmək yox).

---

## Bağlanış qeydi: nə edildi
- `fastify-type-provider-zod` quraşdırıldı. `app.ts`-də **bir dəfə**: `.withTypeProvider<ZodTypeProvider>()`, `setValidatorCompiler`, `setSerializerCompiler`.
- Hər route faylında: `const app = rawApp.withTypeProvider<ZodTypeProvider>()`. Beləcə `req.body` və `req.query` **tipli** gəlir, `as` cast-ı və əl ilə yoxlama lazım olmur.
- `/auth/exchange`: `body: z.object({ launch_token: z.string().min(1) })`.
- `/events`: `querystring` sxemi:
  - `sport`: `z.enum(sportEnum.enumValues)` (bazadakı enum-dan götürülür, siyahı təkrar yazılmır);
  - `favorites`: `z.enum(['true','false'])` (`coerce.boolean` istifadə **olunmur**, çünki `"false"` mətni `true` sayılır);
  - `limit`: `z.coerce.number().int().min(1).max(50)` (mətn əvvəl **ədədə** çevrilir, sonra yoxlanılır).
- Validasiya xətası error handler-in ikinci budağında `details`-ə çevrilir: `{ in: "body|querystring|params", fields: [{ path, message }] }`.

## Öyrənilən dərslər
- Validasiya **hook ilə yox, route sxemi ilə** edilir. Hook route-un nə gözlədiyini bilmir, sxem isə route-un öz faylında yaşayır. Fastify handler-dən **əvvəl** yoxlayır, səhvdirsə handler işə düşmür.
- `z.string().min(1).max(50)` **uzunluğu** yoxlayır, `z.number().min(1).max(50)` isə **dəyəri**. Eyni söz, fərqli məna. Query parametrləri həmişə mətn gəlir, əvvəl `coerce.number()` ilə ədədə çevirmək lazımdır.
- `error.validation` **massivdir** (hər səhv sahə üçün bir element) və yalnız validasiya xətalarında olur (`?.map` lazımdır). `schemaPath` daxili detaldır, müştəriyə göndərilmir.
- `plugin`-ə (`authRoutes(app)`) ötürülən `app` zod tip provayderini itirir. Hər route faylında `withTypeProvider`-i yenidən çağırmaq lazımdır.

## Sonraya saxlananlar
- [ ] `app.ts`-dəki 3 müvəqqəti `console.log` silinməlidir.
- [ ] `/events`-də `limit` üçün `.transform(String)` və `limitHelper` artıq lazımsızdır: `.default(20)` yaz, `limitHelper`-i sil (task 031-də `/events`-ə toxunanda).
- [ ] **Cavab sxemi** (`response`): cavabda səhvən artıq sahə sızmasın (məs. `correct_option_id`). Task 072-dən (viktorina) əvvəl mütləq lazımdır.
- [ ] `events.routes.ts`: `req.user as {...}` cast-ı task 016-da (vahid auth plugin) aradan qalxacaq.

