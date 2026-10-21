# 023 — `GET /me`: profilin tam cavabı

**Status:** [ ] · **Faza:** 1 · **Əvvəl bitməli:** 016, 021, 022
(XP və coin hissələri 083–095 bitəndə tamamlanır.)

## Qısaca
Frontend başlıq və profil üçün lazım olan hər şeyi **bir sorğu** ilə alsın.

## Saytda nə görünür
- Başlıqda: XP ("150 XP") və adın baş hərfi ("N").
- "Мой фан"-da: coin balansı (◈ 360), səviyyə adı ("Начинающий фанат").
- Profildə: "2 завершённых игр · 0 избранных матчей".

## Cavabda nə olacaq
| Sahə | Haradan | Hazır olacaq |
|---|---|---|
| `user` (id, ad, baş hərflər, rol, status) | users | indi |
| `tenant` (açıq config) | 021 | indi |
| `entitlements` | 022 | indi |
| `xp_balance` | 084 | sonra |
| `coin_balance` | 086 | sonra |
| `level` | 094 | sonra |
| `challenge_summary` | 090 | sonra |
| `counters` (oyunlar, seçilmişlər, yeni əşyalar) | 095, 103 | sonra |

## Nə edəcəksən
1. Hazır olanları indi əlavə et, qalanlarını sonra.
2. Hələ hazır olmayan sahələr üçün qərar ver: `0` göstər, yoxsa `null`? (`null` daha dürüstdür: "hələ bilmirik".)
3. Ayrı sorğuları `Promise.all` ilə paralel işlət.
4. Cavab sxemi yaz ki, artıq sahə çölə çıxmasın.

## Diqqət
`external_user_id` (bukmekerdəki ID) **heç vaxt** cavaba düşməməlidir.

## Hazır olduğunu necə yoxlayarsan
- [ ] Cavabda `external_user_id` yoxdur.
- [ ] (Hamısı hazır olanda) saytın başlığı və profili bir sorğu ilə dolur.
