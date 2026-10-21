# 102 — Mağaza kataloqu

**Status:** [ ] · **Faza:** 8 · **Əvvəl bitməli:** 021

## Qısaca
Personaj üçün əşyalar: kateqoriyalar, qiymətlər, pulsuz başlanğıc əşyalar.

## Saytda ("Мой фан" → "Магазин")
| Kateqoriya | Əşyalar (◈) |
|---|---|
| Форма | **Форма PULSE** (pulsuz, geyinilib), Красная трибуна 120, Ночная лига 180, Капитан 450 |
| Головные уборы | **Без головного убора** (pulsuz), Кепка PULSE 80, Корона трибуны 300 |
| Аксессуары | **Без аксессуара** (pulsuz), Фанатский шарф 100, Мяч на удачу 140 |
| Фоны | **Раздевалка** (pulsuz), Лайм-арена 160, Ночной стадион 220 |

Sənəddə yoxdur. Sayt əsas olduğu üçün edirik.

## Yeni cədvəl: `shop_items`
| Sütun | İzah |
|---|---|
| id, tenant_id | hər bukmekerin öz kataloqu (öz brendli forması) |
| code | `kit_pulse`, `hat_cap_pulse` |
| slot | `kit` / `headwear` / `accessory` / `background` |
| name, description | |
| price_coins | qiymət (≥ 0) |
| is_default | pulsuz başlanğıc əşyası |
| asset | şəkil, rəng (frontend üçün, JSON) |
| position | sıra |
| status | `active` / `hidden` / `retired` |

- Unique (`tenant_id`, `code`).
- Hər slotda **bir** default: partial unique (`tenant_id`, `slot`) yalnız `is_default = true` olanda.

## Endpoint
`GET /shop/items?slot=` → əşyalar + istifadəçiyə görə: alınıb?, geyinilib?, pulu çatır?

## Nə edəcəksən
1. Seed: saytdakı 13 əşya.
2. Qiymət dəyişsə, artıq alınmışlar təsirlənmir.
3. `retired` əşya kataloqdan çıxır, amma sahibində qalır.

## Hazır olduğunu necə yoxlayarsan
- [ ] Kataloq 4 kateqoriya üzrə saytdakı əşyaları qaytarır.
- [ ] Hər kateqoriyada dəqiq bir pulsuz əşya.
