# 065 — Səs verməyənlər real vaxtda da nəticəni görməsin

**Status:** [ ] · **Faza:** 4 · **Əvvəl bitməli:** 062, 044

## Qısaca
Sorğu yeniləməsi gələndə: səs **vermiş** istifadəçi rəqəmləri görür, **verməmiş** görmür.

## Niyə lazımdır?
Səsdən əvvəl nəticəni görmək seçimə təsir edir ("hamı RM deyir, mən də"). Sorğunun dürüstlüyü üçün.

## Problem
Pub/sub (044) **hamıya eyni** mesajı göndərir. Biz isə fərqli məzmun istəyirik.

## Variantlar
| Variant | Necə |
|---|---|
| **A. İki kanal** | `room:{id}` (hamıya, rəqəmsiz) + `poll:{id}:voters` (yalnız səs verənlərə). Səs verəndə frontend ikinci kanala abunə olur |
| B. Serverdə süzgəc | Server hər bağlantı üçün "bu adam səs veribmi?" yoxlayır, rəqəmləri kəsir |
| C. Yalnız siqnal | Hamıya "dəyişdi" göndər, səs verənlər REST ilə soruşsun. Problem: 1000 nəfər eyni anda soruşur |

**Tövsiyə: A** (sadə və ucuz). Seçimini yaz.

## Nə edəcəksən
Seyrəlt: hər səsdə yox, 1–2 saniyədə bir.

## Hazır olduğunu necə yoxlayarsan
- [ ] Səs verməmiş müştəri yeniləmədə rəqəm almır (test).
- [ ] Səs vermiş müştəri yeni rəqəmləri alır.
