# 107 — Kupon (bir neçə seçim)

**Status:** [ ] · **Faza:** 9 · **Əvvəl bitməli:** 027, 022

## Qısaca
İstifadəçinin seçdiyi əmsalların toplusu: **bir matça bir seçim**, ümumi əmsal.

## Saytda ("Демо-купон")
- "2 выбранных исходов · без реальных ставок"
- "Арсенал — Ливерпуль · Победа гостей 2.85 · Удалить", "Реал Мадрид — Барселона · Победа хозяев 1.72"
- "Общий коэффициент 4.90" (2.85 × 1.72 = 4.902 → 4.90)
- "По одному исходу на матч. Это смоделированный экспресс."
- Başlıqda: "Купон · 1"

## Sənədlə fərq
Sənəd yalnız **bir** seçimlə keçidi təsvir edir. Sayt **bir neçə** seçim göstərir. Sayt əsasdır, ona görə hər iki halı dəstəkləyirik.

## Kupon serverdə saxlansınmı?
**Bəli.** Səbəblər: cihazlar arası eyni qalır; sənəd "kupondan qayıdanda seçilmiş kart bərpa olunur" deyir; analitika.

## Yeni cədvəl: `coupon_selections`
| Sütun | İzah |
|---|---|
| tenant_id, user_id | |
| event_id | matç |
| outcome_id | seçilən nəticə |
| price_at_selection | seçim anındakı əmsal |
| odds_version | |
| created_at | |

Əsas açar (`user_id`, `event_id`): **bir matça bir seçim**, bazada.

## Ümumi əmsal
Bütün əmsalların **hasili**. Bazada hesabla (`numeric`), 2 onluğa yuvarlaqlaşdır.

## Açıq suallar
- Bukmeker bir neçə seçimli (ekspres) kuponu qəbul edirmi?
- Maksimum seçim sayı?
