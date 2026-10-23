# 009 — Xəta kodları sistemi

**Status:** [x] Həll olunub · **Faza:** 0 · **Əvvəl bitməli:** 008

## Qısaca
Hər xəta bu formada qayıtsın:
```
{
  "error": { "code": "ODDS_CHANGED", "message": "...", "retryable": false, "details": { ... } },
  "request_id": "..."
}
```

## Niyə lazımdır?
- Frontend **mətnə** yox, **koda** baxır. Mətn dilə görə dəyişir, kod dəyişmir.
- Məsələn: `ODDS_CHANGED` gəlsə, frontend yeni qiyməti göstərir. `RATE_LIMITED` gəlsə, gözləyir.
- `retryable: true` frontend-ə "Təkrar cəhd et" düyməsini göstərməyi deyir.

## Kodlar
| HTTP | Kod | Nə vaxt |
|---|---|---|
| 400 | `INVALID_INPUT` | Səhv məlumat göndərilib | *
| 401 | `SESSION_EXPIRED` | Token yoxdur, səhvdir və ya bitib | *
| 403 | `ACCESS_DENIED` | İcazə yoxdur | *
| 403 | `USER_RESTRICTED` | İstifadəçi ban və ya mute olunub | *
| 404 | `NOT_FOUND` | Tapılmadı | *
| 409 | `ANSWER_LOCKED` | Cavab artıq verilib | *
| 409 | `CHALLENGE_NOT_READY` | Tapşırıqlar bitməyib | *
| 409 | `ODDS_CHANGED` | Əmsal dəyişib | *
| 409 | `OUTCOME_UNAVAILABLE` | Əmsal bağlıdır |*
| 409 | `IDEMPOTENCY_CONFLICT` | Eyni açar, fərqli məlumat | *
| 409 | `INSUFFICIENT_COINS` | Coin çatmır (mağaza) | *
| 409 | `ALREADY_OWNED` | Əşya artıq alınıb | *
| 410 | `BATTLE_EXPIRED` | Duel vaxtı bitib | *
| 429 | `RATE_LIMITED` | Çox tez-tez sorğu (`retryable: true`) | *
| 500 | `INTERNAL` | Gözlənilməz xəta (`retryable: true`) | *
| 503 | `FEED_UNAVAILABLE` | Matç məlumatı gəlmir (`retryable: true`) | *

## Nə edəcəksən
1. `AppErrors` sinfinə `code`, `retryable`, `details` sahələrini əlavə et.
2. Bütün kodları bir faylda saxla ki, yazı xətası olmasın.
3. Error handler-də xətaları növünə görə ayır:
   - bizim `AppError` → olduğu kimi qaytar;
   - validasiya xətası → `INVALID_INPUT` (hansı sahə səhvdir, `details`-də);
   - JWT xətası → `SESSION_EXPIRED`;
   - qalan hər şey → `500 INTERNAL`.
4. Mövcud olmayan route da (404) eyni formada qayıtsın.

## Diqqət
- 500 xətasında istifadəçiyə **heç vaxt** daxili detal göstərmə (SQL, stack trace). Bunlar yalnız loga yazılır.
- DB "unique" xətası (Postgres kodu `23505`) adətən 409 olmalıdır, 500 yox.

## Hazır olduğunu necə yoxlayarsan
- [x] Mövcud olmayan URL → 404 `NOT_FOUND` formatında.
- [x] Səhv token → 401 `SESSION_EXPIRED`.
- [x] Gözlənilməz xəta → 500 `INTERNAL`, cavabda stack yoxdur, logda var.

---


## Sənəddəki format (ətraflı)
Mənbə: texniki sənəd, bölmə 8, "Formatlar və xətalar". Aşağıda **sənəddə yazılanlar** və **bizim əlavə izahımız** ayrılıb.

### 1. Uğurlu cavab
Sənəd: `{ data: object, request_id: string }`

```json
{
  "data": { "status": "ok", "version": "1.0.0" },
  "request_id": "d3ecb336-ed54-45ae-b5c1-97eb6ba921f4"
}
```
- `data` həmişə **obyektdir** (massiv və ya boş yox). Siyahı varsa onun içində: `data.items`.
- Siyahı cavabları sənəddə belədir: `items`, `next_cursor`, `server_time`.
- `request_id` həmişə var (task 008).

