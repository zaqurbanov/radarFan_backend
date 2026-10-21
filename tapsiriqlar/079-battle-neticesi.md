# 079 — Duelin sonu və nəticə

**Status:** [ ] · **Faza:** 5 · **Əvvəl bitməli:** 077, 083, 086

## Qısaca
Duel-i **bir dəfə** bitir, nəticəni hesabla, XP və coin-i **atomar** ver.

## Saytda
"Ты победил! 2 : 1 · Nihal — Alex · +100 XP · +40 ◈", "Сыграть ещё", "Моя статистика →", "В магазин персонажа →".

## Nəticə qaydası
Bot həmişə **1 xal** toplayır. Deməli:
| Sənin düzgün cavabın | Hesab | Nəticə |
|---|---|---|
| 0 | 0:1 | defeat (məğlubiyyət) |
| 1 | 1:1 | **draw (heç-heçə)** |
| 2 | 2:1 | victory (qələbə) |
| 3 | 3:1 | victory |

**Diqqət:** prototip 1:1-i səhvən **məğlubiyyət** kimi göstərirdi. Sənəd bunu düzəltməyi tələb edir.

## Addımlar (bir tranzaksiyada, duel kilidli)
1. Artıq `completed`-dirsə → köhnə nəticəni qaytar.
2. Son sual bağlıdır?
3. Nəticəni hesabla, vəziyyəti `completed` et.
4. `xp_eligible` isə:
   - XP: `düzgün × 50` (083). Ledger-dəki unique qayda ikiqat ödənişi bloklayır.
   - Coin: `düzgün × 20` (088).
5. "Duel tamamla" tapşırığı (091). **Məğlubiyyət də sayılır.**
6. Outbox: `battle.completed`, `xp.updated`.

## Hazır olduğunu necə yoxlayarsan
- [ ] 1:1 → draw.
- [ ] Bitirməni iki dəfə və eyni anda çağırmaq → bir XP qeydi (test).
- [ ] Gündəlik limit dolubsa → 0 XP, amma nəticə qeyd olunur.
