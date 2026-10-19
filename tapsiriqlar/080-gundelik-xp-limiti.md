# 080 — Gündəlik XP limiti (tenant timezone)

**Faza:** 5 · **Asılılıq:** 073, 021 · **Status:** [ ]

## Məqsəd
Sutkada yalnız ilk 3 tamamlanmış duel XP (və coin) versin.

## Niyə
- Sənəd (bölmə 5): "MVP-də XP tenant timezone-na əsasən sutka ərzində tamamlanmış ilk 3 duel üçün verilir. Təkrar oyunlar XP olmadan mümkündür; startdan əvvəl «Bu gün XP limitinə çatmısan» göstərilir. Timezone versiyası və günün açarı battle daxilində start zamanı sabitlənir."
- Bölmə 11: "Sutkanın dördüncü dueli XP vermir."
- Sayt: "XP начисляются за первые 3 баттла в этом демо." Sayt "bu demoda" deyir (ümumilikdə 3), sənəd isə "sutkada 3". **Sənəd qaydası daha dəqiqdir**, sayt mətni demo üçün sadələşdirilib. Hər iki variant `rules.xp_battles_period: "day" | "lifetime"` ilə dəstəklənə bilər. Məhsul sahibinə soruş.

## İncəliklər
1. **"Sutka" kimin saatı ilə?** Tenant timezone-u (`Asia/Baku`, `Europe/Moscow`). UTC yox, istifadəçinin telefonu yox. `daily_key` = start anında tenant timezone-undakı tarix (`2026-10-19`).
2. **Başlanğıc vs tamamlanma:** Sənəd: "tamamlanmış ilk 3 duel", amma "günün açarı start zamanı sabitlənir". 23:59-da başlayıb 00:01-də bitən duel start gününə aiddir.
3. **Paralel start:** limit 3, sayılan 2. İki paralel battle başlayır, ikisi də "eligible" olur? Bir aktiv battle qaydası (073) bunu bloklayır. Amma hesablamanı yenə də tranzaksiya daxilində et.
4. **Sayma:** `count(*) FROM battles WHERE user, daily_key, state = completed, xp_eligible`. Start zamanı hesablanan `xp_eligible` + tamamlanma zamanı yenidən yoxlama. Niyə hər ikisi? (Start zamanı istifadəçiyə xəbərdarlıq üçün; tamamlanma zamanı həqiqi qərar üçün.)
5. Abandoned battle-lar sayılmır.

## Lazım olan
- Timezone hesablama: `Intl.DateTimeFormat` və ya `date-fns-tz` / `Temporal` ilə. Postgres-də: `(now() AT TIME ZONE 'Asia/Baku')::date`.
- `GET /battles/intro` (074): `xp_battles_left_today`.

## Qəbul meyarları
- [ ] 4-cü tamamlanmış duel XP vermir, amma oynanılır.
- [ ] Tenant timezone-una görə gün dəyişəndə limit sıfırlanır (test: tenant `Asia/Baku`, UTC 20:30 = Bakı 00:30).
