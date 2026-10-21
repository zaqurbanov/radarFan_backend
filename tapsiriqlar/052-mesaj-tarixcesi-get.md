# 052 — Mesajları oxumaq: `GET /rooms/{id}/messages`

**Status:** [ ] · **Faza:** 4 · **Əvvəl bitməli:** 051

## Qısaca
Otağa girəndə son 50 mesaj gəlsin, yuxarı sürüşdürəndə köhnələr.

## Parametrlər
| Parametr | İzah |
|---|---|
| `limit` | default 50, maks. 50 |
| `before_sequence` | köhnə mesajlar üçün: "bu nömrədən əvvəlkilər" |
| `after_sequence` | yenidən qoşulanda: "bu nömrədən sonrakılar" (task 056) |

## Hər mesajda
id, nömrə, müəllif (id, ad, baş hərflər, demo-dur?), mətn, status, like sayı, mən like etmişəm?, mən gizlətmişəm?, vaxt.

## Nə edəcəksən
1. Burada cursor sadədir: sıra nömrəsi özü unikal və ardıcıldır.
2. **Moderatorun gizlətdiyi mesajlar siyahıda qalır**, amma mətni **boş** gəlir və "Mesaj moderator tərəfindən gizlədilib" etiketi olur. Niyə siyahıdan atmırıq? Nömrədə boşluq yaranmasın deyə.
3. Müəlliflərin adları üçün `JOIN` et (N+1 olmasın!).

## Diqqət: gizli mətni serverdə gizlət
Gizlədilmiş mesajın mətnini cavaba qoyub frontend-ə "göstərmə" demək **olmaz**. Hər kəs brauzerin DevTools-unda onu görər.

## Hazır olduğunu necə yoxlayarsan
- [ ] Moderatorun gizlətdiyi mesajın mətni cavabda yoxdur.
- [ ] Bütün səhifələri birləşdirəndə boşluq və dublikat yoxdur.
