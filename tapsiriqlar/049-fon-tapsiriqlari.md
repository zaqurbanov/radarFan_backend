# 049 — Fon tapşırıqları

**Status:** [ ] · **Faza:** 3 · **Əvvəl bitməli:** 006

## Qısaca
"5 dəqiqə sonra et", "hər gecə et" tipli işlər üçün etibarlı mexanizm.

## Niyə lazımdır?
Layihədə çoxlu "vaxt keçəndə" qaydası var:
| İş | Task |
|---|---|
| Demo matç simulyasiyası | 026 |
| Outbox relay | 045 |
| Onlayn sayğacının bazaya yazılması | 046 |
| Otağın 24 saat sonra bağlanması | 057 |
| Sorğunun bağlanması | 064 |
| Duel: sual vaxtı, 10 saniyəlik avtomatik keçid | 077, 078 |
| Duel: 5 dəqiqə sonra "tərk edilib" | 081 |
| Proqnozların hesablanması | 099 |
| Balans yoxlaması | 084 |
| Köhnə məlumatın silinməsi | 036, 045, 126 |

## Alət seçimi
- **BullMQ** (Redis əsaslı): gecikmiş işlər, təkrar cəhd, cron, bir neçə serverdə təhlükəsiz. **Tövsiyə.**
- `node-cron`: sadədir, amma "bu duel üçün 5 dəqiqə sonra" kimi tək işlər üçün yararsızdır.
- `pg-boss`: Postgres əsaslı, Redis-dən asılı deyil.

## Nə edəcəksən
1. `src/jobs/` qovluğu: növbələr, işçilər, cron cədvəli.
2. Başlanğıcda işçilər API ilə **eyni prosesdə** işləsin (`RUN_WORKERS=true` env ilə). Production-da ayrı proses (task 127).
3. **Hər iş idempotent olmalıdır.** İki dəfə işləsə, nəticə dəyişməməlidir. Məsələn "duel sualını bağla": artıq bağlıdırsa → heç nə etmə.
4. Yalnız **bir** serverdə işləməli olan işlər (demo simulyasiya) üçün Redis lock: `SET açar dəyər NX PX ...`.

## Fikirləş
Hər deadline üçün iş lazım deyil. Bəzən "oxuyanda yoxla" kifayətdir: cavab gəlir → "deadline keçibmi?" Fon işi yalnız **frontend-ə bildiriş göndərmək** lazım olanda vacibdir.

## Hazır olduğunu necə yoxlayarsan
- [ ] 5 saniyə gecikmiş test işi 5 saniyə sonra işləyir.
- [ ] İki işçi eyni işi iki dəfə görmür.
- [ ] Server yenidən başlayandan sonra gecikmiş işlər itmir.
