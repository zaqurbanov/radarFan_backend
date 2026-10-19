# 115 — Admin: tenant konfiqurasiyası

**Faza:** 10 · Admin · **Asılılıq:** 017, 021 · **Status:** [ ]

## Məqsəd
Admin öz tenant-ının brendini, funksiyalarını, qaydalarını idarə etsin.

## Niyə
Sənəd (bölmə 6): "admin öz tenant-ının konfiqurasiyasını, suallarını və redaksiya qeydlərini idarə edir. Admin interfeysindən qiymətlərin dəyişdirilməsinə icazə verilmir." "Müştəri production-da demo botunu aktivləşdirə və XP qaydalarını özü dəyişə bilməz."

## Endpoint-lər
| Metod | Yol |
|---|---|
| GET | /admin/config |
| PATCH | /admin/config (branding, enabled_features, levels, ...) |
| GET | /admin/config/history |

## Necə edəcəksən
1. `requireRole('admin')`, yalnız **öz** tenant-ı.
2. Hansı sahələri admin dəyişə **bilməz**? `mode` (demo/production), `feed_provider` secret-ləri, `partner_adapter` secret-ləri. Bunlar yalnız RADAR.FAN operatorunun (super admin / DB / deploy) işidir. Sxemdə admin üçün ayrıca "editable" alt-sxem et.
3. `economy` qaydaları dəyişəndə `rules_version + 1` (021). Aktiv battle-lar köhnə snapshot ilə bitir.
4. Dəyişiklik tarixçəsi (audit): kim, nə vaxt, nəyi dəyişdi (diff).
5. Keş invalidasiyası (021).

## Qəbul meyarları
- [ ] Admin `mode`-u dəyişə bilmir.
- [ ] XP qaydası dəyişəndə versiya artır, aktiv battle köhnə qayda ilə bitir.
- [ ] Hər dəyişiklik auditdə.
