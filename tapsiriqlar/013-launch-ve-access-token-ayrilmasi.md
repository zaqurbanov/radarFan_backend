# 013 — Launch token və access token-in ayrılması

**Faza:** 1 · Auth, tenant, istifadəçi · **Asılılıq:** 001, 009 · **Status:** [ ]
(Köhnə `TASKS.md`: T3. Nonce-un atomarlığı (T2) artıq bitib.)

## Məqsəd
İki token növü bir-birinin yerinə keçə bilməsin.

## Niyə
| | Launch token | Access token |
|---|---|---|
| Kim verir | Tərəfdaş (bukmeker) konteyneri | Bizim server |
| Ömür | 60 san. | 15 dəq. |
| Harada istifadə olunur | Yalnız `POST /auth/exchange` | Bütün digər endpoint-lər |
| Birdəfəlik? | Bəli (nonce) | Xeyr |

İndi ikisi də eyni secret ilə imzalanır və heç nə onları ayırmır. Nəticələri:
- 15 dəqiqəlik access token-i `/auth/exchange`-ə göndərsən... sənin kodun `payload.nonce`-u `undefined` kimi görür və `nonce:undefined` açarını yazır. İlk dəfə **keçir**. Yəni access token özünü yeni access token-ə çevirə bilir və sessiya sonsuz uzanır.
- Launch token `Authorization: Bearer` ilə `/events`-ə göndərilsə, `jwtVerify` imzanı qəbul edir, amma `user_id` yoxdur və query `undefined` ilə işləyir.

Sənəd (bölmə 6): launch token-də `issuer`, `audience = RADAR.FAN`, `issued_at`, `expires_at`, `nonce` var. Bunlar məhz bu cür qarışıqlığın qarşısını almaq üçündür.

## Necə edəcəksən
1. Əvvəlcə yuxarıdakı iki hücumu özün yoxla (Postman/curl). Nəticəni gör ki, problemi hiss edəsən.
2. Standart JWT claim-lərini öyrən: `iss`, `aud`, `sub`, `iat`, `exp`, `jti`. Sənin payload-ındakı `issuer`/`audience` adi sahələrdir, standart deyil. Kitabxana onları avtomatik yoxlamır.
3. Ayırma üsulu seç (birini və ya birləşməsini):
   - **`aud` fərqi:** launch → `aud: "RADAR.FAN"`, access → `aud: "radarfan-api"`. Verify zamanı gözlənilən `aud`-u ver.
   - **`typ` claim-i:** `typ: "launch"` / `typ: "access"`.
   - **Ayrı açarlar:** launch token-i tərəfdaş öz açarı ilə imzalayır (task 014), access-i biz. Real həyatda elə belə olacaq.
   Tövsiyəm: access token üçün öz `aud`/`iss`-imiz + yoxlama; launch token isə task 014-də tenant açarı ilə yoxlanacaq. Beləliklə açarlar da fərqli olur.
4. `@fastify/jwt`-də `verify` seçimlərinə bax: `allowedAud`, `allowedIss`, `requiredClaims`. Və `namespace` ilə bir neçə JWT konfiqurasiyası qeyd etmək imkanı var.
5. Access token payload-ı: `sub` = user_id, `tid` = tenant_id, `role`. Minimum saxla. Niyə nickname-i token-ə qoymamaq daha yaxşıdır? (Dəyişə bilər, task 024.)

## Tələlər
- `nonce` yoxdursa → dərhal rədd et (`requiredClaims`). Yoxsa `nonce:undefined` problemi qalır.
- `exp` yoxlamasını kitabxana edir, amma saat fərqi (clock skew) üçün kiçik tolerans (`clockTolerance`) haqqında düşün.

## Öyrən
- RFC 7519 (JWT) claim-ləri
- "Token confusion" hücumları

## Qəbul meyarları
- [ ] Access token `/auth/exchange`-də 401 alır.
- [ ] Launch token `Bearer` kimi `/me`-də 401 alır.
- [ ] `nonce`-suz token rədd olunur.
- [ ] Hər üç hal üçün test var.
