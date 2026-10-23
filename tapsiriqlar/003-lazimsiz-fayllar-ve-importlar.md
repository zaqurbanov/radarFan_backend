# 003 — Lazımsız fayllar və importların təmizlənməsi

**Faza:** 0 · **Asılılıq:** yoxdur · **Status:** [x] Həll olunub
(Köhnə `TASKS.md`: T12)

## Məqsəd
Layihədə təhlükəli və ya istifadə olunmayan şeylər qalmasın.

## Niyə
- `fix.ts`: `DROP TYPE user_role CASCADE`. Səhvən işə salınsa, `users.role` sütunu **silinir**. Belə "bir dəfəlik" skriptlər repoda qalmamalıdır. Sxem dəyişikliyi yalnız migration ilə olur (task 007).
- `package.json`-dakı `postinstall: prisma skills sync`: layihədə Prisma yoxdur. Hər `npm install` mənasız əmr işlədir.
- `app.ts`-də istifadə olunmayan `timestamp` import-u var.

## Necə edəcəksən
1. `fix.ts`-i sil. Əgər onun həll etdiyi problem (enum dəyişikliyi) yenidən lazım olarsa, bunu migration ilə necə edərdin? Fikirləş: Postgres-də enum-a dəyər əlavə etmək və silmək fərqli çətinlikdədir.
2. `postinstall` skriptini sil.
3. İstifadə olunmayan importları tap. `tsconfig`-də `noUnusedLocals`-ı aktivləşdirmək və ya ESLint qoşmaq barədə qərar ver.
4. `package.json`-a faydalı skriptlər əlavə et: `build`, `start`, `typecheck` (`tsc --noEmit`), `db:generate`, `db:migrate`, `db:seed` (task 007), `test` (task 012).

## Öyrən
- `tsc --noEmit` ilə tip yoxlaması
- ESLint + `typescript-eslint` (istəyə bağlı)

## Qəbul meyarları
- [x] `fix.ts` yoxdur.
- [x] `npm install` heç bir Prisma əmri işlətmir (`postinstall` silinib).
- [x] `npm run typecheck` (`tsc --noEmit`) xətasız keçir.

---

## Bağlanış qeydi: nə edildi
- `fix.ts` və `postinstall` (prisma) silindi. `noUnusedLocals: true` aktivdir.
- `package.json`: `build`, `start`, `typecheck` skriptləri.
- `tsconfig.json`: `rootDir: ./src`, `outDir: ./dist`.
- **Kompilyasiya nəticələri repodan təmizləndi.** `tsc` bir dəfə `outDir`-siz işləyib `src/**/*.js`, `.d.ts`, `.js.map` yaratmışdı və bunlar səhvən commit olunmuşdu. Ayrıca commit-lərlə silindi (tarixçədə qalır, çünki hələ push olunmamışdı və tarixi yenidən yazmadıq).
- `.gitignore`: `/dist`, `*.js`, `*.js.map`, `*.d.ts.map`.

## Bilməli olduğun məsələlər
- `*.js` qaydası bütün layihəyə aiddir. Sabah əl ilə yazılmış `vitest.config.js` kimi fayl **səssizcə ignore olunacaq**. Lazım gələrsə `!` istisnası əlavə et.
- `src/common/types/fastify.d.ts` **əl ilə yazılmış** mənbə faylıdır, ona görə `*.d.ts` qaydası yazılmayıb.
- `npm start` hələ işləmir: `tsc` `@/` yollarını dəyişmir. Həlli task 127-dədir (`tsc-alias` və ya bundler).
- `npm run dev` (`tsx`) tipləri **yoxlamır**. Tip xətalarını `typecheck` tapır.
