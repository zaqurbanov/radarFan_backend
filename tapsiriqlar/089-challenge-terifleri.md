# 089 — Challenge tərifləri ("İsinmə")

**Faza:** 6 · **Asılılıq:** 083 · **Status:** [ ]

## Məqsəd
Tapşırıq toplularını data kimi təyin etmək (hardcode yox).

## Niyə
- Sənəd (bölmə 5, İsinmə): "Tenant-ın hər istifadəçisi üçün birdəfəlik challenge: save_match, send_message, complete_battle. Ardıcıllıq sərbəstdir... İrəliləyiş faizi completed_tasks / 3-dür."
- "Prototipdəki «hər gün» adı birdəfəlik challenge üçün «İlk tapşırıqların» ilə əvəz edilməlidir."
- **Sayt:** son versiyada ayrıca "Tapşırıqlar" bölməsi görünmür (naviqasiya: Пульс / Комьюнити / Игры / Мой фан). Backend-i sənədə görə qururuq, frontend-in harada göstərəcəyi açıq sualdır (SPEC.md, sual 5). Ehtimal: "Мой фан" ekranında.

## Cədvəllər
**`challenges`**
| Sütun | Tip |
|---|---|
| id | uuid PK |
| tenant_id | uuid |
| code | varchar(50) (`warmup`) |
| title_key | varchar(100) (lokallaşdırma açarı) |
| type | enum(`one_time`, `daily`, `weekly`) (gələcək üçün) |
| reward_xp | int (100) |
| reward_coins | int (0) |
| status | enum(`active`, `retired`) |
| created_at | |

UNIQUE (`tenant_id`, `code`).

**`challenge_tasks`**
| Sütun | Tip |
|---|---|
| challenge_id | uuid FK |
| task_code | enum(`save_match`, `send_message`, `complete_battle`) |
| position | smallint |
| target_count | int default 1 |

PK (`challenge_id`, `task_code`).

## Necə edəcəksən
1. Seed: demo tenant üçün `warmup` challenge (3 tapşırıq, 100 XP).
2. `task_code` enum-dur. Yeni tapşırıq tipi = yeni kod hadisəsi (091), ona görə enum məntiqlidir.
3. Bu strukturu gələcəkdə gündəlik tapşırıqlar üçün də istifadə etmək olar. İndi yalnız `one_time` reallaşdır, amma sxem buna hazır olsun.

## Qəbul meyarları
- [ ] Seed-dən sonra `GET /challenges` (090) "İsinmə"ni 3 tapşırıqla qaytarır.
