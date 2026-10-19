# 007 — Migration və seed iş axını

**Faza:** 0 · **Asılılıq:** 006 · **Status:** [ ]

## Məqsəd
Sxem dəyişiklikləri yalnız versiyalanmış migration-larla getsin. Demo üçün təkrarlana bilən seed olsun.

## Niyə
- Sənəd (bölmə 10): "Miqrasiyalar versiyalanır; buraxılışın geri qaytarılması yeni XP qeydlərini pozmur."
- Sənəd (bölmə 11, təhvil): "demo üçün seed məlumatları".
- `drizzle/0000_blushing_bedlam.sql` var, amma `drizzle-kit push` ilə də işləmisən, ola bilər. `push` production üçün təhlükəlidir: sxemi "birbaşa" dəyişir, tarixçə saxlamır.

## Necə edəcəksən
1. Qayda qoy: **yalnız** `drizzle-kit generate` → SQL faylını oxu → `migrate`. `push` istifadə etmə.
2. Migration-ları proqram daxilində (start zamanı) və ya ayrıca əmrlə işlətmək: hansını seçirsən? Production üçün ayrıca addım daha təhlükəsizdir (task 128).
3. `seed.ts`-i yenidən dizayn et:
   - **Idempotent** olsun: iki dəfə işləsə dublikat yaratmasın (`ON CONFLICT DO NOTHING/UPDATE`).
   - Saytdakı demo məlumatları: tenant `demo-bet` (brend BetPulse, locale `ru`), 3 matç (Real–Barselona 2:1 67′, Boston–Lakers 84:79 3-cü rüb, Arsenal–Liverpool 0:0 21′), əmsallar (1.72/3.80/4.20; 1.65/2.30; 2.40/3.10/2.85).
   - Sonra hər faza öz seed-ini əlavə edəcək (suallar, mağaza əşyaları, hekayələr...).
4. `package.json` skriptləri: `db:generate`, `db:migrate`, `db:seed`, `db:reset` (yalnız lokal!).

## Tələlər
- Migration faylını yaradandan sonra **əl ilə redaktə** etmək bəzən lazımdır (məs. data migration), amma artıq tətbiq olunmuş migration-ı heç vaxt dəyişmə. Yenisini yarat.
- `db:reset` production-da işləməməlidir. `NODE_ENV` yoxlaması qoy.

## Öyrən
- Drizzle Kit: `generate`, `migrate`, `migrations` cədvəli
- Expand/contract (genişlət/daralt) migration yanaşması

## Qəbul meyarları
- [ ] Boş DB-də `db:migrate` bütün cədvəlləri yaradır.
- [ ] `db:seed` iki dəfə işlədiləndə xəta yoxdur və dublikat yoxdur.
- [ ] Seed-dən sonra `/events` saytdakı 3 matçı qaytarır.
