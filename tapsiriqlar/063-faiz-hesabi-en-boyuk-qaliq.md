# 063 — Faizlərin hesablanması (ən böyük qalıq üsulu)

**Faza:** 4 · **Asılılıq:** 062 · **Status:** [ ]

## Məqsəd
Faizlər tam ədəd olsun və cəmi **həmişə** 100 olsun.

## Niyə
Sənəd (bölmə 4): "Total sıfırdırsa, «Hələ səs yoxdur» göstərilir. Paylar ən böyük qalıqlar üsulu ilə cəmi 100 faiz olacaq şəkildə yuvarlaqlaşdırılır. Sorğu nəticənin ehtimalını deyil, auditoriyanın fikrini əks etdirir."

**Problem:** 3 variant, hər biri 1 səs: 33.33% → yuvarlaqlaşdırma → 33 + 33 + 33 = 99. İstifadəçi "99%?" deyir.

## Alqoritm (Hamilton / largest remainder)
1. Hər variant üçün dəqiq pay: `count / total * 100`.
2. Aşağı yuvarlaqlaşdır (floor), cəmlə.
3. Çatışmayan = `100 - cəm`.
4. Qalıqları (kəsr hissələri) böyükdən kiçiyə sırala, çatışmayan qədər ən böyük qalıqlılara +1 ver.
5. **Bərabər qalıqlar:** kim +1 alır? Deterministik qayda lazımdır (məs. `position` sırası). Yoxsa hər sorğuda fərqli nəticə.

Nümunə: 1, 1, 1 → 33.33 hər biri → floor 33, 33, 33 = 99 → 1 çatışmır → qalıqlar bərabər → position-a görə birinciyə: 34, 33, 33.

## Necə edəcəksən
1. Təmiz funksiya (pure function): `largestRemainder(counts: number[]): number[]`. DB-dən asılı deyil.
2. Float dəqiqlik problemlərindən qaçmaq üçün tam ədədlərlə hesabla: `count * 100` / `total` → bölmə nəticəsi və qalıq (`%`).
3. Bu funksiya üçün **çoxlu** unit test yaz: 0 səs, 1 səs, bərabər, 1 000 000 səs, 2 və 3 variant.
4. `total = 0` → `percentages: null`.

## Qəbul meyarları
- [ ] İstənilən giriş üçün cəm 100-dür (property-based test: təsadüfi 1 000 giriş).
- [ ] Eyni giriş həmişə eyni nəticə verir.
