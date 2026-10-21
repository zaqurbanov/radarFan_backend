# 016 — Bütün route-lar üçün bir auth mexanizmi

**Status:** [ ] · **Faza:** 1 · **Əvvəl bitməli:** 013

## Qısaca
Bütün qorunan route-lar eyni yolla yoxlansın. `req.user` hər yerdə hazır tipli olsun.

## Niyə lazımdır?
- İndi `/me` token-i əl ilə yoxlayır, `/events` isə hook ilə. Tip isə hər yerdə `as {...}` ilə verilir.
- Yeni route əlavə edəndə yoxlamanı **unutmaq asandır**. Unudulmuş yoxlama = açıq qapı.
- Sənəd: `/auth/exchange`-dən başqa **bütün** endpoint-lər giriş tələb edir.

## Ən vacib qərar: default "bağlı" olsun
- **Default qorunur:** bütün route-lar avtomatik qorunur. Açıq olanları (health, exchange) xüsusi işarələyirsən.
- **Default açıq:** qorunacaqları ayrıca işarələyirsən.

Birincini seç. Unutsan, route **bağlı** qalır, açıq yox. Bu, daha təhlükəsizdir.

## Nə edəcəksən
1. `fastify-plugin` ilə `auth` plugin-i yaz. Niyə `fastify-plugin`? Onsuz hook yalnız plugin-in daxilində işləyir. "Encapsulation" mövzusunu oxu.
2. Açıq route-ları `config: { public: true }` kimi işarələ.
3. `req.user`-in tipini bir yerdə təyin et: `{ id, tenantId, role }`. Bütün `as {...}` yazılarını sil.
4. Köhnə `jwt_preHandler` faylını sil.

## Hazır olduğunu necə yoxlayarsan
- [ ] Kodda heç bir yerdə `as { user_id ... }` qalmayıb.
- [ ] Heç nə yazmadan yeni route əlavə edəndə o, avtomatik qorunur (test).
- [ ] `/auth/exchange`, `/health`, demo route-ları token-siz işləyir.
