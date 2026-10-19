# 050 — Room cədvəli və otaqların yaradılması

**Faza:** 4 · İcma · **Asılılıq:** 027 · **Status:** [ ]

## Məqsəd
Hər matç üçün bir çat otağı.

## Niyə
- Sənəd (bölmə 4): "Hər hadisənin tenant_id və event_id-si olan ayrıca room-u var." Bölmə 7: Room — id, tenant_id, event_id, status; "hadisə başına bir otaq".
- Bölmə 2: prototipdə "Bütün matçlar üçün ümumi mesaj massivi" var, MVP-də isə "Hər hadisə üçün təcrid olunmuş otaq". Bölmə 11: "A otağının mesajı B-də görünmür".
- Sayt: "У каждого матча — своя комната", otaq seçimi açılan siyahıdan.

## Cədvəl
**`rooms`**
| Sütun | Tip | Qeyd |
|---|---|---|
| id | uuid PK | |
| tenant_id | uuid FK NOT NULL | |
| event_id | uuid FK → events NOT NULL | |
| status | enum(`open`, `read_only`, `closed`) | |
| last_sequence | bigint NOT NULL default 0 | mesaj sequence sayğacı (051) |
| last_message_id | uuid NULL | çat siyahısı üçün (058) |
| read_only_at | timestamptz NULL | |
| created_at | timestamptz | |

UNIQUE (`tenant_id`, `event_id`). Index (`tenant_id`, `status`).

## Necə edəcəksən
1. Otaq nə vaxt yaranır?
   - (a) feed event yaradanda (027 upsert-də);
   - (b) ilk dəfə kimsə daxil olanda (lazy, `INSERT ... ON CONFLICT DO NOTHING RETURNING`).
   (a) daha proqnozlaşdırılandır. Poll da eyni anda yaranmalıdır (061).
2. Sənəd: "Matç seçilmədən «İcma»ya ilk girişdə hadisə seçimi göstərilir; tətbiq təsadüfi matç təyin etmir." Bu, frontend qaydasıdır, amma backend-də "default room" anlayışı yaratma.
3. `GET /rooms/{id}` (otaq məlumatı: event qısa, status, active_users, poll_id) və ya event id ilə tapmaq: `GET /events/{id}/room`. Frontend event-dən otağa necə keçəcək? `room_summary.room_id` (033).

## Qəbul meyarları
- [ ] Hər event üçün tam bir otaq.
- [ ] Başqa tenant-ın otağı → 404.
