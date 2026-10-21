# 063 — Faizlərin cəmi həmişə 100 olsun

**Status:** [ ] · **Faza:** 4 · **Əvvəl bitməli:** 062

## Qısaca
Faizlər tam ədəd olsun və cəmi **həmişə** 100 olsun.

## Problem
3 variant, hər birinə 1 səs → hər biri 33.33% → yuvarlaqlaşdır → 33 + 33 + 33 = **99**. İstifadəçi "1% hara getdi?" deyir.

## Həll: "ən böyük qalıq" üsulu (sənəd bunu tələb edir)
1. Hər variant üçün dəqiq faizi hesabla: `say / ümumi × 100`.
2. Hamısını **aşağı** yuvarlaqlaşdır, topla.
3. Çatışmayan = `100 − cəm`.
4. Kəsr hissəsi **ən böyük** olanlara bir-bir +1 ver, çatışmayan bitənə qədər.
5. Kəsr hissələri bərabərdirsə: sabit qayda ilə seç (məs. variantın sırası). Yoxsa hər dəfə fərqli nəticə çıxar.

**Nümunə:** 1, 1, 1 səs → 33.33 hər biri → 33, 33, 33 = 99 → 1 çatmır → bərabərdir → sırada birinci: **34, 33, 33**.

## Nə edəcəksən
1. Bazadan asılı olmayan təmiz funksiya: `faizlər(saylar) → faizlər`.
2. Kəsr xətalarından qaçmaq üçün tam ədədlərlə hesabla (`say × 100` bölmə və qalıq).
3. Ümumi 0 → `null` (frontend "Hələ səs yoxdur" yazır).
4. **Çoxlu test:** 0 səs, 1 səs, bərabər səslər, 1 milyon səs, 2 və 3 variant.

## Hazır olduğunu necə yoxlayarsan
- [ ] İstənilən giriş üçün cəm 100-dür (1000 təsadüfi giriş ilə test).
- [ ] Eyni giriş həmişə eyni nəticə verir.
