# 027 — Feed normallaşdırma və DB-yə yazılma (upsert)

**Faza:** 2 · **Asılılıq:** 025, 026 · **Status:** [ ]

## Məqsəd
Provayderdən gələn məlumatı bizim cədvəllərə dublikatsız, köhnə məlumatla yenisini əvəz etmədən yazmaq.

## Niyə
- Sənəd (bölmə 9): "Daha kiçik version-lu hadisə daha yeni məlumatı əvəz etmir."
- Bölmə 7: Event `(tenant, provider_id)` unikal; Outcome "qiymətin versiyası məlumat axınından gəlir".
- Şəbəkədə mesajlar gecikir, sıra qarışır. Köhnə əmsal yenisinin üstünə yazılsa, istifadəçi səhv qiymətlə kupona keçir.

## Cədvəl dəyişiklikləri
**events** (mövcud) + əlavə sütunlar:
| Sütun | Tip | Qeyd |
|---|---|---|
| version | int NOT NULL default 1 | provayder versiyası və ya bizim sayğac |
| provider_updated_at | timestamptz | provayderin vaxtı |
| finished_at | timestamptz NULL | otağın read_only olması üçün (task 057) |
| is_demo | boolean NOT NULL default false | demo etiketi |
| home_short, away_short | varchar(5) | saytdakı "RM", "FCB" loqo yerinə |

`teams jsonb` əvəzinə `home_name`, `away_name`, `home_short`, `away_short` sütunları daha yaxşıdır? Sorğu və index üçün düşün. Loqo URL-ləri də lazım ola bilər.

**markets**: `(event_id, provider_id)` UNIQUE əlavə et (indi yoxdur!). `updated_at` əlavə et.

**outcomes**: `(market_id, provider_id)` UNIQUE, `(market_id, key)` UNIQUE, `version int`. `price` decimal string kimi saxlanır. `varchar` yoxsa `numeric(10,3)`? Sənəd: "Əmsal decimal string kimi ötürülür". DB-də `numeric` saxlayıb API-də string qaytarmaq daha düzgündür (hesablamalar, ROI, ekspres əmsal, task 100/107). **Float heç vaxt istifadə etmə.**

## Necə edəcəksən
1. Upsert: `INSERT ... ON CONFLICT (tenant_id, provider_id) DO UPDATE ... WHERE events.version < EXCLUDED.version`. Bu `WHERE` şərti köhnə məlumatın yenini əvəz etməsinin qarşısını alır.
2. Event + market-lər + outcome-lar **bir tranzaksiyada** yazılır.
3. Dəyişiklik olubsa, real-time yayım üçün outbox-a hadisə yaz (task 045/047). Upsert dəyişiklik edib-etmədiyini necə biləcəksən? (`RETURNING` + `xmax` hiyləsi və ya versiyaları müqayisə.)
4. Bir feed çox tenant-a xidmət edə bilər (eyni provayder, iki bukmeker). Feed-i tenant başına ayrıca yazırıq, çünki sənəddə hər cədvəldə `tenant_id` var və əmsallar bukmekerə görə fərqlidir.

## Tələlər
- `ON CONFLICT` üçün unique constraint **mütləq** lazımdır, yoxsa Postgres xəta verir.
- Market silinməsi: provayder market-i göndərməyi dayandırsa, onu silmə, `closed` et (tarixçə, proqnozlar və handoff ona istinad edir).

## Qəbul meyarları
- [ ] Eyni event iki dəfə gəlsə, bir sətir qalır.
- [ ] `version=5` yazılandan sonra `version=4` gəlsə, dəyişiklik olmur (test).
- [ ] Qiymətlər `numeric`-də saxlanır, API-də `"1.72"` kimi qayıdır.
