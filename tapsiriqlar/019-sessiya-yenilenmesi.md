# 019 — Sessiyanın yenilənməsi (refresh)

**Faza:** 1 · **Asılılıq:** 013, 014 · **Status:** [ ]

## Məqsəd
Access token 15 dəqiqədən sonra bitəndə istifadəçi "çıxmasın". Sessiya təhlükəsiz yollarla yenilənsin.

## Niyə
Sənəd (bölmə 6):
- "Access token yaddaşda saxlanır, müddəti 15 dəqiqədir."
- "Qorunan HttpOnly Secure cookie ilə yenilənmə yalnız seçilmiş konteynerdə cookie dəstəyi yoxlandıqdan sonra mümkündür; alternativ rejim bridge vasitəsilə yenidən launch token alınmasıdır."
- "Uzunömürlü tokenlər localStorage-da saxlanmır."
- "401 zamanı müştəri sessiyanı bir dəfə yeniləyir və təhlükəsiz sorğunu təkrarlayır."

## İki rejim
| Rejim | Necə işləyir | Nə vaxt |
|---|---|---|
| A. Re-exchange | Frontend bridge-dən `getLaunchToken()` ilə **yeni** launch token alır → `/auth/exchange` | Həmişə işləyir, MVP üçün kifayətdir |
| B. Refresh cookie | `/auth/exchange` əlavə olaraq HttpOnly cookie qoyur → `POST /auth/refresh` | Yalnız WebView üçüncü tərəf cookie-ləri dəstəkləyirsə |

**Tövsiyə:** əvvəl A (backend-dən heç nə tələb etmir, artıq hazırdır). B-ni tenant config-də `refresh_mode` ilə açılan imkan kimi et.

## Cədvəllər (yalnız B rejimi üçün)
**`refresh_tokens`**
| Sütun | Tip | Qeyd |
|---|---|---|
| id | uuid PK | |
| tenant_id, user_id | uuid FK | |
| token_hash | varchar(64) UNIQUE | token-in özü yox, SHA-256 hash-i |
| family_id | uuid | rotasiya zənciri |
| expires_at | timestamptz | |
| revoked_at | timestamptz NULL | |
| replaced_by | uuid NULL | |
| created_at | timestamptz | |

## Necə edəcəksən (B üçün)
1. "Refresh token rotation" öyrən: hər refresh zamanı köhnə token ləğv olunur, yenisi verilir. Köhnə token təkrar istifadə olunsa, **bütün ailə** ləğv olunur (oğurlanma əlaməti).
2. Cookie: `HttpOnly`, `Secure`, `SameSite=None` (iframe/WebView üçün lazımdır, amma CSRF riski var, araşdır), `Path=/api/v1/auth`.
3. `@fastify/cookie` qoşulmalıdır.

## Tələlər
- DB-də refresh token-in özünü saxlama, yalnız hash.
- iOS WKWebView və Android WebView-da üçüncü tərəf cookie davranışı fərqlidir. Ona görə sənəd "yoxlandıqdan sonra" deyir.

## Qəbul meyarları
- [ ] Rejim A: launch token bitib, yenisi ilə exchange işləyir.
- [ ] Rejim B (açıqdırsa): köhnə refresh token ikinci dəfə istifadə olunanda bütün sessiyalar ləğv olunur.

## Açıq suallar
- Tərəfdaşın konteyneri cookie dəstəkləyirmi? (Tərəfdaşdan gələcək məlumat, bölmə 11.)
