# 100 — Proqnoz statistikası və ROI

**Status:** [ ] · **Faza:** 7 · **Əvvəl bitməli:** 099

## Qısaca
"Моя статистика" ekranı: ROI, nəticə, həcm, qaytarılan, matç üzrə bölgü.

## Saytda
- "ROI −12,6% · Чистый результат −63 ед. · Объём 500 ед. · Возврат 437 ед."
- Formula ekranda: **ROI = (qaytarılan − həcm) / həcm × 100%**. Gözləyənlər sayılmır. Ləğv olunanlar 0 mənfəətlə sayılır.
- "5 рассчитано · 1 ожидает"
- Matç üzrə: Реал–Барса ROI −14%, Бостон–Лейкерс 32,5%, Арсенал–Ливерпуль −100%.
- Filtr: "Все матчи / ..."

## Saytdakı rəqəmlərlə özün yoxla (bu, testin özüdür)
| Proqnoz | Status | Qaytarılan |
|---|---|---|
| П1 1.72 | won | 172 |
| Ничья 3.80 | lost | 0 |
| П1 1.65 | won | 165 |
| П2 2.30 | void | 100 |
| П1 2.40 | lost | 0 |
| Ничья 3.10 | pending | (sayılmır) |

- Hesablanmış: 5 → həcm = 500
- Qaytarılan = 172 + 0 + 165 + 100 + 0 = **437**
- Nəticə = 437 − 500 = **−63**
- ROI = −63 / 500 = **−12.6%** ✓

Kağızda özün hesabla.

## Endpoint
`GET /me/prediction-stats?event_id=` → ROI, nəticə, həcm, qaytarılan, hesablanmış say, gözləyən say, matç üzrə bölgü.

## Nə edəcəksən
1. Bir SQL sorğusu ilə: `SUM(...) FILTER (WHERE status <> 'pending')`, `GROUP BY event_id`. `FILTER` ifadəsini araşdır.
2. Həcm 0 → ROI `null` (sıfıra bölmə olmaz).

## Hazır olduğunu necə yoxlayarsan
- [ ] Yuxarıdakı 6 proqnozla test: ROI −12.6, nəticə −63, həcm 500, qaytarılan 437.
- [ ] Matç filtri işləyir.
