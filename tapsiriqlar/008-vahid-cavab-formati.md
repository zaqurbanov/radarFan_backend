# 008 — Bütün cavablar eyni formada

**Status:** [x] Həll olunub · **Faza:** 0 · **Əvvəl bitməli:** yoxdur

## Qısaca
Hər uğurlu cavab bu formada olsun:
```
{ "data": { ... }, "request_id": "..." }
```

## Niyə lazımdır?
- Sənəd belə tələb edir (bölmə 8).
- İndi bir endpoint `req_id`, digəri `request_id` qaytarır. Frontend hər endpoint üçün ayrı kod yazmalı olur.
- `request_id` dəstək üçündür: istifadəçi "xəta oldu" deyəndə bu ID ilə loglarda həmin sorğunu tapırsan.

## Nə edəcəksən
1. Bütün endpoint-ləri gəz, cavabları `{ data, request_id }` formasına sal. `req_id` olan yerləri düzəlt.
2. Hər route-da bunu əl ilə yazmaq əvəzinə kiçik bir köməkçi funksiya yaz. Məsələn `ok(req, data)`.
3. Cavab başlığına (header) da `X-Request-Id` əlavə et. Frontend xəta göstərəndə bu ID-ni istifadəçiyə göstərə bilər.

## Hazır olduğunu necə yoxlayarsan
- [x] Bütün endpoint-lər `data` və `request_id` qaytarır (`req_id` heç yerdə qalmayıb).
- [x] Cavab başlığında `X-Request-Id` var (200, 401, 404-də) və body-dəki ilə eynidir.

## Diqqət
Avtomatik bükmə (hook ilə hər cavabı bükmək) də mümkündür, amma bəzi cavablar bükülməməlidir: health check, WebSocket, bukmekerin webhook-ları. Ona görə köməkçi funksiya daha sadə və aydındır.

---

## Bağlanış qeydi: nə edildi
- `src/common/responses/success.ts`: `successResponse<T>(data, req)`. Generic tipli, `request_id` məcburidir, `success` sahəsi yoxdur.
- Bütün endpoint-lər ona keçib: `/health`, `/demo-launch-token`, `/auth/exchange`, `/me`, `/events`.
- `app.ts`-də `onSend` hook-u hər cavaba `x-request-id` başlığı yazır (uğurda da, xətada da, 404-də də).
- `requestIdHeader` seçimi **silindi**: onsuz client başlıqla öz ID-sini yeridə bilmir (test edilib: `EVIL-123` geri qayıtmadı). Server həmişə özü UUID yaradır.
- Xəta cavabında açar `request_id` (snake_case) olur, uğur cavabı ilə eyni.

## Sonraya saxlananlar (task 009)
- Xəta cavabının tam forması: `{ error: { code, message, retryable, details }, request_id }`. İndi hələ `{ error: "...", request_id }`.
- 404 (olmayan route) hələ Fastify-ın standart cavabını verir: `setNotFoundHandler` lazımdır.
