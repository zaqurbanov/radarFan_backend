# 057 — Bitmiş matçın otağı bağlanır

**Status:** [ ] · **Faza:** 4 · **Əvvəl bitməli:** 050, 049

## Qısaca
Matç bitəndən **24 saat** sonra otaq "yalnız oxu" olur: tarixçə görünür, yazmaq və səs vermək olmur.

## Nə edəcəksən
1. İki yanaşmanı birlikdə istifadə et:
   - **Yazanda yoxla (əsas qoruma):** `matç bitib + 24 saat < indi` → rədd et. Bu, həmişə etibarlıdır.
   - **Fon işi (rahatlıq):** vaxt çatanda `rooms.status = read_only` et və hamıya bildiriş göndər.
2. Ləğv olunmuş (`cancelled`) matç: otaq dərhal bağlansın? Təxirə salınmış (`postponed`)? Qərar ver.
3. Yeni xəta kodu: `ROOM_READ_ONLY` (409).

## Hazır olduğunu necə yoxlayarsan
- [ ] Matç bitəndən 24 saat 1 dəqiqə sonra mesaj → rədd (testdə vaxtı saxta et).
- [ ] Bağlı otaqda tarixçə oxunur.
