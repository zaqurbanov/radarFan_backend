# 089 — Tapşırıqlar: "İsinmə"

**Status:** [ ] · **Faza:** 6 · **Əvvəl bitməli:** 083

## Qısaca
Tapşırıqları kodda yox, **bazada** təyin et.

## Qayda (sənəddən)
Hər istifadəçi üçün **bir dəfəlik** "İsinmə": 3 tapşırıq, istənilən sıra ilə:
1. Matçı seçilmişlərə əlavə et (`save_match`);
2. Çatda mesaj yaz (`send_message`);
3. Duel bitir (`complete_battle`).
Üçü bitəndə: **100 XP**.

Prototipdəki "hər gün" sözü səhvdir, "İlk tapşırıqların" olmalıdır.

## Qeyd
Saytın son versiyasında ayrıca "Tapşırıqlar" bölməsi **görünmür**. Backend-i sənədə görə qururuq. Frontend-də harada göstəriləcəyi açıq sualdır.

## Yeni cədvəllər
**`challenges`**
| Sütun | İzah |
|---|---|
| id, tenant_id | |
| code | `warmup` |
| title_key | tərcümə açarı |
| type | `one_time` (gələcəkdə `daily`, `weekly`) |
| reward_xp | 100 |
| reward_coins | 0 |
| status | `active` / `retired` |

Unique (`tenant_id`, `code`).

**`challenge_tasks`**
| Sütun | İzah |
|---|---|
| challenge_id, task_code | əsas açar |
| position | sıra |
| target_count | neçə dəfə (default 1) |

## Nə edəcəksən
1. Seed: demo tenant üçün `warmup`.
2. Strukturu gələcəkdə gündəlik tapşırıqlar üçün də yararlı saxla, amma indi yalnız bir dəfəlik et.

## Hazır olduğunu necə yoxlayarsan
- [ ] Seed-dən sonra `GET /challenges` (090) "İsinmə"ni 3 tapşırıqla qaytarır.
