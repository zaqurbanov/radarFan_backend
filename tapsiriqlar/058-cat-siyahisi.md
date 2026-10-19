# 058 — Çat siyahısı ("Чаты матчей")

**Faza:** 4 · **Asılılıq:** 050, 053, 046 · **Status:** [ ]

## Məqsəd
"Комьюнити" ana ekranındakı otaqlar siyahısı: matç, dövr, iştirakçı sayı, son mesaj.

## Niyə
Sayt ("Комьюнити" → "Чаты матчей"):
- "Реал Мадрид — Барселона · 67′ · Футбол · 1 284 участников · демо · Барса ещё может отыграться. Жду замену."
Sənəddə ayrıca endpoint yoxdur, amma sayt bunu tələb edir.

## Endpoint
`GET /rooms?cursor&limit` → `items[]`: room_id, event (qısa: komandalar, dövr, sport, status), active_users, last_message { nickname, text (gizlədilibsə etiket), created_at }, unread? (lazımdırmı?).

## Necə edəcəksən
1. Son mesajı hər otaq üçün `ORDER BY sequence DESC LIMIT 1` ilə almaq = N+1. Variantlar:
   - `rooms.last_message_id` denormalizasiyası (mesaj insert zamanı yenilənir, 050-də sütun var);
   - `DISTINCT ON (room_id)` sorğusu;
   - `LATERAL JOIN`.
   Hamısını öyrən. Tövsiyə: denormalizasiya (siyahı tez-tez oxunur).
2. Moderator son mesajı gizlədəndə `last_message` də etiketə çevrilməlidir.
3. Sıralama: lentlə eyni qayda (032)? Yoxsa son aktivliyə görə? Saytda lentlə eyni sıradadır.

## Qəbul meyarları
- [ ] Siyahı ≤ 3 sorğu ilə qayıdır.
- [ ] Yeni mesajdan sonra siyahıda son mesaj yenilənir.
