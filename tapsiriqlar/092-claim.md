# 092 — Mükafatın alınması: `POST /challenges/{id}/claim`

**Faza:** 6 · **Asılılıq:** 091, 083, 036 · **Status:** [ ]

## Məqsəd
3 tapşırıq bitəndə istifadəçi 100 XP-ni **dəqiq bir dəfə** alsın.

## Niyə
- Sənəd (bölmə 5): "Üç tapşırıqdan sonra status claimable olur. POST /challenges/{id}/claim bir tranzaksiyada 100 XP verir və statusu claimed edir. Təkrar artıq verilmiş mükafatı qaytarır."
- Bölmə 8: → `award_id, awarded_xp, xp_balance`. 409 `CHALLENGE_NOT_READY`.
- Bölmə 11: "Tapşırıqlar tamamlanmadan claim rədd edilir. Tamamlandıqdan sonra dəqiq 100 XP verilir; eyni vaxtda iki claim bir ledger qeydi yaradır."
- Bölmə 2: "Offline zamanı göndərmə və mükafatın alınması aydın statusla bloklanır; server cavabından əvvəl interfeys uğur bildirmir."

## Tranzaksiya
1. Idempotency-Key məcburi (036).
2. `SELECT ... FROM challenge_progress WHERE ... FOR UPDATE`.
3. `status = in_progress` → 409 `CHALLENGE_NOT_READY` (`details`: hansı tapşırıqlar qalıb).
4. `status = claimed` → mövcud ledger qeydini tap, **eyni** cavabı qaytar (200).
5. `claimable` → `awardXp(100, source_type=challenge, source_id=challenge_id)` + `status = claimed`, `claimed_at`.
6. Outbox: `xp.updated`, `challenge.updated`.
7. Analitika: `challenge_claimed` (commit-dən sonra, serverdə).

**Üç qat qoruma:** idempotency key + `FOR UPDATE` + ledger unique. Niyə üçü də? Hər biri fərqli xəta sinfini tutur. Özün izah et.

## Qəbul meyarları
- [ ] 2/3 → 409 `CHALLENGE_NOT_READY`.
- [ ] 3/3 → 100 XP; ikinci claim → eyni `award_id`, balans dəyişmir.
- [ ] Fərqli idempotency key-li 2 paralel claim → bir ledger qeydi (test).
