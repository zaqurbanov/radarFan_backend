# 036 — Təkrar sorğulardan qorunma (Idempotency-Key)

**Status:** [ ] · **Faza:** 2 · **Əvvəl bitməli:** 009, 012

## Qısaca
Vacib sorğu (XP almaq, mesaj göndərmək, bukmekerə keçid) **təsadüfən iki dəfə** gəlsə, iş **bir dəfə** görülsün.

## Niyə lazımdır? (real ssenari)
İstifadəçi metroda "100 XP al" düyməsini basır.
1. Server XP-ni verir.
2. Cavab yolda itir (internet kəsildi).
3. Frontend "cavab gəlmədi" deyib sorğunu **təkrar** göndərir.
4. Qorunma olmasa → **200 XP**.

## Necə işləyir
- Frontend hər vacib sorğuya unikal ID qoşur: `Idempotency-Key: <uuid>` başlığı.
- Server bu ID-ni yadda saxlayır:
  - **ilk dəfə** gəlib → işi gör, nəticəni saxla;
  - **eyni ID + eyni məlumat** → işi **təkrar etmə**, saxlanmış nəticəni qaytar;
  - **eyni ID + fərqli məlumat** → 409 `IDEMPOTENCY_CONFLICT`.
- ID-lər ən azı 24 saat saxlanır.

## Yeni cədvəl: `idempotency_keys`
| Sütun | İzah |
|---|---|
| tenant_id, user_id, key | birlikdə əsas açar |
| route | hansı endpoint |
| request_hash | sorğu məlumatının hash-i (eyni/fərqli olduğunu yoxlamaq üçün) |
| status | `in_progress` / `completed` |
| response_status, response_body | saxlanmış cavab |
| created_at, expires_at | |

**Niyə Redis yox, DB?** DB-də işi və açarı **eyni tranzaksiyada** yaza bilərsən. Ən etibarlısı budur.

## Nə edəcəksən (addımlar)
1. Başlıq yoxdursa → 400 (yalnız məcburi route-larda).
2. Açarı `in_progress` ilə yazmağa çalış (`ON CONFLICT DO NOTHING`).
3. Yazıldı → işi gör → nəticəni `completed` ilə saxla → qaytar.
4. Yazılmadı (açar artıq var):
   - hash fərqlidir → 409;
   - `completed` → saxlanmış cavabı qaytar;
   - `in_progress` → ilk sorğu hələ işləyir. Nə edəcəksən? (Məsələn 409 + "bir azdan təkrar et".) Qərar ver.
5. Köhnə açarları silən fon tapşırığı (task 049).

## Diqqət
- Açar **istifadəçiyə bağlı** olmalıdır. Yoxsa biri başqasının açarını təxmin edib onun cavabını ala bilər.
- Hash-dən əvvəl JSON açarlarını eyni sıraya sal (`{a,b}` və `{b,a}` eyni məlumatdır).

## Hazır olduğunu necə yoxlayarsan
- [ ] Eyni açar + eyni məlumat 2 dəfə → iş bir dəfə, iki eyni cavab.
- [ ] Eyni açar + fərqli məlumat → 409.
- [ ] Eyni açarla **eyni anda** 2 sorğu → iş bir dəfə (test, `Promise.all`).
