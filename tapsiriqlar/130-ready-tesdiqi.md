# 130 — Real duel: hazırlıq təsdiqi (ready)

**Faza:** 13 · **Asılılıq:** 129 · **Status:** [ ]

## Məqsəd
Cütləşmədən sonra hər iki oyunçu 10 saniyə ərzində hazır olduğunu təsdiqləsin.

## Niyə
Sənəd (bölmə 10): "Matched-dan sonra hər iki iştirakçı 10 saniyə ərzində ready təsdiqləyir." "Başlamadan ləğv — cancelled."

## Endpoint
`POST /battles/{id}/ready` (idempotent).

## Necə edəcəksən
1. `battle_participants.ready_at = now()` (artıq varsa heç nə).
2. Hər ikisi hazır → state `ready` → ilk sual açılır (131).
3. 10 san. gecikmiş job: hər ikisi hazır deyilsə → `cancelled`. Hazır olan oyunçu növbəyə avtomatik qaytarılsın? (UX qərarı.)
4. `cancelled` duel XP limitinə sayılmır.
5. WS: `battle.participant.ready`, `battle.cancelled`.

## Qəbul meyarları
- [ ] Hər ikisi hazır → sual açılır.
- [ ] Biri 10 san. ərzində təsdiqləmir → cancelled, heç kimə XP yox, limit sərf olunmur.
