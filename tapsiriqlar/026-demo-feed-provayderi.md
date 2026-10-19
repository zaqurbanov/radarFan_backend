# 026 — Demo feed provayderi (simulyasiya)

**Faza:** 2 · **Asılılıq:** 025 · **Status:** [ ]

## Məqsəd
Real provayder olmadan saytdakı kimi "canlı" matçlar: hesab dəyişir, dəqiqə irəliləyir, əmsallar yenilənir. Hamısı **demo** işarəsi ilə.

## Niyə
- Sənəd (bölmə 1): "Lokal demo üçün test məlumatlarından istifadə edilə bilər... Canlı məlumatları işarələmədən demo məlumatları ilə əvəz etmək qadağandır."
- Bölmə 11: "Bu məlumatlar olmadan daxili MVP-ni test məlumatları ilə reallaşdırmaq olar."
- Sayt: hər kartda "● ДЕМО LIVE", "1 284 фанатов · демо", "Демо-статистика".
- Real-time (WS, task 047) və aktuallıq (task 029) funksiyalarını test etmək üçün **dəyişən** məlumat lazımdır.

## Saytdakı demo məlumatlar
| Matç | Liqa | Hesab | Dövr | Əmsallar |
|---|---|---|---|---|
| Реал Мадрид — Барселона (RM/FCB) | Футбол · Испания | 2:1 | 67′ | П1 1.72, X 3.80, П2 4.20 |
| Бостон — Лейкерс (BOS/LAL) | Баскетбол · NBA | 84:79 | 3-я четверть | П1 1.65, П2 2.30 |
| Арсенал — Ливерпуль (ARS/LIV) | Футбол · Англия | 0:0 | 21′ | П1 2.40, X 3.10, П2 2.85 |

Redaksiya qeydləri: "Какая передача перед вторым голом! 🔥", "Бостон прибавил в защите!", "Кто первым откроет счёт?".

## Necə edəcəksən
1. Provayder `FeedProvider` interfeysini həyata keçirir (025).
2. Simulyasiya qaydaları (sadə saxla):
   - hər N saniyədə dəqiqə +1;
   - kiçik ehtimalla qol və ya xal → hesab dəyişir, `version` artır;
   - əmsallar kiçik təsadüfi dəyişir, `version` artır, `updated_at` yenilənir;
   - bəzən market `suspended` olur (qoldan dərhal sonra, real bukmekerlərdəki kimi). Bu, task 111-i test etməyə imkan verir.
   - matç bitəndə `finished`.
3. Simulyasiyanı **deterministik** etmək imkanı (seed ədədi). Testlərdə təsadüfilik problem yaradır.
4. Simulyasiya fon tapşırığı kimi işləyir (task 049). Bir neçə server instansiyası varsa, simulyasiya **yalnız birində** işləməlidir. Bunu necə təmin edəcəksən? (Redis lock, task 049.)
5. "Reset" imkanı: matçları ilkin vəziyyətə qaytarmaq (task 118, "Сбросить демо").

## Qəbul meyarları
- [ ] Demo rejimdə server işləyəndə hesab və əmsallar vaxtaşırı dəyişir.
- [ ] Bütün demo hadisələr API-də `is_demo: true` ilə qayıdır.
- [ ] Production tenant-da demo provayder seçilə bilməz.
