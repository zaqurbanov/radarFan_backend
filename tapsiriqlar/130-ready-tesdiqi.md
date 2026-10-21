# 130 — Real duel: "hazıram" təsdiqi

**Status:** [ ] · **Faza:** 13 · **Əvvəl bitməli:** 129

## Qısaca
Cütləşmədən sonra hər iki oyunçu **10 saniyə** ərzində "hazıram" desin.

## Endpoint
`POST /battles/{id}/ready` (idempotent: təkrar basmaq problem deyil).

## Nə edəcəksən
1. `ready_at = indi` (artıq varsa → heç nə).
2. Hər ikisi hazırdırsa → birinci sual açılır (131).
3. 10 saniyəlik fon işi: hər ikisi hazır deyilsə → `cancelled`. Hazır olan oyunçu avtomatik növbəyə qaytarılsın? (Qərar ver.)
4. Ləğv olunmuş duel gündəlik XP limitinə **sayılmır**.
5. Bildirişlər: `battle.participant.ready`, `battle.cancelled`.

## Hazır olduğunu necə yoxlayarsan
- [ ] Hər ikisi hazır → sual açılır.
- [ ] Biri 10 saniyədə təsdiqləmir → ləğv, XP yox, limit sərf olunmur.
