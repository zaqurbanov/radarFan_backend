# 096 — "Найди пару": backend lazımdırmı?

**Status:** [ ] · **Faza:** 7 · **Əvvəl bitməli:** 119 (analitika)

## Qısaca
Bu oyun üçün backend-in nə edəcəyinə (və nə **etməyəcəyinə**) qərar ver.

## Saytda
"Открой две карточки с одинаковым символом", 8 kart, "**Тренировка без наград и ставок**".
Mükafat yoxdur, rəqib yoxdur, nəticə heç yerə yazılmır. Bu, **tamamilə frontend oyunudur**.

## Bu task-ın dərsi
**Hər şeyə backend lazım deyil.** Lazımsız backend = lazımsız baza, test, təhlükəsizlik problemi.

## Backend-in edəcəyi (minimal)
1. Oyunu açıb-söndürmək: tenant ayarında `find_pair: true/false` (021).
2. Analitika: "oyun başladı / bitdi, neçə hərəkət" (119). Məhsul komandası oyunun oynanıb-oynanmadığını bilmək istəyəcək.

## Fikirləş
Sabah bu oyuna **mükafat** əlavə olunsa, nə dəyişməlidir? (İpucu: frontend "1 hərəkətdə qazandım" yaza bilər. Viktorinada nəyi serverdə yoxlayırdıq?) Öz sözlərinlə qısa yaz.

## Hazır olduğunu necə yoxlayarsan
- [ ] Oyunun açıq/bağlı bayrağı ayardadır.
- [ ] Analitika hadisəsi qəbul olunur.
- [ ] "Mükafat əlavə olunsa" sualına cavabın yazılıb.
