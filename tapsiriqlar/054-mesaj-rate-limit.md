# 054 — Mesaj göndərmə rate limit

**Faza:** 4 · **Asılılıq:** 053 · **Status:** [ ]

## Məqsəd
Spam-ın qarşısını almaq: istifadəçi başına sürət məhdudiyyəti.

## Niyə
Sənəd (bölmə 4): "tenant daxilində istifadəçi başına 10 saniyədə ən çox 5, dəqiqədə ən çox 30 mesaj. Limit keçilərsə, 429 və retry_after_seconds qaytarılır. Bu limitlər MVP-nin ilkin konfiqurasiyasıdır."

## Alqoritmlər (öyrən və seç)
| Alqoritm | Xüsusiyyət |
|---|---|
| Fixed window | Sadə, amma pəncərə sərhədində 2× partlayış (0:09-da 5, 0:10-da 5) |
| Sliding window log | Dəqiq, hər mesajın vaxtını saxlayır (sorted set) |
| Sliding window counter | Yaxınlaşma, ucuz |
| Token bucket | Partlayışa icazə + orta sürət |

İki limit eyni anda (5/10 san. **və** 30/dəq.) olduğu üçün sliding window log (Redis ZSET) ən aydındır: son 60 san.-dəki vaxtlar saxlanır, son 10 san.-dəkilər sayılır.

## Necə edəcəksən
1. Açar: `rl:msg:{tenant}:{user}`. Tenant olmadan açar = tenantlar arası qarışıqlıq.
2. Yoxlama + əlavə **atomar** olmalıdır. Lua skripti və ya `MULTI`. Niyə? Paralel 10 sorğu hamısı "4 mesaj var" görüb keçər.
3. `retry_after_seconds` = ən köhnə mesajın pəncərədən çıxmasına qalan vaxt (yuxarı yuvarlaqlaşdır).
4. Rədd olunan cəhd sayılırmı? (Sayılmamalıdır, yoxsa istifadəçi həmişəlik bloklanır.)
5. Limitlər tenant config-dən (021).
6. Ümumi API rate limit-i (121) bundan ayrıdır.

## Qəbul meyarları
- [ ] 10 san.-də 6-cı mesaj → 429 + `retry_after_seconds`.
- [ ] 60 san.-də 31-ci → 429.
- [ ] Paralel 10 sorğudan yalnız 5-i keçir (test).
