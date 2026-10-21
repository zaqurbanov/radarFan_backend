# 122 — API sənədi (OpenAPI / Swagger)

**Status:** [ ] · **Faza:** 12 · **Əvvəl bitməli:** 010

## Qısaca
Bütün REST API-nin avtomatik sənədi.

## Niyə lazımdır?
- Sənəd tələb edir: sahələrin məcburiliyi, boş ola bilənlər, icazəli dəyərlər.
- Frontend proqramçısı hansı endpoint-in nə qəbul edib nə qaytardığını burada görür.
- Təhvil verilən paketə daxildir.

## Nə edəcəksən
1. `@fastify/swagger` + `@fastify/swagger-ui`. Task 010-da sxemləri düzgün yazmısansa, sənəd **avtomatik** yaranır.
2. Hər endpoint üçün: qısa izah, bölmə (tag), xəta cavabları (009), giriş tələbi.
3. `/docs` səhifəsi: demo və staging-də açıq, production-da bağlı.
4. Sənədi fayl kimi saxla (`openapi.json`) və repoya əlavə et.
5. Frontend bu fayldan tipləri avtomatik yarada bilər (`openapi-typescript`).

## Hazır olduğunu necə yoxlayarsan
- [ ] Bütün endpoint-lər sənəddədir, hər birində ən azı bir xəta cavabı.
- [ ] `openapi.json` repodadır və aktualdır.
