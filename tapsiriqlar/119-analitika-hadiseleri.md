# 119 — Analitika hadisələri

**Faza:** 11 · Analitika · **Asılılıq:** 012 · **Status:** [ ]

## Məqsəd
Məhsul hipotezini yoxlamaq üçün istifadəçi hərəkətlərini toplamaq.

## Niyə
- Sənəd (bölmə 1): "Əsas məhsul hipotezi: icmada və oyun mexanikalarında iştirak istifadəçilərin geri qayıtmasını və tərəfdaşın idman hadisələrinə şüurlu keçidlərin sayını artırır."
- Bölmə 11: "Minimum analitika: app_opened, tab_viewed, match_viewed, match_saved, room_entered, message_sent, poll_voted, battle_started, battle_completed, challenge_claimed, outcome_selected, handoff_requested, betslip_opened, handoff_failed. Payload: analitika event_id-si, timestamp, tenant_id, pseudonymous_user_id, session_id, experiment_variant; mövcud olduqda match_id, room_id, battle_id, correlation_id."
- "Təkrarlar event_id əsasında aradan qaldırılır. Analitikada mesaj mətni, launch tokens, email və telefon olmur. Razılıq və məlumat toplama rejimi tərəfdaşın siyasəti ilə müəyyən edilir."

Saytdan əlavələr: `story_viewed`, `game_started` (find_pair, predictions), `prediction_created`, `shop_item_purchased`, `item_equipped`.

## Cədvəl
**`analytics_events`**
| Sütun | Tip |
|---|---|
| event_id | uuid PK (dedup) |
| tenant_id | uuid |
| pseudonymous_user_id | varchar(64) |
| session_id | uuid |
| name | varchar(50) |
| occurred_at | timestamptz (müştəri vaxtı) |
| received_at | timestamptz (server vaxtı) |
| experiment_variant | varchar(50) NULL |
| context | jsonb (match_id, room_id, battle_id, correlation_id, ...) |
| source | enum(`client`, `server`) |

Cədvəl çox böyüyəcək. Postgres-də vaxta görə **partitioning** (aylıq) haqqında oxu. Gələcəkdə analitika anbarına (ClickHouse, BigQuery) export.

## Endpoint
`POST /analytics/events` → `{ events: [...] }` (batch, maks. 50). Frontend hadisələri yığıb göndərir.

## Necə edəcəksən
1. `pseudonymous_user_id`: daxili `user_id` deyil, `HMAC(secret, tenant_id + user_id)`. Niyə? Analitika məlumatı sızsa, istifadəçiyə birbaşa bağlanmasın, amma D1/D7 hesablamaq üçün sabit qalsın.
2. Hadisə adları **whitelist**. Naməlum ad → at.
3. `context`-də icazəli açarlar whitelist. Müştəri `text` göndərsə belə saxlanmasın.
4. Insert `ON CONFLICT (event_id) DO NOTHING`.
5. Razılıq (consent): tenant config-də `analytics.enabled`; launch token-də istifadəçi razılığı? Tərəfdaşla razılaşdırılmalıdır.

## Qəbul meyarları
- [ ] Eyni `event_id` iki dəfə → bir sətir.
- [ ] `context.text` saxlanmır.
- [ ] Analitika cədvəlində heç bir yerdə `external_user_id` yoxdur.
