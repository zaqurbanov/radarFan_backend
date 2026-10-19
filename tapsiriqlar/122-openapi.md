# 122 — OpenAPI spesifikasiyası

**Faza:** 12 · **Asılılıq:** 010 · **Status:** [ ]

## Məqsəd
Bütün REST API-nin maşın oxunaqlı sənədi.

## Niyə
Sənəd (bölmə 8): "Hadisələrin və JSON modellərinin sxemi proqramçı tərəfindən OpenAPI-də sahələrin məcburiliyi, nullable və enum ilə tərtib edilir." Bölmə 11: təhvil dəstinə OpenAPI daxildir.

## Necə edəcəksən
1. `@fastify/swagger` + `@fastify/swagger-ui`. Sxemlər (010) avtomatik OpenAPI-yə çevrilir. Sxemləri düzgün yazmısansa, iş az qalıb.
2. Hər endpoint üçün: `summary`, `tags` (modul), xəta cavabları (009 kodları ilə), `security` (bearer / partner imzası).
3. Nullable və enum-lar düzgün görünürmü? Yoxla.
4. `/docs` yalnız demo/staging-də açıq, production-da bağlı (və ya auth ilə).
5. Spesifikasiyanı fayl kimi export et (`openapi.json`) və repoda saxla. CI-da dəyişikliyi yoxla (127).
6. Frontend tipləri bu fayldan generasiya edə bilər (`openapi-typescript`).

## Qəbul meyarları
- [ ] Bütün endpoint-lər sənəddə, hər birində ən azı bir xəta cavabı.
- [ ] `openapi.json` repoda və aktualdır.
