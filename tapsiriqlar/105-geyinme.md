# 105 — Əşyanın geyinilməsi (slotlar)

**Faza:** 8 · **Asılılıq:** 103 · **Status:** [ ]

## Məqsəd
Hər slotda bir geyinilmiş əşya.

## Niyə
Sayt: "Надето ✓" (hər slotda biri), alışdan sonra "Надеть".

## Cədvəl
**`user_equipment`**
| Sütun | Tip |
|---|---|
| user_id | uuid FK |
| slot | enum (102-dəki ilə eyni) |
| item_id | uuid FK |
| tenant_id | uuid |
| updated_at | timestamptz |

PK (`user_id`, `slot`). Slot başına bir əşya, DB səviyyəsində.

## Endpoint
`PUT /me/equipment/{slot}` → `{ item_id }`.

## Necə edəcəksən
1. Əşya istifadəçiyə məxsusdur (və ya default-dur)?
2. Əşyanın slotu URL-dəki slotla eynidir? (Papağı "fon" slotuna geyinmək olmaz.)
3. Upsert (`ON CONFLICT (user_id, slot) DO UPDATE`).
4. Geyinilmiş əşya yoxdursa (sətir yoxdur) → default göstərilir.
5. "Çıxarmaq" = default-u geyinmək. Ayrıca DELETE lazım deyil.

## Qəbul meyarları
- [ ] Sahib olmadığı əşyanı geyinmək → 403/404.
- [ ] Yanlış slot → 400.
- [ ] Hər slotda həmişə dəqiq bir əşya göstərilir.
