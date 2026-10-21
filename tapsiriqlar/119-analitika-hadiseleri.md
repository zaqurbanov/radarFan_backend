# 119 — Analitika: istifadəçi hərəkətlərini toplamaq

**Status:** [ ] · **Faza:** 11 · **Əvvəl bitməli:** 012

## Qısaca
Məhsulun işləyib-işləmədiyini ölçmək üçün istifadəçi hərəkətlərini topla.

## Niyə lazımdır?
Məhsulun əsas fərziyyəsi: "çat və oyunlar insanları geri qaytarır və bukmekerə daha çox keçid gətirir". Bunu **rəqəmlə** sübut etmək lazımdır.

## Hadisələr (sənəddən)
`app_opened`, `tab_viewed`, `match_viewed`, `match_saved`, `room_entered`, `message_sent`, `poll_voted`, `battle_started`, `battle_completed`, `challenge_claimed`, `outcome_selected`, `handoff_requested`, `betslip_opened`, `handoff_failed`.

Saytdan əlavə: `story_viewed`, `game_started`, `prediction_created`, `shop_item_purchased`, `item_equipped`.

## Analitikaya **heç vaxt** düşməməlidir
Mesaj mətni, token-lər, email, telefon.

## Yeni cədvəl: `analytics_events`
| Sütun | İzah |
|---|---|
| event_id | frontend-in verdiyi unikal ID (dublikatı atmaq üçün) |
| tenant_id | |
| pseudonymous_user_id | gizlədilmiş istifadəçi ID-si (aşağıda) |
| session_id | |
| name | hadisənin adı |
| occurred_at | baş verdiyi vaxt (frontend) |
| received_at | serverə çatdığı vaxt |
| experiment_variant | A/B test variantı |
| context | matç, otaq, duel ID-si və s. (JSON) |
| source | `client` / `server` |

Bu cədvəl **çox böyüyəcək**. Postgres-də aylıq bölmə (partitioning) haqqında oxu.

## Endpoint
`POST /analytics/events` → `{ events: [...] }` (bir dəfədə maks. 50).

## Nə edəcəksən
1. **Gizlədilmiş ID:** daxili `user_id` yox, onun gizli açarla hash-i. Niyə? Analitika sızsa, insanlara birbaşa bağlanmasın. Amma eyni istifadəçinin hərəkətlərini izləmək mümkün qalsın.
2. Hadisə adları **icazəli siyahıdan**. Tanımadığını at.
3. `context`-də yalnız icazəli açarlar. Frontend `text` göndərsə belə saxlama.
4. Eyni `event_id` → `ON CONFLICT DO NOTHING`.

## Hazır olduğunu necə yoxlayarsan
- [ ] Eyni `event_id` iki dəfə → bir sətir.
- [ ] `context.text` saxlanmır.
- [ ] Cədvəldə heç yerdə `external_user_id` yoxdur.
