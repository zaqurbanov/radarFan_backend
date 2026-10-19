# 015 — Demo rejim və demo launch token

**Faza:** 1 · **Asılılıq:** 014 · **Status:** [ ]
(Köhnə `TASKS.md`: T5)

## Məqsəd
Demo funksiyaları (demo launch token, demo bot, demo feed, "Сбросить демо") yalnız demo rejimdə işləsin. Production-da bu endpoint-lər **mövcud olmasın**.

## Niyə
- Sənəd (bölmə 6, White label): "Demo və ya production rejimi serverdə təyin edilir. Müştəri production-da demo botunu aktivləşdirə və XP qaydalarını özü dəyişə bilməz."
- `/demo-launch-token` hazırda hər kəsə istənilən istifadəçi üçün sessiya verir. Production-da bu, autentifikasiyanın tam yan keçilməsi deməkdir.
- Saytda hər yerdə "демо" etiketi var. Bu, sənədin tələbidir: "Canlı məlumatları işarələmədən demo məlumatları ilə əvəz etmək qadağandır".

## Qərar: rejim harada saxlanır?
İki səviyyə var, ikisi də lazımdır:
| Səviyyə | Harada | Nəyi idarə edir |
|---|---|---|
| Server rejimi | env `APP_MODE=demo/production` | Demo route-ları ümumiyyətlə qeyd olunsunmu |
| Tenant rejimi | `tenants.mode` enum(demo, production) | Bu tenant demo feed, demo bot, demo etiketləri istifadə edirmi |

Production serverdə də "demo tenant" ola bilər (staging-də tərəfdaşa göstərmək üçün). Amma `/demo-launch-token` yalnız `APP_MODE=demo`-da olur.

## Cədvəllər
`tenants`-ə sütun: `mode` enum(`demo`, `production`) NOT NULL default `demo`.

## Necə edəcəksən
1. Demo route-ları ayrıca plugin-ə çıxar (`modules/demo`). `app.ts`-də yalnız `APP_MODE === 'demo'` olduqda qeydiyyatdan keçir.
2. Demo launch token generatoru demo tenant-ın **private key**-i ilə imzalasın (task 014). Beləliklə `/auth/exchange` demo və real token-i **eyni yolla** yoxlayır. Ayrıca "demo bypass" olmamalıdır.
3. Demo istifadəçi: saytda `Nihal`. Hər brauzer üçün fərqli demo istifadəçi lazımdırmı? (Body-də `external_user_id` qəbul etmək vs sabit ID.) Fikirləş: bir neçə nəfər eyni anda demo-ya baxsa, eyni XP-ni paylaşacaqlar.
4. Tenant yaradılmasını route-dan çıxar. Bu, seed-in işidir (task 007).

## Tələlər
- Rejim yoxlaması yalnız route qeydiyyatında olsun, hər sorğuda `if` ilə yox. Unudulmuş `if` = deşik.

## Qəbul meyarları
- [ ] `APP_MODE=production` ilə `/demo-launch-token` → 404.
- [ ] Demo token `/auth/exchange`-dən real token kimi keçir (eyni kod yolu).
- [ ] `tenants.mode` sütunu var və `/me` cavabındakı config-də görünür.
