# 098 — Proqnoz vermək: `POST /predictions`

**Status:** [ ] · **Faza:** 7 · **Əvvəl bitməli:** 097, 029, 036

## Qısaca
İstifadəçi əmsal seçəndə "Ожидает" statuslu proqnoz yaransın.

## Endpoint-lər
| Metod | Yol | Nə üçün |
|---|---|---|
| GET | /predictions/board | proqnoz ekranı: matçlar və əmsallar |
| POST | /predictions | `{ outcome_id, odds_version }` → proqnoz |

## Yoxlamalar
(Bukmekerə keçidə (110) çox bənzəyir, kodu **paylaş**.)
1. Funksiya açıqdır və icazə var (022).
2. Əmsal bu tenant-dadır, bazar açıqdır, əmsal aktivdir, köhnəlməyib (029).
3. Matç bitməyib və ləğv olunmayıb.
4. `odds_version` cari versiyadır, yoxsa 409 `ODDS_CHANGED` + yeni qiymət.

## Qərar ver
- **Canlı matça proqnoz olarmı?** Saytda bütün matçlar canlıdır və proqnoz verilir. Bəs 89-cu dəqiqədə, hesab 3:0 olanda? "Statistika" üçün hiylə riski var.
- Bir matça maksimum neçə proqnoz?

## Diqqət
- Coin xərclənmir (sayt).
- `stake_units` həmişə 100. Frontend-dən **qəbul etmə**.

## Hazır olduğunu necə yoxlayarsan
- [ ] Köhnəlmiş əmsal → 409.
- [ ] Köhnə versiya → 409 `ODDS_CHANGED` + yeni qiymət.
- [ ] Coin balansı dəyişmir.
