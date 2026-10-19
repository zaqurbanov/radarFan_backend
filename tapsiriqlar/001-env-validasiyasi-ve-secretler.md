# 001 — Env validasiyası və secret-lər

**Faza:** 0 · Təmiz təməl · **Asılılıq:** yoxdur · **Status:** [x] Həll olunub
(Köhnə `TASKS.md`: T4)

## Məqsəd
Server yalnız bütün vacib mühit dəyişənləri düzgün verildikdə başlasın. Zəif "default" secret-lər olmasın.

## Niyə
- İndi `app.ts`-də `process.env.JWT_SECRET || "secret"` var. `.env` unudulsa, server **susqun şəkildə** hamının bildiyi secret ilə qalxır. Hər kəs istənilən tenant/user üçün token imzalaya bilər.
- Sənəd (bölmə 10): "tenant üçün ayrı məxfi məlumatlar", "Production üçün ... girişlərin yoxlanması". Konfiqurasiya xətası start zamanı tutulmalıdır, ilk istifadəçi sorğusunda yox.
- `dotenv/config` hazırda 3 yerdə import olunur (`server.ts`, `db/index.ts`, `config/redis.ts`). Bu, konfiqurasiyanın dağınıq olduğunu göstərir.

## Necə edəcəksən
1. `src/config/env.ts` kimi **tək** bir modul yarat. Bütün `process.env` oxunuşları yalnız burada olsun.
2. Lazım olan dəyişənlərin siyahısını çıxar: `NODE_ENV`, `PORT`, `DATABASE_URL`, `REDIS_URL`, `JWT_ACCESS_SECRET`, `APP_MODE` (demo/production, task 015), sonra əlavə olunacaqlar.
3. Hər birinin tipini və qaydasını müəyyən et: məcburidirmi? Default-u ola bilərmi? (Məs. `PORT` default ola bilər, secret isə **heç vaxt**.)
4. Validasiya üçün sxem kitabxanası seç (task 010-da da istifadə edəcəksən; `zod` tövsiyə edirəm, çünki həm env, həm request üçün bir alət olur).
5. Validasiya uğursuz olsa: aydın xəta mesajı (hansı dəyişən, niyə) yaz və prosesi `exit(1)` ilə dayandır.
6. Secret uzunluğu üçün minimum qoy (məs. 32 simvol). Niyə uzunluq vacibdir? HMAC açarı haqqında oxu.
7. Digər fayllardakı `process.env` və `dotenv/config` importlarını bu modula yönləndir.
8. Kökdə `.env.example` yarat: bütün açarlar var, dəyərlər boş və ya nümunə (real secret yox).

## Tələlər
- `Number(process.env.PORT)` boş string üçün `0` verir. Sxem bunu tutmalıdır.
- `.env.example`-ə real dəyər yazma, o git-ə düşür.
- Testlərdə (task 012) ayrıca env lazım olacaq. Modulu elə qur ki, test zamanı başqa dəyərlər verilə bilsin.

## Öyrən
- 12-factor app: Config bölməsi
- `zod` ilə `safeParse`, `coerce`
- HMAC-SHA256 və açar uzunluğu

## Qəbul meyarları
- [ ] `JWT_ACCESS_SECRET` silinəndə server başlamır və konsolda hansı dəyişənin çatışmadığı yazılır.
- [ ] Kodda `|| "secret"` tipli fallback qalmayıb.
- [ ] `process.env` yalnız bir faylda oxunur (`Grep` ilə yoxla).
- [ ] `.env.example` mövcuddur.
