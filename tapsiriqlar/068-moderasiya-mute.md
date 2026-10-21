# 068 — Moderator istifadəçini susdurur

**Status:** [ ] · **Faza:** 4 · **Əvvəl bitməli:** 018, 067

## Qısaca
Moderator istifadəçinin yazmasını müəyyən müddətə bağlasın.

## Endpoint
`POST /moderation/users/{id}/mute` → `{ reason, expires_at }`.

## Yeni cədvəl: `user_restrictions`
018-dəki `muted_until`-un genişləndirilmiş forması, tarixçə ilə.
| Sütun | İzah |
|---|---|
| id, tenant_id, user_id | |
| type | `mute` / `ban` |
| reason | səbəb |
| created_by | hansı moderator |
| starts_at | |
| expires_at | boşdursa = daimi (ban üçün) |
| revoked_at, revoked_by | vaxtından əvvəl ləğv |

Aktivdir = ləğv olunmayıb + başlayıb + (bitmə vaxtı yoxdur **və ya** hələ çatmayıb).

## Nə edəcəksən
1. Qaydalar: moderator özünü, başqa moderatoru və ya admini susdura bilərmi?
2. Maksimum müddət (məs. 30 gün).
3. Susdurulan istifadəçiyə bildiriş (`user:` kanalı).
4. Ləğv etmə (unmute) endpoint-i.
5. Qərar ver: 018-dəki `users.muted_until`-u saxla (sürət üçün), yoxsa hər dəfə bu cədvəldən oxu?

## Hazır olduğunu necə yoxlayarsan
- [ ] Susdurulmuş istifadəçi yazanda 403 + bitmə vaxtı.
- [ ] Vaxt bitəndə avtomatik yaza bilir.
- [ ] Jurnalda qeyd var.
