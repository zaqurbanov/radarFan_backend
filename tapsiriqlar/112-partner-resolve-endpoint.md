# 112 — Bukmekerin serveri üçün endpoint

**Status:** [ ] · **Faza:** 9 · **Əvvəl bitməli:** 109

## Qısaca
Bukmekerin serveri biletimizi seçimlərin tam məlumatına çevirsin.

## Endpoint
`POST /partner/v1/handoffs/resolve` → bilet → seçimlər (bukmekerin ID-ləri, əmsal, versiya), istifadəçinin bukmekerdəki ID-si, `correlation_id`.

## Niyə bilet "mənasız"dır?
Biletin içində `outcome_id, price` açıq olsaydı, istifadəçi onu dəyişib `price: 100` yazardı. Bukmeker məlumatı **bizim serverdən** alır, istifadəçidən yox.

## Bu endpoint istifadəçi üçün deyil
Burada istifadəçi token-i işləmir. Bu, **server-server** əlaqəsidir, öz yoxlaması var.

### Yeni cədvəl: `partner_api_credentials`
id, tenant_id, key_id, secret_hash (və ya açıq açar), status, created_at, last_used_at.

### Yoxlama üsulu (tövsiyə: HMAC imza)
- Bukmeker sorğunu öz gizli açarı ilə imzalayır (body + vaxt).
- Biz eyni açarla yoxlayırıq.
- Vaxt ±5 dəqiqədən köhnədirsə → rədd (köhnə sorğunun təkrarına qarşı).

## Nə edəcəksən
1. Ayrı route qrupu: `/partner/v1`. İstifadəçi auth-u (016) burada **işləməsin**.
2. Bileti hash ilə tap. Bukmekerin tenant-ı = biletin tenant-ı?
3. **Bir dəfəlik, atomar:** `UPDATE handoffs SET status='resolved' WHERE token_hash=... AND status='created' AND expires_at > now() RETURNING *`. Heç nə qayıtmadısa → rədd.
4. Sürət limiti və jurnal.

## Hazır olduğunu necə yoxlayarsan
- [ ] Bilet ikinci dəfə işləmir.
- [ ] 61 saniyədən sonra → rədd.
- [ ] A bukmekeri B-nin biletini aça bilmir.
- [ ] İmzasız və ya köhnə vaxtlı sorğu → 401.
