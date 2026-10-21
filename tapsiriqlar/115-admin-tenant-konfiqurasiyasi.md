# 115 — Admin: bukmekerin ayarları

**Status:** [ ] · **Faza:** 10 · **Əvvəl bitməli:** 017, 021

## Qısaca
Admin öz bukmekerinin brendini, funksiyalarını, qaydalarını idarə etsin.

## Endpoint-lər
| Metod | Yol |
|---|---|
| GET | /admin/config |
| PATCH | /admin/config |
| GET | /admin/config/history |

## Admin nəyi dəyişə **bilməz**
- `mode` (demo/production)
- mənbə və bukmeker açarları (gizli)
- **əmsallar** (sənəd)
Bunlar yalnız bizim (texniki) tərəfimizdən dəyişilir. Sxemdə admin üçün ayrıca "dəyişə bilən sahələr" hissəsi et.

## Nə edəcəksən
1. Yalnız admin, yalnız **öz** tenant-ı.
2. Oyun qaydaları dəyişəndə `rules_version + 1`. Başlamış duel köhnə qayda ilə bitir.
3. Dəyişiklik tarixçəsi: kim, nə vaxt, nə dəyişdi (əvvəl/sonra).
4. Keşi təmizlə (021).

## Hazır olduğunu necə yoxlayarsan
- [ ] Admin `mode`-u dəyişə bilmir.
- [ ] XP qaydası dəyişəndə versiya artır, aktiv duel köhnə qayda ilə bitir.
- [ ] Hər dəyişiklik tarixçədədir.
