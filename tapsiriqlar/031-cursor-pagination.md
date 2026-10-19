# 031 — Cursor (keyset) pagination

**Faza:** 2 · **Asılılıq:** 030, 032 · **Status:** [ ]
(Köhnə `TASKS.md`: T10)

## Məqsəd
`next_cursor` real olsun. Növbəti səhifə dublikatsız və buraxılmadan gəlsin.

## Niyə
- Sənəd (bölmə 3): "Bölmə açıldıqda müştəri 20-dək matç və növbəti səhifənin kursorunu alır... Son kartda növbəti səhifə yüklənir; belə səhifə yoxdursa, siyahının sonu göstərilir."
- Bölmə 8: "Səhifələmə cursor-based-dir; limit standart olaraq 20, maksimum 50-dir."
- **Offset niyə pisdir:** canlı lentdə matçların sırası dəyişir (aktiv iştirakçı sayı dəyişir). İstifadəçi 1-ci səhifəni oxuyarkən yeni matç başa düşsə, offset=20 ilə 2-ci səhifədə eyni matç təkrar görünür və ya biri buraxılır. Böyük offset-də DB bütün əvvəlki sətirləri oxuyub atır.

## Necə edəcəksən
1. Cursor = sıralama açarlarının son elementdəki dəyərləri: məsələn `(status_rank, start_at, id)`. Bunu base64url JSON kimi kodla. Müştəri üçün qeyri-şəffaf (opaque) olsun.
2. Sorğu: `WHERE (status_rank, start_at, id) > (:a, :b, :c) ORDER BY status_rank, start_at, id LIMIT :limit + 1`. Row comparison Postgres-də işləyir, araşdır.
3. `limit + 1` hiyləsi: bir artıq götür. Əgər gəldisə, `next_cursor` var, artıq olanı at.
4. **Sıralama tam deterministik olmalıdır.** Sonda unikal sütun (`id`) olmasa, bərabər `start_at`-lı matçlar arasında sıra təsadüfi olur və cursor qırılır.
5. Aktiv iştirakçı sayı ilə sıralama (task 032) cursor-u çətinləşdirir, çünki bu dəyər Redis-dədir və tez dəyişir. Task 032-də bu barədə qərar ver.
6. Cursor-a filtrləri də daxil et (sport, favorites), ya da filtr dəyişəndə cursor etibarsız sayılsın. Sənəd: "Filtrin dəyişməsi istifadəçini ilk karta qaytarır".
7. Saxta və ya etibarsız cursor → 400 `INVALID_INPUT`.

## Öyrən
- "Keyset pagination", "seek method" (use-the-index-luke.com)

## Qəbul meyarları
- [ ] 45 matçla limit=20: səhifələr 20 + 20 + 5, `next_cursor` axırda `null`.
- [ ] Bütün səhifələrin birləşməsində dublikat yoxdur (test).
- [ ] Etibarsız cursor → 400.
