# 111 — `ODDS_CHANGED` və `OUTCOME_UNAVAILABLE` axını

**Faza:** 9 · **Asılılıq:** 110 · **Status:** [ ]

## Məqsəd
Qiymət dəyişəndə istifadəçi yeni qiyməti görsün və şüurlu şəkildə təsdiqləsin.

## Niyə
- Sənəd (bölmə 3): "Qiymət dəyişərsə, yeni qiymətlə ODDS_CHANGED qaytarılır; istifadəçi yenilənmiş seçimi təsdiqləyir. Suspension zamanı OUTCOME_UNAVAILABLE qaytarılır."
- Bölmə 8: "ODDS_CHANGED üçün details aktual qiyməti və version-u ... ehtiva edir."
- Bölmə 11: "Köhnəlmiş qiymət yenidən təsdiq tələb edir."

**Niyə avtomatik yeni qiymətlə davam etmirik?** İstifadəçi 4.20-yə razılaşdı, 3.10 oldu. Xəbərsiz dəyişmək = aldatma. Tənzimləyicilər bunu tələb edir.

## Xəta formatı
409 `ODDS_CHANGED`, `details`:
`{ changes: [{ outcome_id, old_price, old_version, new_price, new_version }] }`
Frontend: "Əmsal 4.20 → 3.10 dəyişdi. Təsdiqləyirsən?" → yeni `odds_version` ilə yenidən `POST /handoffs`.

## Necə edəcəksən
1. Idempotency (036): yeni versiyalarla təkrar sorğu fərqli body-dir → **yeni** Idempotency-Key lazımdır. Bunu frontend üçün sənədləşdir.
2. Kupon (108) seçimlərinin `price_at_selection`-ı təsdiqdən sonra yenilənsin.
3. Kiçik dəyişikliklər üçün tolerans (məs. qiymət artırsa, istifadəçinin xeyrinədir, təsdiq lazımdırmı)? Bəzi bukmekerlər "accept higher odds" seçimi verir. Sənəd bunu demir, hər dəyişiklik təsdiq tələb edir. Qeyd et, etmə.

## Qəbul meyarları
- [ ] Köhnə versiya → 409, details-də yeni qiymət.
- [ ] Yeni versiya ilə təkrar → uğur.
- [ ] Suspended outcome → 409 `OUTCOME_UNAVAILABLE`.
