# 067 — Moderator mesajı hamı üçün gizlədir

**Status:** [ ] · **Faza:** 4 · **Əvvəl bitməli:** 066, 017

## Qısaca
Moderator pis mesajı **hamı üçün** gizlədir.

## Qaydalar (sənəddən)
- Gizlədilmiş mesajın yerində hamı görür: "Mesaj moderator tərəfindən gizlədilib".
- Hər əməliyyat səbəblə birlikdə jurnala yazılır.
- Dəyişiklik bütün qoşulmuş istifadəçilərə dərhal çatır.

## Endpoint
`POST /moderation/messages/{id}/hide` → `{ reason }` → mesaj statusu + jurnal ID-si.

## Addımlar (bir tranzaksiyada)
1. İstifadəçi moderatordur + mesaj eyni tenant-dadır?
2. Mesajın statusunu `hidden_by_moderator` et, kim və nə vaxt gizlətdi yaz.
3. Jurnala yaz (069).
4. Bu mesaja aid açıq şikayətləri `resolved` et.
5. Outbox: `room.message.hidden`.

## Nə edəcəksən
1. Səhvən gizlətmə olur. Geri qaytarma (`unhide`) əlavə et, o da jurnala yazılsın.
2. Mətni bazadan **silmə** (sübut lazımdır). Amma API-də heç vaxt qaytarma (moderator paneli istisna).

## Hazır olduğunu necə yoxlayarsan
- [ ] Gizlətmədən sonra bütün qoşulmuş müştərilər bildiriş alır.
- [ ] `GET messages` gizli mesajın mətnini qaytarmır.
- [ ] Jurnalda qeyd var.
