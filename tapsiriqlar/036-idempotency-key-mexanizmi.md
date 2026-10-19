# 036 — Idempotency-Key mexanizmi

**Faza:** 2 · **Asılılıq:** 009, 012 · **Status:** [ ]
(Köhnə `TASKS.md`: T15)

## Məqsəd
Dəyişdirici sorğu şəbəkə xətası səbəbindən təkrar göndəriləndə ikinci dəfə icra olunmasın, əvvəlki nəticə qaytarılsın.

## Niyə
Sənəd (bölmə 8): "Mükafat verən, mesaj göndərən və handoff yaradan dəyişiklik sorğuları üçün UUID formatında Idempotency-Key məcburidir... Eyni Idempotency-Key başqa gövdə ilə verilərsə, 409 IDEMPOTENCY_CONFLICT; əvvəlki gövdə ilə verilərsə, saxlanmış nəticə qaytarılır. Server açarları ən azı 24 saat saxlayır, mükafatların unikallığını əlavə olaraq ledger təmin edir."

Ssenari: mobil şəbəkədə istifadəçi "Claim 100 XP" basır. Server XP verir, amma cavab yolda itir. Frontend 401-dən sonra (bölmə 6) və ya timeout-dan sonra təkrarlayır. Idempotency olmadan: 200 XP.

## Cədvəl (və ya Redis)
**`idempotency_keys`**
| Sütun | Tip | Qeyd |
|---|---|---|
| tenant_id | uuid | |
| user_id | uuid | |
| key | uuid | |
| route | varchar(100) | `POST /challenges/:id/claim` |
| request_hash | char(64) | body + params SHA-256 |
| status | enum(in_progress, completed) | |
| response_status | int NULL | |
| response_body | jsonb NULL | |
| created_at | timestamptz | |
| expires_at | timestamptz | created + 24 saat |

PK: (`tenant_id`, `user_id`, `key`). Index: `expires_at` (təmizləmə job-u üçün).

**DB yoxsa Redis?** DB: biznes əməliyyatı ilə **eyni tranzaksiyada** yazıla bilər (ən etibarlı). Redis: sürətli, amma tranzaksiya yoxdur. Tövsiyə: DB.

## Alqoritm (özün addımları başa düş)
1. Başlıq yoxdursa → 400 (yalnız məcburi route-larda).
2. `INSERT ... (status=in_progress) ON CONFLICT DO NOTHING`.
3. Insert oldu → əməliyyatı icra et → cavabı `completed` ilə saxla → qaytar.
4. Insert olmadı (açar var):
   - hash fərqlidir → 409 `IDEMPOTENCY_CONFLICT`;
   - `completed` → saxlanmış cavabı qaytar;
   - `in_progress` → ilk sorğu hələ işləyir. Nə edirsən? (409 + `retryable: true`, ya da qısa gözləmə.) Qərar ver.
5. Əməliyyat **xəta** ilə bitdisə, açarı nə edirsən? 4xx xətanı saxlamaq (eyni nəticə) vs silmək (təkrar cəhdə icazə). 5xx-də silmək məntiqlidir.

## Necə edəcəksən
1. Fastify plugin + route config: `config: { idempotent: true }`.
2. Hook-lar: `preHandler` (yoxla/yarat) və `onSend` (nəticəni saxla). Daha yaxşısı: biznes əməliyyatı ilə eyni tranzaksiyada saxlamaq üçün helper funksiya.
3. Təmizləmə: köhnə açarları silən fon job (task 049).

## Tələlər
- Açar **user-ə** bağlı olmalıdır. Yoxsa A istifadəçisi B-nin açarını təxmin edib B-nin cavabını ala bilər.
- Hash üçün JSON-u normallaşdır (açarların sırası).

## Qəbul meyarları
- [ ] Eyni açar + eyni body iki dəfə → bir əməliyyat, iki eyni cavab.
- [ ] Eyni açar + başqa body → 409.
- [ ] Eyni açarla **paralel** iki sorğu → bir əməliyyat (test, `Promise.all`).
