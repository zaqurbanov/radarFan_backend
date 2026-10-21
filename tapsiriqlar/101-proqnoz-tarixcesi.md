# 101 — Proqnoz tarixçəsi

**Status:** [ ] · **Faza:** 7 · **Əvvəl bitməli:** 099

## Qısaca
"История прогнозов" siyahısı.

## Saytda
"Реал Мадрид — Барселона · П1 · 1.72 · 100 ед. · Верный ✓ +72 ед.", "Ничья · 3.10 · Ожидает расчёта —".
Altında: "Архив и расчёт смоделированы. Это статистика прогнозов, без реальных денежных ставок."

## Endpoint
`GET /me/predictions?event_id&status&cursor` → matç adları, nəticə, əmsal, məbləğ, status, mənfəət, vaxtlar.

## Nə edəcəksən
1. Cursor: yenidən köhnəyə (031-dəki qayda).
2. Mənfəət hesablanır: qaytarılan − məbləğ (gözləyən üçün boş).
3. Matç adlarını `JOIN` ilə götür (N+1 olmasın).
4. Hər cavabda demo işarəsi olsun ki, frontend "смоделированы" yazsın.

## Hazır olduğunu necə yoxlayarsan
- [ ] Tarixçənin rəqəmləri statistika (100) ilə uyğundur.
