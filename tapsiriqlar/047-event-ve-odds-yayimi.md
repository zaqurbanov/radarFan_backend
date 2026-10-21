# 047 — Hesab və əmsal yeniləmələrinin yayımı

**Status:** [ ] · **Faza:** 3 · **Əvvəl bitməli:** 027, 045

## Qısaca
Hesab, dəqiqə, status və əmsal dəyişəndə frontend dərhal xəbər tutsun.

## Mesajlar (sənəddən)
| Mesaj | Nə var içində |
|---|---|
| `event.updated` | matç ID, versiya, hesab, dövr, status |
| `odds.updated` | bazar ID, versiya, nəticələr, yenilənmə vaxtı |

Hədəf: dəyişiklik 2 saniyədə çatsın.

## Nə edəcəksən
1. Matç yazılanda (027) eyni tranzaksiyada outbox-a (045) qeyd yaz.
2. Hansı kanallara? `event:{id}` (matç səhifəsi) və `feed:{tenant}` (lent).
3. Mesajda **həmişə** `version` olsun. Frontend köhnə versiyanı yenisinin üstünə yazmasın.
4. Canlı matçda əmsal saniyədə bir neçə dəfə dəyişə bilər. **Seyrəlt:** yarım saniyədə bir, yalnız sonuncunu göndər.
5. Bazar `suspended` olanda da mesaj getsin, frontend düymələri bağlasın.

## Hazır olduğunu necə yoxlayarsan
- [ ] Demo hesab dəyişəndə matç səhifəsi 2 saniyədə yeni hesabı alır.
- [ ] Mesajda həmişə `version` var.
