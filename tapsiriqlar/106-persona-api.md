# 106 — Persona (avatar) API

**Faza:** 8 · **Asılılıq:** 105, 094 · **Status:** [ ]

## Məqsəd
"Мой фан" ekranını bir sorğu ilə qurmaq.

## Niyə
Sayt ("Мой фан"): coin balansı, personaj (geyinilmiş əşyalar), ad, səviyyə ("Начинающий фанат · 0 новых предметов"), ROI qısa kartı, mağaza, "Как заработать монеты" bloku.

## Endpoint
`GET /me/fan` → {
- `coin_balance`,
- `persona`: { initials, equipped: { kit, headwear, accessory, background } (asset-lərlə) },
- `level` (094), `new_items_count` (103),
- `prediction_summary`: { roi_percent, net_units, settled_count, pending_count } (100),
- `earning_rules`: { starting_coins, coins_per_correct, battles_with_rewards } (tenant config-dən; "Как заработать монеты" mətni üçün)
}

## Necə edəcəksən
1. Bu, "BFF" (backend for frontend) endpoint-idir: bir ekranın ehtiyacını bir sorğu ilə ödəyir. Daxildə mövcud servis funksiyalarını çağırır, yeni məntiq yazmır.
2. Başqa istifadəçilərin personasını görmək (çatda avatar)? Hələ yox. Amma `persona`-nı ayrıca serializer et ki, gələcəkdə mesajlarda istifadə olunsun.

## Qəbul meyarları
- [ ] Bir sorğu "Мой фан" ekranının bütün məlumatlarını qaytarır.
- [ ] Cavabdakı rəqəmlər ayrı endpoint-lərlə uyğundur.
