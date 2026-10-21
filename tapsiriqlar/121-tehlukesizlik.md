# 121 — Təhlükəsizlik yoxlaması

**Status:** [ ] · **Faza:** 12 · **Əvvəl bitməli:** funksional task-ların hamısı

## Qısaca
Production-a çıxmazdan əvvəl təhlükəsizlik boşluqlarını bağla.

## İndiki problem nümunəsi
`app.register(cors, { origin: true })`: **istənilən** sayt brauzerdən bizim API-yə sorğu göndərə bilər.

## Yoxlama siyahısı
| Sahə | Nə etməli |
|---|---|
| CORS | Yalnız bukmekerlərin icazəli ünvanları (tenant ayarından) |
| Başlıqlar | `@fastify/helmet`: təhlükəsizlik başlıqları. Tətbiq iframe-də açılır, `frame-ancestors`-da bukmeker domenlərinə icazə ver |
| Ümumi sürət limiti | `@fastify/rate-limit` + Redis: IP və istifadəçi üzrə |
| Body ölçüsü | maksimum (məs. 64 KB) |
| HTTPS | reverse proxy-də (128). `trustProxy`-ni düzgün qur ki, IP limiti işləsin |
| Gizli açarlar | hər bukmeker üçün ayrı, env-də yox, secret manager-də |
| SQL injection | Drizzle parametrləri özü qoruyur. `sql.raw` istifadələrini yoxla |
| Paketlər | `npm audit`, Dependabot |

## Ən çox rast gəlinən problem: başqasının məlumatı
Məsələn: `GET /battles/{başqasının_id}` başqasının duel-ini qaytarırsa. Buna "BOLA" deyilir.
**Bütün** `{id}` olan endpoint-ləri siyahıya al və hər biri üçün "başqa tenant / başqa istifadəçi" testini yaz.

## Nə edəcəksən
"OWASP API Security Top 10" siyahısını oxu. Hər maddə üçün layihədə necə qorunduğunu bir cümlə ilə yaz.

## Hazır olduğunu necə yoxlayarsan
- [ ] Tanınmayan saytdan brauzer sorğusu CORS ilə bloklanır.
- [ ] Bütün `{id}` endpoint-ləri üçün "başqasının resursu" testi var.
- [ ] OWASP siyahısı üzrə qeyd yazılıb.
