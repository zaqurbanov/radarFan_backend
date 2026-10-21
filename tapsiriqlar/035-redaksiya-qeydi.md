# 035 — Redaksiya qeydi

**Status:** [ ] · **Faza:** 2 · **Əvvəl bitməli:** 027

## Qısaca
Matç kartındakı qısa redaktor yazısı: "Какая передача перед вторым голом! 🔥".

## Problem
İndi bu, `events.editorial_note` sütunundadır. Amma `events` cədvəlini **mənbə** (feed) yeniləyir. Feed upsert edəndə admin-in yazdığı qeydi təsadüfən silə bilər.

## Həll: ayrı cədvəl
Mənbənin məlumatı ilə redaktorun məlumatı ayrı yaşasın.

### `event_editorials`
| Sütun | İzah |
|---|---|
| event_id | matç |
| tenant_id | |
| note | qeyd (maks. 140 simvol) |
| author_id | yazan admin |
| locale | dil |
| updated_at | |

## Nə edəcəksən
1. Cədvəli yarat.
2. Köhnə `editorial_note` məlumatını yeni cədvələ köçür, sonra köhnə sütunu sil (migration).
3. Lentdə `LEFT JOIN` ilə götür.
4. Admin endpoint-i task 117-dədir. İndi yalnız seed və oxuma.

## Hazır olduğunu necə yoxlayarsan
- [ ] Feed matçı yeniləyəndə redaksiya qeydi silinmir (test).
