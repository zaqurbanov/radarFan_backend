# 005 — Schema səliqəsi: adlar, `updated_at`, dairəvi import

**Faza:** 0 · **Asılılıq:** 007 ilə birlikdə (migration lazım olacaq) · **Status:** [x] Həll olunub
(Köhnə `TASKS.md`: T13)

## Məqsəd
Mövcud 6 cədvəl ardıcıl adlandırılsın, `updated_at` həqiqətən yenilənsin və sxem faylları bir-birindən dairəvi asılı olmasın.

## Niyə
- `tenants` və `users`-də TS sahəsi `uptadedAt` yazı xətasıdır. Hər yerdə bu xəta təkrarlanacaq.
- `tenants.rulesVersion` DB-də `"rulesVersion"` adlanır, digər sütunlar isə snake_case-dir (`tenant_id`, `created_at`). Sənəddə `rules_version` yazılıb. Qarışıq adlar SQL yazanda, analitikada çaşqınlıq yaradır.
- `defaultNow()` yalnız INSERT zamanı işləyir. UPDATE zamanı `updated_at` köhnə qalır. Sənəddə əmsal aktuallığı (15 san.) `updated_at`-a əsaslanır (task 029), ona görə bu sahə **doğru** olmalıdır.
- `markets.schema.ts` enum-ları `@/db/schema.js`-dən import edir, `schema.js` isə `markets.schema.js`-i export edir. Bu dairəvi asılılıqdır, bəzən `undefined` xətası verir.

## Cədvəl dəyişiklikləri
| Cədvəl | Dəyişiklik |
|---|---|
| tenants | `uptadedAt` → `updatedAt`; DB sütunu `rulesVersion` → `rules_version` |
| users | `uptadedAt` → `updatedAt` |
| markets | enum importu birbaşa `@/common/enums/enums.js`-dən |
| bütün `updated_at` olanlar | UPDATE zamanı avtomatik yenilənsin |

Əlavə: `markets` cədvəlində `created_at`/`updated_at` yoxdur. Market statusu (open/suspended) dəyişəndə nə vaxt dəyişdiyini bilmək lazım olacaq. Əlavə et.

## Necə edəcəksən
1. Drizzle-da `$onUpdate` funksiyasını araşdır. Alternativ: Postgres trigger. Fərqi nədir? (`$onUpdate` yalnız Drizzle vasitəsilə edilən update-lərdə işləyir; trigger isə hər yerdə.) Birini seç və səbəbini yaz.
2. Sütun adını dəyişmək üçün migration yarat. `drizzle-kit generate` sütun adı dəyişikliyini "rename" kimi soruşacaq. "drop + add" seçsən, **məlumat itir**. Diqqətli ol.
3. Enum-ların harada yaşayacağını qərarlaşdır: `common/enums` yoxsa `db/schemas/enums.ts`? Enum DB obyektidir (`pgEnum`), ona görə `db` qovluğunda olması daha məntiqlidir. Seçimini əsaslandır.
4. Ad konvensiyasını bir dəfə yaz və qal: TS-də camelCase, DB-də snake_case. Drizzle-ın `casing: 'snake_case'` seçimi bunu avtomatlaşdıra bilər, araşdır.

## Tələlər
- Rename migration-ı lokal DB-də sınamadan tətbiq etmə.
- Kodda köhnə adla qalan istifadələr (`uptadedAt`) TS xətası verəcək. Bu yaxşıdır, hamısını tap.

## Qəbul meyarları
- [ ] `Grep "uptaded"` heç nə tapmır.
- [ ] DB-də bütün sütunlar snake_case-dir.
- [ ] Bir sətri update edəndə `updated_at` dəyişir (əl ilə yoxla).
- [ ] Sxem fayllarında `@/db/schema.js` importu yoxdur.
