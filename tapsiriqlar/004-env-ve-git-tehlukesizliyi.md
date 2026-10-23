# 004 — `.env` və git təhlükəsizliyi

**Faza:** 0 · **Asılılıq:** yoxdur · **Status:** [x] Həll olunub
(Köhnə `TASKS.md`: T14)

## Məqsəd
Secret-lər heç vaxt git tarixçəsində olmasın.

## Niyə
`.gitignore` ilk commit-dən cəmi 2 dəqiqə əvvəl yaradılıb. Əgər `.env` artıq commit-ə düşübsə, `.gitignore`-a əlavə etmək onu tarixçədən silmir. Repo GitHub-a push olunsa, secret-lər açıqdır.

## Necə edəcəksən
1. Yoxla: `git ls-files .env` heç nə çıxarmalıdır. `git log --all -- .env` ilə tarixçəyə də bax.
2. Əgər izlənirsə: `git rm --cached .env` et, commit et.
3. Tarixçəyə düşübsə: içindəki bütün secret-ləri **dəyişdir** (DB parolu, JWT secret). Tarixçəni yenidən yazmaq (filter-repo) ikinci dərəcəlidir; əsas qayda: sızmış secret-i dəyişmək.
4. `.gitignore`-a əlavə et: `dist/`, `coverage/`, `*.log`, `.env.*` (amma `.env.example` istisna olsun, `!` qaydasını araşdır).

## Qəbul meyarları
- [x] `git ls-files` siyahısında `.env` yoxdur.
- [x] `.env.example` izlənir, `.env` izlənmir.

---

## Bağlanış qeydi: nə yoxlanıldı
- `git log --all -- .env` **boşdur**: `.env` heç vaxt commit olunmayıb.
- Tarixçədə `JWT_SECRET=<dəyər>` tipli sətir tapılmadı, secret-ləri dəyişməyə ehtiyac olmadı.
- `.gitignore`-da `.env` var. `.env.test` bilərəkdən repoda saxlanılır (yalnız lokal test konteynerlərinin uydurma parolları, fayla `# only local test` şərhi yazılıb). Bu fayla **heç vaxt real secret yazma**.
