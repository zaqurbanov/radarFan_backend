# 088 — Duel üçün coin (+20 ◈)

**Status:** [ ] · **Faza:** 6 · **Əvvəl bitməli:** 079, 086

## Qısaca
Duel bitəndə hər düzgün cavaba 20 coin.

## Saytda
"Верный ответ — 50 XP и 20 ◈", nəticə: "+100 XP · +40 ◈".

## Nə edəcəksən
1. XP ilə (085) **eyni tranzaksiyada**: `düzgün × 20`, mənbə `battle` + duel ID.
2. Eyni gündəlik limit (`xp_eligible`).
3. `battle.completed` bildirişinə `awarded_coins` və yeni coin balansını əlavə et.

## Hazır olduğunu necə yoxlayarsan
- [ ] 2 düzgün → +40 ◈.
- [ ] Limitdən sonrakı duel → 0 ◈.
