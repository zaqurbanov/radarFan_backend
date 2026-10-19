# 103 — İnventar (qarderob)

**Faza:** 8 · **Asılılıq:** 102 · **Status:** [ ]

## Məqsəd
İstifadəçinin sahib olduğu əşyalar.

## Niyə
Sayt: "Гардероб · 4" (4 default əşya), alışdan sonra "В твоём гардеробе". "0 новых предметов": yeni (baxılmamış) əşya sayğacı.

## Cədvəl
**`user_items`**
| Sütun | Tip |
|---|---|
| tenant_id | uuid |
| user_id | uuid FK |
| item_id | uuid FK → shop_items |
| acquired_via | enum(`default`, `purchase`, `reward`, `admin`) |
| price_paid | int |
| coin_ledger_id | uuid NULL (alışın ledger qeydi) |
| seen_at | timestamptz NULL ("yeni" sayğacı üçün) |
| acquired_at | timestamptz |

PK (`user_id`, `item_id`). Eyni əşyanı iki dəfə almaq mümkün deyil.

## Necə edəcəksən
1. Default əşyalar: istifadəçi yaradılanda inventara əlavə et (087 ilə eyni yer) **və ya** "default əşyalar həmişə sahiblənmiş sayılır" (inventarda saxlama). İkincisi daha sadədir, amma yeni default əlavə olunanda avtomatik işləyir. Qərar ver.
2. `GET /me/wardrobe` → slot üzrə sahib olunan əşyalar.
3. "Yeni" sayğacı: `seen_at IS NULL` sayı. `POST /me/wardrobe/seen` hamısını görülmüş edir.

## Qəbul meyarları
- [ ] Yeni istifadəçinin qarderobunda 4 default əşya var.
