# 069 — Moderasiya jurnalı və şikayət siyahısı

**Faza:** 4 · **Asılılıq:** 066, 067, 068 · **Status:** [ ]

## Məqsəd
Moderatorlar üçün şikayət siyahısı və dəyişdirilməz əməliyyat jurnalı.

## Niyə
- Sənəd (bölmə 7): ModerationAction — actor_id, target_id, reason, action, created_at; "sonradan dəyişdirilməyən əməliyyat jurnalı".
- Bölmə 8: `GET /moderation/reports` → cursor, status → moderator üçün şikayət siyahısı.
- Bölmə 11 (təhvil): "Moderator üçün şikayətlərə baxış, mesaj gizlətmə və göndərməni bloklama üzrə minimal interfeys lazımdır." Bu, backend-in API hissəsidir.

## Cədvəl
**`moderation_actions`**
| Sütun | Tip |
|---|---|
| id | uuid PK (audit_id) |
| tenant_id | uuid |
| actor_id | uuid FK (moderator) |
| action | enum(`hide_message`, `unhide_message`, `mute_user`, `unmute_user`, `dismiss_report`, `resolve_report`) |
| target_type | enum(`message`, `user`, `report`) |
| target_id | uuid |
| reason | varchar(500) NOT NULL |
| metadata | jsonb (məs. mute müddəti) |
| created_at | timestamptz |

**"Dəyişdirilməz" necə təmin olunur?**
- Kodda UPDATE/DELETE yoxdur (zəif);
- DB rolu: tətbiq istifadəçisinə bu cədvəldə yalnız `INSERT, SELECT` icazəsi (`REVOKE UPDATE, DELETE`);
- Trigger: UPDATE/DELETE-i bloklayır.
Ən azı trigger və ya icazələrlə et.

## Endpoint-lər
| Metod | Yol |
|---|---|
| GET | /moderation/reports?status&cursor (mesaj mətni, müəllif, şikayət sayı ilə) |
| POST | /moderation/reports/{id}/dismiss |
| GET | /moderation/actions?cursor (audit) |
| GET | /moderation/users/{id} (istifadəçinin son mesajları, məhdudiyyət tarixçəsi) |

## Necə edəcəksən
1. Şikayətləri mesaj üzrə qruplaşdır: bir mesaja 10 şikayət = bir sətir, "10 şikayət".
2. Səbəb (`reason`) məcburidir.

## Qəbul meyarları
- [ ] Jurnal sətrini UPDATE etmək cəhdi DB xətası verir.
- [ ] Moderator yalnız öz tenant-ının şikayətlərini görür.
