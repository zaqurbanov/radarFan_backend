# 098 — Proqnoz vermə: `POST /predictions`

**Faza:** 7 · **Asılılıq:** 097, 029, 036 · **Status:** [ ]

## Məqsəd
İstifadəçi outcome seçəndə `pending` proqnoz yaransın.

## Niyə
Sayt: "При выборе прогноз записывается со статусом «Ожидает»."

## Endpoint
| Metod | Yol | Body | Cavab |
|---|---|---|---|
| GET | /predictions/board | | proqnoz ekranı: matçlar + outcome-lar (lentin sadələşdirilmiş forması) |
| POST | /predictions | `{ outcome_id, odds_version }` + Idempotency-Key | prediction |

## Necə edəcəksən
1. Yoxlamalar (handoff-a çox bənzəyir, 110):
   - feature və entitlement aktivdir (022);
   - outcome bu tenant-dadır, market `open`, outcome `active`, stale deyil (029);
   - event `finished`/`cancelled` deyil;
   - `odds_version` cari versiyaya bərabərdir, yoxsa 409 `ODDS_CHANGED` + yeni qiymət (111 ilə eyni məntiq). Kodu **paylaş**.
2. Canlı matçda proqnoz vermək olarmı? Saytda bütün matçlar canlıdır və proqnoz verilir. Bəs 89-cu dəqiqədə, hesab 3:0 olanda? Real bukmekerlər əmsalı buna görə qoyur, amma "virtual statistika" üçün sui-istifadə riski var. Qərar ver: `proqnoz yalnız scheduled` və ya `live da olar`.
3. Limitlər: matç başına maksimum proqnoz sayı? Gündəlik? (Spam statistikası.)
4. Coin xərclənmir (sayt). `stake_units` sabit 100, müştəridən qəbul edilmir.

## Qəbul meyarları
- [ ] Stale outcome ilə → 409.
- [ ] Köhnə `odds_version` → 409 `ODDS_CHANGED` + yeni qiymət.
- [ ] Coin balansı dəyişmir.
