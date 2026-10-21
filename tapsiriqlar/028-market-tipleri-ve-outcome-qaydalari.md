# 028 — Bazar tipləri və qaydaları

**Status:** [ ] · **Faza:** 2 · **Əvvəl bitməli:** 027

## Qısaca
Hər bazar tipinin hansı nəticələrdən ibarət olduğunu və qalibin necə müəyyənləşdiyini **bir yerdə** yaz.

## Bazar tipləri
| Tip | Nəticələr | Saytda | Qalib necə təyin olunur |
|---|---|---|---|
| `football_1x2` | home, draw, away | П1 / X / П2 | 90 dəqiqə + əlavə vaxt |
| `basketball_moneyline` | home, away | П1 / П2 (X yoxdur) | əlavə vaxt (OT) daxil |

## Niyə lazımdır?
Bu qaydalar 3 yerdə istifadə olunacaq:
- matç məlumatını yoxlamaq (027): basketbola `draw` gəlsə, səhvdir;
- çat sorğusunun variantları (061);
- proqnozların hesablanması (099).

Bir yerdə olsa, dəyişiklik bir yerdə edilir.

## Nə edəcəksən
1. Bir konfiqurasiya obyekti yaz: tip → icazəli açarlar + `qalibi_tap(hesab)` funksiyası.
2. Mənbədən tanımadığın açar gəlsə: rədd et və logla.
3. Etiketlər ("П1", "Победа хозяев") **frontend-in** işidir. Backend yalnız `home`/`draw`/`away` qaytarır.

## Hazır olduğunu necə yoxlayarsan
- [ ] Basketbol bazarına `draw` yazmaq mümkün deyil.
- [ ] `qalibi_tap` üçün testlər: 2:1 → home, 1:1 → draw, 0:2 → away.
