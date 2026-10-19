# 123 — Kritik ssenari testləri (qəbul meyarları)

**Faza:** 12 · **Asılılıq:** 012 + bütün funksional tasklar · **Status:** [ ]

## Məqsəd
Sənədin 11-ci bölməsindəki **bütün** qəbul meyarları avtomatik testlə örtülsün.

## Niyə
Sənəd (bölmə 11, "MVP hazırlığının yoxlanıla bilən meyarları") və təhvil: "kritik ssenarilərin avtomatik yoxlamaları".

## Meyarlar → test
| # | Meyar (sənəd) | Task |
|---|---|---|
| 1 | Seçilmişlər və irəliləyiş reload və təkrar girişdən sonra saxlanır; sorğunun ID-si dəyişdirilsə belə tenant-ların məlumatları qarışmır | 037, 090, 121 |
| 2 | Kartlar scheduled/live/finished və bazar tərkibini düzgün göstərir; suspended və stale nəticə kupona ötürülə bilməz | 028, 029, 110 |
| 3 | A otağının mesajı B-də görünmür. Eyni client_message_id dublikat yaratmır. HTML icra olunmur. Moderasiya bütün iştirakçılarda əks olunur | 053, 055, 067 |
| 4 | Təkrar səs sayğacı artırmır; dəyişmə köçürür. Bağlı poll rədd edir | 062, 064 |
| 5 | Viktorina serverdə yoxlanılır; sual bağlanana qədər düzgün cavab açılmır. Gec cavab rədd, təkrar XP yox, bərabər hesab heç-heçə | 075, 076, 079 |
| 6 | İlk completed 0–150 XP. Reload, paralel sorğu, iki cihaz ikiqat etmir. Dördüncü duel XP vermir | 085, 080 |
| 7 | Tamamlanmadan claim rədd. Dəqiq 100 XP; iki paralel claim bir ledger. Favoritdən silmə tapşırığı geri qaytarmır | 091, 092 |
| 8 | Bridge opened-i təsdiqləyir və ya rədd/timeout; opened mərc deyil. Köhnəlmiş qiymət yenidən təsdiq tələb edir | 109, 111 |
| 9 | 320/440 px, klaviatura, screen reader | **frontend**, backend-ə aid deyil |
| 10 | 401, 429, 503, offline, background/resume, WS itkisi, snapshot bərpası, tərəfdaşın əlçatmazlığı | 019, 054, 038, 048, 056 |

Saytdan əlavə: coin heç vaxt mənfi olmur (104); ROI hesablaması (100); şəxsi gizlətmə başqasına təsir etmir (060).

## Necə edəcəksən
1. Hər sətir üçün `describe` bloku. Test adı meyarın mətnini əks etdirsin.
2. **Paralellik testləri** (`Promise.all` ilə 10–50 sorğu) ən dəyərli testlərdir. Race condition-ları yalnız bunlar tutur.
3. WS testləri: `ws` client ilə real bağlantı (test serverini portda qaldır).
4. Vaxt testləri: fake timers (vitest `vi.useFakeTimers`) və ya DB-də vaxtı manipulyasiya.
5. Coverage hesabatı (məqsəd: biznes məntiqində 80%+).

## Qəbul meyarları
- [ ] Yuxarıdakı cədvəlin hər backend sətri üçün ən azı bir test.
- [ ] `npm test` CI-da keçir (127).
