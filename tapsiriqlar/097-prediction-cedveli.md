# 097 — Proqnozlar cədvəli

**Status:** [ ] · **Faza:** 7 · **Əvvəl bitməli:** 027, 028

## Qısaca
İstifadəçinin matç proqnozlarını saxla: hansı nəticə, hansı əmsalla, statusu.

## Saytda ("Прогноз матча")
- "Смоделированный прогноз на **100 единиц**"
- Hər matçın əmsalları düymə kimi
- "При выборе прогноз записывается со статусом «Ожидает». **Баланс монет персонажа не расходуется.**"
- Bir matça **bir neçə** proqnoz olar (tarixçədə Реал–Барселона üçün həm П1, həm Ничья var).
- Statuslar: "Ожидает", "Верный ✓", "Неверный", "Возврат".

## ⚠ Vacib xəbərdarlıq
Sənəd: "RADAR.FAN mərc qəbul etmir". Bu funksiya isə **mərcə çox bənzəyir** (məbləğ, əmsal, ROI).
Fərqi: real pul yoxdur, coin xərclənmir, "единицы" virtualdır.
Bu, **hüquqi cəhətdən həssasdır**. Kod yazmazdan əvvəl məhsul sahibindən **yazılı təsdiq** al.
Funksiya söndürülə bilən olsun (`features.predictions`) və icazəyə bağlı olsun (022). Özünü mərcdən uzaqlaşdırmış istifadəçiyə göstərilməsin.

## Yeni cədvəl: `predictions`
| Sütun | İzah |
|---|---|
| id, tenant_id, user_id | |
| event_id, market_id, outcome_id | nəyə proqnoz |
| outcome_key | `home`/`draw`/`away` (tarixçə üçün) |
| price | **seçim anındakı** əmsal |
| odds_version | |
| stake_units | 100 (virtual) |
| status | `pending` / `won` / `lost` / `void` |
| return_units | qaytarılan: qalibdirsə 100 × əmsal, ləğvdirsə 100, uduzubsa 0 |
| settled_at | hesablanma vaxtı |
| is_demo | |
| created_at | |

**Niyə əmsal kopyalanır?** 1.72 ilə seçdin, sonra əmsal 1.50 oldu. Nəticə **1.72** ilə hesablanmalıdır. Outcome cədvəlində qiymət dəyişir, ona görə kopya lazımdır.

## Açıq suallar
- Hüquqi təsdiq (yuxarıya bax).
- Eyni nəticəyə iki dəfə proqnoz olarmı?
