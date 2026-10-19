# 008 — Vahid cavab formatı

**Faza:** 0 · **Asılılıq:** yoxdur · **Status:** [ ]
(Köhnə `TASKS.md`: T8-in birinci hissəsi)

## Məqsəd
Bütün uğurlu cavablar eyni formada olsun: `{ data: ..., request_id: "..." }`.

## Niyə
- Sənəd (bölmə 8, "Formatlar və xətalar"): "Uğur: {data: object, request_id: string}".
- İndi `/demo-launch-token` `req_id`, digərləri `request_id` qaytarır. Frontend hər endpoint üçün ayrıca kod yazmalı olacaq.
- `request_id` dəstəyə müraciət zamanı loqlarda sorğunu tapmaq üçündür (bölmə 10, monitorinq).

## Necə edəcəksən
1. Hər route-da `{data, request_id: req.id}` əl ilə yazmaq əvəzinə mərkəzi həll düşün. Variantlar:
   - helper funksiya (`ok(req, data)`),
   - Fastify `onSend`/`preSerialization` hook-u ilə avtomatik bükmə.
   Hər birinin mənfi və müsbət tərəfini yaz. (Hook bəzən istəmədiyin cavabları da bükür: health check, WS upgrade, partner webhook cavabları.)
2. `request_id` mənbəyi: `genReqId` artıq UUID yaradır. Əgər frontend və ya proxy `X-Request-Id` başlığı göndərirsə, onu qəbul etmək istəyirsən? (Fastify `requestIdHeader` seçimi.) Etibarsız istifadəçi girişini loga yazmaq riskini düşün.
3. Cavab başlığına da `X-Request-Id` əlavə et ki, frontend xətanı göstərəndə ID-ni göstərə bilsin.

## Qəbul meyarları
- [ ] Bütün mövcud endpoint-lər `data` və `request_id` qaytarır.
- [ ] Cavabda `X-Request-Id` başlığı var və body-dəki ilə eynidir.
