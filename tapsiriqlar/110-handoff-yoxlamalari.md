# 110 — Handoff yoxlamaları

**Faza:** 9 · **Asılılıq:** 109, 022, 029 · **Status:** [ ]

## Məqsəd
Handoff yalnız bütün şərtlər ödəndikdə yaradılsın.

## Niyə
- Sənəd (bölmə 3): "Server istifadəçini, hadisənin statusunu, bazarı, qiymətin aktuallığını və tərəfdaşın məhdudiyyətlərini yoxlayır."
- Bölmə 6: "Yaş və coğrafi uyğunluq, self-exclusion və betting_handoff icazəsini tərəfdaş verir; server kupona keçiddən əvvəl bunları yoxlayır. Sistem tərəfdaşın rədd cavabından yayınmağa çalışmır."
- Bölmə 11: "suspended və stale nəticə kupona ötürülə bilməz".

## Yoxlama siyahısı (ardıcıllıqla)
| # | Yoxlama | Xəta |
|---|---|---|
| 1 | Feature `handoff` aktiv (021) | 403 |
| 2 | Entitlement `betting_handoff` (022), **sessiyadan təzə** | 403 `ACCESS_DENIED` |
| 3 | User active (018) | 403 `USER_RESTRICTED` |
| 4 | Feed sağlamdır (038) | 503 `FEED_UNAVAILABLE` |
| 5 | Hər seçim üçün: event bu tenant-da, `live`/`scheduled` | 409 `OUTCOME_UNAVAILABLE` |
| 6 | Market `open`, outcome `active` | 409 `OUTCOME_UNAVAILABLE` |
| 7 | Stale deyil (15 san.) | 409 `OUTCOME_UNAVAILABLE` (və ya ayrı `ODDS_STALE`) |
| 8 | `odds_version` = cari | 409 `ODDS_CHANGED` (111) |
| 9 | Bir matça bir seçim | 400 |
| 10 | Rate limit (məs. dəqiqədə 10 handoff) | 429 |

## Necə edəcəksən
1. Bütün seçimləri bir dəfədə yoxla və **bütün** problemləri `details`-də qaytar (frontend hamısını birdən göstərsin), ilk xətada dayanma.
2. Outcome-ları `FOR SHARE` ilə oxumaq lazımdırmı? Yoxlama ilə handoff insert arasında qiymət dəyişə bilər. Bu, milisaniyələrdir və tərəfdaş onsuz da öz tərəfində qiyməti yenidən yoxlayır. Sadə saxla, amma bu riski başa düş.
3. Bu yoxlamaların 5–8-i proqnozlarda (098) da var. Ortaq funksiya.

## Qəbul meyarları
- [ ] Hər sətir üçün test.
- [ ] Entitlement olmadan heç bir handoff yaranmır.
