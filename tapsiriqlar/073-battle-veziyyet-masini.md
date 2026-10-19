# 073 — Battle vəziyyət maşını (state machine)

**Faza:** 5 · **Asılılıq:** 072 · **Status:** [ ]

## Məqsəd
Battle-ın bütün vəziyyətlərini və keçidlərini kod yazmazdan əvvəl dəqiq təyin etmək.

## Niyə
Battle-da çoxlu "nə olar əgər" var: iki tab, reload, şəbəkə qopması, gec cavab, iki dəfə "finish". Sənəd (bölmə 5): "Vəziyyət serverdə saxlanır və yenidən yüklənəndə bərpa edilir... Dublikatlar, iki cihazdan tamamlama və səhifənin yenidən açılması qaydalardan yayınmağa imkan vermir."

Vəziyyət maşını olmadan bu, `if`-lər cəngəlliyinə çevrilir.

## Vəziyyətlər
Battle səviyyəsi: `active` → `completed` | `abandoned`
Sual səviyyəsi (battle daxilində, hər sual üçün): `pending` → `open` → `closed`

```
battle.created ──► Q1.open ──(cavab və ya deadline)──► Q1.closed
                     │                                    │
                     │                     ("Növbəti" və ya 10 san.)
                     ▼                                    ▼
                                                     Q2.open ... Q3.closed
                                                                   │
                                          ("Завершить баттл" və ya avtomatik)
                                                                   ▼
                                                              completed (XP)
   5 dəq. bağlantısız ──► abandoned (XP yox)
```

## Cədvəllər
**`battles`**
| Sütun | Tip | Qeyd |
|---|---|---|
| id | uuid PK | |
| tenant_id | uuid | |
| user_id | uuid FK | demo-da bir iştirakçı (2-ci mərhələdə `battle_participants`, 129+) |
| mode | enum(`demo`, `real`) | |
| state | enum(`active`, `completed`, `abandoned`) | |
| rules_version | int | start zamanı sabitlənir |
| rules_snapshot | jsonb | xp_per_correct, coins_per_correct, time_limit, ... (start anında) |
| daily_key | varchar(10) | `2026-10-19` tenant timezone-u ilə (080) |
| xp_eligible | boolean | gündəlik limitə düşürmü (080) |
| bot_correct_index | smallint | botun düzgün cavab verdiyi sual (0..2) |
| current_index | smallint | |
| user_score, bot_score | smallint | |
| result | enum(`victory`, `draw`, `defeat`) NULL | |
| started_at, completed_at | timestamptz | |
| last_activity_at | timestamptz | abandoned üçün (081) |

Partial UNIQUE (`tenant_id`, `user_id`) WHERE `state = 'active'`. Sənəd: "İstifadəçinin tenant başına yalnız bir aktiv dueli ola bilər".
Index (`tenant_id`, `user_id`, `state`). Sənəd bunu tələb edir.

**`battle_questions`**
| Sütun | Tip |
|---|---|
| battle_id | uuid FK |
| index | smallint (0..2) |
| question_version_id | uuid FK |
| option_order | jsonb (qarışdırılmış sıra) |
| state | enum(`pending`, `open`, `closed`) |
| opened_at, deadline_at, closed_at | timestamptz NULL |

PK (`battle_id`, `index`).

**`battle_answers`** (sənəd: BattleAnswer)
| Sütun | Tip |
|---|---|
| battle_id | uuid |
| user_id | uuid |
| question_index | smallint |
| option_id | varchar(10) |
| request_id | uuid |
| received_at | timestamptz |
| correct | boolean |

PK (`battle_id`, `user_id`, `question_index`). Sənəd: "istifadəçinin question-ı üçün bir cavab".

## Necə edəcəksən
1. Keçid funksiyaları yaz: `openQuestion`, `submitAnswer`, `closeQuestion`, `advance`, `complete`, `abandon`. Hər biri **əvvəlki vəziyyəti yoxlayır**, uyğun deyilsə xəta. Tranzaksiya + `SELECT ... FOR UPDATE` battle sətri üzərində.
2. Bu funksiyalar HTTP-dən asılı olmasın (sonra job-lar da çağıracaq).
3. "State machine" və "optimistic vs pessimistic locking" mövzularını öyrən.
4. Diaqramı (yuxarıdakı) özün yenidən çək və mənimlə müzakirə et. Kod yazmazdan əvvəl.

## Qəbul meyarları
- [ ] Hər keçid üçün unit test: düzgün vəziyyətdən keçir, səhv vəziyyətdən xəta.
- [ ] Bir istifadəçinin iki aktiv battle-ı DB səviyyəsində mümkün deyil.
