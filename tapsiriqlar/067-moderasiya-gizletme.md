# 067 — Moderasiya: mesajın gizlədilməsi

**Faza:** 4 · **Asılılıq:** 066, 017 · **Status:** [ ]

## Məqsəd
Moderator mesajı **hamı üçün** gizlədir.

## Niyə
Sənəd (bölmə 4): "Moderator mesajı gizlədə ... bilər; əməliyyatlar səbəblə birlikdə jurnala yazılır. Gizlədilmiş mətn bütün müştərilərdə «Mesaj moderator tərəfindən gizlədilib» etiketi ilə əvəz edilir."
Bölmə 8: `POST /moderation/messages/{id}/hide` → reason → mesaj statusu və audit_id.
Bölmə 9: `room.message.hidden` → message_id, moderation_label.
Bölmə 11: "Moderasiya bütün qoşulmuş iştirakçılarda əks olunur".

## Necə edəcəksən (tranzaksiya)
1. `requireRole('moderator')` + mesaj eyni tenant-da.
2. `messages.status = hidden_by_moderator`, `hidden_at`, `hidden_by`.
3. `moderation_actions`-a yaz (069).
4. Bu mesaja aid açıq şikayətləri `resolved` et.
5. Outbox: `room.message.hidden`.
6. Commit.
7. Geri qaytarmaq (unhide)? Sənəd demir. Səhv gizlətmə olur, ona görə `unhide` əlavə et (jurnala yazılır).
8. Mətni DB-də silirsən, yoxsa saxlayırsan? Saxla (sübut, audit), amma API-də heç vaxt qaytarma (moderator paneli istisna).

## Qəbul meyarları
- [ ] Gizlətmədən sonra bütün qoşulmuş müştərilər hadisəni alır.
- [ ] `GET messages` gizlədilmiş mesajın mətnini qaytarmır.
- [ ] Jurnalda qeyd var.
