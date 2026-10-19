# 074 — `POST /battles`: duelin başladılması

**Faza:** 5 · **Asılılıq:** 073, 080 · **Status:** [ ]

## Məqsəd
Yeni demo duel yaratmaq: sualları seçmək, botun düzgün cavab mövqeyini və qaydaları sabitləmək.

## Niyə
- Sənəd (bölmə 5): "POST /battles-dan sonra server üç fərqli aktiv sual seçir, ardıcıllığı və qaydaların versiyasını sabitləyir. Müştəri yalnız cari sualı və mətnlə birlikdə dörd option_id alır."
- "MVP-də bot üç sualdan birinə düzgün cavab verir; həmin sualın mövqeyi duel yaradılarkən serverdə seçilir."
- "Startdan əvvəl ekran bildirir: «Demo rəqib», 3 sual, maksimum 150 XP."
- Sayt: "ДЕМО-СОПЕРНИК · БОТ ALEX", "3 вопроса. Верный ответ — 50 XP и 20 ◈. Бот завершает демо с 1 очком.", "XP начисляются за первые 3 баттла".

## Endpoint
| Metod | Yol | Body | Cavab |
|---|---|---|---|
| GET | /battles/intro | | Başlanğıc ekranı: rəqib (Alex, `is_bot: true`), sual sayı, mükafat qaydaları, `xp_eligible`, `xp_battles_left_today` |
| POST | /battles | `{ mode: "demo" }` + Idempotency-Key | battle_id, state, current_question (index, text, options[id,text], opened_at, deadline_at) |

## Necə edəcəksən (tranzaksiya)
1. Aktiv battle varsa → onu qaytar (reload ssenarisi), yoxsa 409? Saytda "Сыграть ещё" yeni battle açır. Aktiv battle varsa, onu davam etdirmək daha dostanədir. Qərar ver.
2. `mode: "real"` demo tenant-da → 400 (2-ci mərhələ).
3. Gündəlik limit (080): `xp_eligible` hesabla, `daily_key` sabitlə.
4. 3 fərqli **aktiv** sual seç (tenant + locale). Təsadüfi seçim: `ORDER BY random()` kiçik cədvəldə OK, böyükdə yavaş. Son oynanılmış sualları istisna etmək? (Eyni suallar təkrarlanmasın.)
5. `bot_correct_index` = 0..2 təsadüfi.
6. `rules_snapshot`: tenant config-dən (021) xp_per_correct=50, coins_per_correct=20, time_limit.
7. Birinci sualı aç (073 və 078 məntiqi): `opened_at = now`, `deadline_at`.
8. Analitika: `battle_started`.

## Qəbul meyarları
- [ ] Cavabda `correct_option_id` yoxdur.
- [ ] 3 sual fərqlidir.
- [ ] Eyni Idempotency-Key ilə iki sorğu → bir battle.
