# 102 — Mağaza kataloqu

**Faza:** 8 · Мой фан və mağaza · **Asılılıq:** 021 · **Status:** [ ]

## Məqsəd
Personaj üçün əşyalar kataloqu: kateqoriyalar, qiymətlər, default (pulsuz) əşyalar.

## Niyə
Sayt ("Мой фан" → "Магазин", "Гардероб · 4"):
| Kateqoriya | Əşyalar (qiymət ◈) |
|---|---|
| Форма | **Форма PULSE** (default, "Надето ✓"), Красная трибуна 120, Ночная лига 180, Капитан 450 |
| Головные уборы | **Без головного убора** (default), Кепка PULSE 80 ("Кепка с широким козырьком."), Корона трибуны 300 |
| Аксессуары | **Без аксессуара** (default), Фанатский шарф 100, Мяч на удачу 140 |
| Фоны | **Раздевалка** (default), Лайм-арена 160, Ночной стадион 220 |

"Твой персонаж на трибуне PULSE". Sənəddə yoxdur ("Avatar ekranı və tam profil MVP-yə daxil deyil"). Sayt əsas versiyadır, ona görə daxildir.

## Cədvəllər
**`shop_items`**
| Sütun | Tip | Qeyd |
|---|---|---|
| id | uuid PK | |
| tenant_id | uuid | hər tenant öz kataloqu (brendləşmiş forma!) |
| code | varchar(50) | `kit_pulse`, `hat_cap_pulse` |
| slot | enum(`kit`, `headwear`, `accessory`, `background`) | |
| name_key / name | varchar | lokallaşdırma |
| description | varchar(200) | |
| price_coins | int NOT NULL CHECK >= 0 | |
| is_default | boolean | slotun pulsuz başlanğıc əşyası |
| asset | jsonb | ikon, rənglər, şəkil URL-ləri (frontend render üçün) |
| position | smallint | |
| status | enum(`active`, `hidden`, `retired`) | |
| created_at, updated_at | | |

UNIQUE (`tenant_id`, `code`). Partial UNIQUE (`tenant_id`, `slot`) WHERE `is_default`. Slot başına bir default.

## Endpoint
`GET /shop/items?slot=` → items + `owned`, `equipped`, `affordable` (istifadəçiyə görə).

## Necə edəcəksən
1. Seed: saytdakı 13 əşya.
2. Qiymət dəyişsə, artıq alınmış əşyalar təsirlənmir (inventarda alış qiyməti saxlanır, 103).
3. `retired` əşya kataloqdan çıxır, amma sahibində qalır.
4. Kim əlavə edir? Admin (117).

## Qəbul meyarları
- [ ] Kataloq 4 slot üzrə saytdakı əşyaları qaytarır.
- [ ] Hər slotda dəqiq bir default.
