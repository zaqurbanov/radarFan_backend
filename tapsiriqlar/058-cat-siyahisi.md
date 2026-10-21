# 058 — Çatlar siyahısı

**Status:** [ ] · **Faza:** 4 · **Əvvəl bitməli:** 050, 053, 046

## Qısaca
"Комьюнити" ekranındakı otaqlar siyahısı: matç, dəqiqə, iştirakçı sayı, son mesaj.

## Saytda
"Реал Мадрид — Барселона · 67′ · Футбол · 1 284 участников · демо · Барса ещё может отыграться."

Sənəddə bu endpoint yoxdur, sayt tələb edir.

## Endpoint
`GET /rooms` → hər otaq: otaq ID, matç (komandalar, dəqiqə, idman, status), onlayn say, son mesaj (ad, mətn, vaxt).

## Nə edəcəksən
1. Hər otağın son mesajını ayrı sorğu ilə almaq = N+1. Variantlar:
   - `rooms.last_message_id`: mesaj yazılanda yenilə (tövsiyə, siyahı tez-tez oxunur);
   - `DISTINCT ON`;
   - `LATERAL JOIN`.
2. Moderator son mesajı gizlədəndə siyahıda da etiket görünsün.
3. Sıralama lentlə eyni olsun (032).

## Hazır olduğunu necə yoxlayarsan
- [ ] Siyahı ≤ 3 sorğu ilə yüklənir.
- [ ] Yeni mesajdan sonra siyahıda son mesaj yenilənir.
