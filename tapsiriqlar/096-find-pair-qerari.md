# 096 — "Найди пару": server tərəfi lazımdırmı?

**Faza:** 7 · Digər oyunlar · **Asılılıq:** 119 (analitika) · **Status:** [ ]

## Məqsəd
"Найди пару" mini-oyunu üçün backend-in nə edəcəyinə (və nə etməyəcəyinə) qərar vermək.

## Niyə
Sayt: "Открой две карточки с одинаковым символом. · 0 ходов", 8 kart, "**Тренировка без наград и ставок.**" Oyunlar siyahısında: "Одиночная тренировка".

Mükafat yoxdur, rəqib yoxdur, nəticə heç yerə yazılmır. Bu, **tamamilə frontend oyunudur**.

## Mentor sualı
Səndən yeni cədvəl və endpoint yaratmağı gözləmirəm. Bu task-ın dərsi: **hər şeyə backend lazım deyil**. Lazımsız backend = lazımsız saxlama, test, təhlükəsizlik səthi.

Backend-in edə biləcəyi minimal şeylər:
1. Oyunun aktiv olub-olmaması: `TenantConfig.enabled_features.find_pair` (021).
2. Analitika: `game_started`/`game_completed` { game: "find_pair", moves, duration } (119). Məhsul komandası oyunun istifadə olunub-olunmadığını bilmək istəyəcək.
3. Gələcəkdə mükafat əlavə olunsa → onda server tərəfi lazımdır (nəticə serverdə yoxlanmalıdır, çünki müştəri "1 hərəkətdə qazandım" yaza bilər). Bu, Quiz Battle-dakı kimi server-authoritative dizayn tələb edir.

## Qəbul meyarları
- [ ] Feature flag config-dədir.
- [ ] Analitika hadisəsi qəbul olunur (119-dan sonra).
- [ ] "Mükafat əlavə olunsa nə dəyişməlidir" barədə qısa qeyd yazılıb (sənin sözlərinlə).
