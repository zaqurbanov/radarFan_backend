# 014 — Hər bukmekerin öz açarı

**Status:** [ ] · **Faza:** 1 · **Əvvəl bitməli:** 013

## Qısaca
Hər bukmeker launch token-i **öz açarı** ilə imzalasın. Biz də həmin bukmekerin açarı ilə yoxlayaq.

## Niyə lazımdır?
- İndi bütün bukmekerlər üçün bir secret var. Bir bukmekerin açarı oğurlansa, **hamının** istifadəçiləri təhlükədədir.
- A bukmekeri B bukmekerinin `tenant_id`-si ilə saxta token yarada bilər.
- Sənəd (bölmə 6) tenant üzrə yoxlamanı tələb edir.

## Simmetrik və asimmetrik açar (qısa izah)
- **Simmetrik (HS256):** bir secret, həm imzalayır, həm yoxlayır. Bizdə də olmalıdır, yəni bizdən oğurlansa, saxta token yaratmaq olar.
- **Asimmetrik (RS256/ES256):** bukmekerdə **gizli açar** (imzalayır), bizdə **açıq açar** (yalnız yoxlayır). Bizdən oğurlansa belə, saxta token yaratmaq mümkün deyil.

**Tövsiyə: asimmetrik.**

## Yeni cədvəl: `tenant_launch_keys`
| Sütun | Tip | İzah |
|---|---|---|
| id | uuid | |
| tenant_id | uuid | hansı bukmeker |
| kid | varchar | açarın adı (token başlığında `kid` olur) |
| algorithm | varchar | `RS256` və s. |
| public_key | text | açıq açar |
| issuer | varchar | gözlənilən `iss` |
| status | `active` / `retired` | köhnə açarı söndürmək üçün |
| created_at, retired_at | timestamp | |

- Unique: (`tenant_id`, `kid`).
- **Niyə ayrı cədvəl?** Açar dəyişəndə bir müddət köhnə və yeni açar **birlikdə** işləməlidir. Bir tenant-ın bir neçə açarı ola bilər.

## Yoxlama ardıcıllığı
1. Token-i **imzasız** aç, başlıqdan `kid`-i, içindən `tenant_id`-ni götür. Hələ heç nəyə inanma!
2. Bazadan həmin tenant-ın aktiv açarını tap.
3. Həmin açarla imzanı, `iss`, `aud`, `exp`-i yoxla.
4. Token-in ömrü 60 saniyədən çox deyil (`exp - iat ≤ 60`).
5. Nonce-u yoxla (artıq var).

## Diqqət
- Alqoritmi **token-dən yox, bazadan** götür. Yoxsa hücumçu `alg: none` yazıb imzanı keçə bilər.
- Nonce açarına tenant-ı da əlavə et: `nonce:{tenant_id}:{nonce}`. Fərqli bukmekerlər təsadüfən eyni nonce yarada bilər.
- Açarı hər sorğuda bazadan oxumaq bahadır. 1–5 dəqiqəlik keş düşün.
- `jose` kitabxanasını araşdır.

## Hazır olduğunu necə yoxlayarsan
- [ ] A bukmekerinin açarı ilə imzalanıb, içində B-nin `tenant_id`-si olan token rədd olunur.
- [ ] `retired` açarla imzalanmış token rədd olunur.
- [ ] 60 saniyədən uzun ömürlü token rədd olunur.
