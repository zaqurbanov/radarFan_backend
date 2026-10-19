# 084 — Balans cache və uzlaşdırma

**Faza:** 6 · **Asılılıq:** 083, 049 · **Status:** [ ]

## Məqsəd
Balansı hər dəfə `SUM` ilə hesablamamaq, amma cache-in ledger ilə həmişə uyğun olduğunu yoxlamaq.

## Niyə
- Sənəd (bölmə 7): "Balance cache ledger əsasında yenilənir və fon tapşırığı ilə yoxlanılır."
- Bölmə 10, monitorinq: "ledger/balance uyğunsuzluqları".
- Başlıqda XP hər ekranda göstərilir. 10 000 ledger qeydinin cəmini hər sorğuda hesablamaq bahadır.

## Cədvəl
**`user_balances`**
| Sütun | Tip |
|---|---|
| user_id | uuid PK FK |
| tenant_id | uuid |
| xp | int NOT NULL default 0 |
| coins | int NOT NULL default 0 (086) |
| xp_ledger_last_id / version | (istəyə bağlı) |
| updated_at | timestamptz |

CHECK (`coins >= 0`). Mənfi coin = bug. DB bunu bloklasın (104).

## Necə edəcəksən
1. Ledger insert ilə **eyni tranzaksiyada** `UPDATE user_balances SET xp = xp + :amount`. Yalnız ledger insert həqiqətən baş veribsə!
2. Uzlaşdırma job-u (gündə bir və ya saatda bir): `SUM(ledger)` ≠ `balance` olan istifadəçiləri tap → logla, alarm (125), avtomatik düzəlt (cache-i ledger-ə bərabərləşdir). Ledger həmişə **həqiqətin mənbəyidir**.
3. Böyük cədvəldə bütün istifadəçiləri yoxlamaq bahadır. Yalnız son N saatda dəyişənləri yoxla.
4. Balans sətri istifadəçi yaradılanda yaranır (exchange, 013) və ya lazy upsert.

## Qəbul meyarları
- [ ] Balansı əl ilə pozub (SQL) job-u işə salanda düzəlir və logda xəbərdarlıq var.
- [ ] Mənfi coin balansı DB tərəfindən rədd olunur.
