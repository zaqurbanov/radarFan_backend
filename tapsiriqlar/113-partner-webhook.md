# 113 — Tərəfdaş webhook-u

**Faza:** 9 · **Asılılıq:** 112 · **Status:** [ ]

## Məqsəd
Tərəfdaş sonrakı əməliyyatlar barədə (kupon açıldı, mərc qoyuldu) imzalı bildiriş göndərə bilsin.

## Niyə
Sənəd (bölmə 9): "Sonrakı əməliyyatları təsdiqləmək üçün tərəfdaş event_id, correlation_id, event_type və occurred_at ilə imzalanmış webhook events göndərə bilər. RADAR.FAN imzanı, timestamp-i və təkrar event_id-ni yoxlayır. Belə inteqrasiya olmadan analitika təsdiqlənmiş kupon açılışı ilə bitir."

Bölmə 11, funnel: "matça baxış → nəticə seçimi → handoff sorğusu → təsdiqlənmiş kupon açılışı". GGR təsirini ölçmək üçün (bölmə 1) bu məlumat lazımdır.

## Cədvəl
**`partner_webhook_events`**
| Sütun | Tip |
|---|---|
| id | uuid PK |
| tenant_id | uuid |
| partner_event_id | varchar(100) |
| correlation_id | uuid |
| event_type | varchar(50) (`betslip_opened`, `bet_placed`, ...) |
| occurred_at | timestamptz |
| payload | jsonb |
| received_at | timestamptz |

UNIQUE (`tenant_id`, `partner_event_id`). Təkrar göndərmə (retry) dublikat yaratmır.

## Necə edəcəksən
1. `POST /partner/v1/webhooks`. Auth 112-dəki imza ilə.
2. İmza **xam body** üzərində hesablanır. Fastify JSON parse etdikdən sonra yenidən stringify fərqli ola bilər. Xam body-ni necə əldə edəcəksən? (`addContentTypeParser` və ya `rawBody` plugin.)
3. Timestamp yoxlaması (±5 dəq.) replay hücumuna qarşı.
4. Dublikat → 200 (tərəfdaş təkrar göndərməsin), yeni yazı yox.
5. Tez cavab ver (200), emalı fon job-una ver (049).
6. **Sənəd qaydası:** `bet_placed` gəlsə belə, RADAR.FAN mərcin qoyulmasını "təsdiqləmir" və heç bir mükafat vermir (bu, qumar stimulu olardı). Yalnız analitika.

## Qəbul meyarları
- [ ] Etibarsız imza → 401.
- [ ] Eyni `partner_event_id` iki dəfə → bir yazı, iki dəfə 200.
