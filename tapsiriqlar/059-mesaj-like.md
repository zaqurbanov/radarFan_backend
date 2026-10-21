# 059 — Mesajı bəyənmək (♡)

**Status:** [ ] · **Faza:** 4 · **Əvvəl bitməli:** 051

## Qısaca
İstifadəçi mesajı bəyənə və bəyənməni geri ala bilsin.

## Qeyd
Sənəd deyir: "MVP-də reaksiyalar yoxdur". Sayt isə ♡ göstərir. Sayt əsas versiya olduğu üçün edirik. Məhsul sahibinə qeyd et.

## Yeni cədvəl: `message_likes`
| Sütun | İzah |
|---|---|
| tenant_id | |
| message_id | |
| user_id | |
| created_at | |

Əsas açar (`message_id`, `user_id`): bir adam bir mesajı bir dəfə bəyənir.
`messages.like_count`: tez göstərmək üçün sayğac.

## Endpoint-lər
| Metod | Yol | Cavab |
|---|---|---|
| PUT | /messages/{id}/like | `{ liked: true, like_count }` |
| DELETE | /messages/{id}/like | `{ liked: false, like_count }` |

## Diqqət: sayğacı düzgün artır
`like_count + 1`-i **yalnız** like həqiqətən yazılıbsa et. Yoxsa təkrar PUT sayğacı artırır.

## Nə edəcəksən
1. Idempotent et (037-dəki kimi).
2. Like dəyişəndə hamıya bildiriş: `room.message.liked`. Populyar mesajda saniyədə 100 like ola bilər → seyrəlt.
3. Qərar ver: öz mesajını bəyənmək olar? Gizlədilmiş mesajı?

## Hazır olduğunu necə yoxlayarsan
- [ ] Eyni adam iki dəfə like → sayğac 1.
- [ ] 50 fərqli adam eyni anda like → sayğac 50.
