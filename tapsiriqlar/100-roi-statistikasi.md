# 100 — Proqnoz statistikası və ROI

**Faza:** 7 · **Asılılıq:** 099 · **Status:** [ ]

## Məqsəd
"Моя статистика" ekranı: ROI, nəticə, həcm, qaytarılma, matç üzrə bölgü.

## Niyə
Sayt ("Моя статистика · Прогнозы по матчам · демонстрационные единицы"):
- "ROI по рассчитанным прогнозам −12,6%", "Чистый результат −63 ед.", "Объём прогнозов 500 ед.", "Возврат с учётом суммы 437 ед."
- Formula ekranda: "**ROI = (возврат − объём) / объём × 100%. Ожидающие прогнозы исключены. Возвраты включены с нулевой прибылью.**"
- "5 рассчитано · 1 ожидает"
- "По каждому матчу": Реал–Барса 2 рассчитано ROI −14%, Бостон–Лейкерс ROI 32,5%, Арсенал–Ливерпуль ROI −100%
- Filtr: "Матч: Все матчи / ..."
- "Мой фан" ekranında qısa kart: ROI, Результат, Рассчитано.

## Hesablama (saytdakı rəqəmlərlə yoxla!)
Rəqəmlər: П1 1.72 won (+72), Ничья 3.80 lost (−100), П1 1.65 won (+65), П2 2.30 void (0), П1 2.40 lost (−100), Ничья 3.10 pending.
- Hesablanmış: 5 → həcm = 500
- Qaytarılma = 172 + 0 + 165 + 100 + 0 = 437
- Nəticə = 437 − 500 = −63
- ROI = −63 / 500 = −12.6% ✓

Özün kağızda yoxla. Bu, testin özüdür.

## Endpoint
`GET /me/prediction-stats?event_id=` → { roi_percent, net_units, volume_units, return_units, settled_count, pending_count, by_event: [{event, settled_count, roi_percent}] }

## Necə edəcəksən
1. Bir SQL aggregate sorğusu: `SUM(stake) FILTER (WHERE status <> 'pending')`, `SUM(return_units) ...`, `GROUP BY event_id`. `FILTER` clause-u öyrən.
2. Həcm 0 → ROI `null` (0-a bölmə).
3. Yuvarlaqlaşdırma: ROI bir onluq rəqəmə (−12.6), API-də string və ya number? Pul olmayan faiz üçün number OK, amma dəqiqliyi DB-də et.

## Qəbul meyarları
- [ ] Yuxarıdakı 6 proqnozla test: ROI −12.6, net −63, volume 500, return 437.
- [ ] `event_id` filtri ilə yalnız o matç.
