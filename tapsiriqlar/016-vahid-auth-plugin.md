# 016 — Vahid auth plugin və `req.user` tipi

**Faza:** 1 · **Asılılıq:** 013 · **Status:** [ ]
(Köhnə `TASKS.md`: T11)

## Məqsəd
Bütün qorunan route-lar bir mexanizmlə yoxlansın və `req.user` tipli olsun.

## Niyə
- İndi `/me` əl ilə `req.jwtVerify()` çağırır, `events` `preHandler` hook istifadə edir, tip isə hər yerdə `as {user_id, tenant_id}` ilə verilir. Yeni route əlavə edəndə yoxlamanı unutmaq asandır.
- Sənəd (bölmə 8): "/auth/exchange istisna olmaqla bütün endpoint-lər daxili sessiya tələb edir". Default "qorunur" olmalıdır, istisnalar açıq yazılmalıdır.
- Sənəd (bölmə 6): "Tenant query-dən və ya JSON gövdəsindən deyil, yoxlanmış sessiyadan götürülür."

## Necə edəcəksən
1. `fastify-plugin` (`fp`) ilə `auth` plugin-i yarat. Encapsulation-u öyrən: `fp` olmadan hook-lar yalnız plugin daxilində işləyir.
2. Strategiya seç:
   - **Default qorunur:** bütün `/api/v1` üçün hook, public route-lar `config: { public: true }` ilə işarələnir;
   - **Açıq qoruma:** qorunan route-lar ayrıca qrupda.
   Tövsiyə: default qorunur, çünki unutmaq "açıq qalmaq" deyil, "bağlı qalmaq" deməkdir.
3. Declaration merging ilə `FastifyRequest`-ə `user: { id, tenantId, role }` (və ya `@fastify/jwt`-nin `FastifyJWT` interfeysi) əlavə et. `as` cast-ları sil.
4. Token-dən sonra DB-dən istifadəçini oxumaq lazımdırmı? Hər sorğuda bir SELECT bahadır, amma user `banned` olsa, token 15 dəq. işləyir. Bu, task 018-in mövzusudur. İndi sadəcə qeyd et.
5. `jwt_preHandler` faylını sil.

## Qəbul meyarları
- [ ] Heç bir route-da `as { user_id ... }` qalmayıb.
- [ ] Yeni route-u heç nə yazmadan əlavə edəndə o, qorunur (test).
- [ ] `/auth/exchange`, `/health`, demo route-ları token-siz işləyir.
