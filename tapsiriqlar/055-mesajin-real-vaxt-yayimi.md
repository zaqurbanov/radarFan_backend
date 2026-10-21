# 055 — Yeni mesaj hamıya çatsın

**Status:** [ ] · **Faza:** 4 · **Əvvəl bitməli:** 053, 045

## Qısaca
Göndərilən mesaj otaqdakı hər kəsə **1 saniyədə** çatsın.

## Mesaj
`room.message.created` → mesajın özü + otaqdakı nömrəsi.

## Nə edəcəksən
1. Mesaj tranzaksiyasında outbox-a qeyd yaz, kanal `room:{id}`.
2. Mesajın forması REST cavabı (052) ilə **eyni** olsun. Eyni formatlama funksiyasını istifadə et.
3. Göndərənin özü də WebSocket ilə alacaq. Frontend `client_message_id` ilə "göndərilir..." mesajını "göndərildi"-yə çevirir.
4. Gecikməni ölç (task 125 üçün): göndərilmə vaxtı − yaradılma vaxtı.

## Hazır olduğunu necə yoxlayarsan
- [ ] Eyni otaqda iki müştəri: biri yazır, digəri dərhal alır.
- [ ] Başqa otağa abunə olan müştəri almır (test).
