# 113 — Bukmekerdən gələn bildirişlər (webhook)

**Status:** [ ] · **Faza:** 9 · **Əvvəl bitməli:** 112

## Qısaca
Bukmeker sonrakı hadisələr (kupon açıldı, mərc qoyuldu) haqqında **imzalı** bildiriş göndərə bilsin.

## Niyə lazımdır?
Məhsulun əsas sualı: "icma bukmekerə daha çox keçid gətirirmi?" Bunu ölçmək üçün keçiddən sonra nə baş verdiyini bilmək lazımdır. Webhook olmasa, statistika "kupon açıldı"da bitir.

## Yeni cədvəl: `partner_webhook_events`
| Sütun | İzah |
|---|---|
| id, tenant_id | |
| partner_event_id | bukmekerin hadisə ID-si |
| correlation_id | hansı keçidə aiddir |
| event_type | `betslip_opened`, `bet_placed`... |
| occurred_at | nə vaxt baş verib |
| payload | məlumat |
| received_at | |

Unique (`tenant_id`, `partner_event_id`): təkrar göndərmə dublikat yaratmır.

## Nə edəcəksən
1. `POST /partner/v1/webhooks`, yoxlama 112-dəki imza ilə.
2. İmza **xam** body üzərində hesablanır. Fastify JSON-u parse edəndən sonra yenidən string-ə çevirsən, fərqli ola bilər. Xam body-ni necə alarsan? Araşdır.
3. Vaxt yoxlaması (±5 dəqiqə).
4. Dublikat → 200 (bukmeker təkrar göndərməsin), yeni yazı yox.
5. Tez 200 qaytar, emalı fon işinə ver.

## Vacib qayda
`bet_placed` gəlsə belə: biz mərci **təsdiqləmirik** və **heç bir mükafat vermirik** (bu, mərcə təşviq olardı). Yalnız statistika.

## Hazır olduğunu necə yoxlayarsan
- [ ] Səhv imza → 401.
- [ ] Eyni hadisə iki dəfə → bir yazı, iki dəfə 200.
