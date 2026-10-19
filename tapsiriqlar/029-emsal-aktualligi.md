# 029 — Əmsal versiyası və aktuallıq (15 saniyə)

**Faza:** 2 · **Asılılıq:** 027 · **Status:** [ ]

## Məqsəd
Köhnəlmiş əmsallar işarələnsin və onlarla kupona keçid mümkün olmasın.

## Niyə
Sənəd (bölmə 3): "Əmsalların aktuallığı: MVP üçün layihə həddi server updated_at vaxtından 15 saniyədir. Daha köhnə qiymətlər işarələnir və yenilənənədək handoff üçün əlçatan olmur. Hədd tərəfdaşın məlumat axınının şərtlərinə uyğun konfiqurasiya edilir."

Bölmə 11 qəbul meyarı: "suspended və stale nəticə kupona ötürülə bilməz".

Bukmeker biznesi: köhnə qiymətlə mərc = bukmeker üçün itki. Tərəfdaş bizə bunun üçün etibar edir.

## Necə edəcəksən
1. `stale` **saxlanılan** sahə deyil, **hesablanan** sahədir: `now() - outcome.updated_at > stale_after_seconds`. Niyə DB-də `is_stale` sütunu saxlamaq pis ideyadır? (Onu kim, nə vaxt yeniləyəcək?)
2. Hədd tenant config-dən (`feed_provider.stale_after_seconds`, default 15).
3. API cavabında hər outcome üçün: `price`, `version`, `status`, `updated_at`, `is_stale`, `available` (= active && !stale && market open && event live/scheduled).
4. **Diqqət:** əgər feed 15 saniyədə bir yenilənmirsə (dəyişiklik yoxdursa), qiymət "stale" görünəcək. Provayder "heartbeat" göndərir? Dəyişiklik olmasa da `updated_at`-ı yeniləməlisən? Demo feed-də bunu necə edəcəksən? Bu vacib dizayn sualıdır.
5. Server vaxtı (`server_time`) cavabda var. Frontend saatı səhv olsa da, nisbi hesablaya bilsin.

## Qəbul meyarları
- [ ] 15 saniyə yenilənməyən outcome `is_stale: true` qaytarır.
- [ ] Stale outcome ilə handoff → 409 (task 111).
