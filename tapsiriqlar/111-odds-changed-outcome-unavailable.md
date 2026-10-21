# 111 — Əmsal dəyişəndə nə olur

**Status:** [ ] · **Faza:** 9 · **Əvvəl bitməli:** 110

## Qısaca
Qiymət dəyişibsə, istifadəçi yeni qiyməti görsün və **özü təsdiqləsin**.

## Niyə avtomatik yeni qiymətlə davam etmirik?
İstifadəçi 4.20-yə razılaşdı, qiymət 3.10 oldu. Xəbərsiz dəyişmək = aldatmaq. Qanun da bunu tələb edir.

## Xəta forması
409 `ODDS_CHANGED`, `details`:
`{ changes: [{ outcome_id, old_price, old_version, new_price, new_version }] }`

Frontend: "Əmsal 4.20 → 3.10 dəyişdi. Təsdiqləyirsən?" → yeni versiyalarla yenidən `POST /handoffs`.

## Nə edəcəksən
1. Yeni versiyalarla sorğu = **fərqli** məlumat → **yeni** Idempotency-Key lazımdır. Bunu frontend üçün yaz.
2. Təsdiqdən sonra kupondakı (108) qiyməti yenilə.
3. Bağlı əmsal → 409 `OUTCOME_UNAVAILABLE`.

## Hazır olduğunu necə yoxlayarsan
- [ ] Köhnə versiya → 409, `details`-də yeni qiymət.
- [ ] Yeni versiya ilə təkrar → uğurlu.
- [ ] Bağlı əmsal → 409 `OUTCOME_UNAVAILABLE`.
