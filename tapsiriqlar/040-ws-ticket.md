# 040 — WebSocket üçün qısa bilet

**Status:** [ ] · **Faza:** 3 · **Əvvəl bitməli:** 039

## Qısaca
WebSocket-ə qoşulmaq üçün 30 saniyəlik, **bir dəfəlik** bilet istifadə et. Access token URL-ə yazılmasın.

## Niyə lazımdır?
- Brauzer WebSocket-ə başlıq (`Authorization`) göndərməyə imkan vermir. Ona görə token URL-ə yazılır: `wss://...?token=...`.
- URL-lər proxy və server **loglarına yazılır**. 15 dəqiqəlik token logda = oğurlanmış sessiya.
- Bilet isə 30 saniyə yaşayır və bir dəfə işləyir. Loga düşsə belə yararsızdır.

## Axın
1. Frontend: `POST /ws-ticket` (adi access token ilə) → `{ ticket, expires_at }`.
2. Frontend: `wss://.../api/v1/ws?ticket=...`.
3. Server bileti yoxlayır və **dərhal silir**.

## Nə edəcəksən
1. Bilet = təsadüfi 32 bayt (JWT lazım deyil).
2. Redis-də saxla: `ws_ticket:{bilet}` → istifadəçi, tenant, sessiya ID, rol. 30 saniyə ömür.
3. Qoşulanda **oxu və sil bir əmrdə** (Redis `GETDEL`). Niyə bir əmrdə? `/auth/exchange`-dəki nonce düzəlişini xatırla (`SET NX`).
4. Bilet səhvdirsə → bağlantını açmadan rədd et (401).

## Hazır olduğunu necə yoxlayarsan
- [ ] Bilet bir dəfə işləyir, ikinci dəfə 401.
- [ ] 30 saniyədən sonra işləmir.
- [ ] Access token URL-də heç yerdə yoxdur.
