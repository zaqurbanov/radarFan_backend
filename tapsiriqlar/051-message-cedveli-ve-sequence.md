# 051 — Message cədvəli və server sequence-i

**Faza:** 4 · **Asılılıq:** 050 · **Status:** [ ]

## Məqsəd
Mesajlar sıralanmış, dublikatsız, tenant-a bağlı saxlansın.

## Niyə
- Sənəd (bölmə 4): "Mesajlar server sequence-i ilə sıralanır."
- Bölmə 7: Message — id, room_id, user_id, text, sequence, client_message_id, status, created_at; "otağın sequence-i və istifadəçinin göndərmə ID-si unikaldır".
- **Niyə `created_at` ilə sıralamaq olmaz?** Eyni millisaniyədə iki mesaj; bir neçə serverin saatları fərqli; sequence boşluğu (itmiş mesaj) aşkar etmək üçün ardıcıl ədəd lazımdır.

## Cədvəl
**`messages`**
| Sütun | Tip | Qeyd |
|---|---|---|
| id | uuid PK | |
| tenant_id | uuid NOT NULL | sənəd: "Hər predmet məlumatı cədvəlində tenant_id" |
| room_id | uuid FK NOT NULL | |
| user_id | uuid FK NOT NULL | |
| sequence | bigint NOT NULL | otaq daxilində 1, 2, 3... |
| client_message_id | uuid NOT NULL | müştərinin yaratdığı |
| text | varchar(1000) NOT NULL | 240 code point = 960 bayta qədər (emoji 4 bayt) |
| status | enum(`visible`, `hidden_by_moderator`, `deleted`) | |
| is_demo | boolean default false | demo bot mesajları (070) |
| like_count | int default 0 | denormalizasiya (059) |
| created_at | timestamptz | |
| hidden_at, hidden_by | NULL | moderasiya (067) |

UNIQUE (`room_id`, `sequence`), UNIQUE (`user_id`, `client_message_id`).
Index (`tenant_id`, `room_id`, `sequence DESC`). Sənəd bunu tələb edir.

**Ad (nickname) saxlanmır.** Yalnız `user_id`. Ad dəyişəndə (024) köhnə mesajlarda yeni ad görünür.

## Sequence necə yaradılır? (ən vacib dizayn sualı)
| Variant | Mənfi tərəf |
|---|---|
| `MAX(sequence)+1` | İki paralel insert eyni ədədi alır → unique xətası |
| Postgres SEQUENCE otaq başına | 1 000 otaq = 1 000 DB obyekti |
| Redis INCR | Redis və DB uyğunsuzlaşa bilər (rollback-da boşluq) |
| **`UPDATE rooms SET last_sequence = last_sequence + 1 ... RETURNING last_sequence`** eyni tranzaksiyada | Otaq sətri qısa müddət kilidlənir; saniyədə 50 mesaj üçün problem deyil |

Tövsiyə: sonuncu. Niyə işləyir? `UPDATE` sətir kilidi götürür, ikinci tranzaksiya birincinin commit-ini gözləyir. Bu, "row-level lock serialization" adlanır.

**Boşluq məsələsi:** tranzaksiya rollback olsa, `last_sequence` də geri qayıdır (eyni tranzaksiyadadır), boşluq olmur. Redis variantında isə olardı.

## Qəbul meyarları
- [ ] 100 paralel mesaj göndərildikdə sequence-lər 1..100, boşluqsuz və dublikatsızdır (test).
