# 070 — Demo bot mesajları

**Status:** [ ] · **Faza:** 4 · **Əvvəl bitməli:** 053, 026

## Qısaca
Demo rejimdə otaqlar "canlı" görünsün: **açıq işarəli** bot mesajları.

## Saytda
"Alex · демо", "Marta · демо": "Барса ещё может отыграться. Жду замену."

## Qayda (sənəddən)
Production-da uydurma iştirakçılar **qadağandır**. Deməli botlar **yalnız demo tenant-da** və həmişə "демо" işarəsi ilə.

## Nə edəcəksən
1. `users` cədvəlinə `is_bot` sütunu əlavə et. Seed-də botları yarat (Alex, Marta...).
2. Bot mesajlarında `is_demo: true`. API-də frontend "· демо" yazsın.
3. Bot nə vaxt yazır? Seçimlər: seed-də sabit mesajlar; fon işi ilə vaxtaşırı; qol olanda reaksiya ("Гол!").
4. **Qoruma:** bot kodu yalnız `tenants.mode = demo` olanda işləsin.
5. Bot mesajları sürət limitinə və tapşırıqlara düşmür.

## Hazır olduğunu necə yoxlayarsan
- [ ] Demo otaqlarda bot mesajları var, hamısı işarəli.
- [ ] Production tenant-da bot mesajı yaratmaq mümkün deyil (test).
