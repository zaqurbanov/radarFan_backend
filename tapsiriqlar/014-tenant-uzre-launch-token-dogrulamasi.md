# 014 — Tenant üzrə launch token doğrulaması (açar və issuer)

**Faza:** 1 · **Asılılıq:** 013 · **Status:** [ ]

## Məqsəd
Hər bukmeker (tenant) launch token-i **öz** açarı ilə imzalasın, server isə imzanı həmin tenant-ın açarı ilə yoxlasın.

## Niyə
- Sənəd (bölmə 6): "Konteyner imzalanmış birdəfəlik launch token ötürür... İmza və issuer konkret tenant parametrləri ilə serverdə yoxlanılır."
- İndi bütün tenant-lar üçün bir secret var. Bir tərəfdaşın açarı sızsa, hamının istifadəçiləri təhlükədədir. Bir tərəfdaş digərinin `tenant_id`-si ilə token imzalaya bilər.
- Sənəd (bölmə 10): "tenant üçün ayrı məxfi məlumatlar".

## Cədvəllər
**`tenant_launch_keys`** (yeni)
| Sütun | Tip | Qeyd |
|---|---|---|
| id | uuid PK | |
| tenant_id | uuid FK → tenants, NOT NULL | |
| kid | varchar(100) NOT NULL | JWT header-dəki `kid` (key id) |
| algorithm | varchar(20) NOT NULL | `RS256`/`ES256` (asimmetrik, tövsiyə) və ya `HS256` |
| public_key | text NULL | asimmetrik üçün PEM |
| secret_ref | varchar NULL | simmetrik üçün: secret-in özü yox, env/vault-dakı adı |
| issuer | varchar(255) NOT NULL | gözlənilən `iss` |
| status | enum(active, retired) | açar rotasiyası üçün |
| created_at, retired_at | timestamptz | |

Unique: (`tenant_id`, `kid`). Index: (`tenant_id`, `status`).

**Niyə ayrı cədvəl, `tenants.config`-də deyil?** Açar rotasiyası: köhnə və yeni açar bir müddət eyni anda aktiv olmalıdır, ona görə tenant başına bir neçə açar ola bilər.

## Necə edəcəksən
1. Simmetrik (HS256) və asimmetrik (RS256/ES256) fərqini öyrən. Asimmetrikdə tərəfdaş yalnız public key-i bizə verir, private key onda qalır. Bizim serverdən sızma olsa belə, token saxtalaşdırıla bilməz. **Tövsiyə: asimmetrik.**
2. Doğrulama ardıcıllığı:
   1. Token-i **imzasız** decode et, header-dən `kid`, payload-dan `tenant_id`/`iss` götür. Bunlara hələ etibar etmə!
   2. DB-dən (`tenant_id`, `kid`, `status=active`) açarı tap.
   3. Həmin açarla imzanı yoxla + `iss` uyğunluğu + `aud = RADAR.FAN` + `exp` + `iat`.
   4. `exp - iat ≤ 60 san.` olduğunu yoxla (sənəd: TTL 60 san.).
   5. Nonce (artıq var, atomar).
3. Açarları hər sorğuda DB-dən oxumaq bahalıdır. Qısa müddətli keş düşün (Redis və ya yaddaş, 1–5 dəq.). Açar ləğv olunanda keş necə təmizlənəcək?
4. Demo tenant üçün öz test açar cütünü yarat (seed-də public key, private key isə yalnız demo token generatorunda, task 015).
5. Nonce açarını tenant ilə məhdudlaşdır: `nonce:{tenant_id}:{nonce}`. Niyə? Fərqli tərəfdaşlar təsadüfən eyni nonce yarada bilər.

## Tələlər
- **`alg: none` hücumu:** alqoritmi token header-dən deyil, DB-dəki açardan götür.
- İmzanı yoxlamadan `tenant_id`-yə əsasən DB yazısı etmə.
- `external_user_id` maksimum uzunluğunu yoxla (DB-də 255).

## Öyrən
- JWK, `kid`, açar rotasiyası
- `jose` kitabxanası (`jwtVerify`, `importSPKI`)

## Qəbul meyarları
- [ ] Tenant A-nın açarı ilə imzalanmış, amma `tenant_id = B` olan token rədd olunur.
- [ ] `retired` açarla imzalanmış token rədd olunur.
- [ ] TTL-i 60 saniyədən uzun token rədd olunur.
- [ ] Secret-lər DB-də açıq mətnlə saxlanmır.
