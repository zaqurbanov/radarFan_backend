# 126 — Məlumat nə qədər saxlanır və necə silinir

**Status:** [ ] · **Faza:** 12 · **Əvvəl bitməli:** 049

## Qısaca
Hər məlumat növünün saxlanma müddəti və istifadəçinin silinməsi qaydası.

## Niyə lazımdır?
- Sənəd: saxlanma müddətləri **bukmekerlə** təyin olunur, "texniki rahatlığa görə" yox.
- Qanunlar (məs. GDPR) "unudulma hüququ" tələb edir.
- Sənəd: silmə XP jurnalını **pozmamalıdır**.

## Ayarlar (tenant config-də)
| Məlumat | Açar | Nümunə (bukmeker təsdiqləməlidir) |
|---|---|---|
| Mesajlar | `messages_days` | 180 gün |
| Şikayətlər | `reports_days` | 365 gün |
| Analitika | `analytics_days` | 395 gün |
| Texniki (idempotency, outbox) | | 1–7 gün |

## Ziddiyyət: istifadəçini silmək, amma jurnal silinməz
**Həll: "anonimləşdirmə"**
- İstifadəçinin bukmeker ID-si → təsadüfi dəyər, adı → "Deleted user", status → `deleted`.
- Mesaj mətnləri → silinir.
- Jurnal sətirləri **qalır**, amma artıq heç kimə bağlı deyil. Hesablar düz qalır.

## Nə edəcəksən
1. Gecə fon işi: hər tenant üçün qaydaları tətbiq et. **Hissə-hissə** sil (milyon sətri birdən silmək bazanı kilidləyir).
2. Silməni kim başladır? Admin endpoint-i və ya bukmekerdən bildiriş. Bukmekerlə razılaşdırılmalıdır.

## Hazır olduğunu necə yoxlayarsan
- [ ] Fon işi köhnə mesajları silir, yeniləri saxlayır.
- [ ] Silinmiş istifadəçinin jurnal sətirləri qalır, şəxsi məlumatı yoxdur.

## Açıq sual
Konkret müddətlər bukmekerdən gəlməlidir.
