# 064 — Sorğunun bağlanması

**Status:** [ ] · **Faza:** 4 · **Əvvəl bitməli:** 062, 049

## Qısaca
Sorğu vaxtında bağlansın, sonra səs qəbul etməsin.

## Nə vaxt bağlanır (sənəddən)
- Matç bitəndə;
- matç ləğv olunanda;
- `closes_at` vaxtı çatanda.

## Nə edəcəksən
1. Üç hal **eyni** funksiyanı çağırsın: `sorğunu_bağla(id, səbəb)`. Artıq bağlıdırsa → heç nə etmə.
2. Səs vermə (062) həm statusu, **həm də** `closes_at`-ı yoxlasın. Fon işi gecikə bilər, buna arxalanma.
3. Bağlananda hamıya bildiriş.
4. Qərar ver: bağlanandan sonra nəticələri **hamı** görsünmü (səs verməyənlər də)?
5. Matç təxirə salınsa → sorğu açıq qalır? `closes_at` dəyişir?

## Hazır olduğunu necə yoxlayarsan
- [ ] Matç bitəndə sorğu bağlanır, bildiriş gedir.
- [ ] `closes_at`-dan sonra səs → 409, fon işi hələ işləməsə belə.
