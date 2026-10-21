# 008 — Bütün cavablar eyni formada

**Status:** [ ] · **Faza:** 0 · **Əvvəl bitməli:** yoxdur

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
- [ ] Bütün endpoint-lər `data` və `request_id` qaytarır.
- [ ] Cavab başlığında `X-Request-Id` var və body-dəki ilə eynidir.

## Diqqət
Avtomatik bükmə (hook ilə hər cavabı bükmək) də mümkündür, amma bəzi cavablar bükülməməlidir: health check, WebSocket, bukmekerin webhook-ları. Ona görə köməkçi funksiya daha sadə və aydındır.
