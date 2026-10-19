# 086 — Coin ledger (◈)

**Faza:** 6 · **Asılılıq:** 083, 084 · **Status:** [ ]

## Məqsəd
Virtual coin (◈) üçün ayrıca, mənfi düşə bilməyən jurnal.

## Niyə
- Sayt: "◈ 320", "300 ◈ на старте. +20 ◈ за верный ответ в первых 3 баттлах. Монеты доступны только в демо и не обмениваются на деньги." Mağazada xərclənir (102–106).
- **Sənəd ziddiyyəti:** "pul mükafatları, pul kisəsi, depozitlər ... MVP-yə daxil deyil". Coin pul deyil, mübadilə olunmur. Bu, "virtual oyun valyutası"dır. Amma "pul kisəsi"nə bənzəyir. Sayt əsas olduğu üçün edirik. Sənəddə qeyd olunmalıdır (məhsul sahibi).
- Sayt mətni: "Монеты доступны **только в демо**". Production-da coin olacaqmı? Bu açıq sualdır. Tenant config: `features.shop`/`economy.coins_enabled`.

## XP ilə fərq
| | XP | Coin |
|---|---|---|
| Xərclənir? | Xeyr, yalnız artır | Bəli (mağaza) |
| Mənfi ola bilər? | Xeyr (düzəliş istisna) | **Heç vaxt** |
| Mənbə | battle, challenge | start bonusu, battle, (gələcəkdə) challenge |

## Cədvəl
**`coin_ledger`**
| Sütun | Tip |
|---|---|
| id | uuid PK |
| tenant_id | uuid |
| user_id | uuid FK |
| amount | int (müsbət = qazanc, mənfi = xərc) |
| source_type | enum(`starting_bonus`, `battle`, `purchase`, `adjustment`, `demo_reset`) |
| source_id | uuid |
| balance_after | int | xərc zamanı yoxlama və tarixçə üçün |
| created_at | timestamptz |

UNIQUE (`tenant_id`, `user_id`, `source_type`, `source_id`).
`user_balances.coins` CHECK >= 0 (084).

**Niyə XP ilə bir cədvəl (`currency` sütunu ilə) deyil?** Mümkündür, amma qaydaları fərqlidir, ayrı cədvəl daha aydındır. İstəsən birləşdirə bilərsən, qərarını yaz.

## Necə edəcəksən
1. `spendCoins(tx, ...)`: `UPDATE user_balances SET coins = coins - :price WHERE user_id = :u AND coins >= :price RETURNING coins`. Sətir qayıtmadısa → `INSUFFICIENT_COINS`. Bu, **atomar yoxlama və xərc**dir. "SELECT balans → if → UPDATE" yanlışdır (race).
2. `earnCoins(tx, ...)`: ledger insert (unique) + balans artımı.

## Qəbul meyarları
- [ ] Balans 80, iki paralel 80-lik alış → biri uğurlu, digəri 409 (test).
- [ ] Balans heç vaxt mənfi olmur.
