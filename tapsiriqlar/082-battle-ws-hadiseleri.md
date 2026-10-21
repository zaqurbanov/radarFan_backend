# 082 — Duel üçün real vaxt bildirişləri

**Status:** [ ] · **Faza:** 5 · **Əvvəl bitməli:** 076–081, 045

## Qısaca
Duelin bütün keçidləri `battle:{id}` kanalı ilə real vaxtda gəlsin.

## Bildirişlər (sənəddən)
| Bildiriş | İçində |
|---|---|
| `battle.question.opened` | duel ID, sual, deadline |
| `battle.answer.ack` | sorğu ID, qəbul olundu?, server vaxtı |
| `battle.question.closed` | xallar, düzgün cavab |
| `battle.completed` | nəticə, xallar, verilən XP, yeni balans |

## Niyə lazımdır (demo-da REST var axı)?
- İki tab açıqdır: birində cavab verəndə digəri də bilməlidir.
- Fon işi (deadline, 10 saniyə) keçid edəndə frontend xəbər tutmalıdır.
- Real duel-də (129+) bu, **əsas** kanal olacaq.

## Nə edəcəksən
1. Hər keçid funksiyası (073) outbox-a bildirişi **özü** yazsın. Bir yerdə.
2. `question.opened`-də **yalnız** cari sual, düzgün cavabsız.
3. Kanala yalnız iştirakçı abunə ola bilər (041).

## Hazır olduğunu necə yoxlayarsan
- [ ] Bir tabda cavab → ikinci tab `question.closed` alır.
- [ ] Heç bir `question.opened` bildirişində düzgün cavab yoxdur (test).
