# 079 — Battle-ın tamamlanması və nəticəsi

**Faza:** 5 · **Asılılıq:** 077, 083, 086 · **Status:** [ ]

## Məqsəd
Battle-ı bir dəfə tamamla, nəticəni hesabla, XP və coin-i **atomar** ver.

## Niyə
- Sənəd (bölmə 5): "Nəticə: user_score > bot_score — victory, bərabərlik — draw, az olduqda — defeat. Mövcud prototip bərabər hesabı səhvən məğlubiyyət kimi təsvir edir; reallaşdırmada bunu düzəltmək lazımdır."
- "Tamamlanmış duel üçün hər düzgün cavaba 50 XP, maksimum 150 XP verilir. Mükafat completed zamanı bir server tranzaksiyası ilə qeyd olunur. Buraxılmış sual 0 xal alır; nəticənin yenidən yüklənməsi və təkrar finish XP-ni yenidən vermir."
- Bölmə 11: "İlk completed zamanı 0-dan 150-dək XP verilir. Nəticənin yenidən yüklənməsi, paralel sorğular və iki cihaz mükafatı ikiqat etmir."
- Sayt: "Ты победил! 2 : 1 Nihal — Alex +100 XP · +40 ◈", "Сыграть ещё", "Моя статистика →", "В магазин персонажа →".

## Nəticə qaydası
| Hesab | Nəticə | Sayt mətni |
|---|---|---|
| 2:1, 3:1 | victory | Ты победил! |
| 1:1 | **draw** | (sayt yoxla; prototipdəki səhvi təkrarlama) |
| 0:1 | defeat | |

Bot həmişə 1 xal yığır, deməli: 0 düzgün → defeat, 1 → draw, 2–3 → victory.

## Tranzaksiya
1. Battle `FOR UPDATE`. `state` artıq `completed` → mövcud nəticəni qaytar (idempotent).
2. Son sual bağlıdır?
3. `result` hesabla, `state = completed`, `completed_at`.
4. `xp_eligible` (080) isə:
   - XP ledger: `amount = correct × 50`, `source_type = battle`, `source_id = battle_id` (083). Unique constraint ikiqat ödənişi DB səviyyəsində bloklayır.
   - Coin ledger: `correct × 20` (088). Saytda coin də yalnız "ilk 3 battle"-da verilir.
5. Challenge: `complete_battle` (091). Məğlubiyyət də sayılır (sənəd).
6. Outbox: `battle.completed` { result, scores, awarded_xp, xp_balance }, `xp.updated`.
7. Analitika: `battle_completed`.

## Qəbul meyarları
- [ ] 1:1 → `draw`.
- [ ] Tamamlamanı iki dəfə və paralel çağırmaq → bir ledger qeydi (test).
- [ ] Limit dolubsa → `awarded_xp: 0`, nəticə yenə qeyd olunur.
