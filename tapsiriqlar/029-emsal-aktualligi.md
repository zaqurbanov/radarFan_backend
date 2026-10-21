# 029 — Köhnəlmiş əmsallar (15 saniyə qaydası)

**Status:** [ ] · **Faza:** 2 · **Əvvəl bitməli:** 027

## Qısaca
15 saniyədən çox yenilənməyən əmsal "köhnəlmiş" sayılsın. Onunla bukmekerə keçid **olmasın**.

## Niyə lazımdır?
- Canlı matçda əmsal saniyələr ərzində dəyişir. Köhnə qiymətlə mərc = bukmekerin zərəri.
- Sənəd: "15 saniyədən köhnə qiymətlər işarələnir və handoff üçün əlçatan olmur."

## Ən vacib fikir: "köhnəlib" sütunu **saxlama**
Bazada `is_stale` sütunu saxlasan, kim və nə vaxt onu yeniləyəcək? Hər saniyə fon tapşırığı? Bu, çətindir.
**Həll:** hər dəfə **hesabla**: `indi − updated_at > 15 saniyə` → köhnəlib.

## Nə edəcəksən
1. Hədd bukmekerin ayarından gəlsin (default 15).
2. API-də hər nəticə üçün:
   - `is_stale`: köhnəlibmi;
   - `available`: aktivdirmi + köhnəlməyibmi + bazar açıqdırmı + matç bitməyibmi.
3. Cavaba `server_time` əlavə et. Frontend-in saatı səhv olsa da, düzgün hesablasın.

## Fikirləş (vacib)
Matçda heç nə dəyişmirsə (0:0, sakit oyun), mənbə yeniləmə göndərmir. Əmsal 15 saniyə sonra "köhnəlmiş" görünəcək, halbuki düzgündür. Mənbə "mən hələ işləyirəm" siqnalı (heartbeat) göndərirmi? Demo-da bunu necə həll edəcəksən?

## Hazır olduğunu necə yoxlayarsan
- [ ] 15 saniyə yenilənməyən əmsal `is_stale: true` qaytarır.
- [ ] Köhnəlmiş əmsal ilə bukmekerə keçid → 409 (task 110).
