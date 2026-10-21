# 117 — Admin: redaksiya qeydləri, hekayələr, mağaza

**Status:** [ ] · **Faza:** 10 · **Əvvəl bitməli:** 035, 071, 102

## Qısaca
Admin üçün kontent idarəsi.

## Endpoint-lər
| Nə | Endpoint-lər |
|---|---|
| Redaksiya qeydi | `PUT /admin/events/{id}/editorial`, `DELETE` |
| Hekayələr | `GET/POST /admin/stories`, `PUT /admin/stories/{id}`, slaydlar, dərc et |
| Mağaza | `GET/POST /admin/shop/items`, `PUT /admin/shop/items/{id}`, söndür |

## Nə edəcəksən
1. **Qadağa:** admin API-də əmsal dəyişən **heç bir** endpoint olmasın.
2. Mağaza qiyməti dəyişəndə əvvəl alınanlar təsirlənmir.
3. Hekayə düymələri yalnız icazəli siyahıdan (071).
4. Bütün admin əməliyyatları jurnala: kim, nə etdi, əvvəl, sonra, nə vaxt. Moderasiya jurnalı (069) ilə birləşdirmək olarmı? Qərar ver.

## Hazır olduğunu necə yoxlayarsan
- [ ] Admin API-də əmsal dəyişən endpoint yoxdur.
- [ ] Hər admin dəyişikliyi jurnaldadır.
