# 103 — Qarderob (alınmış əşyalar)

**Status:** [ ] · **Faza:** 8 · **Əvvəl bitməli:** 102

## Qısaca
İstifadəçinin sahib olduğu əşyalar.

## Saytda
"Гардероб · 4" (4 pulsuz əşya), alışdan sonra "В твоём гардеробе", "0 новых предметов".

## Yeni cədvəl: `user_items`
| Sütun | İzah |
|---|---|
| tenant_id, user_id, item_id | |
| acquired_via | `default` / `purchase` / `reward` / `admin` |
| price_paid | ödənilən qiymət |
| coin_ledger_id | alışın jurnal sətri |
| seen_at | baxılıb? ("yeni əşya" sayğacı üçün) |
| acquired_at | |

Əsas açar (`user_id`, `item_id`): eyni əşyanı iki dəfə almaq olmaz.

## Nə edəcəksən
1. Pulsuz əşyalar: istifadəçi yarananda qarderoba əlavə et, **və ya** "pulsuz əşyalar həmişə var" say (qarderobda saxlama). İkincisi sadədir və yeni pulsuz əşya əlavə olunanda avtomatik işləyir. Qərar ver.
2. `GET /me/wardrobe` → kateqoriya üzrə əşyalar.
3. "Yeni" sayğacı: `seen_at` boş olanlar. `POST /me/wardrobe/seen` hamısını "baxılıb" edir.

## Hazır olduğunu necə yoxlayarsan
- [ ] Yeni istifadəçinin qarderobunda 4 pulsuz əşya var.
