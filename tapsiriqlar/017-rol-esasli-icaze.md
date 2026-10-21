# 017 — Rollar: user, moderator, admin

**Status:** [ ] · **Faza:** 1 · **Əvvəl bitməli:** 016

## Qısaca
Bəzi endpoint-lər yalnız moderator və ya admin üçün olsun.

## Kim nə edə bilər
| Rol | Nə edə bilər |
|---|---|
| user | lent, çat, oyunlar, mağaza, profil |
| moderator | + şikayətlərə baxmaq, mesaj gizlətmək, istifadəçini susdurmaq |
| admin | + tenant ayarları, suallar, hekayələr, mağaza kataloqu |

Qadağa: admin **əmsalları dəyişə bilməz** (sənəd belə deyir).

## Nə edəcəksən
1. `requireRole('moderator')` kimi bir yoxlama funksiyası yaz.
2. Qərar ver: admin moderatorun bütün hüquqlarına sahibdirmi? Yaz.
3. **Rol token-dən, yoxsa bazadan?** Token-də rol 15 dəqiqə köhnə qala bilər. Moderatorun rolu alınıbsa, yenə 15 dəqiqə moderasiya edə bilər. Həssas əməliyyatlar üçün bazadan oxumaq daha etibarlıdır.

## Diqqət: rol kifayət deyil, tenant da yoxlanmalıdır
A bukmekerinin moderatoru B bukmekerinin mesajını gizlədə **bilməməlidir**. Hər sorğuda resursun `tenant_id`-si istifadəçinin `tenant_id`-si ilə müqayisə olunmalıdır.

## Hazır olduğunu necə yoxlayarsan
- [ ] Adi user moderasiya endpoint-ində 403 alır.
- [ ] A tenant-ın moderatoru B tenant-ın mesajını gizlədə bilmir (404).

## Açıq sual (məhsul sahibinə)
Moderator və admin rolunu kim verir: bukmeker, yoxsa biz?
