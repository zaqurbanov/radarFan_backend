# 069 — Moderator paneli: şikayətlər və jurnal

**Status:** [ ] · **Faza:** 4 · **Əvvəl bitməli:** 066, 067, 068

## Qısaca
Moderator üçün şikayət siyahısı və **dəyişdirilə bilməyən** əməliyyat jurnalı.

## Endpoint-lər
| Metod | Yol | Nə üçün |
|---|---|---|
| GET | /moderation/reports | şikayət siyahısı (mətn, müəllif, şikayət sayı) |
| POST | /moderation/reports/{id}/dismiss | şikayəti rədd et |
| GET | /moderation/actions | jurnal |
| GET | /moderation/users/{id} | istifadəçinin son mesajları və məhdudiyyət tarixçəsi |

## Yeni cədvəl: `moderation_actions`
| Sütun | İzah |
|---|---|
| id | jurnal ID-si |
| tenant_id | |
| actor_id | hansı moderator |
| action | `hide_message`, `unhide_message`, `mute_user`, `unmute_user`, `dismiss_report`, `resolve_report` |
| target_type | `message` / `user` / `report` |
| target_id | |
| reason | səbəb (**məcburi**) |
| metadata | əlavə (məs. susdurma müddəti) |
| created_at | |

## "Dəyişdirilə bilməz" necə təmin olunur?
Kodda UPDATE yazmamaq **kifayət deyil** (sabah kimsə yazar). Bazanın özü bloklamalıdır:
- Postgres trigger: UPDATE və DELETE-i qadağan edir;
- və ya DB istifadəçisinə bu cədvəldə yalnız INSERT və SELECT icazəsi.

Ən azı birini et.

## Nə edəcəksən
Şikayətləri mesaj üzrə qruplaşdır: bir mesaja 10 şikayət = bir sətir "10 şikayət".

## Hazır olduğunu necə yoxlayarsan
- [ ] Jurnal sətrini UPDATE etmək DB xətası verir.
- [ ] Moderator yalnız öz tenant-ının şikayətlərini görür.
