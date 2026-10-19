# 071 — Hekayələr (Stories)

**Faza:** 4 · **Asılılıq:** 021 · **Status:** [ ]

## Məqsəd
"Комьюнити" ekranının yuxarısındakı hekayələr: redaksiya kartları, slayd-slayd, hədəf düyməsi ilə.

## Niyə
Sayt ("Комьюнити" → "Истории и чаты твоих матчей"):
| Hekayə | Slayd | Mətn | CTA |
|---|---|---|---|
| PULSE | 1/4 | "Добро пожаловать на трибуну" | — |
| Эль-класико | 2/4 | "Матч, который обсуждают все" | "Открыть чат →" |
| NBA | 3/4 | ... | ... |
| Твой фан | 4/4 | "Собери свой образ" | "Открыть персонажа" |

"← Предыдущая / Следующая →" naviqasiya. Sənəddə yoxdur, saytdan gəlir. Admin idarə edir (117).

## Cədvəllər
**`stories`**
| Sütun | Tip |
|---|---|
| id | uuid PK |
| tenant_id | uuid |
| title | varchar(40) |
| icon | varchar(10) (emoji/qısaltma: "RM", "★") |
| position | smallint |
| status | enum(`draft`, `published`, `archived`) |
| starts_at, ends_at | timestamptz NULL (göstərilmə müddəti) |
| event_id | uuid NULL (matça bağlı hekayə) |
| locale | varchar(10) |
| created_at, updated_at | |

**`story_slides`**
| Sütun | Tip |
|---|---|
| id | uuid PK |
| story_id | uuid FK (cascade) |
| position | smallint |
| heading | varchar(80) |
| body | varchar(300) |
| cta_label | varchar(40) NULL |
| cta_action | enum(`open_room`, `open_event`, `open_profile`, `open_shop`, `open_games`) NULL |
| cta_target_id | uuid NULL |

**Diqqət:** `cta_action` yalnız **sabit siyahıdan**. Sərbəst URL olmamalıdır. Sənəd (bölmə 9): "Müştəri girişindən gələn ixtiyari deep link-lər açılmır."

**`story_views`** (istəyə bağlı, "baxılıb" halqası üçün): user_id, story_id, viewed_at. PK (user, story).

## Endpoint
`GET /stories` → aktiv hekayələr slaydları ilə, `viewed` bayrağı ilə.

## Qəbul meyarları
- [ ] Yalnız `published` və vaxt pəncərəsində olanlar qayıdır.
- [ ] CTA yalnız icazəli action-lardan biridir.
