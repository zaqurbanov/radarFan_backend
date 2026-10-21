# 038 — Matç mənbəyi dayananda

**Status:** [ ] · **Faza:** 2 · **Əvvəl bitməli:** 025, 029

## Qısaca
Mənbə işləmirsə: köhnə məlumatı "canlı" kimi göstərmə, bukmekerə keçidi bağla. Amma lent və çat **işləməyə davam etsin**.

## Niyə lazımdır?
- Sənəd: 503 `FEED_UNAVAILABLE`.
- Sənəd: xəta göstərilməsi **əvvəl yüklənmiş məzmunu silmir**.
- Mənbə dayandı deyə bütün tətbiqin dayanması pis təcrübədir.

## Davranış
| Endpoint | Mənbə dayananda |
|---|---|
| `GET /events` | Köhnə məlumat + `feed_status: "degraded"`, bütün əmsallar bağlı |
| Bukmekerə keçid | 503 `FEED_UNAVAILABLE` |
| Çat, oyunlar | Normal işləyir |

## Nə edəcəksən
1. Son uğurlu yeniləmənin vaxtını Redis-də saxla.
2. Çoxdan yenilənməyibsə → "degraded" rejim.
3. Mənbə qayıdanda avtomatik normal rejimə keç.
4. "Circuit breaker" anlayışını oxu: mənbə dayananda hər sorğuda ona müraciət etmə.

## Qərar ver
Lent 503 qaytarsın, yoxsa 200 + `feed_status`? Sənəd 503 deyir, amma "köhnə məzmunu silmə" qaydası 200-ü dəstəkləyir. Seç və səbəbini yaz.

## Hazır olduğunu necə yoxlayarsan
- [ ] Demo mənbəni dayandır → 15+ saniyədən sonra əmsallar bağlanır, lent işləyir.
- [ ] Mənbə qayıdanda hər şey özü düzəlir.
