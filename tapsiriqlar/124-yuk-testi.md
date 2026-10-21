# 124 — Yük testi

**Status:** [ ] · **Faza:** 12 · **Əvvəl bitməli:** 123

## Qısaca
Sistemin hədəf yükü daşıdığını **ölç**.

## Hədəflər (sənəddən)
**Yük:** bir bukmekerdə 1000 eyni anda istifadəçi, 100 aktiv otaq, saniyədə 50 mesaj.

**Sürət:**
| Nə | Hədəf (p95) |
|---|---|
| REST sorğusu | ≤ 500 ms |
| Mesajın çatması | ≤ 1 saniyə |
| Hesab/əmsal yenilənməsi | ≤ 2 saniyə |

(p95 = sorğuların 95%-i bu vaxtdan sürətlidir.)

## Nə edəcəksən
1. Alət: **k6** (JavaScript ilə ssenari yazılır, WebSocket dəstəkləyir).
2. Ssenarilər:
   - 1000 virtual istifadəçi: giriş → `/me` → `/events` (15 saniyədə bir) → otağa qoşulma;
   - 100 otaqda saniyədə cəmi 50 mesaj;
   - mesajın çatma vaxtı: göndərən vaxtı yazır, alan müqayisə edir;
   - 200 eyni anda duel.
3. Production-a bənzər mühitdə et (laptop real nəticə vermir).
4. Darboğazları tap: DB bağlantı sayı, N+1, Redis, outbox gecikməsi.
5. Nəticələri yaz: hansı yükdə nə sındı, nəyi düzəltdin.

## Hazır olduğunu necə yoxlayarsan
- [ ] Hədəf yükdə üç sürət hədəfi ödənir (hesabat).
- [ ] Hesabatda ən azı bir tapılmış və düzəldilmiş darboğaz var.
