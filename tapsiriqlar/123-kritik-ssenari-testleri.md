# 123 — Ən vacib ssenarilərin testləri

**Status:** [ ] · **Faza:** 12 · **Əvvəl bitməli:** 012 və bütün funksional task-lar

## Qısaca
Sənədin "hazırlıq meyarları" (bölmə 11) **hamısı** avtomatik testlə yoxlansın.

## Meyarlar → task-lar
| # | Meyar (sənəddən) | Task |
|---|---|---|
| 1 | Seçilmişlər və irəliləyiş yenidən girişdən sonra qalır; tenant-lar qarışmır | 037, 090, 121 |
| 2 | Kartlar statusu və bazarları düzgün göstərir; bağlı və köhnəlmiş əmsal kupona keçmir | 028, 029, 110 |
| 3 | A otağının mesajı B-də yoxdur; eyni `client_message_id` dublikat yaratmır; HTML işləmir; moderasiya hamıda görünür | 053, 055, 067 |
| 4 | Təkrar səs sayğacı artırmır; dəyişmə köçürür; bağlı sorğu rədd edir | 062, 064 |
| 5 | Viktorina serverdə yoxlanır; bağlanana qədər cavab gizlidir; gec cavab rədd; 1:1 heç-heçədir | 075, 076, 079 |
| 6 | Duel 0–150 XP verir; təkrar, eyni anda sorğu, iki cihaz ikiqat etmir; 4-cü duel XP vermir | 085, 080 |
| 7 | Bitməmiş tapşırıq rədd olunur; dəqiq 100 XP; iki eyni anda claim = bir sətir; seçilmişdən silmək geri qaytarmır | 091, 092 |
| 8 | "Opened" mərc deyil; köhnəlmiş qiymət təsdiq tələb edir | 109, 111 |
| 9 | 320 px ekran, klaviatura, ekran oxuyucu | **frontend-in işidir** |
| 10 | 401, 429, 503, internet yoxdur, arxa plan, WS itkisi, bərpa, bukmeker işləmir | 019, 054, 038, 048, 056 |

Saytdan əlavə: coin heç vaxt mənfi olmur (104); ROI düzgündür (100); şəxsi gizlətmə başqasına təsir etmir (060).

## Nə edəcəksən
1. Hər sətir üçün ayrı test bloku. Testin adı meyarın mətni olsun.
2. **Eyni anda sorğu testləri** (`Promise.all` ilə 10–50 sorğu) ən dəyərlidir. Race condition-u yalnız bunlar tutur.
3. WebSocket testləri: real bağlantı ilə.
4. Vaxt testləri: saxta saat (`vi.useFakeTimers`).
5. Əhatə hesabatı: biznes məntiqinin 80%+.

## Hazır olduğunu necə yoxlayarsan
- [ ] Cədvəlin hər backend sətri üçün ən azı bir test.
- [ ] `npm test` CI-da keçir.
