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
- [ ] `reset.ts` hələ yoxdur.
- [ ] Seed iki dəfə yoxlanmayıb.

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
- [ ] `npm run db:reset` iki dəfə ardıcıl uğurla işləyir.
- [ ] Sonra `drizzle.__drizzle_migrations`-də **bir** sətir var (iki yox).
- [ ] `npm run db:seed` iki dəfə işlədəndən sonra `events` sayı dəyişmir.
- [ ] `DATABASE_URL`-in host-unu müvəqqəti `example.com` et → `db:reset` imtina edir. (Sonra geri qaytar.)
- [ ] `NODE_ENV=production` ilə `db:reset` imtina edir.

## Diqqət
- Windows-da `NODE_ENV=production npm run ...` yazılışı işləmir. `cross-env` paketini araşdır.
- Bundan sonra `drizzle-kit push` **heç vaxt**. Yalnız: `generate` → SQL faylını oxu → `migrate`.
- İlk deploy-dan sonra köhnə migration fayllarını **heç vaxt** silmə və dəyişmə.

---

## Bağlanış qeydi
Bu task bağlandı. Bilərəkdən sonraya saxlananlar:
- [ ] `reset.ts`-də ikinci qoruma: `DATABASE_URL`-in host-u `localhost`/`127.0.0.1` deyilsə dayan (indi yalnız `NODE_ENV` yoxlanır).
- [ ] Seed-də tranzaksiya (bir matçın event + market + outcome-ları bir paketdə).
- [ ] Seed-dəki config/mətnlər task 021 və 026-da yenilənəcək.
