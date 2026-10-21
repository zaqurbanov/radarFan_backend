# 071 — Hekayələr (Stories)

**Status:** [ ] · **Faza:** 4 · **Əvvəl bitməli:** 021

## Qısaca
"Комьюнити" ekranının yuxarısındakı hekayələr: redaktor kartları, slayd-slayd, düymə ilə.

## Saytda
| Hekayə | Slayd | Başlıq | Düymə |
|---|---|---|---|
| PULSE | 1/4 | "Добро пожаловать на трибуну" | — |
| Эль-класико | 2/4 | "Матч, который обсуждают все" | "Открыть чат →" |
| NBA | 3/4 | ... | ... |
| Твой фан | 4/4 | "Собери свой образ" | "Открыть персонажа" |

Sənəddə yoxdur, saytdan gəlir. Admin idarə edir (117).

## Yeni cədvəllər
**`stories`**
| Sütun | İzah |
|---|---|
| id, tenant_id | |
| title | "Эль-класико" |
| icon | "RM", "★" |
| position | sıra |
| status | `draft` / `published` / `archived` |
| starts_at, ends_at | göstərilmə müddəti |
| event_id | matça bağlıdırsa |
| locale | dil |

**`story_slides`**
| Sütun | İzah |
|---|---|
| id, story_id | |
| position | sıra |
| heading, body | başlıq və mətn |
| cta_label | düymənin yazısı |
| cta_action | düymə nə edir (siyahıdan) |
| cta_target_id | hansı otaq/matç |

**`story_views`** (istəyə bağlı): kim hansını görüb.

## Diqqət: düymə yalnız siyahıdan
`cta_action` yalnız bunlardan biri ola bilər: `open_room`, `open_event`, `open_profile`, `open_shop`, `open_games`.
**Sərbəst link olmamalıdır.** Sənəd: ixtiyari linklər açılmır. Yoxsa admin hesabı ələ keçirilsə, hamını saxta sayta göndərmək olar.

## Endpoint
`GET /stories` → aktiv hekayələr, slaydları və "baxılıb" işarəsi ilə.

## Hazır olduğunu necə yoxlayarsan
- [ ] Yalnız dərc olunmuş və vaxtı uyğun olanlar gəlir.
- [ ] Düymə yalnız icazəli əməliyyatlardan biridir.
