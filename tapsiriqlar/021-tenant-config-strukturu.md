# 021 — Bukmekerin ayarları (TenantConfig)

**Status:** [ ] · **Faza:** 1 · **Əvvəl bitməli:** 010

## Qısaca
Hər bukmekerin brendi, dili, saat qurşağı, açıq funksiyaları və oyun qaydaları **yoxlanılmış**, səliqəli formada saxlansın.

## Niyə lazımdır?
- Eyni tətbiq fərqli bukmekerlərdə fərqli görünür: saytda brend **BetPulse**, dil **rus**, tünd mövzu. Sənəddə isə RADAR.FAN, Azərbaycan dili. Bu fərq məhz ayarlarla həll olunur.
- İndi `tenants.config` istənilən JSON qəbul edir. Səhv yazılmış ayar frontend-i sındırır.

## Sütun, yoxsa JSON?
- **Sütun:** sorğularda istifadə olunanlar (`timezone`, `mode`, `locale`, `name`).
- **JSON (`config`):** yalnız frontend-ə göndərilənlər.

## `config` içində nələr olacaq
- `branding`: loqo, şüar, rənglər
- `enabled_sports`: `football`, `basketball`
- `enabled_features`: hansı bölmələr açıqdır (çat, hekayələr, viktorina, mağaza, proqnoz, kupon...)
- `economy`: başlanğıc coin (300), cavab başına XP (50) və coin (20), gündə neçə duel XP verir (3), tapşırıq mükafatı (100)
- `feed_provider`: əmsal neçə saniyədən sonra köhnəlir (15)

## Nə edəcəksən
1. Config üçün zod sxemi yaz. Seed-də, admin-də və bazadan oxuyanda istifadə et.
2. Config-i iki hissəyə böl:
   - **açıq:** frontend-ə gedir (brend, rənglər, funksiyalar);
   - **gizli:** heç vaxt frontend-ə getmir (bukmekerin açarları, feed şifrələri).
3. Config hər sorğuda lazımdır. Keşlə, dəyişəndə keşi təmizlə.
4. `economy` dəyişəndə `rules_version` artmalıdır. Niyə? (İpucu: başlamış duel köhnə qaydalarla bitməlidir.)

## Hazır olduğunu necə yoxlayarsan
- [ ] Səhv config ilə tenant yaratmaq mümkün deyil.
- [ ] `/me` cavabında config-in yalnız açıq hissəsi var.
- [ ] Demo tenant seed-də BetPulse brendi və rus dili ilə yaranır.
