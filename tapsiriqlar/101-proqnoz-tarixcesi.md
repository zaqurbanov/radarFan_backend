# 101 — Proqnoz tarixçəsi

**Faza:** 7 · **Asılılıq:** 099 · **Status:** [ ]

## Məqsəd
"История прогнозов" siyahısı.

## Niyə
Sayt: "Реал Мадрид — Барселона · П1 · 1.72 · 100 ед. · Верный ✓ +72 ед.", "Ничья · 3.10 · 100 ед. · Ожидает расчёта —". Altında: "Архив и расчёт смоделированы. Это статистика прогнозов, без реальных денежных ставок."

## Endpoint
`GET /me/predictions?event_id&status&cursor` → items: { id, event (komandalar), outcome_key, price, stake_units, status, profit_units, created_at, settled_at }

## Necə edəcəksən
1. Cursor: `created_at DESC, id` (031).
2. `profit_units` hesablanan sahədir: `return − stake` (pending üçün null).
3. Event adları join ilə (N+1 yox).
4. Hər cavabda `is_demo` / disclaimer bayrağı. Frontend "смоделированы" mətnini göstərsin.

## Qəbul meyarları
- [ ] Tarixçə statistikanın (100) rəqəmləri ilə uyğundur.
