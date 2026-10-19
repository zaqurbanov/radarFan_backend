# 066 — Şikayətlər: `POST /messages/{id}/reports`

**Faza:** 4 · **Asılılıq:** 051 · **Status:** [ ]

## Məqsəd
İstifadəçi pis mesaj haqqında moderatora şikayət etsin.

## Niyə
Sənəd (bölmə 4, Moderasiya): "İstifadəçi message haqqında spam, abuse və ya other səbəbi ilə şikayət edə bilər... Şikayətlər yalnız tenant daxilində əlçatandır; adi iştirakçılar şikayət müəlliflərini görmürlər."
Bölmə 8: → `reason, detail optional` → `report_id, accepted`.

**Qeyd:** saytda şikayət düyməsi görünmür (yalnız şəxsi "Скрыть"). Sənəddə isə var. Frontend-ə əlavə olunmalıdır, məhsul sahibinə bildir.

## Cədvəl
**`message_reports`**
| Sütun | Tip | Qeyd |
|---|---|---|
| id | uuid PK | |
| tenant_id | uuid | |
| message_id | uuid FK | |
| reporter_id | uuid FK → users | |
| reason | enum(`spam`, `abuse`, `other`) | |
| detail | varchar(500) NULL | |
| status | enum(`open`, `resolved`, `dismissed`) | |
| resolved_by | uuid NULL | |
| resolved_at | timestamptz NULL | |
| created_at | timestamptz | |

UNIQUE (`message_id`, `reporter_id`). Eyni şəxs eyni mesaja bir dəfə.
Index (`tenant_id`, `status`, `created_at`). Moderator siyahısı üçün.

## Necə edəcəksən
1. Öz mesajına şikayət? Rədd et.
2. Təkrar şikayət → idempotent, mövcud `report_id`.
3. Şikayət spam-ı: bir istifadəçi saatda 100 şikayət? Rate limit.
4. Avtomatik qayda (istəyə bağlı): N fərqli istifadəçidən şikayət gəlsə, mesaj avtomatik gizlədilsin? Sənəddə yoxdur, MVP üçün etmə, qeyd et.
5. Moderatora real vaxt bildirişi: `moderation:{tenant}` kanalı.

## Qəbul meyarları
- [ ] Şikayət yaradılır, eyni şəxsdən təkrar dublikat yaratmır.
- [ ] Adi istifadəçi heç bir API-dən reporter-i görə bilmir.
