# 050 — Çat otaqları

**Status:** [ ] · **Faza:** 4 · **Əvvəl bitməli:** 027

## Qısaca
Hər matçın öz çat otağı olsun.

## Niyə lazımdır?
- Saytda: "У каждого матча — своя комната".
- Prototipdə bütün matçlar üçün **bir** ümumi mesaj siyahısı idi. Sənəd: hər matç üçün **ayrı** otaq.
- Real Madrid otağının mesajı Arsenal otağında görünməməlidir.

## Yeni cədvəl: `rooms`
| Sütun | İzah |
|---|---|
| id | |
| tenant_id | |
| event_id | hansı matç |
| status | `open` / `read_only` / `closed` |
| last_sequence | son mesajın nömrəsi (task 051) |
| last_message_id | son mesaj (çat siyahısı üçün, task 058) |
| read_only_at | |
| created_at | |

- Unique (`tenant_id`, `event_id`): bir matça bir otaq.

## Nə edəcəksən
1. Otaq nə vaxt yaranır? Variantlar:
   - matç bazaya yazılanda (027) dərhal;
   - kimsə ilk dəfə daxil olanda.
   Birincisi daha sadə və proqnozlaşdırılandır. Sorğu (061) da eyni anda yaransın.
2. Frontend matç səhifəsindən otağa necə keçəcək? `room_summary.room_id` (033).

## Hazır olduğunu necə yoxlayarsan
- [ ] Hər matçın dəqiq bir otağı var.
- [ ] Başqa tenant-ın otağı → 404.
