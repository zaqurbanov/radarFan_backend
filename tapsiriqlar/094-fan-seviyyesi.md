# 094 — Fan səviyyəsi

**Faza:** 6 · **Asılılıq:** 084 · **Status:** [ ]

## Məqsəd
XP-yə görə istifadəçinin statusu/səviyyəsi.

## Niyə
- Sənəd (bölmə 5): "«Aktiv azarkeş» göstərilməsi üçün hədd 200 XP-dir; MVP-də bu status əlavə üstünlük vermir."
- Sayt: "Начинающий фанат" ("Мой фан"), "Новичок на радаре" (profil), "ПРОГРЕСС 150 XP". Bir yerdə iki fərqli ad. Frontend-də uyğunsuzluq var və ya fərqli anlayışlardır (personaj titulu vs XP səviyyəsi). Məhsul sahibinə soruş.

## Dizayn
Səviyyələr **saxlanmır**, XP-dən **hesablanır**. Tenant config-də:
`levels: [{ code: "newbie", min_xp: 0 }, { code: "active_fan", min_xp: 200 }, ...]`
Başlıqlar (`title`) lokallaşdırılır: kod backend-dən, mətn frontend-dən (və ya config-də locale üzrə).

## Necə edəcəksən
1. `computeLevel(xp, levels)` → `{ code, min_xp, next_min_xp, progress_to_next }`.
2. `/me`-yə (023) əlavə et.
3. Səviyyə qalxanda bildiriş (`user:` kanalı, `level.up`)? Gözəl əlavədir, MVP üçün istəyə bağlı.
4. **Üstünlük vermir.** Səviyyəyə görə heç bir funksiya açılmır (sənəd). Bunu kodda da saxla.

## Qəbul meyarları
- [ ] 199 XP → newbie, 200 XP → active_fan.

## Açıq suallar
- "Начинающий фанат" və "Новичок на радаре" eyni şeydirmi?
