# 094 — Fan səviyyəsi

**Status:** [ ] · **Faza:** 6 · **Əvvəl bitməli:** 084

## Qısaca
XP-yə görə istifadəçinin səviyyəsi/titulu.

## Sənəd və sayt
- Sənəd: 200 XP-dən "Aktiv azarkeş". **Heç bir üstünlük vermir.**
- Sayt: "Начинающий фанат" ("Мой фан"-da), "Новичок на радаре" (profildə). İki fərqli ad. Eyni şeydirmi?

## Dizayn
Səviyyə **saxlanmır**, XP-dən **hesablanır**. Tenant ayarında:
`levels: [{ code: "newbie", min_xp: 0 }, { code: "active_fan", min_xp: 200 }, ...]`
Backend kodu qaytarır, mətni frontend tərcümə edir.

## Nə edəcəksən
1. Funksiya: `səviyyə(xp)` → `{ code, min_xp, next_min_xp, progress }`.
2. `/me`-yə əlavə et.
3. Səviyyə heç bir funksiyanı açmır (sənəd). Kodda da belə saxla.

## Hazır olduğunu necə yoxlayarsan
- [ ] 199 XP → newbie, 200 XP → active_fan.

## Açıq sual
"Начинающий фанат" və "Новичок на радаре" eyni şeydirmi?
