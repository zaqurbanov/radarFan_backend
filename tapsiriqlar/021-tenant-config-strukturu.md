# 021 — TenantConfig strukturu (white-label)

**Faza:** 1 · **Asılılıq:** 010 · **Status:** [ ]

## Məqsəd
Hər tenant-ın brendi, dili, timezone-u, aktiv funksiyaları və qaydaları strukturlaşdırılmış və validasiya olunmuş formada saxlansın.

## Niyə
- Sənəd (bölmə 6, White label): "TenantConfig-də tenant_id, name, logo_url, theme tokens, locale, timezone, enabled_sports, enabled_features, partner_adapter, feed_provider və XP rules version olur."
- Sayt: brend **BetPulse**, şüar "Твой матч. Твои люди.", dil `ru`, tünd mövzu, lime vurğu rəngi. Sənəd isə RADAR.FAN və Azərbaycan dilindədir. Bu fərq tam olaraq config ilə həll olunur.
- İndi `config: jsonb` tipsizdir (`notNull`, amma heç bir sxem yoxdur). Səhv yazılmış config frontend-i sındırır.

## Cədvəl
`tenants` (mövcud) yenilənir:
| Sütun | Tip | Qeyd |
|---|---|---|
| slug | varchar unique | var |
| name | varchar(100) NOT NULL | brend adı (BetPulse) |
| mode | enum | task 015 |
| locale | varchar(10) NOT NULL | `ru`, `az`, `en` |
| timezone | varchar NOT NULL | IANA ad (`Asia/Baku`). Gündəlik limit (task 080) buna əsaslanır |
| rules_version | int | XP qaydaları versiyası |
| config | jsonb NOT NULL | aşağıdakı sxem |

**`config` JSON sxemi** (zod ilə validasiya):
- `branding`: `logo_url`, `tagline`, `theme` { `mode`: dark/light/both, `tokens`: { `accent`, `background`, ... } }
- `enabled_sports`: [`football`, `basketball`]
- `enabled_features`: { `community`, `stories`, `quiz_battle`, `find_pair`, `predictions`, `shop`, `coupon`, `handoff` } (boolean)
- `partner_adapter`: { `type`: native/postMessage, `allowed_origins`: [...] }
- `feed_provider`: { `type`: demo/..., `stale_after_seconds`: 15 }
- `economy`: { `starting_coins`: 300, `coins_per_correct`: 20, `xp_per_correct`: 50, `xp_battles_per_day`: 3, `challenge_xp`: 100 }
- `retention`: task 126

**Niyə bəziləri sütun, bəziləri JSON?** Sorğularda istifadə olunanlar (timezone, mode, locale) sütun; yalnız frontend-ə göndərilənlər JSON.

## Necə edəcəksən
1. Zod sxemi yaz və həm seed-də, həm admin endpoint-ində (task 115), həm DB-dən oxuyanda (`parse`) istifadə et.
2. Config-in **public** hissəsini (frontend-ə) və **private** hissəsini (feed açarları, adapter secret-ləri) ayır. Private heç vaxt `/me` cavabına düşməməlidir. Sənəd: "Onun açarları və məxfi məlumatları WebView-a daxil olmur."
3. Config hər sorğuda lazımdır. Yaddaşda/Redis-də keşlə, dəyişəndə invalidasiya et.
4. `economy` qaydaları dəyişəndə `rules_version` artmalıdır. Niyə? (Battle başlayanda versiya sabitlənir, bölmə 5.)

## Qəbul meyarları
- [ ] Etibarsız config ilə tenant yaratmaq mümkün deyil.
- [ ] `/me` cavabında `config` yalnız public sahələri saxlayır.
- [ ] Demo tenant seed-də BetPulse brendi, `ru` dili ilə yaradılır.
