# 047 — `event.updated` və `odds.updated` yayımı

**Faza:** 3 · **Asılılıq:** 027, 045 · **Status:** [ ]

## Məqsəd
Hesab, dövr, status və əmsal dəyişiklikləri real vaxtda müştərilərə çatsın.

## Niyə
- Sənəd (bölmə 9): `event.updated` → event_id, version, score, period, status; `odds.updated` → market_id, version, outcomes, updated_at.
- "Matçlar üçün hər 15 saniyədə ehtiyat polling mümkündür, lakin handoff yenə də aktuallığı serverdə yoxlayır."
- Bölmə 10: hesab/əmsal yenilənməsinin p95-i 2 san.-dək.

## Necə edəcəksən
1. Feed upsert (027) dəyişiklik etdikdə, eyni tranzaksiyada outbox-a (045) hadisə yaz.
2. Hansı kanallara? `event:{id}` (matç mərkəzi) və `feed:{tenant}` (lent). Bir hadisə iki kanala = iki outbox sətri? Yoxsa relay bir sətri bir neçə kanala göndərir? Qərar ver.
3. **Versiya qaydası:** müştəri köhnə versiyanı yenisinin üstünə yazmasın, payload-da `version` olsun. Bu, server qaydasıdır, amma müştəri üçün sənədləşdir.
4. Əmsallar çox tez dəyişə bilər (canlı futbolda saniyədə bir neçə dəfə). **Coalescing:** eyni market üçün qısa pəncərədə (250–500 ms) yalnız sonuncunu göndər.
5. Suspended → `odds.updated` ilə `status: suspended` gedir, frontend düymələri bağlayır.

## Qəbul meyarları
- [ ] Demo feed hesabı dəyişəndə `event:{id}` abunəçisi 2 san. ərzində `event.updated` alır.
- [ ] Payload-da həmişə `version` var.
