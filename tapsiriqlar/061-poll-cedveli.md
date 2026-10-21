# 061 — Sorğu: "Кто победит?"

**Status:** [ ] · **Faza:** 4 · **Əvvəl bitməli:** 050, 028

## Qısaca
Hər otaqda bir "kim qalib gələcək?" sorğusu.

## Qaydalar (sənəddən)
- Otaqda eyni anda **bir** aktiv sorğu.
- Basketbolda 2 variant (ev sahibi / qonaq).
- Futbolda: sənəd "uyğun hallarda heç-heçə də" deyir, **sayt isə yalnız 2 variant** göstərir (RM / FCB).

## Yeni cədvəllər
**`polls`**
| Sütun | İzah |
|---|---|
| id, tenant_id, room_id | |
| question_key | `who_wins` (mətni frontend tərcümə edir) |
| status | `open` / `closed` |
| closes_at, closed_at | |
| version | dəyişiklik sayğacı (065) |
| total_votes | ümumi səs sayı |
| created_at | |

**Qayda:** bir otaqda yalnız bir **açıq** sorğu. Bunu DB səviyyəsində "partial unique index" ilə et: unique (`room_id`) **yalnız** `status = 'open'` olanda.

**`poll_options`**
| Sütun | İzah |
|---|---|
| id, poll_id | |
| key | `home` / `draw` / `away` |
| position | sıra |
| vote_count | səs sayı |

**Niyə variantlar ayrı cədvəldə, JSON-da deyil?** Hər variantın sayğacını **atomar** artırmaq üçün. JSON içində sayğac artırmaq race condition yaradır.

## Nə edəcəksən
1. Sorğu otaqla birlikdə yaransın (050). Variantlar bazar tipindən (028).
2. Heç-heçə üçün tenant ayarına `poll_include_draw` bayrağı əlavə et. Default: sayt kimi (heç-heçəsiz)?

## Hazır olduğunu necə yoxlayarsan
- [ ] Bir otaqda iki açıq sorğu yaratmaq mümkün deyil (DB xətası verir).
- [ ] Basketbol sorğusunda yalnız 2 variant var.

## Açıq sual
Futbol sorğusunda heç-heçə olsunmu?
