# 117 — Admin: redaksiya qeydləri, hekayələr, mağaza

**Faza:** 10 · **Asılılıq:** 035, 071, 102 · **Status:** [ ]

## Məqsəd
Kontent idarəetməsi: matç qeydləri, hekayələr, mağaza kataloqu.

## Niyə
Sənəd: admin "redaksiya qeydlərini idarə edir". Sayt: hekayələr (071) və mağaza (102) admin kontentidir.

## Endpoint-lər
| Sahə | Endpoint-lər |
|---|---|
| Redaksiya | `PUT /admin/events/{id}/editorial` { note } · `DELETE` |
| Hekayələr | `GET/POST /admin/stories`, `PUT /admin/stories/{id}`, slaydlar CRUD, `POST .../publish` |
| Mağaza | `GET/POST /admin/shop/items`, `PUT /admin/shop/items/{id}`, `POST .../retire` |

## Necə edəcəksən
1. **Qadağa:** admin heç bir yerdə əmsalı (`price`) dəyişə bilməz (sənəd). Admin API-də outcome/market endpoint-i olmamalıdır.
2. Mağaza qiyməti dəyişəndə əvvəl alınanlar təsirlənmir (103).
3. Hekayə CTA-ları yalnız icazəli siyahıdan (071).
4. Bütün admin əməliyyatları audit loga (`admin_audit_log`: actor, action, entity, before, after, at). 069-dakı moderasiya jurnalı ilə birləşdirmək olarmı? Qərar ver.

## Qəbul meyarları
- [ ] Admin API-də əmsal dəyişdirən heç bir endpoint yoxdur.
- [ ] Hər admin dəyişikliyi auditdə.
