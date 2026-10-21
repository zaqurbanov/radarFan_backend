# 026 — Demo matçlar (canlı simulyasiya)

**Status:** [ ] · **Faza:** 2 · **Əvvəl bitməli:** 025

## Qısaca
Real provayder olmadan saytdakı kimi "canlı" matçlar: dəqiqə irəliləyir, hesab dəyişir, əmsallar yenilənir. Hamısı **"демо"** işarəsi ilə.

## Niyə lazımdır?
- Hələ real mənbə yoxdur, amma real vaxt funksiyalarını (WebSocket, köhnəlmiş əmsal) yoxlamaq üçün **dəyişən** məlumat lazımdır.
- Sənəd: demo məlumat həmişə **işarəli** olmalıdır.

## Saytdakı demo matçlar
| Matç | Liqa | Hesab | Dövr | Əmsallar |
|---|---|---|---|---|
| Реал Мадрид — Барселона | Испания | 2:1 | 67′ | 1.72 / 3.80 / 4.20 |
| Бостон — Лейкерс | NBA | 84:79 | 3-я четверть | 1.65 / 2.30 |
| Арсенал — Ливерпуль | Англия | 0:0 | 21′ | 2.40 / 3.10 / 2.85 |

## Nə edəcəksən
1. Demo provayder yaz (025-dəki interfeys ilə).
2. Sadə simulyasiya qaydaları:
   - hər N saniyədə dəqiqə +1;
   - kiçik ehtimalla qol → hesab dəyişir, versiya artır;
   - əmsallar azca dəyişir, versiya artır;
   - qoldan sonra bazar qısa müddət `suspended` olur (real bukmekerlər kimi);
   - matç bitəndə status `finished`.
3. Simulyasiyanı **təkrarlana bilən** et (sabit "seed" ədədi ilə). Testlərdə təsadüfilik problem yaradır.
4. Bütün demo matçlarda `is_demo: true`.

## Diqqət
Bir neçə server işləsə, simulyasiya **yalnız birində** işləməlidir. Yoxsa hesab iki dəfə dəyişər. Həlli task 049-dadır (Redis lock).

## Hazır olduğunu necə yoxlayarsan
- [ ] Server işləyəndə hesab və əmsallar vaxtaşırı dəyişir.
- [ ] Bütün demo matçlar API-də `is_demo: true` ilə gəlir.
- [ ] Production tenant-da demo provayder seçilə bilmir.
