# 034 — Matç statistikası ("Центр матча")

**Faza:** 2 · **Asılılıq:** 027, 033 · **Status:** [ ]

## Məqsəd
Matç mərkəzində sahiblik, zərbələr, çərçivəyə zərbələr kimi statistikanı göstərmək.

## Niyə
- Sayt: "Центр матча" → "Демо-статистика": Владение 54% / 46%, Удары 12 / 9, В створ 6 / 4.
- Sənəddə bu yoxdur (Event modelində statistika sahəsi yoxdur). Sayt əsas versiyadır, ona görə əlavə edirik. Amma real provayderin bu məlumatı verib-verməyəcəyi məlum deyil.

## Cədvəl
**`event_stats`**
| Sütun | Tip | Qeyd |
|---|---|---|
| event_id | uuid PK, FK → events (cascade) | event başına bir sətir |
| tenant_id | uuid NOT NULL | |
| stats | jsonb NOT NULL | `[{ key: "possession", home: 54, away: 46, unit: "%" }, ...]` |
| version | int | |
| is_demo | boolean | "Демо-статistika" etiketi |
| updated_at | timestamptz | |

**Niyə jsonb?** Futbol və basketbolun statistikaları tamamilə fərqlidir (basketbolda ribaund, asist). Hər biri üçün sütun = çoxlu NULL. Statistika sorğuda filtrlənmir, yalnız göstərilir.

## Necə edəcəksən
1. Statistik açarların siyahısını (`possession`, `shots`, `shots_on_target`, ...) sport üzrə sabitlə. Provayderin adları normallaşdırılsın (025).
2. Demo feed bu dəyərləri də simulyasiya etsin (026).
3. Provayder statistika vermirsə → `stats: null`, frontend bölməni gizlədir. Saxta rəqəm göstərmə.
4. Yenilənmə → `event.updated` WS hadisəsinə daxil etmək yoxsa ayrı `event.stats.updated`? Qərar ver (task 047).

## Qəbul meyarları
- [ ] Demo matçlarda `GET /events/{id}` statistikanı qaytarır, `is_demo: true`.
- [ ] Statistikası olmayan matçda `stats: null`.

## Açıq suallar
- Real provayder statistika verəcəkmi? (SPEC.md, sual 4.)
