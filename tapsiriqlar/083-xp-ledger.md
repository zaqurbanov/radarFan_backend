# 083 — XpLedger: XP jurnalı

**Faza:** 6 · XP, coin, tapşırıqlar · **Asılılıq:** 012 · **Status:** [ ]

## Məqsəd
XP-nin hər hərəkəti dəyişdirilməz bir jurnalda qeyd olunsun. Balans bu jurnalın cəmidir.

## Niyə
- Sənəd (bölmə 5): "XP balansı ledger qeydlərinin cəmidir." "Ledger-də tenant_id + user_id + source_type + source_id unikallığı tətbiq edilir."
- Bölmə 7: XpLedger — id, user_id, amount, source_type, source_id, created_at; "istifadəçi üçün unikal mükafat mənbəyi".
- Bölmə 2: prototipdə XP "Klik zamanı dərhal verilir, təkrarlardan qorunmur".

**Niyə `users.xp` sütunu kifayət deyil?** `UPDATE users SET xp = xp + 50` ilə:
- tarixçə yoxdur ("bu 50 XP haradandır?"). Profildə "История XP" lazımdır (095);
- ikiqat ödənişin qarşısı alınmır (eyni battle iki dəfə);
- səhvi düzəltmək üçün iz yoxdur.
Ledger = mühasibat kitabı. Heç vaxt silinmir və dəyişmir, düzəliş yeni qeydlə edilir.

## Cədvəl
**`xp_ledger`**
| Sütun | Tip | Qeyd |
|---|---|---|
| id | uuid PK | `ledger_id` (WS `xp.updated`) |
| tenant_id | uuid NOT NULL | |
| user_id | uuid FK NOT NULL | |
| amount | int NOT NULL | müsbət və ya mənfi (düzəliş) |
| source_type | enum(`battle`, `challenge`, `adjustment`, `bonus`) | |
| source_id | uuid NOT NULL | battle_id, challenge_id, ... |
| rules_version | int | hansı qaydaya görə |
| metadata | jsonb | məs. `{ correct: 2 }`. Tarixçə mətni üçün ("Quiz Battle · 2 верных") |
| created_at | timestamptz | |

**UNIQUE (`tenant_id`, `user_id`, `source_type`, `source_id`)**. Bu, ən vacib qoruma: hansı kod səhvi olursa olsun, eyni battle iki dəfə XP verə bilməz.
Index (`tenant_id`, `user_id`, `created_at`). Sənəd bunu tələb edir.

## Necə edəcəksən
1. `awardXp(tx, {user, amount, source_type, source_id})` funksiyası. `INSERT ... ON CONFLICT DO NOTHING RETURNING`. Heç nə qayıtmadısa → artıq verilib, mövcud qeydi qaytar.
2. Bu funksiya **həmişə** xarici tranzaksiya daxilində çağırılır (battle completion, claim).
3. Dəyişdirilməzlik: 069-dakı kimi trigger/icazə.
4. `adjustment` (admin düzəlişi) üçün `source_id` nə olacaq? Hər düzəliş üçün yeni UUID.
5. `amount = 0` olan qeyd yazılırmı? (Məs. limitdən sonra battle.) Yazmaq tarixçədə "0 XP" göstərir, yazmamaq jurnalı təmiz saxlayır. Qərar ver.

## Qəbul meyarları
- [ ] Eyni `source_id` ilə iki `awardXp` → bir qeyd.
- [ ] 2 paralel `awardXp` eyni mənbə ilə → bir qeyd (test).
- [ ] Ledger sətrini UPDATE etmək mümkün deyil.
