# 088 — Battle coin mükafatı (+20 ◈)

**Faza:** 6 · **Asılılıq:** 079, 086 · **Status:** [ ]

## Məqsəd
Duel tamamlananda hər düzgün cavaba 20 ◈.

## Niyə
Sayt: "Верный ответ — 50 XP и 20 ◈", "+20 ◈ за верный ответ в первых 3 баттлах", nəticə ekranı "+100 XP · +40 ◈".

## Necə edəcəksən
1. 085 ilə eyni tranzaksiyada: `earnCoins(correct × coins_per_correct, source_type=battle, source_id=battle_id)`.
2. Eyni limit (`xp_eligible`, 080). Sayt "ilk 3 battle" deyir. Ayrı limit lazımdırmı? Hazırda eyni.
3. `battle.completed` payload-ına `awarded_coins`, `coin_balance` əlavə et.

## Qəbul meyarları
- [ ] 2 düzgün → +40 ◈.
- [ ] 4-cü battle (limitdən sonra) → 0 ◈.
