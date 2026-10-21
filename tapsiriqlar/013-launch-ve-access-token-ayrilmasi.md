# 013 — İki token növünü bir-birindən ayır

**Status:** [ ] · **Faza:** 1 · **Əvvəl bitməli:** 001, 009

## Qısaca
Launch token yalnız giriş üçün, access token yalnız API üçün işləsin. Biri digərinin yerinə keçə bilməsin.

## İki token
| | Launch token | Access token |
|---|---|---|
| Kim verir | Bukmeker | Biz |
| Nə qədər yaşayır | 60 saniyə | 15 dəqiqə |
| Harada işləyir | Yalnız `POST /auth/exchange` | Bütün digər endpoint-lər |
| Neçə dəfə | Bir dəfə | Çox dəfə |

## Niyə lazımdır? (problem)
İkisi də **eyni secret** ilə imzalanır və heç nə onları ayırmır. Buna görə:
1. Access token-i `/auth/exchange`-ə göndərsən, **keçir** və yeni access token alırsan. Sessiya sonsuzadək uzanır.
2. Launch token-i `/me`-yə göndərsən, imza düzgün olduğu üçün qəbul olunur.

## Nə edəcəksən
1. **Əvvəl problemi öz gözünlə gör:** yuxarıdakı iki hücumu Postman ilə yoxla.
2. Standart JWT sahələrini öyrən: `iss` (kim verdi), `aud` (kimin üçün), `sub` (kim haqqında), `exp` (bitmə vaxtı).
   Sənin payload-ındakı `issuer`, `audience` adi sahələrdir. Kitabxana onları avtomatik yoxlamır.
3. Ayırma üsulunu seç:
   - access token-ə `aud: "radarfan-api"` qoy, launch token-də `aud: "RADAR.FAN"`;
   - yoxlayanda gözlənilən `aud`-u mütləq ver.
4. `nonce` olmayan launch token-i dərhal rədd et.
5. Access token-də yalnız lazım olanları saxla: `sub` (user id), tenant id, rol. Ad (nickname) qoyma, çünki dəyişə bilər.

## Hazır olduğunu necə yoxlayarsan
- [ ] Access token `/auth/exchange`-də 401 alır.
- [ ] Launch token `/me`-də 401 alır.
- [ ] `nonce`-suz token rədd olunur.
- [ ] Hər üç hal üçün test var.
