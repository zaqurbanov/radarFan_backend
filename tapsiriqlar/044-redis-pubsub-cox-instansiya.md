# 044 — Bir neçə server üçün Redis pub/sub

**Status:** [ ] · **Faza:** 3 · **Əvvəl bitməli:** 042

## Qısaca
İstifadəçi A **server-1**-ə, istifadəçi B **server-2**-yə qoşulub. A-nın mesajı B-yə də çatsın.

## Niyə lazımdır?
- Production-da ən azı 2 server olmalıdır (biri düşəndə xidmət dayanmasın).
- Hər server yalnız **öz** bağlantılarını bilir (task 039). Server-1 bilmir ki, B server-2-dədir.

## Necə işləyir
1. Server-1 mesajı Redis-ə **yayımlayır** (publish).
2. Bütün serverlər Redis-dən **alır** (subscribe).
3. Hər server mesajı öz bağlantılarına çatdırır.

## Nə edəcəksən
1. Pub/sub üçün **ayrıca** Redis bağlantısı aç. Abunə olmuş bağlantı başqa əmrlər işlədə bilmir.
2. Kanal adına tenant əlavə et: `rt:t:{tenant}:room:{id}`. Əlavə təhlükəsizlik qatı.
3. Logout siqnalı da bu yolla gedir: "sessiya X-in bağlantılarını bağla" (043).

## Diqqət
- Redis pub/sub "göndər və unut"-dur. Server həmin anda qoşulmayıbsa, mesaj itir. Bunu sıra nömrəsi + bərpa (048) kompensasiya edir.
- Sənin `.env.test` dev Redis-in 1-ci bazasını istifadə edir. **Pub/sub bazalara bölünmür!** Testdə yayımlanan mesaj dev serverinə də çatacaq. Bunu bil.

## Hazır olduğunu necə yoxlayarsan
- [ ] İki server qaldır (3001 və 3002 portlarında). Birinə qoşulanın mesajı digərinə qoşulana çatır.
