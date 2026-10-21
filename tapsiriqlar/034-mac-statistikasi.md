# 034 — Matç statistikası

**Status:** [ ] · **Faza:** 2 · **Əvvəl bitməli:** 027, 033

## Qısaca
Matç səhifəsində statistikanı göstər: topa sahiblik, zərbələr, çərçivəyə zərbələr.

## Saytda
"Демо-статистика": Владение 54% / 46%, Удары 12 / 9, В створ 6 / 4.

## Qeyd
Bu, sənəddə **yoxdur**, saytdan gəlir. Real provayderin bunu verib-verməyəcəyi hələ məlum deyil.

## Yeni cədvəl: `event_stats`
| Sütun | İzah |
|---|---|
| event_id | matç (hər matça bir sətir) |
| tenant_id | |
| stats | JSON siyahı: `[{ key: "possession", home: 54, away: 46 }, ...]` |
| version | |
| is_demo | "Демо-статистика" yazısı üçün |
| updated_at | |

**Niyə JSON?** Futbol və basketbolun statistikaları tamam fərqlidir. Hər biri üçün ayrı sütun = çoxlu boş xana. Statistika üzrə axtarış etmirik, yalnız göstəririk.

## Nə edəcəksən
1. Statistika açarlarının siyahısını idman növünə görə sabitlə.
2. Demo provayder bunları da simulyasiya etsin (026).
3. Statistika yoxdursa → `stats: null`. **Uydurma rəqəm göstərmə.**

## Hazır olduğunu necə yoxlayarsan
- [ ] Demo matçda statistika gəlir, `is_demo: true`.
- [ ] Statistikası olmayan matçda `stats: null`.

## Açıq sual
Real provayder statistika verəcəkmi?
