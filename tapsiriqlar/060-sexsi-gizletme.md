# 060 — "Скрыть / Вернуть": yalnız özün üçün gizlətmək

**Status:** [ ] · **Faza:** 4 · **Əvvəl bitməli:** 051

## Qısaca
İstifadəçi istəmədiyi mesajı **yalnız özü üçün** gizlədir və geri qaytara bilir.

## Saytda
Hər mesajda "Скрыть". Basanda: "Сообщение скрыто **Вернуть**".

## Bu, moderasiya DEYİL
| | Şəxsi gizlətmə (bu task) | Moderasiya (067) |
|---|---|---|
| Kim edə bilər | Hər istifadəçi | Yalnız moderator |
| Kimə təsir edir | Yalnız özünə | Hamıya |
| Geri qaytarmaq | Bəli ("Вернуть") | Yalnız moderator |

Bunu qarışdırsan, hər istifadəçi **hamı üçün** mesaj silə bilər.

## Yeni cədvəl: `message_user_hides`
| Sütun | İzah |
|---|---|
| tenant_id | |
| user_id | kim gizlətdi |
| message_id | hansı mesaj |
| created_at | |

Əsas açar (`user_id`, `message_id`).

## Endpoint-lər
| Metod | Yol |
|---|---|
| PUT | /messages/{id}/hide-for-me |
| DELETE | /messages/{id}/hide-for-me |

## Nə edəcəksən
`GET messages` (052) hər mesajda `hidden_for_me` qaytarsın. Mətni də qaytar ("Вернуть" basanda göstərmək üçün). Bu, istifadəçinin öz seçimidir, təhlükəsizlik problemi yoxdur.

## Hazır olduğunu necə yoxlayarsan
- [ ] A-nın gizlətdiyi mesajı B görür.
- [ ] A "Вернуть" basandan sonra mesaj yenidən görünür.
