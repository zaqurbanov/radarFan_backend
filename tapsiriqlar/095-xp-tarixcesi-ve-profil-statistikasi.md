# 095 — XP tarixçəsi və profil sayğacları

**Faza:** 6 · **Asılılıq:** 083, 037, 079 · **Status:** [ ]

## Məqsəd
Profil ekranı üçün XP tarixçəsi və qısa statistika.

## Niyə
Sayt (profil, "Твой профиль"):
- "ПРОГРЕСС 150 XP"
- "2 завершённых игр · 0 избранных матчей"
- "История XP": "Quiz Battle · 2 верных +100", "Quiz Battle · 1 верных +50"
- "Мои избранные"
Sənəddə yoxdur, amma ledger (083) məhz buna imkan verir.

## Endpoint-lər
| Metod | Yol | Cavab |
|---|---|---|
| GET | /me/xp-history?cursor | items: { ledger_id, amount, source_type, title_key, metadata (`correct: 2`), created_at } |
| GET | /me (023) | `counters.completed_games`, `counters.favorites` |

## Necə edəcəksən
1. Tarixçə = `xp_ledger` (user, `created_at DESC`) + cursor (031-dəki qayda: `created_at, id`).
2. Mətn ("Quiz Battle · 2 верных") frontend-də `source_type + metadata`-dan qurulur. Backend lokallaşdırılmış mətn qaytarmır.
3. `completed_games`: battle-lar (`completed`). Find Pair (096) sayılırmı? Serverdə qeyd olunmursa, yox.
4. Sayğaclar hər `/me`-də `COUNT`? Kiçik ədədlər üçün OK. Böyüyəndə `user_balances`-ə denormalizasiya.

## Qəbul meyarları
- [ ] 2 battle-dan sonra tarixçədə 2 qeyd, metadata-da düzgün cavab sayı.
