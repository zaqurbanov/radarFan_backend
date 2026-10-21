# 054 — Spam-a qarşı sürət limiti

**Status:** [ ] · **Faza:** 4 · **Əvvəl bitməli:** 053

## Qısaca
Bir istifadəçi çox tez-tez yaza bilməsin.

## Limitlər (sənəddən)
- 10 saniyədə ən çox **5** mesaj.
- 1 dəqiqədə ən çox **30** mesaj.
- Aşılsa → 429 + `retry_after_seconds` (neçə saniyə gözləsin).

## Necə qurulur (Redis sorted set)
- Açar: `rl:msg:{tenant}:{user}`.
- Hər mesajın vaxtını saxla.
- Son 10 saniyədəkiləri say → 5-dən çoxdursa, rədd et.
- Son 60 saniyədəkiləri say → 30-dan çoxdursa, rədd et.
- 60 saniyədən köhnələri sil.

## Ən vacib: yoxlama və əlavə **atomar** olmalıdır
Əks halda: eyni anda 10 sorğu gəlir, hamısı "4 mesaj var" görür, hamısı keçir.
Həlli: Lua skripti və ya Redis `MULTI`. Araşdır.

## Nə edəcəksən
1. Limitləri tenant ayarından oxu (021).
2. `retry_after_seconds` = ən köhnə mesajın pəncərədən çıxmasına qalan vaxt (yuxarı yuvarlaqlaşdır).
3. **Rədd olunan cəhdi sayma.** Saysan, istifadəçi həmişəlik bloklanar.

## Hazır olduğunu necə yoxlayarsan
- [ ] 10 saniyədə 6-cı mesaj → 429.
- [ ] Dəqiqədə 31-ci mesaj → 429.
- [ ] Eyni anda 10 sorğudan yalnız 5-i keçir (test).