### 2. Xəta cavabı
Sənəd: `{ error: { code, message, retryable, details }, request_id }`

```json
{
  "error": {
    "code": "ODDS_CHANGED",
    "message": "Odds have changed",
    "retryable": false,
    "details": { "new_price": "3.10", "new_version": 7 }
  },
  "request_id": "d3ecb336-ed54-45ae-b5c1-97eb6ba921f4"
}
```

| Sahə | Tip | Nə üçündür |
|---|---|---|
| `code` | mətn (`ODDS_CHANGED`) | **Frontend məntiqi bunun üzərində qurulur.** Dəyişməz, dildən asılı deyil |
| `message` | mətn | İnsan üçün izah. Sənəd: "müştəri `message`-i lokallaşdırır", yəni frontend öz dilində göstərir, bu mətnə etibar etmir |
| `retryable` | `true` / `false` | `true` isə frontend "Təkrar cəhd et" düyməsi göstərə bilər |
| `details` | obyekt və ya yoxdur | Koda aid əlavə məlumat (aşağıdakı cədvəl) |

**Qaydalar:**
- HTTP status kodu (400, 409...) cavabın **başlığındadır**, body-də təkrar olunmur.
- `code` mətndir (`NOT_FOUND`), rəqəm yox. Rəqəm HTTP statusudur.
- 500 xətasında `message`-də daxili məlumat (SQL, fayl yolu) **olmamalıdır**.

### 3. HTTP status və kodlar (sənəddən)
| HTTP | Kodlar |
|---|---|
| 400 | `INVALID_INPUT` |
| 401 | `SESSION_EXPIRED` |
| 403 | `ACCESS_DENIED`, `USER_RESTRICTED` |
| 404 | `NOT_FOUND` |
| 409 | `ANSWER_LOCKED`, `CHALLENGE_NOT_READY`, `ODDS_CHANGED`, `OUTCOME_UNAVAILABLE` |
| 410 | `BATTLE_EXPIRED` |
| 429 | `RATE_LIMITED` |
| 503 | `FEED_UNAVAILABLE` |

Sənəddə **adı çəkilən**, amma status cədvəlində yazılmayanlar: `IDEMPOTENCY_CONFLICT` (409, bölmə 8-in mətnində).
Saytdan əlavə etdiyimiz (sənəddə yoxdur): `INSUFFICIENT_COINS` (409), `ALREADY_OWNED` (409), `INTERNAL` (500). Bunları məhsul sahibinə bildir.

### 4. `details`-in məzmunu
Sənəd yalnız iki halı dəqiq göstərir:

| Kod | `details`-də nə var (sənəd) | Nümunə |
|---|---|---|
| `ODDS_CHANGED` | **aktual qiymət və versiya** | `{ "new_price": "3.10", "new_version": 7 }` |
| `RATE_LIMITED` | **`retry_after_seconds`** | `{ "retry_after_seconds": 4 }` |

Digər kodlar üçün `details` sənəddə təyin olunmayıb. Bizim təklifimiz (məhsul sahibi ilə razılaşdır):

| Kod | Təklif olunan `details` |
|---|---|
| `INVALID_INPUT` | `{ "fields": [ { "path": "limit", "message": "must be between 1 and 50" } ] }` |
| `CHALLENGE_NOT_READY` | `{ "remaining": ["send_message"] }` |
| `INSUFFICIENT_COINS` | `{ "balance": 50, "price": 80 }` |
| `USER_RESTRICTED` | `{ "until": "2026-10-24T10:00:00Z" }` (susdurulubsa) |
| `OUTCOME_UNAVAILABLE` | `{ "outcome_ids": ["..."] }` |

Qayda: `details` varsa **həmişə obyektdir** (string yox), çünki frontend onun içindən sahə oxuyur.

### 5. Təkrar sorğu qaydası (Idempotency)
Sənəd:
- Eyni `Idempotency-Key` **fərqli məlumatla** gəlsə → `409 IDEMPOTENCY_CONFLICT`.
- Eyni `Idempotency-Key` **eyni məlumatla** gəlsə → əvvəl saxlanmış nəticə **olduğu kimi** qaytarılır (xəta deyil).
- Server açarları ən azı **24 saat** saxlayır.

