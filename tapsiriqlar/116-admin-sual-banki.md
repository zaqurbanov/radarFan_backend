# 116 — Admin: sual bankı

**Faza:** 10 · **Asılılıq:** 072 · **Status:** [ ]

## Məqsəd
Admin viktorina suallarını yaratsın, redaktə etsin, deaktiv etsin.

## Niyə
Sənəd: "admin ... suallarını ... idarə edir". Bölmə 7: "istifadədən sonra versiya dəyişməzdir".

## Endpoint-lər
| Metod | Yol | Qeyd |
|---|---|---|
| GET | /admin/questions?status&sport&cursor | düzgün cavablar **görünür** (yalnız admin) |
| POST | /admin/questions | yeni sual (versiya 1) |
| PUT | /admin/questions/{id} | yeni versiya yaradır, köhnəni dəyişmir |
| POST | /admin/questions/{id}/retire | |

## Necə edəcəksən
1. Validasiya: dəqiq 4 variant, unikal mətnlər, `correct_option_id` variantlardan biridir, izah boş deyil.
2. Redaktə = yeni `question_versions` sətri + `current_version` artır. Battle-larda istifadə olunmayıbsa, versiyanı yerində dəyişmək olarmı? Sadəlik üçün həmişə yeni versiya.
3. Toplu import (CSV/JSON) faydalı olar, istəyə bağlı.
4. Minimum aktiv sual sayı: 3-dən az olarsa battle başlaya bilmir. Admin son sualları deaktiv edəndə xəbərdarlıq.

## Qəbul meyarları
- [ ] Sualı redaktə etmək köhnə battle-ların snapshot-unu dəyişmir.
- [ ] User və moderator bu endpoint-lərə 403 alır.
