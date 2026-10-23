# 007 — Migration və seed iş axını

**Status:** [x] Həll olunub · **Faza:** 0 · **Əvvəl bitməli:** 006

## Qısaca
Bazanın sxemi yalnız **migration faylları** ilə dəyişsin. Boş bazanı bir əmrlə demo məlumatla doldurmaq mümkün olsun.

## Niyə lazımdır?
- `push` sxemi birbaşa dəyişir və heç bir iz qoymur. Sən bunu öz bazanda gördün: cədvəllər var idi, amma migration tarixçəsi boş idi.
- Sabah staging və production olacaq. Hər yerdə **eyni** sxemi **eyni qaydada** qurmaq üçün yalnız migration faylları etibarlıdır.
- Yeni gələn proqramçı (və ya sən, 2 ay sonra) bir əmrlə işləyən baza almalıdır.

## Artıq etdiklərin
- [x] Bazanı sıfırladın (`down -v`), təmiz `migrate` etdin. Tarixçədə 1 migration var.
- [x] `db:generate`, `db:migrate`, `db:seed`, `db:reset` skriptləri yazıldı.
- [x] `src/db/reset.ts` yazıldı (`drizzle-seed`-in `reset(db, schema)` funksiyası ilə: cədvəlləri `TRUNCATE ... CASCADE` edir).
- [x] Seed iki dəfə işlədildi: `events` sayı 3 qaldı, dublikat yoxdur.

## Nə edəcəksən

### 1. `src/db/reset.ts` yaz
Vəzifəsi: bazanı **tam boşaltmaq** ki, sonra `migrate` sıfırdan qursun.

Nəyi silmək lazımdır:
- `public` sxemi: cədvəllər **və** enum tipləri (`user_role`, `sport`...) buradadır.
- `drizzle` sxemi: migration tarixçəsi buradadır. Bunu silməsən, `migrate` "artıq edilib" deyib heç nə etməyəcək.

İpucu: `DROP SCHEMA ... CASCADE` əmrini araşdır. `public` sxemini silsən, onu yenidən yaratmaq lazımdır.

### 2. Qoruma əlavə et (çox vacib)
Bu skript **bütün məlumatı silir**. Səhvən production bazasında işləsə, fəlakət olar. İki yoxlama qoy:
1. `NODE_ENV` `production`-dırsa → dayan.
2. `DATABASE_URL`-in host-u `localhost` və ya `127.0.0.1` deyilsə → dayan.

Niyə iki? Biri unudulsa və ya səhv yazılsa, digəri tutsun.

`NODE_ENV`-i `env.ts` sxeminə əlavə et (`development`, `test`, `production`). Səhv yazılış (`prodution`) server başlayanda tutulsun.

### 3. Bağlantını bağla
Skript işini bitirəndə DB bağlantısını bağlamalıdır, yoxsa proses asılı qalır (task 002-dəki kimi).

### 4. Seed-i möhkəmləndir
Dəyərləri saytdakı kimi etmək məcburi deyil. Amma bunlar məcburidir:
- **Tranzaksiya:** bir matçın event + market + outcome-ları bir paketdə yazılsın. Yarımçıq məlumat qalmasın.
- **İkinci dəfə işləyəndə dublikat yaratmasın.**

## Hazır olduğunu necə yoxlayarsan
- [x] `npm run db:reset` və `npm run db:reset:test` işləyir (zəncir: reset, migrate, seed).
- [x] `drizzle.__drizzle_migrations`-də **bir** sətir var (həm dev, həm test bazasında).
- [x] `npm run db:seed` iki dəfə işlədəndən sonra `events` sayı dəyişmir (3).
- [ ] Host qoruması hələ yazılmayıb (aşağıda "Sonraya saxlananlar"). Əvəzində: bazaya qoşulmaq alınmayanda `db:reset` `exit code 1` ilə çıxır və zəncir dayanır (yoxlanılıb).
- [~] `NODE_ENV` allow-list yoxlaması kodda var (yalnız `development` və `test`-ə icazə). Production ilə əl ilə sınanmayıb.

## Diqqət
- Windows-da `NODE_ENV=production npm run ...` yazılışı işləmir. `cross-env` paketini araşdır.
- Bundan sonra `drizzle-kit push` **heç vaxt**. Yalnız: `generate` → SQL faylını oxu → `migrate`.
- İlk deploy-dan sonra köhnə migration fayllarını **heç vaxt** silmə və dəyişmə.

---

## Bağlanış qeydi: nə edildi və hansı qərarlar verildi
- **Re-baseline:** köhnə `0000_blushing_bedlam` və `0001_misty_bloodaxe` silinib, bir yeni `0000_amused_juggernaut.sql` generasiya olunub. Bu, yalnız layihə heç yerdə deploy olunmadığı üçün düzgündür. **İlk deploy-dan sonra tətbiq olunmuş migration-a bir daha toxunmaq olmaz.**
- **Reset yolu:** `DROP SCHEMA` əvəzinə `drizzle-seed`-in `reset(db, schema)` funksiyası seçildi. Bu, cədvəlləri boşaldır (`TRUNCATE ... CASCADE`), strukturu və migration tarixçəsini **saxlayır**. Sürətlidir və testlər üçün yaxşıdır. Yeni migration olarsa `db:migrate` onu tətbiq edir (zəncirdə var).
- `reset.ts` yalnız `env` və `db` import edir (`app.ts` yox), buna görə Redis-ə qoşulmur.
- Qoruma: `NODE_ENV` allow-list (`development`, `test`) + boş `catch` düzəldilib: xəta olarsa `console.error` + `process.exit(1)`, `&&` zənciri dayanır.
- `drizzle-seed` `devDependencies`-dədir.
- **Skriptlər** (`package.json`):
  - dev: `db:generate`, `db:migrate`, `db:seed`, `db:reset` (zəncir).
  - test: `db:migrate:test`, `db:seed:test`, `db:reset:test`, `dev:test`.

## Test mühiti üçün öyrənilən qaydalar
- `--env-file=.env.test` bayrağı **əmrdən dərhal sonra, fayl adından əvvəl** yazılmalıdır: `tsx --env-file=.env.test src/db/reset.ts`. Fayl adından sonra yazsan, o, skriptə arqument kimi gedir və `.env` (dev) oxunur.
- `drizzle-kit` fayl deyil, CLI-dir. `tsx drizzle-kit ...` işləmir və `drizzle-kit migrate --env-file=...` bayrağı yoxdur. Düzgün: `node --env-file=.env.test node_modules/drizzle-kit/bin.cjs migrate`.
- `NODE_ENV` rejimi **prosesə başlayanda** verilir (fayl daxilində yox).
- Test bazası boşdursa əvvəl `db:migrate:test` lazımdır (`reset` cədvəl yaratmır).
- `dotenv` və `--env-file` mövcud dəyişəni üstündən yazmır: `.env.test`-də açar çatışmasa, `.env`-dən dev dəyəri dola bilər.

## Bilərəkdən sonraya saxlananlar
Bu task bağlandı. Bilərəkdən sonraya saxlananlar:
- [ ] `reset.ts`-də ikinci qoruma: `DATABASE_URL`-in host-u `localhost`/`127.0.0.1` deyilsə dayan (indi yalnız `NODE_ENV` yoxlanır).
- [ ] Seed-də tranzaksiya (bir matçın event + market + outcome-ları bir paketdə).
- [ ] Seed-dəki config/mətnlər task 021 və 026-da yenilənəcək.
