# 092 — Mükafatı almaq: `POST /challenges/{id}/claim`

**Status:** [ ] · **Faza:** 6 · **Əvvəl bitməli:** 091, 083, 036

## Qısaca
3 tapşırıq bitəndə istifadəçi 100 XP-ni **dəqiq bir dəfə** alsın.

## Qaydalar (sənəddən)
- Tapşırıqlar bitməyibsə → 409 `CHALLENGE_NOT_READY`.
- Bitibsə → bir tranzaksiyada 100 XP + status `claimed`.
- Təkrar → **eyni** cavab, yeni XP yox.
- Eyni anda iki claim → **bir** jurnal sətri.
- İnternet yoxdursa, frontend server cavabından əvvəl "uğurlu" göstərməməlidir.

## Addımlar (bir tranzaksiyada)
1. Idempotency-Key məcburidir (036).
2. İrəliləyişi kilidlə və oxu (`FOR UPDATE`).
3. `in_progress` → 409 (`details`-də qalan tapşırıqlar).
4. `claimed` → köhnə jurnal sətrini tap, **eyni** cavabı qaytar.
5. `claimable` → 100 XP ver + `claimed` et.
6. Bildirişlər: `xp.updated`, `challenge.updated`.

## Üç qat qoruma: niyə üçü də?
| Qoruma | Nəyi tutur |
|---|---|
| Idempotency-Key | eyni sorğunun təkrarı (şəbəkə) |
| `FOR UPDATE` kilidi | eyni anda iki fərqli sorğu |
| Jurnalda unique qayda | kodda səhv olsa belə, son müdafiə |

Özün izah et: hər biri olmasa nə baş verərdi?

## Hazır olduğunu necə yoxlayarsan
- [ ] 2/3 bitib → 409.
- [ ] 3/3 → 100 XP. İkinci claim → eyni `award_id`, balans dəyişmir.
- [ ] Fərqli açarlarla eyni anda 2 claim → bir jurnal sətri (test).
