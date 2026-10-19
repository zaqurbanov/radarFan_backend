# 090 — Challenge irəliləyişi

**Faza:** 6 · **Asılılıq:** 089 · **Status:** [ ]

## Məqsəd
Hər istifadəçinin hər challenge üzrə vəziyyəti daimi saxlansın.

## Niyə
- Sənəd (bölmə 7): ChallengeProgress — user_id, challenge_id, task_flags, status, claimed_at; "istifadəçi üçün bir vəziyyət".
- Bölmə 2: prototipdə "İrəliləyiş yalnız yenidən yüklənənədək mövcuddur", MVP: "Daimi birdəfəlik irəliləyiş".
- Bölmə 11: "Seçilmişlər və irəliləyiş yenidən yüklənmədən və təkrar girişdən sonra saxlanır".

## Cədvəl
**`challenge_progress`**
| Sütun | Tip | Qeyd |
|---|---|---|
| tenant_id | uuid | |
| user_id | uuid FK | |
| challenge_id | uuid FK | |
| period_key | varchar(20) default `once` | gündəlik üçün tarix |
| task_flags | jsonb | `{ "save_match": "2026-10-19T...", "send_message": null, ... }`. Tamamlanma vaxtı |
| completed_count | smallint | |
| status | enum(`in_progress`, `claimable`, `claimed`) | |
| claimed_at | timestamptz NULL | |
| updated_at | | |

PK (`user_id`, `challenge_id`, `period_key`).

**jsonb yoxsa sətir başına tapşırıq (`challenge_task_progress`)?** jsonb: bir sətir, atomar yeniləmə üçün `jsonb_set`. Ayrı sətirlər: daha "relational", sayma asandır. Hər ikisi işləyir. Sənəd `task_flags` deyir, ona görə jsonb.

## Endpoint
`GET /challenges` → items: { id, title_key, tasks: [{code, done, done_at}], completed, total, percent, status, reward_xp }.
Faiz = `completed / 3`. Sənəd: "İrəliləyiş faizi completed_tasks / 3-dür". Yuvarlaqlaşdırma: 33/67/100.

## Necə edəcəksən
1. Sətir nə vaxt yaranır? Lazy: ilk tapşırıq hadisəsində upsert (091) və ya `GET`-də.
2. `completed_count` jsonb-dən hesablana bilər, onda saxlamağa ehtiyac var? Status keçidi üçün rahatdır, amma uyğunsuzluq riski var. Qərar ver.

## Qəbul meyarları
- [ ] Logout/login-dən sonra irəliləyiş eynidir.
