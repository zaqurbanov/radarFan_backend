# 068 — Moderasiya: göndərmənin müvəqqəti qadağası (mute)

**Faza:** 4 · **Asılılıq:** 018, 067 · **Status:** [ ]

## Məqsəd
Moderator istifadəçinin yazmasını müəyyən müddətə bağlasın.

## Niyə
Sənəd (bölmə 4): "göndərməni müvəqqəti qadağan edə bilər". Bölmə 8: `POST /moderation/users/{id}/mute` → reason, expires_at → göndərmə məhdudiyyəti və audit_id.

## Cədvəl
**`user_restrictions`** (018-dəki `muted_until`-un genişlənmiş forması)
| Sütun | Tip |
|---|---|
| id | uuid PK |
| tenant_id | uuid |
| user_id | uuid FK |
| type | enum(`mute`, `ban`) |
| reason | varchar(500) |
| created_by | uuid FK (moderator) |
| starts_at | timestamptz |
| expires_at | timestamptz NULL (ban üçün NULL = daimi) |
| revoked_at, revoked_by | NULL |

Aktiv məhdudiyyət: `revoked_at IS NULL AND starts_at <= now() AND (expires_at IS NULL OR expires_at > now())`.

018-dəki `users.muted_until` saxlanmalıdırmı? Sürət üçün denormalizasiya kimi saxlaya bilərsən. Yoxsa hər yoxlama bu cədvəldən. Qərar ver.

## Necə edəcəksən
1. Moderator özünü və ya başqa moderatoru/admini mute edə bilərmi? Qaydalar.
2. Maksimum müddət (məs. 30 gün).
3. Mute olunan istifadəçiyə `user:{id}` kanalı ilə bildiriş: "Вы не можете писать до ...".
4. Unmute endpoint-i.

## Qəbul meyarları
- [ ] Mute olunan istifadəçi mesaj göndərəndə 403 `USER_RESTRICTED` + `details.until`.
- [ ] Müddət bitəndə avtomatik yaza bilir.
- [ ] Jurnalda qeyd var.
