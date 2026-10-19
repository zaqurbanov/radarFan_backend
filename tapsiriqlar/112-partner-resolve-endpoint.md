# 112 — Tərəfdaş endpoint-i: `POST /partner/v1/handoffs/resolve`

**Faza:** 9 · **Asılılıq:** 109 · **Status:** [ ]

## Məqsəd
Tərəfdaşın backend-i handoff token-i bizdən seçimlərin tam məlumatına çevirsin.

## Niyə
Sənəd (bölmə 9): "Tərəfdaşın backend-i server avtorizasiyası ilə POST /partner/v1/handoffs/resolve vasitəsilə handoff-u istifadə edir; token birdəfəlikdir, TTL 60 saniyədir, yalnız qeyri-şəffaf ID ehtiva edir."

**Niyə token "qeyri-şəffaf"dır?** Müştəri (WebView) tokendə nə olduğunu bilmir və dəyişə bilmir. Əgər token-də `outcome_id, price` açıq olsaydı, istifadəçi `price: 100.0` yazardı. Tərəfdaş məlumatı **bizim serverdən** alır, müştəridən yox.

## Axın
```
Müştəri ──POST /handoffs──► RADAR.FAN  (token)
Müştəri ──bridge OPEN_BETSLIP(token)──► Tərəfdaş app
Tərəfdaş backend ──POST /partner/v1/handoffs/resolve(token)──► RADAR.FAN
                  ◄── selections (provider_*_id, price, version), user (external_user_id), correlation_id
Tərəfdaş kuponu açır
```

## Autentifikasiya (istifadəçi deyil, server-server)
Yeni cədvəl **`partner_api_credentials`**: id, tenant_id, key_id, secret_hash və ya public key, status, created_at, last_used_at.
Üsul seç: HMAC imzası (body + timestamp, replay qorunması) və ya mTLS və ya OAuth client credentials. Tövsiyə: HMAC imzası + timestamp (±5 dəq.) + `key_id` başlığı.

## Necə edəcəksən
1. Ayrı route qrupu `/partner/v1`. İstifadəçi auth plugin-i (016) burada **işləməməlidir**, öz auth-u var.
2. Token-in hash-i ilə tap, tenant uyğunluğu (partner credential-ın tenant-ı = handoff-un tenant-ı).
3. Atomar birdəfəlik: `UPDATE handoffs SET status = 'resolved', resolved_at = now() WHERE token_hash = :h AND status = 'created' AND expires_at > now() RETURNING *`. Sətir qayıtmadı → 410/404.
4. Cavabda `external_user_id` (tərəfdaşın öz ID-si, burada lazımdır və təhlükəsizdir, çünki server-server-dir).
5. Rate limit və audit log.

## Qəbul meyarları
- [ ] Token ikinci dəfə resolve olunmur.
- [ ] 61 san. sonra → rədd.
- [ ] Tenant A-nın credential-ı tenant B-nin handoff-unu resolve edə bilmir.
- [ ] İmzasız və ya köhnə timestamp-li sorğu → 401.
