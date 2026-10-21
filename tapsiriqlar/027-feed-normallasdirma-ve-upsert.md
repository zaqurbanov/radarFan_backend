# 027 — Matç məlumatını bazaya düzgün yazmaq

**Status:** [ ] · **Faza:** 2 · **Əvvəl bitməli:** 025, 026

## Qısaca
Mənbədən gələn məlumatı bazaya **dublikatsız** yaz. **Köhnə** məlumat **yenisinin** üstünə yazılmasın.

## Niyə lazımdır?
- Şəbəkədə mesajlar gecikir və qarışıq sıra ilə gəlir. Əmsal `4.20 → 3.80` dəyişdi, amma köhnə `4.20` mesajı sonra gəldi. Bazada `4.20` qalsa, istifadəçi səhv qiymətlə bukmekerə keçir.
- Sənəd: "Daha kiçik versiyalı məlumat daha yenisini əvəz etmir."

## Upsert nədir?
"Yoxdursa əlavə et, varsa yenilə", bir əmrdə. Postgres-də `INSERT ... ON CONFLICT ... DO UPDATE`.

## Cədvəl dəyişiklikləri
**events**-ə əlavə:
| Sütun | İzah |
|---|---|
| version | versiya sayğacı |
| finished_at | matçın bitmə vaxtı (çatın bağlanması üçün) |
| is_demo | demo işarəsi |
| home_short, away_short | qısa adlar: "RM", "FCB" |

**markets**: unique (`event_id`, `provider_id`) əlavə et. **İndi yoxdur!**

**outcomes**:
- unique (`market_id`, `provider_id`) və unique (`market_id`, `key`);
- `version` sütunu;
- `price` sütunu: `varchar` əvəzinə `numeric(10,3)`. API-də yenə `"1.72"` string kimi qaytar. Hesablamalar (ROI, ekspres əmsal) üçün DB-də rəqəm lazımdır. **Float heç vaxt istifadə etmə**, pul/əmsal üçün dəqiq deyil.

## Nə edəcəksən
1. Upsert yaz, şərtlə: **yalnız yeni versiya köhnədən böyükdürsə** yenilə (`WHERE version < yeni_version`).
2. Matç + bazarlar + nəticələr **bir tranzaksiyada** yazılsın.
3. Bazar mənbədə yoxa çıxsa, **silmə**, `closed` et. Proqnozlar və tarixçə ona istinad edir.

## Diqqət
`ON CONFLICT` işləmək üçün həmin sütunlarda **unique constraint mütləq olmalıdır**, yoxsa Postgres xəta verir.

## Hazır olduğunu necə yoxlayarsan
- [ ] Eyni matç iki dəfə gəlsə, bazada bir sətir qalır.
- [ ] `version=5` yazılandan sonra `version=4` gəlsə, heç nə dəyişmir (test).
- [ ] Qiymət bazada rəqəmdir, API-də `"1.72"` kimi gəlir.
