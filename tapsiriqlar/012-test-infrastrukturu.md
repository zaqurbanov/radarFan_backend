# 012 — Avtomatik testlər üçün hazırlıq

**Status:** [ ] · **Faza:** 0 · **Əvvəl bitməli:** 006, 007

## Qısaca
Avtomatik test yazmaq üçün baza qur: test runner, test bazası, köməkçi funksiyalar.

## Niyə lazımdır?
- Sonrakı task-ların çoxunun yoxlaması belədir: "eyni anda 10 sorğu gəlsə, XP bir dəfə verilsin". Bunu əl ilə yoxlamaq **mümkün deyil**, yalnız testlə olur.
- Sənəd (bölmə 11) avtomatik testləri təhvil şərti kimi tələb edir.
- Bu task-dan sonra hər yeni task-ın yoxlamasını test kimi yazmağı tövsiyə edirəm.

## Artıq hazır olanlar
- Test Postgres konteyneri (`docker-compose.test.yml`, port 5433).
- `.env.test` faylı (Redis: dev Redis-in 1 nömrəli bazası).

## Nə edəcəksən
1. **Runner seç:** `vitest` tövsiyə olunur (TypeScript və ESM ilə problemsiz işləyir).
2. **Server qaldırmadan test:** `buildApp()` artıq ayrıca funksiyadır, bu yaxşıdır. Testdə `app.inject()` ilə sorğu göndər. Port açmaq lazım deyil.
3. **Test bazası:**
   - testlərdən əvvəl migration işləsin;
   - hər testdən əvvəl cədvəllər təmizlənsin (`TRUNCATE ... CASCADE`).
4. **Testlər `.env.test`-i oxusun**, `.env`-i yox. Yoxsa testlər sənin dev bazanı siləcək!
5. **Köməkçi funksiyalar** yaz (bütün gələcək testlərdə lazım olacaq):
   - `createTenant()`
   - `createUser()`
   - `loginAs(user)` → access token qaytarır
6. **İlk testlər:**
   - `/health` işləyir;
   - `/auth/exchange`: uğurlu, eyni token ikinci dəfə, səhv token;
   - `/events`: A tenant-ı B tenant-ın matçlarını görmür.

## Diqqət
`db` və `redis` faylları modul yüklənəndə dərhal qoşulur. Test zamanı onların `.env.test`-dəki ünvana qoşulmasını necə təmin edəcəksən? Düşün.

## Hazır olduğunu necə yoxlayarsan
- [ ] `npm test` dev bazaya **toxunmur** (test zamanı dev bazada sətir sayı dəyişmir).
- [ ] Ən azı 5 test keçir.
- [ ] Testləri iki dəfə ardıcıl işlədəndə yenə keçir.
