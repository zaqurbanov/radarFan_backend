# 049 — Fon tapşırıqları (scheduler və queue)

**Faza:** 3 · **Asılılıq:** 006 · **Status:** [ ]

## Məqsəd
Vaxta bağlı və asinxron işlər üçün etibarlı mexanizm.

## Niyə
Sənəddə çoxlu "vaxt keçəndə" qaydaları var:
| İş | Task |
|---|---|
| Demo feed simulyasiyası | 026 |
| Outbox relay | 045 |
| Presence snapshot | 046 |
| Otaq 24 saat sonra read_only | 057 |
| Poll `closes_at` | 064 |
| Battle sual deadline-ı, 10 san. avtomatik keçid | 078 |
| 5 dəq. sonra abandoned | 081 |
| Proqnoz hesablaşması | 099 |
| Balans uzlaşdırması | 084 |
| Köhnə idempotency açarları, outbox təmizliyi | 036, 045 |

Bölmə 6: "fon tapşırıqları tenant-ı və hüquqları yoxlayır".

## Seçim
- **BullMQ** (Redis əsaslı queue): gecikmiş job-lar (`delay`), təkrar cəhd, cron (repeatable), bir neçə instansiyada təhlükəsiz. **Tövsiyə.**
- `node-cron` + Redis lock: sadə, amma gecikmiş tək job-lar üçün yararsızdır.
- Postgres əsaslı (`pg-boss`): Redis-dən asılı deyil.

## Necə edəcəksən
1. `src/jobs/`: queue tərifləri, worker-lər, cron cədvəli.
2. Worker-lər API ilə eyni prosesdə yoxsa ayrı prosesdə? Başlanğıcda eyni proses + env bayrağı (`RUN_WORKERS=true`). Production-da ayrı (task 127).
3. **Hər job idempotent olmalıdır.** Job iki dəfə işləsə, nəticə dəyişməməlidir. Məs. "battle deadline" job-u: sual artıq bağlanıbsa, heç nə etmə.
4. **Lazy evaluation** alternativi: bəzi deadline-lar üçün job lazım deyil. Oxuma zamanı `now > deadline_at` yoxla (task 078-də müzakirə). Job yalnız **push** hadisəsi lazım olanda vacibdir.
5. Bir instansiyada işləməli olan şeylər (demo simulyasiya) üçün Redis lock (`SET NX PX`) + yenilənmə.

## Qəbul meyarları
- [ ] 5 san. gecikmiş test job-u 5 san. sonra işləyir.
- [ ] İki worker eyni job-u iki dəfə icra etmir.
- [ ] Server restartından sonra gecikmiş job-lar itmir.
