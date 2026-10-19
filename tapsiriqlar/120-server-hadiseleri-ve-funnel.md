# 120 — Server tərəfli hadisələr və funnel

**Faza:** 11 · **Asılılıq:** 119, 045 · **Status:** [ ]

## Məqsəd
Kritik hadisələr müştəriyə etibar etmədən serverdə qeyd olunsun. Funnel hesablanabilir olsun.

## Niyə
- Sənəd (bölmə 11): "message_sent və challenge_claimed commit-dən sonra serverdə qeydə alınır."
- "Funnel: matça baxış → nəticə seçimi → handoff sorğusu → təsdiqlənmiş kupon açılışı. Hesablama məxrəcləri, atribusiya pəncərəsi və uyğun istifadəçi qrupu eksperimentdən əvvəl müəyyən edilir. Retention D1/D7 və təkrar sessiyalar sabit təxəllüslü istifadəçi əsasında hesablanır."

**Niyə serverdə?** Müştəri hadisələri itir (offline, reklam bloklayıcı, bağlanmış tab). "Neçə mesaj göndərildi" kimi əsas rəqəmlər dəqiq olmalıdır.

## Server hadisələri
| Hadisə | Harada |
|---|---|
| message_sent | 053 (commit-dən sonra) |
| challenge_claimed | 092 |
| battle_started / battle_completed | 074, 079 |
| match_saved | 037 |
| poll_voted | 062 |
| handoff_requested | 109 |
| betslip_opened / handoff_failed | 109 (bridge nəticəsi), 113 (webhook) |

## Necə edəcəksən
1. "Commit-dən sonra" necə? Outbox (045) ideal yerdir: biznes tranzaksiyası analitika hadisəsini outbox-a yazır, relay onu analytics cədvəlinə köçürür. Commit olmasa, hadisə də yoxdur.
2. Müştəri eyni hadisəni də göndərsə (dublikat)? Server hadisələrinin adı/mənbəyi fərqli olsun (`source: server`), ya da müştəri bu hadisələri göndərməsin. Qərar ver.
3. **Funnel sorğusu** yaz (SQL view): matç baxışı olan unikal istifadəçilər → onlardan outcome seçənlər → handoff → betslip_opened. `correlation_id` handoff → betslip-i birləşdirir.
4. D1/D7 retention sorğusu: ilk `app_opened` günü, 1 və 7 gün sonra qayıdanlar.
5. GGR hesablanmır. Sənəd: "GGR formulunu və bonusların uçotunu tərəfdaş müəyyən edir."

## Qəbul meyarları
- [ ] Mesaj göndərmə rollback olanda `message_sent` hadisəsi yoxdur.
- [ ] Funnel SQL view-u test məlumatı ilə düzgün rəqəmlər verir.
