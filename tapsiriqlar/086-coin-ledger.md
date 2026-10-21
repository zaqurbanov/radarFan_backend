# 086 — Coin jurnalı (◈)

**Status:** [ ] · **Faza:** 6 · **Əvvəl bitməli:** 083, 084

## Qısaca
Virtual coin üçün ayrıca, **mənfiyə düşə bilməyən** jurnal.

## Saytda
"◈ 320", "300 ◈ на старте. +20 ◈ за верный ответ в первых 3 баттлах. Монеты доступны только в демо и не обмениваются на деньги." Mağazada xərclənir.

## Qeyd
Sənəd: "pul kisəsi MVP-yə daxil deyil". Coin pul deyil, dəyişdirilmir, virtual oyun valyutasıdır. Sayt əsas olduğu üçün edirik, amma məhsul sahibi sənədə əlavə etməlidir. Funksiyanı ayarla söndürmək mümkün olsun (`economy.coins_enabled`).

## XP ilə fərqi
| | XP | Coin |
|---|---|---|
| Xərclənir? | Xeyr | Bəli (mağaza) |
| Mənfi ola bilər? | Xeyr | **Heç vaxt** |

## Yeni cədvəl: `coin_ledger`
| Sütun | İzah |
|---|---|
| id, tenant_id, user_id | |
| amount | + qazanc, − xərc |
| source_type | `starting_bonus`, `battle`, `purchase`, `adjustment`, `demo_reset` |
| source_id | |
| balance_after | əməliyyatdan sonra balans |
| created_at | |

Unique (`tenant_id`, `user_id`, `source_type`, `source_id`).

## Ən vacib: xərcləmə atomar olmalıdır
**Səhv yol:** "balansı oxu → kifayətdirsə → azalt". İki eyni anda alış hər ikisi "kifayətdir" görür → balans mənfi olur.

**Düzgün yol (bir əmr):**
`UPDATE user_balances SET coins = coins - qiymət WHERE user_id = ... AND coins >= qiymət RETURNING coins`
Sətir qayıtmadısa → coin çatmır → `INSUFFICIENT_COINS`.

## Hazır olduğunu necə yoxlayarsan
- [ ] Balans 80, eyni anda iki 80-lik alış → biri uğurlu, digəri 409 (test).
- [ ] Balans heç vaxt mənfi olmur.
