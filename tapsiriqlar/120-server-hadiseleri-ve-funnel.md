# 120 — Server tərəfli hadisələr və "huni" (funnel)

**Status:** [ ] · **Faza:** 11 · **Əvvəl bitməli:** 119, 045

## Qısaca
Vacib hadisələr frontend-ə arxalanmadan **serverdə** qeyd olunsun. "Huni" hesablansın.

## Niyə serverdə?
Frontend hadisələri itir: internet yoxdur, reklam bloklayıcı, bağlanmış tab. "Neçə mesaj göndərildi" kimi əsas rəqəmlər **dəqiq** olmalıdır.

## Server hadisələri
| Hadisə | Harada |
|---|---|
| message_sent | 053 |
| challenge_claimed | 092 |
| battle_started, battle_completed | 074, 079 |
| match_saved | 037 |
| poll_voted | 062 |
| handoff_requested | 109 |
| betslip_opened, handoff_failed | 109, 113 |

## "Commit-dən sonra" necə?
Outbox (045) idealdır: əsas tranzaksiya analitika hadisəsini də outbox-a yazır. Tranzaksiya uğursuz olsa, hadisə də yoxdur.

## Huni nədir?
Addım-addım neçə nəfər keçir:
**Matça baxdı → əmsal seçdi → keçid istədi → kupon açıldı**
Məsələn: 1000 → 200 → 80 → 60. Hər addımda nə qədər itirik?

## Nə edəcəksən
1. Server hadisələrini outbox vasitəsilə yaz.
2. Frontend də eyni hadisəni göndərsə (dublikat)? `source: server` ilə ayır, ya da frontend bunları göndərməsin. Qərar ver.
3. Huni üçün SQL view yaz. `correlation_id` keçidi kupon açılışı ilə birləşdirir.
4. Geri qayıdış (D1/D7): ilk gün gələnlərdən neçəsi 1 və 7 gün sonra qayıtdı?

## Diqqət
GGR (bukmekerin gəliri) **hesablamırıq**. Sənəd: bunu bukmeker müəyyən edir.

## Hazır olduğunu necə yoxlayarsan
- [ ] Mesaj tranzaksiyası ləğv olanda `message_sent` hadisəsi yoxdur.
- [ ] Huni view-u test məlumatı ilə düzgün rəqəmlər verir.
