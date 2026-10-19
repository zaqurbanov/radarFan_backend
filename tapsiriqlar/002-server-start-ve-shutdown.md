# 002 — `server.ts`: düzgün start və graceful shutdown

**Faza:** 0 · **Asılılıq:** 001 · **Status:** [x] Həll olunub
(Köhnə `TASKS.md`: T6)

## Məqsəd
Server start xətalarını düzgün tutsun və dayandırılanda (deploy, Ctrl+C) açıq bağlantıları səliqə ilə bağlasın.

## Niyə
- İndi `app.listen(...)` `await` olunmur, buna görə `try/catch` heç vaxt işləmir. Port məşğuldursa, xəta "unhandled rejection" kimi düşür.
- Sənəd (bölmə 9–10): WebSocket bağlantıları, outbox, fon tapşırıqları olacaq. Deploy zamanı server qəfil öldürülsə, yarımçıq tranzaksiyalar və qırılmış WS bağlantıları yaranır.
- Postgres pool və Redis bağlantısı açıq qalırsa, testlər (task 012) "asılı qalır".

## Necə edəcəksən
1. `listen`-i `await` et. Xəta olarsa logla və `exit(1)`.
2. `console.log` ilə `app.log.info`-nu təkrarlama, biri kifayətdir (Fastify logger).
3. `SIGINT` və `SIGTERM` siqnallarını dinlə. Siqnal gələndə:
   - `app.close()` (Fastify yeni sorğu qəbul etməyi dayandırır, mövcudları bitirir);
   - DB pool-u bağla;
   - Redis-i bağla (`quit` və `disconnect` fərqini araşdır).
4. Bağlanma qaydasını Fastify-ın `onClose` hook-u ilə qur: hər resurs öz bağlanmasını qeydiyyatdan keçirsin. Bu, sonradan WS və queue əlavə edəndə işini asanlaşdıracaq.
5. Shutdown üçün timeout qoy (məs. 10 san.). Bitməzsə, məcburi çıx.

## Tələlər
- `process.exit()` loglar yazılmamış çağırılsa, son loglar itə bilər.
- İki dəfə Ctrl+C: shutdown-un iki dəfə başlamasının qarşısını al.

## Öyrən
- Fastify `onClose` hook, `app.close()`
- Unix siqnalları: SIGTERM (Docker/Kubernetes) və SIGINT

## Qəbul meyarları
- [ ] Port məşğul olanda server aydın xəta ilə dayanır (exit code 1).
- [ ] Ctrl+C sonrası loglarda "DB closed", "Redis closed" ardıcıllığı görünür, proses asılı qalmır.
