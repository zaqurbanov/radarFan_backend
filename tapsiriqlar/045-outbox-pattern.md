# 045 — Outbox pattern

**Faza:** 3 · **Asılılıq:** 044, 049 · **Status:** [ ]

## Məqsəd
DB-də commit olunan hər dəyişiklik real vaxt hadisəsi kimi **mütləq** yayılsın; commit olunmayan isə **heç vaxt** yayılmasın.

## Niyə
Sənəd (bölmə 7): "Outbox və ya ekvivalent mexanizm commit-dən sonra dəyişikliklərin dərcini təmin edir; müştəridə deduplikasiya olduqda təkrar dərc mümkündür."

**"Dual write" problemi:** kod mesajı DB-yə yazır, sonra Redis-ə publish edir.
- DB commit oldu, server publish-dən əvvəl çökdü → mesaj DB-dədir, heç kim görmədi.
- Publish etdin, sonra tranzaksiya rollback oldu → hamı mövcud olmayan mesajı gördü.

## Cədvəl
**`outbox_events`**
| Sütun | Tip | Qeyd |
|---|---|---|
| id | bigserial PK | sıra üçün |
| event_id | uuid UNIQUE | envelope `event_id` (deduplikasiya) |
| tenant_id | uuid | |
| channel | varchar(150) | `room:...` |
| type | varchar(60) | |
| payload | jsonb | |
| created_at | timestamptz | |
| published_at | timestamptz NULL | |
| attempts | int default 0 | |

Index: `(published_at) WHERE published_at IS NULL`. Bu, partial index-dir, araşdır.

## Necə edəcəksən
1. Biznes əməliyyatı (mesaj insert) və outbox insert **eyni tranzaksiyada**.
2. "Relay" prosesi: dərc edilməmişləri götürür (`FOR UPDATE SKIP LOCKED`, bir neçə relay eyni sətri götürməsin), Redis-ə publish edir, `published_at` qoyur.
3. Gecikmə: hər 100–500 ms polling. Sənədin "p95 ≤1 s" hədəfi üçün kifayətdir. Daha sürətli: Postgres `LISTEN/NOTIFY` ilə relay-i oyatmaq. Araşdır.
4. Sequence (042) harada təyin olunur: outbox-a yazanda, yoxsa relay publish edəndə? Fikirləş: kanal üzrə sıra relay-də qorunmalıdır.
5. Köhnə dərc olunmuşları silən job (049).
6. Monitorinq: "outbox gecikməsi" (bölmə 10) = ən köhnə dərc olunmamışın yaşı.

## Tələlər
- Relay "at-least-once" çatdırır. Müştəri `event_id` ilə dublikatı atır.

## Öyrən
- Transactional outbox pattern (microservices.io)
- `SELECT ... FOR UPDATE SKIP LOCKED`

## Qəbul meyarları
- [ ] Mesaj göndərmə tranzaksiyası rollback olanda heç bir WS hadisəsi getmir (test).
- [ ] Relay dayandırılıb yenidən başladılanda yığılmış hadisələr göndərilir.
