# 118 — Demo sıfırlama ("Сбросить демо")

**Faza:** 10 · **Asılılıq:** 015, 083, 086, 097 · **Status:** [ ]

## Məqsəd
Demo istifadəçi öz demo vəziyyətini ilkinə qaytara bilsin.

## Niyə
Sayt (profil): "Мои избранные · **Сбросить демо**". Demo-nu nümayiş edən şəxs (məs. satış komandası) hər görüşdən əvvəl təmiz başlamaq istəyir.

## Problem
Ledger **dəyişdirilməzdir** (083). "Sıfırlama" ledger-i silə bilməz.

## Həll variantları
| Variant | Necə |
|---|---|
| A. Kompensasiya qeydləri | `adjustment` qeydləri ilə XP/coin-i ilkinə gətir; favorites, predictions, inventar silinir |
| B. Yeni demo istifadəçi | Köhnə `external_user_id`-ni arxivləşdir, yeni istifadəçi yarat (təmiz tarixçə) |

B daha təmizdir: ledger toxunulmaz qalır, bütün asılı məlumat avtomatik "yoxa çıxır". Tövsiyə: B.

## Endpoint
`POST /demo/reset` (yalnız `APP_MODE=demo` və `tenant.mode=demo`, 015).

## Necə edəcəksən
1. B variantı: `users.external_user_id`-ni `ext_nihal_01#archived#{timestamp}` kimi dəyiş, yeni sessiya üçün yeni istifadəçi yaradılır. Frontend reset-dən sonra yenidən exchange edir.
2. Production-da bu endpoint **mövcud olmamalıdır**.
3. Demo feed-i də sıfırlamaq (026)? Bu, bütün demo istifadəçilərə təsir edir. Ayrı admin əməliyyatı olsun.

## Qəbul meyarları
- [ ] Reset-dən sonra XP 0 (və ya sənədə görə başlanğıc), coin 300, favorit yox, proqnoz yox, default qarderob.
- [ ] Ledger-dən heç bir sətir silinmir.
- [ ] Production-da 404.
