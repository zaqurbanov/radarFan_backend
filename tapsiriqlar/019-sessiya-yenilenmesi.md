# 019 — Sessiyanın yenilənməsi

**Status:** [ ] · **Faza:** 1 · **Əvvəl bitməli:** 013, 014

## Qısaca
Access token 15 dəqiqədə bitir. İstifadəçi bundan sonra "çıxmasın", sessiya sakitcə yenilənsin.

## İki yol
| Yol | Necə işləyir | Nə vaxt |
|---|---|---|
| **A. Yenidən exchange** | Frontend bukmekerdən **yeni** launch token alır → `/auth/exchange` | Həmişə işləyir. Backend-də heç nə lazım deyil, artıq hazırdır |
| **B. Refresh cookie** | Exchange zamanı xüsusi cookie qoyulur → `POST /auth/refresh` | Yalnız bukmekerin tətbiqi cookie-ləri dəstəkləyirsə |

**Tövsiyə:** əvvəl A ilə kifayətlən. B-ni sonra, bukmeker cookie dəstəyini təsdiqləyəndə et.

## B yolu üçün (sonra lazım olsa)
### Cədvəl: `refresh_tokens`
| Sütun | İzah |
|---|---|
| id, tenant_id, user_id | |
| token_hash | token-in özü yox, **hash-i** |
| family_id | eyni zəncirin token-ləri |
| expires_at, revoked_at | |

### Qaydalar
- Hər yeniləmədə köhnə token ləğv olunur, yenisi verilir ("rotation").
- Köhnə token ikinci dəfə istifadə olunsa → oğurlanma əlamətidir → **bütün zəncir** ləğv olunur.
- Cookie: `HttpOnly`, `Secure`.

## Hazır olduğunu necə yoxlayarsan
- [ ] A yolu: köhnə launch token bitib, yenisi ilə exchange işləyir.
- [ ] (B edilibsə) köhnə refresh token ikinci dəfə istifadə olunanda bütün sessiyalar ləğv olunur.

## Açıq sual
Bukmekerin tətbiqi cookie-ləri dəstəkləyirmi? (Bukmekerdən gələcək cavab.)
