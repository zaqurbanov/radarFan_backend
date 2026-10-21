# 030 — `/events`: çoxlu sorğu problemi (N+1)

**Status:** [ ] · **Faza:** 2 · **Əvvəl bitməli:** 027

## Qısaca
Lent nə qədər matç olursa olsun, **2–4 sorğu** ilə yüklənsin.

## İndiki problem
İndiki kod:
- 1 sorğu: seçilmişlər
- 1 sorğu: matçlar
- **hər matç üçün** 1 sorğu bazar + 1 sorğu nəticələr

20 matç = **42 sorğu**. 1000 istifadəçi eyni anda → 42 000 sorğu. Baza dayanacaq.

Əlavə problem: kod yalnız **birinci** bazarı götürür (`const [market]`). Gələcəkdə bir matçda bir neçə bazar ola bilər.

## Nə edəcəksən
1. **Toplu sorğular:**
   - 1 sorğu: matçlar;
   - 1 sorğu: bu matçların **hamısının** bazarları (`IN (...)`);
   - 1 sorğu: bu bazarların **hamısının** nəticələri;
   - sonra kodda `Map` ilə qruplaşdır.
2. Alternativ: Drizzle-ın `relations` + `db.query...findMany({ with: ... })`. İkisini də sına, hansı aydındırsa onu seç.
3. Seçilmişlər: istifadəçinin **bütün** seçilmişlərini yükləmə. Yalnız bu səhifədəki matçları yoxla. (5000 seçilmişi olan istifadəçini düşün.)
4. Drizzle logger-i aç (`logger: true`) və sorğuları **say**.

## Hazır olduğunu necə yoxlayarsan
- [ ] 20 matçlıq lent ≤ 4 sorğu (logda say).
- [ ] Cavabın forması dəyişməyib.
