# 015 — Demo rejim

**Status:** [ ] · **Faza:** 1 · **Əvvəl bitməli:** 014

## Qısaca
Demo funksiyalar (demo token, demo bot, demo matçlar, "Сбросить демо") yalnız demo rejimdə işləsin. Production-da bu endpoint-lər **ümumiyyətlə olmasın**.

## Niyə lazımdır?
- `/demo-launch-token` indi **hər kəsə** istənilən istifadəçi kimi giriş verir. Production-da bu, şifrəsiz qapı deməkdir.
- Sənəd: demo/production rejimini **server** təyin edir, istifadəçi yox.
- Saytda hər yerdə "демо" yazısı var. Sənəd tələb edir ki, demo məlumat həmişə işarəli olsun.

## İki səviyyə
| Səviyyə | Harada | Nəyi idarə edir |
|---|---|---|
| Server | env `APP_MODE=demo/production` | Demo route-lar ümumiyyətlə qeydiyyatdan keçsinmi |
| Tenant | `tenants.mode` sütunu | Bu bukmeker demo matç, demo bot istifadə edirmi |

Production serverdə də "demo tenant" ola bilər (məsələn, bukmekerə nümayiş üçün). Amma `/demo-launch-token` yalnız `APP_MODE=demo`-da olur.

## Nə edəcəksən
1. `APP_MODE`-u `env.ts`-ə əlavə et.
2. `tenants` cədvəlinə `mode` sütunu əlavə et (`demo`/`production`). Bu, migration tələb edir.
3. Demo route-ları ayrıca modula köçür (`modules/demo`). `app.ts`-də yalnız `APP_MODE === 'demo'` olanda qeydiyyatdan keçsin.
4. Demo token-i demo tenant-ın gizli açarı ilə imzala (task 014). Beləcə `/auth/exchange` demo və real token-i **eyni yolla** yoxlayır. Ayrıca "demo üçün qısa yol" olmamalıdır.
5. Tenant yaratmağı route-dan çıxar. Bu, seed-in işidir.

## Fikirləş
Bir neçə nəfər eyni anda demo-ya baxsa, hamısı eyni `Nihal` istifadəçisi olur və XP-ni paylaşır. Bu problemdirmi? Hər brauzerə ayrı demo istifadəçi lazımdırmı?

## Hazır olduğunu necə yoxlayarsan
- [ ] `APP_MODE=production` ilə `/demo-launch-token` → 404.
- [ ] Demo token `/auth/exchange`-dən real token kimi keçir.
- [ ] `/me` cavabında tenant-ın `mode`-u görünür.
