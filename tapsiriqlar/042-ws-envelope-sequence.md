# 042 — Hadisə envelope-u, sequence, event_id

**Faza:** 3 · **Asılılıq:** 041 · **Status:** [ ]

## Məqsəd
Serverdən gələn bütün real vaxt mesajları eyni formada olsun, sıralana və dublikatdan təmizlənə bilsin.

## Niyə
Sənəd (bölmə 9): "Hadisə envelope-u: {event_id, type, channel, sequence, emitted_at, payload}."
Bölmə 7: "Müştəriyə çatdırılan hadisələr üçün event_id və kanal üzrə monoton sequence istifadə olunur. Outbox ... təkrar dərc mümkündür; müştəridə deduplikasiya olduqda."
Bölmə 9: "Sequence-də boşluq olarsa, müştəri snapshot tələb edir."

| Sahə | Məqsəd |
|---|---|
| `event_id` | UUID, dublikatı tanımaq (eyni hadisə iki dəfə gəlsə) |
| `channel` | `room:...` |
| `sequence` | kanal daxilində 1, 2, 3... boşluq = nəsə itib |
| `type` | `room.message.created` və s. |
| `emitted_at` | server vaxtı |

## Necə edəcəksən
1. Kanal sequence-i haradan gəlir? Redis `INCR seq:{channel}` atomar və sürətlidir. Amma Redis yenidən başlasa, sequence sıfırlanır və müştəri qarışır. Variantlar:
   - Redis + `epoch` (Redis restart-da yeni epoch, müştəri epoch dəyişdisə resync edir);
   - DB-də sequence (otaq mesajları üçün artıq `messages.sequence` var, task 051).
   Qərar ver.
2. **Diqqət:** kanal sequence-i ilə mesajın room sequence-i fərqli şeylərdir. `room:` kanalına mesajdan başqa hadisələr də gedir (hidden, presence, poll). Hansı sequence müştəriyə "nəyisə buraxdım" deyir? Sənəd: `room.message.created` payload-ında ayrıca `room_sequence` var. Deməli ikisi də var.
3. Bütün WS hadisə tiplərini bir faylda tipləşdir (discriminated union).

## Qəbul meyarları
- [ ] Hər çıxan mesaj envelope formatındadır.
- [ ] Eyni kanalda sequence-lər ardıcıldır (test).
