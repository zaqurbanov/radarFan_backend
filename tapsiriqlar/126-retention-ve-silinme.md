# 126 — Məlumatların saxlanma müddəti və silinməsi

**Faza:** 12 · **Asılılıq:** 049 · **Status:** [ ]

## Məqsəd
Hər məlumat növünün nə qədər saxlandığı və istifadəçi silinməsinin necə işlədiyi.

## Niyə
- Sənəd (bölmə 7): "Mesajların, şikayətlərin, loqların, analitikanın saxlanma müddətləri və istifadəçinin silinməsi production-dan əvvəl tenant retention policy ilə təyin edilir. Bu müddətləri texniki rahatlığa əsasən müəyyən etmək olmaz; tərəfdaşın və seçilmiş bazarın tələbləri lazımdır."
- "məlumatların silinməsi nəzərdə tutulmuş prosedur olmadan XP jurnalını pozmamalıdır."
- GDPR və yerli qanunlar: "unudulma hüququ".

## Dizayn
`TenantConfig.retention` (021):
| Məlumat | Açar | Nümunə (tərəfdaş təsdiqləməlidir) |
|---|---|---|
| Mesajlar | `messages_days` | 180 |
| Şikayətlər | `reports_days` | 365 |
| Analitika | `analytics_days` | 395 |
| Idempotency, outbox | texniki | 1–7 gün |

## İstifadəçi silinməsi (ziddiyyət: ledger dəyişdirilməzdir)
**Psevdonimləşdirmə** strategiyası:
- `users.external_user_id` → təsadüfi dəyər, `nickname` → "Deleted user", `status = deleted`;
- mesaj mətnləri → silinir (və ya "[silinib]");
- ledger qeydləri **qalır** (user_id artıq heç kimə bağlanmır), mühasibat bütövlüyü qorunur.

## Necə edəcəksən
1. Gecəlik job (049): hər tenant üçün retention qaydalarını tətbiq et. Batch-lərlə sil (bir dəfəyə milyonlarla sətir silmə: lock, WAL).
2. `POST /admin/users/{id}/erase` və ya tərəfdaşdan webhook (113 genişlənməsi). Kim başladır? Tərəfdaşla razılaşdırılmalıdır.
3. Loglar (011) da retention-a tabedir, amma bu, infrastruktur səviyyəsidir (128).

## Qəbul meyarları
- [ ] Retention job köhnə mesajları silir, yeniləri saxlayır.
- [ ] Silinmiş istifadəçinin ledger qeydləri qalır, şəxsi məlumatları yoxdur.

## Açıq suallar
- Konkret müddətlər tərəfdaşdan gəlməlidir.
