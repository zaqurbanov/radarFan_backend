# 041 — Kanallar və kim hansına qoşula bilər

**Status:** [ ] · **Faza:** 3 · **Əvvəl bitməli:** 040

## Qısaca
Frontend kanallara abunə olsun. Server **hər abunədə** icazəni yoxlasın.

## Kanallar və qaydalar
| Kanal | Nə üçün | Kim abunə ola bilər |
|---|---|---|
| `event:{id}` | matç səhifəsi | matç bu tenant-dadırsa |
| `room:{id}` | çat otağı | otaq bu tenant-dadırsa |
| `battle:{id}` | duel | yalnız duel iştirakçısı |
| `user:{id}` | şəxsi bildirişlər (XP, tapşırıq) | yalnız **özü** |
| `feed:{tenant}` | lent kartlarının yenilənməsi | bu tenant-ın istifadəçiləri |

## Niyə lazımdır?
Yoxlama olmasa, istənilən istifadəçi `user:başqasının_id` kanalına abunə olub onun bildirişlərini oxuya bilər.

## Nə edəcəksən
1. Hər kanal tipi üçün `icazə_var_mı(istifadəçi, kanal)` funksiyası.
2. Bir bağlantıda maksimum abunə sayı (məs. 50).
3. Lent üçün: hər kart üçün ayrı kanal bahadır (20 kart = 20 kanal). Lent üçün bir `feed:` kanalı, matç səhifəsi üçün `event:` kanalı istifadə et.
4. Uğurlu abunədə `ack` + kanalın cari sıra nömrəsi (task 048 üçün).

## Hazır olduğunu necə yoxlayarsan
- [ ] Başqasının `user:` kanalına abunə → `error`.
- [ ] Başqa tenant-ın otağına abunə → `error`.
- [ ] Hər qayda üçün test.
