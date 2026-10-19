# 093 — `challenge.updated` və `xp.updated` real vaxt hadisələri

**Faza:** 6 · **Asılılıq:** 091, 092, 045 · **Status:** [ ]

## Məqsəd
XP, coin və tapşırıq dəyişiklikləri istifadəçinin bütün açıq cihazlarına çatsın.

## Niyə
Sənəd (bölmə 9): `challenge.updated` → challenge_id, task_flags, status; `xp.updated` → ledger_id, xp_balance. Kanal: `user:{id}`.

Başlıqdakı XP sayğacı (saytda "50 XP" → "150 XP") hər yerdə yenilənməlidir.

## Necə edəcəksən
1. Ledger insert ilə eyni tranzaksiyada outbox → `user:{id}`.
2. Coin üçün ayrıca `coins.updated` { ledger_id, coin_balance } (sənəddə yoxdur, saytdan).
3. Müştəri qaydası: `ledger_id` artıq görülübsə, at (dedup).
4. `user:` kanalı bufer tələb edir (048). XP bildirişi itməsin.

## Qəbul meyarları
- [ ] Battle bitəndə ikinci tabdakı başlıq yeni XP-ni alır.
