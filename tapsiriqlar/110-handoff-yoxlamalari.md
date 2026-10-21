# 110 — Bukmekerə keçiddən əvvəl yoxlamalar

**Status:** [ ] · **Faza:** 9 · **Əvvəl bitməli:** 109, 022, 029

## Qısaca
Keçid yalnız **bütün** şərtlər ödənəndə olsun.

## Yoxlamalar (bu sıra ilə)
| # | Nə yoxlanır | Ödənmirsə |
|---|---|---|
| 1 | Funksiya açıqdır | 403 |
| 2 | `betting_handoff` icazəsi var (sessiyadan təzə oxu) | 403 `ACCESS_DENIED` |
| 3 | İstifadəçi bloklanmayıb | 403 `USER_RESTRICTED` |
| 4 | Matç mənbəyi işləyir | 503 `FEED_UNAVAILABLE` |
| 5 | Hər seçim: matç bu tenant-dadır, canlıdır və ya gözlənilir | 409 `OUTCOME_UNAVAILABLE` |
| 6 | Bazar açıqdır, əmsal aktivdir | 409 `OUTCOME_UNAVAILABLE` |
| 7 | Əmsal köhnəlməyib (15 san.) | 409 `OUTCOME_UNAVAILABLE` |
| 8 | Versiya cari versiyadır | 409 `ODDS_CHANGED` (111) |
| 9 | Bir matça bir seçim | 400 |
| 10 | Sürət limiti (dəqiqədə ~10) | 429 |

## Nə edəcəksən
1. Bütün seçimləri yoxla və **bütün** problemləri birdən `details`-də qaytar. Birincidə dayanma, frontend hamısını göstərsin.
2. 5–8-ci yoxlamalar proqnozlarda (098) da var, kodu **paylaş**.

## Hazır olduğunu necə yoxlayarsan
- [ ] Hər sətir üçün test.
- [ ] İcazəsiz heç bir keçid yaranmır.
