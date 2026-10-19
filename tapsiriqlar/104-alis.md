# 104 — Əşya alışı: `POST /shop/items/{id}/purchase`

**Faza:** 8 · **Asılılıq:** 086, 103, 036 · **Status:** [ ]

## Məqsəd
Coin xərcləyib əşya almaq: atomar, ikiqatsız, mənfi balanssız.

## Niyə
Sayt: "Кепка PULSE · 80 ◈ · Баланс: 360 ◈ · Купить за 80 ◈" → "В твоём гардеробе · Баланс: 280 ◈ · Надеть". "Примерка не меняет текущий образ" (примерка = sınama tamamilə frontend-dir, backend lazım deyil).

## Tranzaksiya
1. Idempotency-Key (036).
2. Əşya `active`, bu tenant-ın, default deyil.
3. Artıq sahibdir → 409 `ALREADY_OWNED` (və ya idempotent 200? Fərqli key ilə ikinci alış cəhdi 409 olmalıdır).
4. `spendCoins(price)` (086): atomar `UPDATE ... WHERE coins >= price`. Uğursuz → 409 `INSUFFICIENT_COINS` + `details: { balance, price }`.
5. `coin_ledger` qeydi: `source_type = purchase`, `source_id = item_id`. Unique (user, purchase, item_id) ikinci alışı DB səviyyəsində bloklayır.
6. `user_items` insert.
7. Outbox: `coins.updated`.
8. Cavab: item, coin_balance.

**Sual:** addım 3 və addım 5-dəki unique constraint eyni şeyi yoxlayır. Hər ikisi niyə lazımdır? (3 → yaxşı xəta mesajı; 5 → race condition-da son müdafiə.)

## Qəbul meyarları
- [ ] 360 → 80-lik alış → 280, qarderobda əşya.
- [ ] Balans 50, qiymət 80 → 409 `INSUFFICIENT_COINS`, heç nə dəyişmir.
- [ ] Eyni əşya üçün 5 paralel alış → bir alış, bir xərc (test).
- [ ] Balans heç vaxt mənfi olmur.
