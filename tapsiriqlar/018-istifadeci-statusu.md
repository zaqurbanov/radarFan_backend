# 018 — İstifadəçi statusu: aktiv, susdurulmuş, bloklanmış

**Status:** [ ] · **Faza:** 1 · **Əvvəl bitməli:** 016

## Qısaca
- `banned` (bloklanmış) istifadəçi heç nə edə bilməsin.
- `muted` (susdurulmuş) istifadəçi yalnız yaza bilməsin, qalanı işləsin.
- Dəyişiklik **dərhal** təsir etsin.

## Niyə lazımdır?
- Moderator istifadəçini müvəqqəti susdura bilər (sənəd bölmə 4).
- `users.status` sütunu artıq var, amma heç yerdə yoxlanmır.

## Problem: müvəqqəti susdurma
Susdurma vaxtla bitir (məsələn, 1 saat). Yalnız `status` sütunu bitmə vaxtını saxlamır.

**Həll:** `users` cədvəlinə `muted_until` (timestamp) sütunu əlavə et.
Qayda: `muted_until > indi` → susdurulub.
Üstünlüyü: vaxt bitəndə heç bir fon tapşırığı lazım deyil, yoxlama özü işləyir.

## Nə edəcəksən
1. Auth plugin-də (016) `banned` yoxlaması: hər sorğuda istifadəçini bazadan oxu. Sadədir və ~1 ms çəkir. Sonra lazım olsa keşləyərsən.
2. `muted` yoxlaması yalnız **yazma** əməliyyatlarında (mesaj göndərmə). Səs vermə və like-a da tətbiq olunsunmu? Qərar ver.
3. Xəta: 403 `USER_RESTRICTED`. Susdurmada `details.until`-də bitmə vaxtı.

## Hazır olduğunu necə yoxlayarsan
- [ ] Ban olunmuş istifadəçinin **köhnə token-i** ilə növbəti sorğu 403 alır.
- [ ] `muted_until` keçəndən sonra istifadəçi yenidən yaza bilir.
