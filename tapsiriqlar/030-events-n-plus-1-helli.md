# 030 — `GET /events`: N+1 problemi

**Faza:** 2 · **Asılılıq:** 027 · **Status:** [ ]
(Köhnə `TASKS.md`: T9)

## Məqsəd
Lent sorğusu matç sayından asılı olmayaraq sabit sayda (2–4) DB sorğusu etsin.

## Niyə
İndiki kod: 1 sorğu favorites + 1 sorğu events + **hər event üçün** 1 market + 1 outcomes. 20 matç = 42 sorğu. Sənəd (bölmə 10): "daxili REST sorğularının p95-i 500 ms-dək", tenant başına 1 000 eyni vaxtda istifadəçi. 42 × 1 000 = DB-nin sonu.

Həmçinin indiki kod `const [market] = ...` ilə yalnız **birinci** market-i götürür. Gələcəkdə bir event-də bir neçə market ola bilər.

## Necə edəcəksən
1. İki yanaşma:
   - **Toplu sorğular:** events (1) → event_id-lərlə markets `IN (...)` (1) → market_id-lərlə outcomes `IN (...)` (1) → yaddaşda `Map` ilə qruplaşdır.
   - **Drizzle relational queries** (`db.query.events.findMany({ with: { markets: { with: { outcomes } } } })`): bunun üçün `relations()` təyin etməlisən. Drizzle bunu necə SQL-ə çevirir? (Lateral join + json aggregate.) Loglayıb bax.
2. Favorites üçün: istifadəçinin bütün favorites-ini yükləmək əvəzinə, yalnız qaytarılan event-lər üçün yoxla (`event_id IN (...)`). İstifadəçinin 5 000 favoriti olsa nə olar?
3. `favorites=true` filtri üçün join/`EXISTS` istifadə et, `inArray(5000 id)` yox.
4. DB sorğu logunu aktivləşdir (Drizzle `logger: true`) və sorğuları say.

## Qəbul meyarları
- [ ] 20 matçlıq lent ≤ 4 SQL sorğusu ilə qaytarılır (loglarda yoxla).
- [ ] Cavab strukturu dəyişməyib.
