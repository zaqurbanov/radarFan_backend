# 061 — Poll cədvəli ("Кто победит?")

**Faza:** 4 · **Asılılıq:** 050, 028 · **Status:** [ ]

## Məqsəd
Hər otaqda bir "kim qalib gələcək" sorğusu.

## Niyə
- Sənəd (bölmə 4, Səsvermə): "Room başına bir aktiv poll olur; «Kim qalib gələcək?» sualı üçün uyğun hallarda ev sahibi, heç-heçə və qonaq variantları istifadə edilir. Basketbol moneyline üçün yalnız iki komanda olur."
- Bölmə 7: poll — room_id, options, closes_at.
- Sayt: "Кто победит?" → futbolda yalnız **RM / FCB** (heç-heçə yoxdur!).
- Bölmə 2: prototipdə "Sabit 62 və 38 faiz", MVP-də "Real aqreqatlar".

## Cədvəllər
**`polls`**
| Sütun | Tip | Qeyd |
|---|---|---|
| id | uuid PK | |
| tenant_id | uuid | |
| room_id | uuid FK | |
| question_key | varchar(50) | `who_wins` (lokallaşdırma frontend-də) |
| status | enum(`open`, `closed`) | |
| closes_at | timestamptz | |
| closed_at | timestamptz NULL | |
| version | int default 1 | `poll.updated` üçün (065) |
| total_votes | int default 0 | denormalizasiya |
| created_at | timestamptz | |

Partial UNIQUE: (`room_id`) WHERE `status = 'open'`. "Room başına bir **aktiv** poll" qaydasını DB səviyyəsində təmin edir. Partial unique index-i öyrən.

**`poll_options`**
| Sütun | Tip |
|---|---|
| id | uuid PK |
| poll_id | uuid FK |
| key | varchar(20) (`home`, `draw`, `away`) |
| position | smallint |
| vote_count | int default 0 |

UNIQUE (`poll_id`, `key`).

**Niyə options ayrıca cədvəldir, jsonb deyil?** `vote_count`-u atomar artırmaq üçün (062). JSON daxilində sayğac artırmaq race condition-a açıqdır.

## Necə edəcəksən
1. Poll otaqla birlikdə yaranır (050). Variantlar market tipindən (028).
2. **Ziddiyyət:** sayt futbolda draw göstərmir, sənəd "uyğun hallarda" draw deyir. Tenant config-də `poll_include_draw` bayrağı et. Default: sayt kimi (draw yox)? Məhsul sahibinə soruş.
3. `closes_at` = matçın sonu? Başlanğıcı? Sənəd: "Poll hadisə bitdikdə, ləğv edildikdə və ya closes_at vaxtında bağlanır." Canlı matçda da səs vermək olar (saytda matç canlıdır və səs verilir).

## Qəbul meyarları
- [ ] Bir otaqda iki açıq poll yaratmaq mümkün deyil (DB xətası).
- [ ] Basketbol poll-unda yalnız 2 variant var.

## Açıq suallar
- Futbol poll-unda heç-heçə variantı olsunmu?
