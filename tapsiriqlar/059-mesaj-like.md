# 059 — Mesaj like (♡)

**Faza:** 4 · **Asılılıq:** 051 · **Status:** [ ]

## Məqsəd
İstifadəçi mesajı bəyənə və bəyənməni geri ala bilsin.

## Niyə
- Sayt: hər mesajın altında "♡".
- **Ziddiyyət:** sənəd (bölmə 4): "MVP-də şəxsi mesajlar, əlavələr, **reaksiyalar** ... yoxdur." Sayt əsas versiyadır, ona görə edirik. Amma məhsul sahibinə qeyd et.

## Cədvəl
**`message_likes`**
| Sütun | Tip |
|---|---|
| tenant_id | uuid |
| message_id | uuid FK → messages (cascade) |
| user_id | uuid FK → users |
| created_at | timestamptz |

PK (`message_id`, `user_id`). Bir istifadəçi bir like.
`messages.like_count` denormalizasiya.

## Endpoint
| Metod | Yol | Cavab |
|---|---|---|
| PUT | /messages/{id}/like | `{ liked: true, like_count }` |
| DELETE | /messages/{id}/like | `{ liked: false, like_count }` |

## Necə edəcəksən
1. Idempotent (037 kimi).
2. `like_count`-u necə yeniləyirsən? `UPDATE ... SET like_count = like_count + 1` yalnız insert **həqiqətən** olubsa. Yoxsa təkrar PUT sayğacı artırır.
3. Real vaxt: `room.message.liked { message_id, like_count }`. Hər like-da broadcast? Populyar mesajda saniyədə 100 like. Throttle/coalesce (047 kimi).
4. Öz mesajını bəyənmək olarmı? Gizlədilmiş mesajı?

## Qəbul meyarları
- [ ] Eyni istifadəçi iki dəfə like → `like_count` 1.
- [ ] 50 paralel like 50 fərqli istifadəçidən → `like_count` 50 (race yoxdur).

## Açıq suallar
- Reaksiyalar sənəddə MVP-dən kənardır. Sayta əsasən daxil edildi.
