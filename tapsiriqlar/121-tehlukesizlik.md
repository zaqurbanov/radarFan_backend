# 121 — Təhlükəsizlik: CORS, CSP, başlıqlar, global rate limit

**Faza:** 12 · Production hazırlığı · **Asılılıq:** hamısı · **Status:** [ ]

## Məqsəd
Production üçün təhlükəsizlik tələblərini bağlamaq.

## Niyə
Sənəd (bölmə 10): "Production üçün HTTPS/WSS, CORS/CSP məhdudiyyətləri, girişlərin yoxlanması, rate limits, rol auditi, tenant üçün ayrı məxfi məlumatlar və loqların tokenlərdən və mesaj mətnindən qorunması tələb olunur."

İndi `app.register(cors, { origin: true })`: **istənilən** sayt bizim API-yə brauzerdən sorğu göndərə bilər.

## Yoxlama siyahısı
| Sahə | Nə etməli |
|---|---|
| CORS | `origin`: tenant-ların icazəli origin-ləri (021 `allowed_origins`). Dinamik funksiya. `credentials` yalnız cookie rejimində (019) |
| Başlıqlar | `@fastify/helmet`: HSTS, `X-Content-Type-Options`, `frame-ancestors` (CSP). Mini app iframe-də açılır, ona görə `frame-ancestors` tərəfdaş domenlərini icazə verməlidir. API üçün CSP sadədir |
| Global rate limit | `@fastify/rate-limit` + Redis: IP və user üzrə. Mesaj limiti (054) ayrıcadır |
| Body ölçüsü | `bodyLimit` (məs. 64 KB) |
| HTTPS/WSS | TLS reverse proxy-də (128). `trustProxy` düzgün qurulsun ki, IP rate limit işləsin |
| Secret-lər | tenant üzrə ayrı (014, 112), env-də yox, secret manager-də |
| SQL injection | Drizzle parametrləşdirir. `sql.raw` istifadəsini yoxla |
| Asılılıqlar | `npm audit`, Dependabot |
| Rol auditi | 069, 117. Bütün privilegiyalı əməliyyatlar loglanır |

## Necə edəcəksən
1. OWASP API Security Top 10 siyahısını oxu. Hər bəndə layihədə necə cavab verdiyini bir cümlə ilə yaz.
2. **BOLA (Broken Object Level Authorization)** ən çox rast gəlinən problemdir: `GET /battles/{başqasının_id}`. Bütün `{id}` endpoint-lərini siyahıya al və tenant/sahib yoxlamasını test et.

## Qəbul meyarları
- [ ] Naməlum origin-dən brauzer sorğusu CORS ilə bloklanır.
- [ ] Bütün `{id}` endpoint-ləri üçün "başqa tenant / başqa user" testi var.
- [ ] OWASP API Top 10 yoxlama cədvəli yazılıb.
