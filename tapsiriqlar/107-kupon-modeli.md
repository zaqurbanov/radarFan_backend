# 107 — Kupon (ekspres) modeli

**Faza:** 9 · Kupon və handoff · **Asılılıq:** 027, 022 · **Status:** [ ]

## Məqsəd
İstifadəçinin seçdiyi outcome-ların toplusu (demo-kupon): bir matça bir outcome, ümumi əmsal.

## Niyə
Sayt ("Демо-купон"):
- "2 выбранных исходов · без реальных ставок"
- "Арсенал — Ливерпуль · Победа гостей 2.85 · Удалить", "Реал Мадрид — Барселона · Победа хозяев 1.72 · Удалить"
- "Общий коэффициент 4.90" (2.85 × 1.72 = 4.902 → 4.90)
- "По одному исходу на матч. Это смоделированный экспресс."
- "Проверить переход к партнёру →", "Очистить купон"
- Başlıqda "Купон · 1" sayğacı.

Sənəd isə yalnız **bir** outcome üçün handoff təsvir edir (`POST /handoffs` → `outcome_id`). Sayt əsas versiyadır, ona görə çox outcome-lu kupon edirik, handoff isə hər iki rejimi dəstəkləyir (109).

## Kupon serverdə saxlanmalıdırmı?
| Yalnız müştəridə | Serverdə |
|---|---|
| Sadə | Cihazlar arası sinxron |
| Reload-da itə bilər (yaddaşda saxlanırsa) | Sənəd: "Kupondan qayıdış seçilmiş kartı və filtri bərpa edir" |
| | Analitika (`outcome_selected`) |

Tövsiyə: serverdə, sadə formada.

## Cədvəllər
**`coupon_selections`**
| Sütun | Tip | Qeyd |
|---|---|---|
| tenant_id | uuid | |
| user_id | uuid FK | |
| event_id | uuid FK | |
| outcome_id | uuid FK | |
| price_at_selection | numeric(10,3) | |
| odds_version | int | |
| created_at | timestamptz | |

PK (`user_id`, `event_id`). "**Bir matça bir outcome**" qaydası DB-də.

Ayrıca `coupons` cədvəli lazımdırmı? İstifadəçi başına bir aktiv kupon var, ona görə seçimlər birbaşa user-ə bağlana bilər. Handoff zamanı isə snapshot handoff cədvəlinə yazılır (109).

## Ümumi əmsal
`Π price` (hasil). `numeric`-də hesabla, 2 onluğa yuvarlaqlaşdır. Yuvarlaqlaşdırma qaydası (half-up?) tərəfdaşla eyni olmalıdır, açıq sual.

## Açıq suallar
- Tərəfdaş ekspres (çox outcome) kuponu qəbul edirmi? (SPEC.md, sual 3.)
- Maksimum seçim sayı?
