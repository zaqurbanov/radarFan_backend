# 020 — Logout və sessiya dəyişikliyi

**Faza:** 1 · **Asılılıq:** 019 · **Status:** [ ]

## Məqsəd
Tərəfdaşda istifadəçi çıxanda və ya başqa hesaba keçəndə bizdə köhnə sessiya qalmasın.

## Niyə
Sənəd (bölmə 6): "Konteynerdə logout olduqda lokal məlumatlar və bağlantı sıfırlanır." Bölmə 9, bridge: `onSessionChanged(handler)`.

Ssenari: ailədə bir telefon, ata çıxır, oğul girir. Köhnə WS bağlantısı (task 039) hələ atanın kanallarına abunədirsə, oğul atanın mesaj bildirişlərini görür.

## Endpoint
| Metod | Yol | Nəticə |
|---|---|---|
| POST | /auth/logout | refresh token-ləri ləğv edir (B rejimi), bu sessiyanın WS bağlantılarını bağlayır |

## Necə edəcəksən
1. Access token stateless-dir, "ləğv etmək" mümkün deyil. Seçimlər: qısa ömür (artıq 15 dəq.) + `token_version`, və ya `jti` blacklist (Redis, TTL = qalan ömür). Hansını seçirsən?
2. Hər token-ə `sid` (session id) əlavə et. WS bağlantıları `sid` ilə qeyd olunsun ki, logout zamanı həmin sessiyanın bağlantılarını tapıb bağlaya biləsən (task 043).

## Qəbul meyarları
- [ ] Logout-dan sonra həmin access token ilə sorğu 401 alır (seçdiyin üsulla).
- [ ] Logout-dan sonra açıq WS bağlantısı bağlanır.
