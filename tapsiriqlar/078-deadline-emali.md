# 078 — Sual vaxtı və deadline emalı

**Faza:** 5 · **Asılılıq:** 076, 049 · **Status:** [ ]

## Məqsəd
Vaxt limiti serverdə tətbiq olunsun (əgər tenant qaydasında varsa).

## Niyə — və ziddiyyət
- Sənəd (bölmə 5): "Hər sual üçün 20 saniyə ayrılır. Server opened_at və deadline_at qaytarır; müştəri taymeri yalnız göstərmək üçündür... WebView arxa plana keçiriləndə taymer dayanmır."
- **Sayt:** "Время ответа не ограничено" (cavab vaxtı məhdud deyil).

Sayt əsas versiyadır, amma sənəd vaxt limitini real duel (2-ci mərhələ) üçün də vacib sayır. **Həll:** qayda konfiqurasiya olunur: `rules.question_time_limit_seconds` (null = limitsiz). Demo tenant: `null` (sayt kimi). Kod hər iki halı dəstəkləyir. Real duel (131) üçün isə məcburi 20.

## Necə edəcəksən
1. `deadline_at = opened_at + limit` (limit null-dursa, `deadline_at` null).
2. Cavab yoxlaması (076) deadline-ı yoxlayır, **əsas qoruma** budur.
3. Deadline keçəndə sual özü bağlanmalıdır (cavab gəlmədən). İki yol:
   - gecikmiş job: `deadline_at`-da `closeQuestion(battle, index)`, idempotent;
   - lazy: növbəti oxunuşda/sorğuda yoxla.
   Push lazımdır (`battle.question.closed`, müştəriyə "vaxt bitdi"), ona görə job.
4. Kiçik tolerans (məs. 500 ms şəbəkə gecikməsi)? Sənəd: "Cavab serverə deadline_at-dan əvvəl çatarsa qəbul edilir". Tolerans yoxdur. Sənədə sadiq qal.

## Qəbul meyarları
- [ ] Limit 20 san. olan tenant-da 21-ci saniyədə cavab rədd olunur (fake timers).
- [ ] Limit null olan tenant-da istənilən vaxt cavab qəbul olunur.
- [ ] Deadline keçəndə WS ilə `battle.question.closed` gəlir.

## Açıq suallar
- Demo-da vaxt limiti olsunmu? (SPEC.md, sual 6.)
