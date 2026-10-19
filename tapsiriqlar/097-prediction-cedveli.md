# 097 — Proqnoz (prediction) cədvəli

**Faza:** 7 · **Asılılıq:** 027, 028 · **Status:** [ ]

## Məqsəd
İstifadəçinin matç proqnozlarını saxlamaq: hansı nəticə, hansı əmsalla, statusu.

## Niyə
Sayt ("Прогноз матча"):
- "Смоделированный прогноз на **100 единиц**"
- Hər matçın outcome-ları düymə kimi (П1 · 1.72, X · 3.80, П2 · 4.20)
- "При выборе прогноз записывается со статусом «Ожидает». Демо-расчёт использует показанный счёт матчей. **Баланс монет персонажа не расходуется.**"
- Statistika tarixçəsində **eyni matça iki proqnoz** var (Реал–Барселона: П1 və Ничья). Deməli bir matça bir neçə proqnoz olar.
- Statuslar: "Ожидает расчёта", "Верный ✓", "Неверный", "Возврат".

## ⚠ Ən vacib xəbərdarlıq
Sənəd: "RADAR.FAN mərc məbləğini qəbul etmir", "RADAR.FAN daxilində mərc qəbulu MVP-yə daxil deyil", "Viktorinadakı qələbələr mərc nəticəsinin proqnozu kimi istifadə edilmir".
Bu funksiya **mərc kimi görünür** (məbləğ, əmsal, ROI). Fərqi: real pul yoxdur, coin xərclənmir, "единицы" virtualdır. Bu, hüquqi və tənzimləmə baxımından həssasdır. Kod yazmazdan əvvəl məhsul sahibindən **yazılı təsdiq** al (SPEC.md, sual 1). Tenant config-də söndürülə bilən olsun (`features.predictions`), entitlement-ə bağlı olsun (022: self-exclusion olunmuş istifadəçiyə göstərmə).

## Cədvəl
**`predictions`**
| Sütun | Tip | Qeyd |
|---|---|---|
| id | uuid PK | |
| tenant_id | uuid | |
| user_id | uuid FK | |
| event_id | uuid FK | |
| market_id | uuid FK | |
| outcome_id | uuid FK | |
| outcome_key | varchar(20) | `home/draw/away`. Market dəyişsə də tarixçə üçün |
| price | numeric(10,3) | **seçim anındakı** əmsal (snapshot) |
| odds_version | int | |
| stake_units | int default 100 | virtual |
| status | enum(`pending`, `won`, `lost`, `void`) | |
| return_units | numeric(12,2) NULL | won: stake × price; void: stake; lost: 0 |
| settled_at | timestamptz NULL | |
| is_demo | boolean | |
| created_at | timestamptz | |

Index (`tenant_id`, `user_id`, `created_at DESC`), (`event_id`, `status`). Hesablaşma job-u üçün.

**Niyə `price` snapshot?** Əmsal 1.72 olanda seçdin, sonra 1.50 oldu. Nəticə 1.72 ilə hesablanmalıdır. Outcome cədvəlinə istinad etmək kifayət deyil, orada qiymət dəyişir.

## Açıq suallar
- Eyni outcome-a iki dəfə proqnoz olarmı? (Sayt: eyni matça fərqli outcome-lar olur.)
- Hüquqi təsdiq (yuxarıya bax).
