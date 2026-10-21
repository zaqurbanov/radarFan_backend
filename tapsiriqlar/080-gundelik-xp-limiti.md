# 080 — Gündə yalnız 3 duel XP verir

**Status:** [ ] · **Faza:** 5 · **Əvvəl bitməli:** 073, 021

## Qısaca
Gündə ilk 3 tamamlanmış duel XP (və coin) versin. 4-cü və sonrakılar oynanılır, amma mükafatsız.

## Saytla fərq
- **Sənəd:** gündə ilk 3.
- **Sayt:** "XP начисляются за первые 3 баттла **в этом демо**" (ümumilikdə 3).
Hər ikisini dəstəklə: `rules.xp_battles_period: "day"` və ya `"lifetime"`. Məhsul sahibinə soruş.

## İncə məqamlar
1. **"Gün" kimin saatı ilə?** Bukmekerin saat qurşağı ilə (`Asia/Baku`). Server UTC-si yox, istifadəçinin telefonu yox.
2. **Gün nə vaxt təyin olunur?** Duel **başlayanda**. 23:59-da başlayıb 00:01-də bitən duel əvvəlki günə aiddir.
3. **Necə sayılır:** həmin gün üçün `completed` + `xp_eligible` duellərin sayı.
4. Başlayanda hesabla (istifadəçiyə "bu gün limit doldu" göstərmək üçün) **və** bitəndə yenidən yoxla (son qərar).
5. Tərk edilmiş duellər sayılmır.

## Nə edəcəksən
1. Saat qurşağına görə tarixi hesablamaq: Postgres-də `(now() AT TIME ZONE 'Asia/Baku')::date` və ya JS-də `Intl`/`date-fns-tz`.
2. `GET /battles/intro`-da "bu gün neçə XP-li duel qalıb".

## Hazır olduğunu necə yoxlayarsan
- [ ] 4-cü duel XP vermir, amma oynanılır.
- [ ] Bakı vaxtı ilə gün dəyişəndə limit sıfırlanır (test: UTC 20:30 = Bakı 00:30).
