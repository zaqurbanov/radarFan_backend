# 105 — Əşyanı geyinmək

**Status:** [ ] · **Faza:** 8 · **Əvvəl bitməli:** 103

## Qısaca
Hər kateqoriyada (slotda) **bir** geyinilmiş əşya.

## Saytda
"Надето ✓" (hər slotda biri), alışdan sonra "Надеть".

## Yeni cədvəl: `user_equipment`
| Sütun | İzah |
|---|---|
| user_id, slot | əsas açar: bir slotda bir əşya |
| item_id | |
| tenant_id | |
| updated_at | |

## Endpoint
`PUT /me/equipment/{slot}` → `{ item_id }`.

## Nə edəcəksən
1. Əşya istifadəçinindir (və ya pulsuzdur)? Yoxsa → 403/404.
2. Əşyanın slotu URL-dəki slotla eynidir? (Papağı "fon" slotuna geyinmək olmaz.) Yoxsa → 400.
3. Upsert: (`user_id`, `slot`) üzrə.
4. Slotda heç nə yoxdursa → pulsuz əşya göstərilir.
5. "Çıxarmaq" = pulsuz əşyanı geyinmək. Ayrı DELETE lazım deyil.

## Hazır olduğunu necə yoxlayarsan
- [ ] Sahib olmadığı əşyanı geyinmək → xəta.
- [ ] Yanlış slot → 400.
- [ ] Hər slotda həmişə dəqiq bir əşya göstərilir.
