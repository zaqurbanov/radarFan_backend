# 024 — Adı dəyişmək: `PATCH /me`

**Status:** [ ] · **Faza:** 1 · **Əvvəl bitməli:** 023

## Qısaca
İstifadəçi ləqəbini dəyişə bilsin. Saytda: "Имя ✎" → profil → "Сохранить".

## Niyə ehtiyatlı olmalıyıq?
Ad çatda **hamıya** görünür. Ona görə:
- təhqiramiz ad olmasın;
- telefon və ya email ad kimi yazılmasın (sənəd: ad şəxsi məlumatı açmamalıdır).

## Endpoint
`PATCH /me` → `{ nickname }` → yenilənmiş istifadəçi.

## Qaydalar (təklif, məhsul sahibi ilə təsdiqlə)
- Boşluqları kəsdikdən sonra 2–24 simvol.
- İcazəli: hərf, rəqəm, boşluq, `_`, `-`, `.`.
- `@` və ya 7+ rəqəm ardıcıllığı olan ad rədd olunur (email/telefona bənzəyir).
- Gündə ən çox 3 dəyişiklik (moderatordan qaçmaq üçün tez-tez ad dəyişməsin).

## Nə edəcəksən
1. Validasiya yaz.
2. Ad dəyişikliklərinin tarixçəsini saxla (moderasiya üçün): kim, köhnə ad, yeni ad, nə vaxt.
3. Mesajlarda ad **saxlanmır**, yalnız `user_id` saxlanır (task 051). Ona görə ad dəyişəndə köhnə mesajlarda avtomatik yeni ad görünəcək.

## Hazır olduğunu necə yoxlayarsan
- [ ] Boş və ya 1 simvollu ad → 400.
- [ ] Email kimi ad → 400.
- [ ] Ad dəyişəndən sonra `/me` yeni adı göstərir.

## Açıq suallar
- Ad unikal olmalıdırmı? (Çatda iki "Nihal" çaşdırıcıdır, amma unikallıq istifadəçini yorur.)
- Emoji olarmı?
