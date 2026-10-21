# 039 — WebSocket server

**Status:** [ ] · **Faza:** 3 · **Əvvəl bitməli:** 016

## Qısaca
`/api/v1/ws` ünvanında WebSocket server qur. Bağlantıları qəbul etsin, mesajları oxusun, bağlantıların siyahısını saxlasın.

## Niyə lazımdır?
- Yeni çat mesajı, hesab dəyişikliyi, əmsal, XP: hamısı **dərhal** çatmalıdır.
- Sənəd: mesaj 1 saniyədə, hesab/əmsal 2 saniyədə çatmalıdır.
- Frontend hər saniyə "yeni nə var?" soruşsa (polling), server boğular.

## Nə edəcəksən
1. Kitabxana: `@fastify/websocket` (tövsiyə). Socket.IO-nun öz protokolu var, bizim sənəddəki formata mane olur.
2. `src/modules/realtime/` qovluğu:
   - `gateway.ts`: bağlantını qəbul edir, mesajı oxuyur;
   - `connections.ts`: yaddaşda siyahı: bağlantı → istifadəçi, tenant, abunə olduğu kanallar;
   - `protocol.ts`: mesaj tipləri.
3. Frontend-in göndərə biləcəyi əmrlər: `subscribe`, `unsubscribe`, `ping`. Hər birində `request_id` olur, cavab `ack` və ya `error`.
4. Səhv JSON gəlsə → `error` göndər, bağlantını **qırma**. Çox səhv gəlsə → bağla.
5. Mesaj ölçüsünə limit qoy (məs. 16 KB).

## Diqqət
- Bağlantı bağlananda onu siyahıdan **sil**. Unutsan, yaddaş dolur.
- Yaddaşdakı siyahı **bir** serverdə işləyir. İkinci server əlavə edəndə task 044 lazımdır. İndidən "yayım" funksiyasını ayrı saxla ki, sonra dəyişmək asan olsun.

## Hazır olduğunu necə yoxlayarsan
- [ ] `wscat` ilə qoşulub `ping` göndərəndə `pong` gəlir (auth 040-dan sonra).
- [ ] Səhv JSON bağlantını qırmır.
