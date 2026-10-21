# 083 — XP jurnalı (ledger)

**Status:** [ ] · **Faza:** 6 · **Əvvəl bitməli:** 012

## Qısaca
XP-nin hər hərəkəti ayrıca sətir kimi yazılsın və heç vaxt silinməsin. Balans = sətirlərin cəmi.

## Niyə `users.xp` sütunu kifayət deyil?
`UPDATE users SET xp = xp + 50` yazsan:
- **tarixçə yoxdur:** "bu 50 XP haradan gəldi?" Profildə "История XP" lazımdır (095);
- **ikiqat ödənişə qarşı qoruma yoxdur:** eyni duel iki dəfə XP verə bilər;
- **səhvi tapmaq mümkün deyil.**

Ledger = mühasibat kitabı. Heç vaxt silinmir və dəyişmir. Düzəliş = yeni sətir.

## Yeni cədvəl: `xp_ledger`
| Sütun | İzah |
|---|---|
| id | |
| tenant_id, user_id | |
| amount | miqdar (düzəliş üçün mənfi ola bilər) |
| source_type | haradan: `battle`, `challenge`, `adjustment`, `bonus` |
| source_id | hansı duel/tapşırıq |
| rules_version | hansı qayda ilə |
| metadata | əlavə (məs. `{ correct: 2 }`, tarixçədə "2 верных" yazmaq üçün) |
| created_at | |

**Ən vacib qayda:** unique (`tenant_id`, `user_id`, `source_type`, `source_id`).
Kodda nə səhv olursa olsun, eyni duel **iki dəfə** XP verə bilməz. Baza özü bloklayır.

Index: (`tenant_id`, `user_id`, `created_at`).

## Nə edəcəksən
1. `xp_ver(tx, {...})` funksiyası: `INSERT ... ON CONFLICT DO NOTHING RETURNING`. Heç nə qayıtmadısa → artıq verilib.
2. Bu funksiya **həmişə** başqa tranzaksiyanın içində çağırılır (duel bitməsi, tapşırıq).
3. Jurnalı UPDATE/DELETE-dən qoru (069-dakı kimi trigger).
4. Qərar ver: limitdən sonrakı duel üçün 0 XP-lik sətir yazılsın, yoxsa heç nə?

## Hazır olduğunu necə yoxlayarsan
- [ ] Eyni mənbə ilə iki dəfə XP → bir sətir.
- [ ] Eyni anda 2 dəfə → bir sətir (test).
- [ ] Jurnal sətrini dəyişmək mümkün deyil.
