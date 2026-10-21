# 087 — Başlanğıc coin (300 ◈)

**Status:** [ ] · **Faza:** 6 · **Əvvəl bitməli:** 086

## Qısaca
Yeni istifadəçi **bir dəfə** 300 coin alsın.

## Saytda
"300 ◈ на старте."

## Nə edəcəksən
1. İlk `/auth/exchange`-də istifadəçi yaranan anda, **eyni tranzaksiyada** ver.
2. Mənbə: `starting_bonus` + `user_id`. Unique qayda ikinci dəfəni bloklayır.
3. Miqdar tenant ayarından (`economy.starting_coins`).
4. Bu funksiyadan **əvvəl** yaranmış istifadəçilər nə olsun? Bir dəfəlik skript, və ya ilk `/me`-də? Qərar ver.

## Hazır olduğunu necə yoxlayarsan
- [ ] Yeni istifadəçinin balansı 300.
- [ ] Təkrar giriş bonusu təkrar vermir.