### 6. Real nümunə: viktorina cavabı
Sənəd bu nümunəni verir:
```json
{
  "data": {
    "battle_id": "...",
    "question_id": "...",
    "accepted": true,
    "correct": true,
    "provisional_xp": 50,
    "explanation": "Qapıçı daxil olmaqla 11 oyunçu",
    "next_available": true
  },
  "request_id": "..."
}
```
Vacib qayda: `correct` və `explanation` sahələri **sual bağlandıqdan sonra** əlçatandır. Bundan əvvəl bu sahələr cavabda **olmamalıdır** (düzgün cavab sızmasın).

### 7. Sənəd bunu da deyir
- Hadisələrin və JSON modellərinin dəqiq sxemi **OpenAPI**-də yazılır: sahələrin məcburiliyi, boş ola bilənlər, icazəli dəyərlər (task 122).
- Bukmeker adapterinin müqavilələri ayrıca versiyalanır. Təchizatçının sahələrini xəbərsiz bizim açıq modelə əlavə etmək olmaz.

### 8. Bizim indiki vəziyyətimiz
| Tələb | Vəziyyət |
|---|---|
| Uğur: `{ data, request_id }` | ✅ (task 008) |
| `AppErrors`-da `code`, `retryable`, `details` saxlanır | ✅ |
| Xəta cavabı `{ error: { code, message, retryable, details }, request_id }` | ✅ `errorResponse` |
| 404 (olmayan route) eyni formada | ✅ `setNotFoundHandler` |
| JWT və səhv JSON xətaları eyni formada | ✅ (detallı validasiya xətaları task 010-da) |
| 409 unique xətası (Postgres `23505`) | ⏳ sonraya (task 036-dan sonra lazım olacaq) |

---

## Bağlanış qeydi: nə edildi
- `src/common/constants/errorCodes.ts`: sənədin bütün kodları. Hər elementdə `statusCode` (HTTP), `code` (mətn), `message`, `retryable`.
- `AppErrors`: `statusCode`, `code`, `retryable`, `details` obyektdə saxlanılır. `name` (JS-in sinif adı) ilə `code` (API kodu) **ayrıdır**.
- `src/common/responses/error.response.ts`: `errorResponse(error, req)` forma qurur: `{ error: { message, code, retryable, details }, request_id }`.
- `app.ts`-də error handler-in **üç budağı**:
  1. `instanceof AppErrors` → olduğu kimi;
  2. kənardan gələn 4xx (məs. səhv JSON) → `clientErrorByStatus` xəritəsi ilə kataloq koduna çevrilir, `warn` səviyyəsində loglanır;
  3. qalan hər şey → 500 `INTERNAL`, real xəta yalnız loga yazılır.
- `setNotFoundHandler`: olmayan route 404 `NOT_FOUND`.
- `/auth/exchange`: `jwt.verify` `try/catch` ilə `SessionExpiredError`-a çevrilir; body olmaya bilər (`body?.launch_token`) → 400 `INVALID_INPUT`.

## Öyrənilən dərslər
- `instanceof AppErrors` yalnız **bizim** `new ...` ilə yaradılan xətalar üçün `true` verir. Fastify (`FastifyError`) və jwt (`TokenError`) kitabxanası öz xəta siniflərini atır.
- Kənar xəta obyektində də `code` sahəsi var (`FST_ERR_...`). Onu cavaba **birbaşa yazma**, əvvəl kataloq koduna çevir.
- `as` TypeScript-i susdurur, iş vaxtında heç nə yoxlamır. Body `undefined` ola bilər.
- İstifadəçi səhvi 4xx-dir və `warn` səviyyəsində loglanmalıdır. Yoxsa 5xx xəbərdarlıqları (task 125) saxta siqnal verər.

## Sonraya saxlananlar
- [ ] `INVALID_INPUT` üçün `details`-də hansı sahənin səhv olduğu (`fields`): task 010.
- [ ] `UnauthorizedError` sinfi (`UNAUTHORIZED` kodu sənəddə yoxdur) artıq heç yerdə istifadə olunmur, `appErrors.ts`-dən silinə bilər.
- [ ] `expires_at` hələ də sabit 15 dəqiqədir, amma token-in real ömrü `ACCESS_TOKEN_TTL` env-dən gəlir. İkisi eyni mənbədən hesablanmalıdır (task 013).
- [ ] Postgres unique xətası (`23505`) → 409.

