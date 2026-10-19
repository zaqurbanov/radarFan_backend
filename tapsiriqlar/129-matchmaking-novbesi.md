# 129 — Real duel: matchmaking növbəsi

**Faza:** 13 · 2-ci mərhələ (real duel) · **Asılılıq:** 073–082, 044 · **Status:** [ ]

## Məqsəd
İki real istifadəçini duel üçün cütləşdirmək.

## Niyə
Sənəd (bölmə 10):
- "2-ci mərhələnin ayrıca qiymətləndirilməsi matchmaking növbəsini, iki iştirakçını, sinxron sualları, reconnect-i və server nəticəsini əhatə edir. Vəziyyətlər: queued → matched → ready → question_open → question_closed → completed. Başlamadan ləğv — cancelled; server nasazlığı — aborted."
- "Növbənin 30 saniyəlik timeout-u təkrar cəhd və ya açıq şəkildə göstərilən demo mode təklif edir; rəqib gizlicə əvəz edilmir."
- "Cütləşdirmə tenant və dil daxilində aparılır."
- "Real mode üçün POST /matchmaking, DELETE /matchmaking/{ticket_id}, POST /battles/{id}/ready, həmçinin MatchmakingTicket və BattleParticipant cədvəlləri əlavə edilməlidir. Cütlüyün yaradılması atomar olmalıdır; bir istifadəçinin iki cihazı iki növbə yaratmır."

## Cədvəllər
**`matchmaking_tickets`**
| Sütun | Tip |
|---|---|
| id | uuid PK |
| tenant_id | uuid |
| user_id | uuid |
| locale | varchar(10) |
| status | enum(`queued`, `matched`, `cancelled`, `expired`) |
| battle_id | uuid NULL |
| created_at, expires_at | timestamptz (30 san.) |

Partial UNIQUE (`tenant_id`, `user_id`) WHERE `status = 'queued'`. "İki cihaz iki növbə yaratmır".

**`battle_participants`** (demo-dakı `battles.user_id`-nin əvəzi)
| Sütun | Tip |
|---|---|
| battle_id | uuid FK |
| user_id | uuid FK |
| seat | smallint (1/2) |
| ready_at | timestamptz NULL |
| score | smallint |
| answered_any | boolean |
| xp_eligible | boolean |
| result | enum NULL |

PK (`battle_id`, `user_id`).

Demo battle-lar da bu cədvələ köçürülməlidir (bot iştirakçı kimi?). Migration planı qur.

## Necə edəcəksən
1. Növbə harada? Redis (sürətli, `LPOP` atomar) yoxsa DB (`FOR UPDATE SKIP LOCKED`)? Atomar cütləşdirmə: iki bilet götürülür və bir tranzaksiyada `matched` olur.
2. Növbə açarı: `mm:{tenant}:{locale}`.
3. Matchmaker: ayrıca job (049), hər 0.5–1 san. növbəni yoxlayır. Yaxud `POST /matchmaking` zamanı dərhal gözləyən biri varsa cütləşdirir.
4. 30 san. timeout → `expired` + WS `matchmaking.timeout` → frontend "yenidən cəhd və ya **açıq** demo rejim" təklif edir. **Gizlicə bot qoşmaq qadağandır.**
5. WS: `user:{id}` kanalında `matchmaking.matched { battle_id }`.

## Qəbul meyarları
- [ ] Eyni tenant və dildə iki istifadəçi cütləşir.
- [ ] Bir istifadəçinin iki cihazı iki bilet yarada bilmir.
- [ ] 3 nəfər eyni anda növbəyə girəndə: bir cüt + biri gözləyir, heç kim iki battle-a düşmür (test).
