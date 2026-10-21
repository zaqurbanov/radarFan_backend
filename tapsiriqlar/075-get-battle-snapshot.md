# 075 — Duelin vəziyyəti: `GET /battles/{id}`

**Status:** [ ] · **Faza:** 5 · **Əvvəl bitməli:** 074

## Qısaca
Səhifə yeniləndikdə duel **olduğu yerdən** davam etsin.

## Cavab
- duel ID, vəziyyət, rəqib (Alex, bot)
- irəliləyiş: "1 / 3"
- xallar: sən və bot
- cari sual (mətn, variantlar)
  - cavab vermisənsə: sənin cavabın + düzgün cavab + izah
- sualın vəziyyəti (açıq/bağlı), deadline
- bitibsə: nəticə, verilən XP və coin
- server vaxtı

## Nə edəcəksən
1. Yalnız duelin sahibi görə bilər (başqası → 404).
2. Deadline keçibsə, sualı "bağlı" kimi göstər.
3. Frontend bu cavabdan **bütün ekranı** qura bilməlidir, başqa sorğu lazım olmamalıdır.

## Diqqət
- **Açıq** sual üçün düzgün cavab yoxdur.
- **Gələcək** suallar heç vaxt görünmür.

## Hazır olduğunu necə yoxlayarsan
- [ ] Açıq sualda `correct_option_id` yoxdur.
- [ ] Cavabdan sonra düzgün cavab və izah görünür.
- [ ] Gələcək suallar heç vaxt görünmür.
