# 055 — Mesajın real vaxt yayımı

**Faza:** 4 · **Asılılıq:** 053, 045 · **Status:** [ ]

## Məqsəd
Göndərilən mesaj otağa abunə olan hər kəsə 1 saniyə ərzində çatsın.

## Niyə
Sənəd (bölmə 9): `room.message.created` → `message, room_sequence`. Bölmə 10: çatdırılmanın p95-i 1 san.-dək. Bölmə 11: "A otağının mesajı B-də görünmür".

## Necə edəcəksən
1. Mesaj tranzaksiyasında outbox-a `channel: room:{id}`, payload: REST cavabı ilə **eyni** mesaj formatı (eyni serializer, 052).
2. Göndərənin özü də WS ilə alacaq. Frontend `client_message_id` ilə pending mesajını sent-ə çevirir. Payload-da `client_message_id`-ni yalnız göndərənə göstərmək lazımdırmı? Başqalarına onun lazımı yoxdur, amma zərəri də yoxdur. Qərar ver.
3. Fərdiləşdirilmiş sahələr (`liked_by_me`, `hidden_for_me`) broadcast-də olmur. Yeni mesaj üçün onsuz da false-dur.
4. Gecikməni ölç: `emitted_at - created_at` metrik (125).

## Qəbul meyarları
- [ ] İki müştəri eyni otaqda: biri yazır, digəri alır.
- [ ] Başqa otağa abunə olan müştəri almır (test).
