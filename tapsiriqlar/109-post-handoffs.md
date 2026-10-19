# 109 — `POST /handoffs`: bukmekerə keçid

**Faza:** 9 · **Asılılıq:** 108, 036 · **Status:** [ ]

## Məqsəd
Kupondakı seçimləri qısaömürlü birdəfəlik token-ə çevirmək. Tərəfdaş bu token ilə öz kuponunu açır.

## Niyə
- Sənəd (bölmə 3): "Nəticəyə klik POST /handoffs sorğusunu yaradır... Uğurlu handoff qısaömürlü token və correlation_id ehtiva edir. Müştəri onu adapter vasitəsilə konteynerə ötürür; tərəfdaş kuponu açır."
- "RADAR.FAN mərc məbləğini qəbul etmir və mərcin yerləşdirilməsini təsdiqləmir."
- Bölmə 7: Handoff — id, user_id, event_id, outcome_id, odds_version, status, correlation_id; "birdəfəlik token və TTL".
- Bölmə 9: "token birdəfəlikdir, TTL 60 saniyədir, yalnız qeyri-şəffaf ID ehtiva edir".
- Sayt: "Проверить переход к партнёру →" → "Переход проверен ✓ · В рабочем продукте партнёр получит 2 выбранных исходов и откроет свой купон. В демо данные никуда не отправляются, ставки не размещаются."

## Cədvəllər
**`handoffs`**
| Sütun | Tip | Qeyd |
|---|---|---|
| id | uuid PK | |
| tenant_id | uuid | |
| user_id | uuid FK | |
| token_hash | char(64) UNIQUE | token-in özü saxlanmır |
| correlation_id | uuid UNIQUE | tərəfdaşla izləmə |
| status | enum(`created`, `resolved`, `opened`, `rejected`, `failed`, `expired`) | |
| expires_at | timestamptz | created + 60 san. |
| resolved_at | timestamptz NULL | tərəfdaş backend-i istifadə edəndə |
| client_result | jsonb NULL | bridge cavabı (`opened`/`rejected` + reason_code) |
| created_at | timestamptz | |

**`handoff_selections`**
| Sütun | Tip |
|---|---|
| handoff_id | uuid FK |
| event_id, market_id, outcome_id | uuid |
| provider_event_id, provider_market_id, provider_outcome_id | varchar (tərəfdaşın identifikatorları!) |
| price | numeric |
| odds_version | int |

PK (`handoff_id`, `outcome_id`).

## Body
Sənəd: `{ outcome_id, odds_version }` (tək). Sayt: bir neçə. Universal forma: `{ selections: [{ outcome_id, odds_version }] }`. Tək seçim də massivdə.

## Necə edəcəksən
1. Yoxlamalar → 110, 111.
2. Token: təsadüfi 32 bayt, base64url. DB-də SHA-256 hash.
3. Cavab: `handoff_token`, `expires_at`, `correlation_id`.
4. **Demo rejim:** token yaradılır, amma heç yerə getmir. Frontend "Переход проверен ✓" göstərir. Server tərəfdə nə fərqlidir? `status`-u dərhal `opened` (simulyasiya) etmək? Qərar ver.
5. Bridge nəticəsi: müştəri bridge cavabını (`opened/rejected/failed`, bölmə 9) bizə bildirir: `POST /handoffs/{id}/result`. Analitika üçün (`betslip_opened`, `handoff_failed`). Sənəd: "Opened statusu mərcin qəbulunu deyil, kuponun açılmasını bildirir."
6. Analitika: `handoff_requested`.
7. Komanda adları və düymə indeksi identifikator kimi istifadə olunmur (sənəd). Yalnız provider ID-ləri.

## Qəbul meyarları
- [ ] Token DB-də açıq saxlanmır.
- [ ] Cavabda `correlation_id` var, loglarda da (011).
- [ ] 60 san. sonra token istifadə oluna bilmir (112).
