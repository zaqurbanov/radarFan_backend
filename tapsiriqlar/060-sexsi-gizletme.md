# 060 — Şəxsi gizlətmə ("Скрыть" / "Вернуть")

**Faza:** 4 · **Asılılıq:** 051 · **Status:** [ ]

## Məqsəd
İstifadəçi istəmədiyi mesajı **yalnız özü üçün** gizlədə və geri qaytara bilsin.

## Niyə
Sayt: hər mesajda "Скрыть" düyməsi. Basanda mesaj yerinə "Сообщение скрыто **Вернуть**" görünür. Bu, **moderasiya deyil** (moderasiya hamı üçün gizlədir və geri qaytarma düyməsi yoxdur, task 067). Bu, şəxsi "bu mesajı görmək istəmirəm" funksiyasıdır.

Bunu ayırmaq vacibdir: əgər "Скрыть"-i moderasiya kimi etsən, hər istifadəçi hamı üçün mesaj silə bilər.

## Cədvəl
**`message_user_hides`**
| Sütun | Tip |
|---|---|
| tenant_id | uuid |
| user_id | uuid |
| message_id | uuid FK (cascade) |
| created_at | timestamptz |

PK (`user_id`, `message_id`).

## Endpoint
| Metod | Yol |
|---|---|
| PUT | /messages/{id}/hide-for-me |
| DELETE | /messages/{id}/hide-for-me |

## Necə edəcəksən
1. `GET messages` (052) hər mesaj üçün `hidden_for_me: boolean`. Gizlədilibsə, mətni qaytarmaq lazımdırmı? "Вернуть" basanda frontend mətni göstərməlidir. Ya mətn qaytarılır və frontend gizlədir (bu halda təhlükəsizlik problemi yoxdur, çünki istifadəçi öz seçimidir), ya da yenidən sorğu edilir. Sadə yol: mətni qaytar.
2. Bunun şikayətlə (066) əlaqəsi: gizlədəndə "şikayət etmək istəyirsən?" təklifi? Frontend qərarıdır.
3. Gələcək: "bu istifadəçini gizlət" (bütün mesajları). İndi lazım deyil, qeyd et.

## Qəbul meyarları
- [ ] A gizlətdiyi mesaj B üçün görünür qalır.
- [ ] A "Вернуть" basandan sonra mesaj yenidən görünür.
