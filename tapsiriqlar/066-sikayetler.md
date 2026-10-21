# 066 — Şikayətlər

**Status:** [ ] · **Faza:** 4 · **Əvvəl bitməli:** 051

## Qısaca
İstifadəçi pis mesaj haqqında moderatora şikayət etsin.

## Qeyd
Saytda şikayət düyməsi **görünmür**, amma sənəddə var. Frontend-ə əlavə olunmalıdır. Məhsul sahibinə de.

## Qaydalar (sənəddən)
- Səbəblər: `spam`, `abuse` (təhqir), `other`.
- Şikayətlər yalnız tenant daxilində görünür.
- Adi istifadəçilər **kimin** şikayət etdiyini görmür.

## Endpoint
`POST /messages/{id}/reports` → `{ reason, detail? }` → `{ report_id, accepted }`.

## Yeni cədvəl: `message_reports`
| Sütun | İzah |
|---|---|
| id, tenant_id, message_id | |
| reporter_id | kim şikayət etdi |
| reason | `spam` / `abuse` / `other` |
| detail | əlavə izah (istəyə bağlı) |
| status | `open` / `resolved` / `dismissed` |
| resolved_by, resolved_at | |
| created_at | |

- Unique (`message_id`, `reporter_id`): bir adam bir mesaja bir dəfə.
- Index (`tenant_id`, `status`, `created_at`): moderator siyahısı üçün.

## Nə edəcəksən
1. Öz mesajına şikayət → rədd et.
2. Təkrar şikayət → mövcud `report_id`-ni qaytar.
3. Şikayət spam-ı: saatda maksimum say.
4. Moderatora real vaxtda bildiriş: `moderation:{tenant}` kanalı.

## Hazır olduğunu necə yoxlayarsan
- [ ] Şikayət yaranır, eyni adamdan təkrar dublikat yaratmır.
- [ ] Adi istifadəçi heç bir yerdə şikayət edəni görə bilmir.
