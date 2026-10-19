# RADAR.FAN Backend – Tapşırıqlar

Qayda: eyni anda yalnız **bir** tapşırıq üzərində işlə. Bitirəndə mentora göstər, review-dan sonra `[x]` qoy.
Status: `[ ]` başlanmayıb · `[~]` işdə · `[x]` bitib

---

## A. Düzəlişlər (mövcud kod)

### [x] T1. `eventsRoutes`-u `app.ts`-də qeydə al
`/api/v1/events` əlçatan olmalıdır.

### [x] T2. Nonce yoxlamasını atomar et (race condition)
**Problem:** `/auth/exchange`-də əvvəl `redis.get(nonce)`, sonra `redis.set(nonce, ..., 'NX')` çağırılır. Bu iki ayrı addımdır. İki paralel sorğu eyni launch token ilə gəlsə, ikisi də `get` mərhələsindən "istifadə olunmayıb" cavabı alıb keçə bilər. Nəticədə **birdəfəlik** token iki dəfə istifadə olunur.

**Fikirləş:**
- Redis-in `SET key value EX ttl NX` əmri nə qaytarır, açar artıq varsa və yoxdursa?
- Bu qaytarılan nəticə təkbaşına "ilk dəfədir?" sualına cavab verirmi? Onda ayrıca `get` niyə lazımdır?
- Nonce-un yazıldığı yer hansı yoxlamalardan əvvəl/sonra olmalıdır? (İmza etibarsızdırsa, nonce yazmağın mənası varmı?)

**Qəbul meyarı:** Eyni token ilə eyni anda 2 sorğu göndərəndə yalnız biri uğurlu olur, digəri `SessionExpired` alır.

**Sənəd:** bölmə 6, "Tərəfdaş sessiyası ilə başlatma".

### [ ] T3. Launch token və access token-i bir-birindən ayır
**Problem:** İkisi də eyni secret ilə imzalanır, ayırd edən heç nə yoxdur. Access token-i `/auth/exchange`-ə launch token kimi göndərmək mümkündür. `issuer`/`audience` payload-dadır, amma verify zamanı yoxlanmır.

**Fikirləş:** Hər token növünü bir-birindən nə ayıra bilər (audience, token tipi claim-i, ayrı secret)? `@fastify/jwt` verify zamanı hansı seçimləri verir?

**Qəbul meyarı:** Access token launch token kimi qəbul olunmur və əksinə.

### [ ] T4. `JWT_SECRET` fallback-ını sil
`process.env.JWT_SECRET || "secret"` – env yoxdursa server zəif secret ilə qalxır. Env yoxdursa **start fail olmalıdır**. Eyni mövzu başqa env dəyişənləri (`DATABASE_URL`) üçün də keçərlidir.

### [ ] T5. `/demo-launch-token` yalnız demo rejimdə işləsin
Sənəd: demo/production rejimi **serverdə** təyin olunur. Production-da bu route mövcud olmamalıdır. Rejimi haradan oxuyacağını (env? tenant config?) özün müəyyən et və əsaslandır.

### [ ] T6. `server.ts`: `app.listen`-i düzgün await et
Hazırda `await` yoxdur, `try/catch` xətanı tutmur (məs. port məşğuldur). Düzəlt.

### [ ] T7. Input validasiyası
`req.body as {...}` yalnız TS-i susdurur. Etibarsız/boş `launch_token` və `jwt.verify` xətaları 500 qaytarır, 401 olmalıdır. Fastify JSON schema və ya zod araşdır, birini seç və əsaslandır. Eyni yanaşmanı `/events` query-lərinə də tətbiq et (`sport` yalnız enum dəyəri ola bilər).

### [ ] T8. Cavab və xəta formatını sənədə uyğunlaşdır
- Uğur: `{data, request_id}` (demo route-da `req_id` səhvdir).
- Xəta: `{error:{code,message,retryable,details}, request_id}`.
- `AppErrors`-a `code` (və lazım gələrsə `retryable`, `details`) əlavə et. Sənəd 8-ci bölmə: `SESSION_EXPIRED`, `ACCESS_DENIED`, `INVALID_INPUT`, ...
- 500 xətasında da `request_id` olsun.

