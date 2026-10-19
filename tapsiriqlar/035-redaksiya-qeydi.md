# 035 — Redaksiya qeydi (editorial note)

**Faza:** 2 · **Asılılıq:** 027 · **Status:** [ ]

## Məqsəd
Hər matç kartında qısa redaksiya mətni ("Какая передача перед вторым голом! 🔥").

## Niyə
- Sənəd (bölmə 3): kartda "qısa redaksiya qeydi". Bölmə 6: "admin öz tenant-ının ... redaksiya qeydlərini idarə edir".
- `events.editorial_note` artıq var (varchar 255).

## Problem
`events` cədvəli **feed tərəfindən** yazılır (027). Admin qeyd yazsa, feed upsert-i onu silə bilərmi? Upsert-də `editorial_note` sütununu yeniləməsən, problem yoxdur. Amma bu, asanlıqla unudulan qaydadır.

**Tövsiyə:** ayrıca cədvəl. Feed məlumatı ilə redaksiya məlumatı ayrı yaşasın.

## Cədvəl
**`event_editorials`**
| Sütun | Tip |
|---|---|
| event_id | uuid PK FK → events |
| tenant_id | uuid NOT NULL |
| note | varchar(140) NOT NULL |
| author_id | uuid FK → users (admin) |
| locale | varchar(10) |
| updated_at | timestamptz |

Sonra `events.editorial_note` sütununu sil (migration).

## Necə edəcəksən
1. Lentdə bu cədvəli `LEFT JOIN` ilə götür.
2. Admin endpoint task 117-də. İndi yalnız seed + oxuma.
3. Saytda kartdakı qeyd ilə çatdakı son mesaj eyni mətndir ("Какая передача..."). Bu, demo üçün təsadüfdür, yoxsa qeyd çatın son mesajıdır? Sənədə görə ayrı şeylərdir.

## Qəbul meyarları
- [ ] Feed upsert-i redaksiya qeydini silmir (test).
