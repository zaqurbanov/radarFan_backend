# 116 — Admin: viktorina sualları

**Status:** [ ] · **Faza:** 10 · **Əvvəl bitməli:** 072

## Qısaca
Admin sualları yaratsın, düzəltsin, söndürsün.

## Endpoint-lər
| Metod | Yol | Qeyd |
|---|---|---|
| GET | /admin/questions | düzgün cavablar **görünür** (yalnız admin) |
| POST | /admin/questions | yeni sual (versiya 1) |
| PUT | /admin/questions/{id} | **yeni versiya** yaradır, köhnəyə toxunmur |
| POST | /admin/questions/{id}/retire | söndür |

## Nə edəcəksən
1. Yoxlama: dəqiq 4 variant, mətnlər fərqli, düzgün cavab variantlardan biridir, izah boş deyil.
2. Düzəliş həmişə **yeni versiyadır**.
3. Aktiv sual sayı 3-dən az olarsa, duel başlaya bilmir. Admin son sualları söndürəndə xəbərdarlıq et.
4. Toplu yükləmə (CSV/JSON) faydalı olar, istəyə bağlı.

## Hazır olduğunu necə yoxlayarsan
- [ ] Sualı düzəltmək köhnə duellərə təsir etmir.
- [ ] User və moderator 403 alır.
