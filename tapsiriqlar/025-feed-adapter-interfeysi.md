# 025 — Feed adapter interfeysi

**Faza:** 2 · Feed və Nəbz · **Asılılıq:** 021 · **Status:** [ ]

## Məqsəd
Matç, bazar və əmsal məlumatlarını hansı provayderdən gəlməsindən asılı olmayaraq eyni formada qəbul edən abstraksiya.

## Niyə
- Sənəd (bölmə 1): "İnteqrasiya olunmuş versiyada matçlar və əmsallar tərəfdaşdan və ya razılaşdırılmış təchizatçıdan gəlir."
- Bölmə 6: "Təchizatçının məlumat axını serverdə normallaşdırılır."
- Bölmə 8: "Tərəfdaş adapterinin müqavilələri ayrıca versiyalanır: təchizatçının sahələrini xəbərsiz şəkildə RADAR.FAN-ın açıq modelinə əlavə etmək olmaz."
- Hər bukmekerin fərqli feed-i ola bilər (`TenantConfig.feed_provider`). Kodun qalanı provayderi bilməməlidir.

## Dizayn (kodsuz təsvir)
Interfeys `FeedProvider`, metodlar:
- `listEvents(since?)`: dəyişmiş hadisələr
- `getEvent(providerEventId)`
- `subscribe(onUpdate)`: push dəstəkləyən provayderlər üçün (WebSocket/stream)
- `healthCheck()`

Daxili normallaşdırılmış modellər (provayderdən asılı olmayan):
- `NormalizedEvent`: provider_event_id, sport, league, home, away, status, score, period, start_at, provider_updated_at
- `NormalizedMarket`: provider_market_id, type (`football_1x2`/`basketball_moneyline`), rules, status, version
- `NormalizedOutcome`: provider_outcome_id, key (home/draw/away), price (decimal string), status, version

## Necə edəcəksən
1. `src/modules/feed/` qovluğu: `types.ts` (interfeys + normallaşdırılmış tiplər), `providers/demo.ts` (026), `registry.ts` (config-dəki `type`-a görə provayder seçir).
2. "Adapter pattern" və "anti-corruption layer" haqqında oxu. Provayderin sahə adları (məs. `HomeTeamName`) bu qatdan kənara çıxmamalıdır.
3. Hər provayder müqaviləsinin versiyası (`adapter_version`) olsun.

## Qəbul meyarları
- [ ] Feed modulundan kənarda heç bir fayl konkret provayderi import etmir.
- [ ] Yeni provayder əlavə etmək üçün yalnız bir fayl + registry-də bir sətir lazımdır.
