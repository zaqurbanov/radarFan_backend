# 118 — "Сбросить демо"

**Status:** [ ] · **Faza:** 10 · **Əvvəl bitməli:** 015, 083, 086, 097

## Qısaca
Demo istifadəçi öz vəziyyətini başlanğıca qaytara bilsin.

## Saytda
Profildə: "Мои избранные · **Сбросить демо**". Nümayiş edən (məs. satış komandası) hər görüşdən əvvəl təmiz başlamaq istəyir.

## Problem
Jurnallar (XP, coin) **dəyişdirilə və silinə bilməz** (083). "Sıfırlamaq" onları silə bilməz.

## Həll variantları
| Variant | Necə |
|---|---|
| A. Düzəliş sətirləri | XP/coin-i mənfi düzəlişlərlə başlanğıca gətir, seçilmişləri, proqnozları, qarderobu sil |
| **B. Yeni demo istifadəçi** | Köhnə istifadəçini arxivə göndər, yenisini yarat (təmiz tarixçə ilə) |

**Tövsiyə: B.** Jurnallar toxunulmaz qalır, köhnə məlumat avtomatik "yoxa çıxır".

## Endpoint
`POST /demo/reset`: **yalnız** demo serverdə və demo tenant-da (015).

## Nə edəcəksən (B variantı)
1. Köhnə istifadəçinin `external_user_id`-sini dəyiş (məs. `ext_nihal_01#archived#...`).
2. Frontend yenidən giriş edir → yeni təmiz istifadəçi yaranır.
3. Production-da bu endpoint **ümumiyyətlə olmasın**.

## Hazır olduğunu necə yoxlayarsan
- [ ] Sıfırlamadan sonra: XP 0, coin 300, seçilmiş yox, proqnoz yox, qarderob başlanğıc.
- [ ] Jurnallardan heç bir sətir silinməyib.
- [ ] Production-da 404.