### [ ] T9. `/events` N+1 sorğu problemi
Hər matç üçün 2 əlavə sorğu gedir (20 matç = 41 sorğu). Market və outcome-ları toplu yüklə. `inArray` və ya join düşün, sonra nəticəni yaddaşda qruplaşdır.

### [ ] T10. `/events` cursor pagination
- Sıralama tam deterministik olsun: `live` əvvəl, sonra `start_at`, sonra `id` (tie-breaker). Aktiv iştirakçı sayı üzrə sıralama Redis hazır olanda əlavə olunacaq.
- `next_cursor` real olsun, `limit+1` ideyasını araşdır.
- Offset və cursor arasındakı fərqi və niyə cursor seçildiyini özün izah et.

### [ ] T11. `/me`-də tenant yoxlaması və `preHandler` yanaşması
`/me` manual `jwtVerify` edir, `events` isə `preHandler` istifadə edir. Vahid yanaşma seç. User sorğusu `tenant_id` ilə də filtrlənsin.

---

## B. Təmizlik

### [ ] T12. Lazımsız faylları və skriptləri təmizlə
- `fix.ts` sil (`DROP TYPE ... CASCADE` təhlükəlidir).
- `package.json`-dakı `postinstall: prisma skills sync` sil (Prisma yoxdur).
- `app.ts`-də istifadə olunmayan `timestamp` import-unu sil.

### [ ] T13. Schema səliqəsi
- `uptadedAt` yazı xətasını düzəlt (migration lazım olacaq).
- `tenants.rulesVersion` sütun adı snake_case olsun (`rules_version`).
- `markets.schema.ts` enum-ları `@/db/schema.js`-dən deyil, birbaşa `enums.ts`-dən import etsin (dairəvi asılılıq).
- `updated_at` kim və necə yeniləyir? (`$onUpdate` araşdır.)

### [ ] T14. `.env` git-də izlənirmi?
`git ls-files .env` ilə yoxla. İzlənirsə, git-dən çıxar. Secret-lər commit tarixçəsinə düşübsə, onları rotasiya etmək lazımdır.

---

## C. Yeni funksionallıq (sənəd ardıcıllığı)

### [ ] T15. Idempotency-Key mexanizminin dizaynı (kod yazmazdan əvvəl)
Mesaj göndərmə, claim və handoff üçün lazımdır. Sənəd 8-ci bölmə. Yazılı cavab ver:
- Açar harada saxlanacaq (Redis? DB?), nə qədər müddətə (≥24 saat)?
- Eyni açar + eyni gövdə → saxlanmış nəticə; eyni açar + başqa gövdə → `409 IDEMPOTENCY_CONFLICT`. Gövdənin "eyni" olduğunu necə yoxlayacaqsan?
- İlk sorğu hələ işləyərkən ikinci eyni sorğu gəlsə nə baş verir?

### [ ] T16. Seçilmişlər: `PUT /favorites/{event_id}` və `DELETE /favorites/{event_id}`
Idempotent olmalıdır (təkrar PUT/DELETE xəta verməməlidir). Event başqa tenant-a aiddirsə `404`. Cavab: `saved: true/false`.

### [ ] T17. `GET /events/{id}`
Cavab: `event`, `markets`, `room_summary`. Başqa tenant-ın event-i görünməməlidir.

### [ ] T18. Room və mesajlar
`Room`, `Message` schema-ları, `GET/POST /rooms/{id}/messages`: server sequence, `client_message_id` ilə dublikatdan qorunma, 1–240 Unicode code point, rate limit (5/10s, 30/dəq).

### [ ] T19. Sorğular (poll) və moderasiya
### [ ] T20. WebSocket (`/ws-ticket`, kanallar, sequence)
### [ ] T21. Server viktorinası (battle, cavablar, deadline)
### [ ] T22. XP ledger və tapşırıqlar (claim)
### [ ] T23. Handoff (`POST /handoffs`, `ODDS_CHANGED`)
### [ ] T24. Analitika, yük testi, inteqrasiya qəbulu

> T19–T24 detalları o mərhələyə çatanda açılır.
