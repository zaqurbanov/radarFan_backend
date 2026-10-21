# 104 — Əşya almaq

**Status:** [ ] · **Faza:** 8 · **Əvvəl bitməli:** 086, 103, 036

## Qısaca
Coin xərcləyib əşya almaq: **atomar**, ikiqatsız, mənfi balanssız.

## Saytda
"Кепка PULSE · 80 ◈ · Баланс: 360 ◈ · Купить за 80 ◈" → "В твоём гардеробе · Баланс: 280 ◈ · Надеть".
"Примерка" (sınamaq) **tamamilə frontend-dir**, backend lazım deyil.

## Endpoint
`POST /shop/items/{id}/purchase` (Idempotency-Key ilə) → əşya, yeni coin balansı.

## Addımlar (bir tranzaksiyada)
1. Əşya aktivdir, bu tenant-ındır, pulsuz deyil.
2. Artıq sahibdir → 409 `ALREADY_OWNED`.
3. Coin-i **atomar** xərclə (086). Çatmır → 409 `INSUFFICIENT_COINS` + `details: { balance, price }`.
4. Coin jurnalına yaz: mənbə `purchase` + əşya ID. Unique qayda ikinci alışı **baza səviyyəsində** bloklayır.
5. Qarderoba əlavə et.
6. Bildiriş: `coins.updated`.

## Sual
Addım 2 və addım 4 eyni şeyi yoxlayır. Niyə ikisi də lazımdır?
(Cavab: 2 → istifadəçiyə aydın xəta mesajı; 4 → eyni anda iki sorğu gələndə son müdafiə.)

## Hazır olduğunu necə yoxlayarsan
- [ ] 360 → 80-lik alış → 280, əşya qarderobda.
- [ ] Balans 50, qiymət 80 → 409, heç nə dəyişmir.
- [ ] Eyni əşya üçün eyni anda 5 alış → bir alış, bir xərc (test).
- [ ] Balans heç vaxt mənfi olmur.
