# 031 — Lent səhifələməsi (cursor)

**Status:** [ ] · **Faza:** 2 · **Əvvəl bitməli:** 030, 032

## Qısaca
`next_cursor` real olsun. Növbəti səhifədə nə dublikat, nə də buraxılmış matç olsun.

## Niyə "səhifə 2" (offset) pisdir?
Lent canlıdır, sıra dəyişir. Sən 1-ci səhifəni oxuyarkən yeni matç başladı və siyahının yuxarısına çıxdı. "20-dən sonrakıları ver" desən, bir matç **iki dəfə** görünəcək (və ya biri itəcək).

**Cursor:** "**bu konkret matçdan sonrakıları** ver". Sıra dəyişsə də düzgün işləyir.

## Nə edəcəksən
1. Cursor = son matçın **sıralama dəyərləri** (məsələn: status, başlama vaxtı, id). Base64 ilə kodla ki, frontend üçün "qara qutu" olsun.
2. Sorğu: "bu dəyərlərdən **sonra** gələnlər".
3. **`limit + 1` hiyləsi:** bir artıq götür. Gəldisə, növbəti səhifə var, artıq olanı at.
4. **Sonda unikal sütun (`id`) mütləq olmalıdır.** Yoxsa eyni vaxtda başlayan matçlar arasında sıra təsadüfi olur və cursor qırılır.
5. Filtr (`sport`) dəyişəndə köhnə cursor etibarsızdır. Sənəd: "Filtr dəyişəndə ilk karta qayıdır".
6. Saxta cursor → 400.

## Hazır olduğunu necə yoxlayarsan
- [ ] 45 matç, limit 20 → 20 + 20 + 5, sonda `next_cursor: null`.
- [ ] Bütün səhifələri birləşdirəndə dublikat yoxdur (test).
- [ ] Saxta cursor → 400.

## Öyrən
"Keyset pagination" (use-the-index-luke.com saytında yaxşı izah var).
