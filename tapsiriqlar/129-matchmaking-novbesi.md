# 129 — Real duel: rəqib axtarışı (növbə)

**Status:** [ ] · **Faza:** 13 · **Əvvəl bitməli:** 073–082, 044

## Qısaca
İki real istifadəçini duel üçün cütləşdir.

## Qaydalar (sənəddən)
- Vəziyyətlər: `queued` (növbədə) → `matched` (cütləşdi) → `ready` → sual açıq → sual bağlı → `completed`. Başlamadan ləğv → `cancelled`, server xətası → `aborted`.
- **30 saniyə** rəqib tapılmasa → "yenidən cəhd et" və ya **açıq şəkildə** demo bot təklif et. **Gizlicə bot qoşmaq qadağandır!**
- Cütləşmə eyni bukmeker və eyni dildə.
- Bir istifadəçinin iki cihazı iki növbə yaratmır.

## Endpoint-lər
`POST /matchmaking`, `DELETE /matchmaking/{ticket_id}`, `POST /battles/{id}/ready` (130).

## Yeni cədvəllər
**`matchmaking_tickets`**
| Sütun | İzah |
|---|---|
| id, tenant_id, user_id | |
| locale | dil |
| status | `queued` / `matched` / `cancelled` / `expired` |
| battle_id | cütləşəndə |
| created_at, expires_at | (30 saniyə) |

Partial unique: (`tenant_id`, `user_id`) yalnız `status = queued` olanda. "İki cihaz = bir növbə."

**`battle_participants`**: duel iştirakçıları (demo-dakı `battles.user_id` əvəzinə)
| Sütun | İzah |
|---|---|
| battle_id, user_id | əsas açar |
| seat | 1 və ya 2 |
| ready_at | |
| score | |
| answered_any | ən azı bir cavab verib? |
| xp_eligible | |
| result | |

Demo duel-ləri də bu cədvələ köçürmək lazım olacaq. Planını qur.

## Nə edəcəksən
1. Növbə harada? Redis (sürətli) və ya DB (`FOR UPDATE SKIP LOCKED`). Əsas şərt: iki bilet **bir tranzaksiyada** cütləşir.
2. Növbə açarı: `mm:{tenant}:{dil}`.
3. Cütləşdirici: fon işi (hər 0.5–1 saniyə), və ya növbəyə girəndə gözləyən varsa dərhal.
4. Bildiriş (`user:` kanalı): `matchmaking.matched { battle_id }`.

## Hazır olduğunu necə yoxlayarsan
- [ ] Eyni bukmeker və dildə iki istifadəçi cütləşir.
- [ ] Bir istifadəçinin iki cihazı iki bilet yarada bilmir.
- [ ] 3 nəfər eyni anda → bir cüt + biri gözləyir, heç kim iki duelə düşmür (test).
