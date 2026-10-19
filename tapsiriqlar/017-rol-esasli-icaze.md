# 017 — Rol əsaslı icazə

**Faza:** 1 · **Asılılıq:** 016 · **Status:** [ ]

## Məqsəd
`user`, `moderator`, `admin` rolları üçün route səviyyəsində icazə yoxlaması.

## Niyə
Sənəd (bölmə 6): "user əlçatan funksiyalardan istifadə edir; moderator mesaj və şikayətlərlə işləyir; admin öz tenant-ının konfiqurasiyasını, suallarını və redaksiya qeydlərini idarə edir. Admin interfeysindən qiymətlərin dəyişdirilməsinə icazə verilmir."

| Rol | Nə edə bilər |
|---|---|
| user | lent, çat, oyun, mağaza, profil |
| moderator | + şikayətlər, mesaj gizlətmə, mute (task 066–069) |
| admin | + tenant config, sual bankı, hekayələr, mağaza kataloqu (task 115–117) |

## Necə edəcəksən
1. `requireRole('moderator')` kimi `preHandler` yarat. İyerarxiya: admin moderatorun hüquqlarına sahibdirmi? Qərar ver və yaz.
2. Rol **token-dən** yoxsa **DB-dən**? Moderator rolu alınıbsa, köhnə token 15 dəq. işləyəcək. Həssas əməliyyatlar (moderasiya) üçün DB-dən oxumaq daha təhlükəsizdir.
3. **Tenant sərhədi:** moderator yalnız **öz tenant-ının** mesajlarını gizlədə bilər. Rol yoxlaması bəs deyil. Hər sorğuda resursun `tenant_id`-si ilə `req.user.tenantId` uyğunluğu yoxlanmalıdır.
4. Rol kim tərəfindən verilir? Tərəfdaş launch token-də (entitlement) yoxsa admin bizim tərəfdə? Sənəd bunu açıq demir, açıq sual kimi qeyd et.

## Qəbul meyarları
- [ ] `user` rolu moderasiya endpoint-ində 403 `ACCESS_DENIED` alır.
- [ ] Tenant A moderatoru tenant B-nin mesajını gizlədə bilmir (404).

## Açıq suallar
- Moderator/admin rolunu kim təyin edir: tərəfdaş yoxsa RADAR.FAN?
