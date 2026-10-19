# 065 — `poll.updated`: alıcıya görə fərdiləşdirmə

**Faza:** 4 · **Asılılıq:** 062, 044 · **Status:** [ ]

## Məqsəd
Səs verməmiş istifadəçi real vaxtda da nəticələri görməsin.

## Niyə
Sənəd (bölmə 9): "İstifadəçi səs verməzdən əvvəl poll.updated yalnız status və version ehtiva edir, counts və total olmur; server payload-u alıcının hüquqlarına uyğun fərdiləşdirir."

**Niyə?** Səsdən əvvəl nəticələri görmək seçimə təsir edir ("hamı RM deyir, mən də"). Bu, sorğunun dürüstlüyü üçündür.

## Problem
Pub/sub (044) **hamıya eyni** mesajı göndərir. Fərdiləşdirmə lazımdır.

## Variantlar
| Variant | Necə |
|---|---|
| A. İki kanal | `room:{id}` (hamı, counts-suz) + `poll:{id}:voters` (səs verənlər). Səs verəndə müştəri ikinci kanala avtomatik abunə olur |
| B. Gateway-də filtr | Gateway hər lokal bağlantı üçün "bu user səs veribmi?" yoxlayır (Redis set `poll:{id}:voters`) və payload-ı kəsir |
| C. Yalnız siqnal | Hamıya `{poll_id, version}`, səs verənlər REST ilə çəkir |

A sadə və ucuzdur. B çevikdir, amma hər mesajda Redis yoxlaması. C ən sadədir, amma 1 000 nəfər eyni anda GET edir ("thundering herd").
Tövsiyə: A. Qərarını yaz.

## Necə edəcəksən
1. Throttle: hər səsdə yox, maksimum 1–2 san.-də bir (047 kimi coalesce).
2. Səs verəndə REST cavabı onsuz da counts qaytarır (062).

## Qəbul meyarları
- [ ] Səs verməmiş müştəri `poll.updated`-də counts almır (test: WS mesajını yoxla).
- [ ] Səs vermiş müştəri yeni counts alır.
