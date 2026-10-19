# 127 — Docker image və CI

**Faza:** 12 · **Asılılıq:** 123 · **Status:** [ ]

## Məqsəd
Backend təkrarlana bilən konteyner kimi build olunsun. Hər push-da testlər avtomatik işləsin.

## Niyə
Sənəd (bölmə 11, təhvil): "işə salma/buraxılış təlimatı", "mühit konfiqurasiyası". Bölmə 10: "Mühitlər: local demo, test tərəfdaşı ilə staging və production."

## Necə edəcəksən
1. **Dockerfile** (multi-stage):
   - build stage: `npm ci`, `tsc` → `dist/`;
   - runtime stage: yalnız production asılılıqları + `dist/`, non-root user, `NODE_ENV=production`.
   - `tsx` production-da istifadə olunmur. `@/` path alias-ları build-də necə həll olunur? (`tsc-alias` və ya bundler, araşdır.)
2. Proseslər: `api` (HTTP + WS), `worker` (job-lar, 049), `migrate` (bir dəfəlik). Eyni image, fərqli komanda.
3. **CI** (GitHub Actions):
   - typecheck, lint
   - testlər (Postgres + Redis service container-ləri ilə)
   - `openapi.json` dəyişibsə və commit olunmayıbsa → fail (122)
   - docker build
   - `npm audit`
4. Image-ə versiya teqi (git SHA).

## Qəbul meyarları
- [ ] `docker build` + `docker run` ilə server işləyir.
- [ ] Container root kimi işləmir.
- [ ] PR-da CI testləri avtomatik işləyir.
