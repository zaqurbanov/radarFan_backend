# 127 — Docker image və avtomatik yoxlama (CI)

**Status:** [ ] · **Faza:** 12 · **Əvvəl bitməli:** 123

## Qısaca
Backend Docker image kimi qurulsun. Hər push-da testlər avtomatik işləsin.

## Nə edəcəksən

### 1. Dockerfile (iki mərhələli)
- **Qurma mərhələsi:** asılılıqları yüklə, TypeScript-i kompilyasiya et → `dist/`.
- **İşləmə mərhələsi:** yalnız production asılılıqları + `dist/`. Root olmayan istifadəçi.

**Bilinən problem:** `tsc` `@/` yollarını **dəyişmir**, ona görə `npm start` indi işləmir (task 003-də görmüşdük). Həll: `tsc-alias` və ya bundler (esbuild/tsup). Araşdır.

### 2. Bir image, üç komanda
- `api`: HTTP + WebSocket
- `worker`: fon işləri (049)
- `migrate`: bir dəfəlik migration

### 3. CI (GitHub Actions)
- tip yoxlaması, lint;
- testlər (Postgres + Redis konteynerləri ilə);
- `openapi.json` dəyişib, amma commit olunmayıbsa → xəta;
- Docker build;
- `npm audit`.

### 4. Image versiyası
Git commit hash-i ilə etiketlə.

## Hazır olduğunu necə yoxlayarsan
- [ ] `docker build` + `docker run` ilə server işləyir.
- [ ] Konteyner root kimi işləmir.
- [ ] Pull request-də testlər avtomatik işləyir.
