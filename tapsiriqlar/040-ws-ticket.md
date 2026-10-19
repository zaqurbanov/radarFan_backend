# 040 — `POST /ws-ticket`: WebSocket autentifikasiyası

**Faza:** 3 · **Asılılıq:** 039 · **Status:** [ ]

## Məqsəd
WebSocket bağlantısı qısaömürlü birdəfəlik bilet ilə autentifikasiya olunsun.

## Niyə
Sənəd (bölmə 9): "/api/v1/ws bağlantısı avtorizasiya olunmuş POST /ws-ticket vasitəsilə alınan qısaömürlü birdəfəlik ticket ilə avtorizasiya edilir. Uzunömürlü access token URL-də ötürülmür."

**Niyə URL-də token olmaz?** Brauzer WebSocket API-si başlıq (Authorization) göndərməyə icazə vermir, ona görə token URL-ə qoyulur: `wss://.../ws?token=...`. URL-lər isə proxy, load balancer və server loglarına yazılır. 15 dəqiqəlik token loglarda = sızma. Ticket isə 30 saniyə yaşayır və bir dəfə istifadə olunur, loga düşsə belə yararsızdır.

## Endpoint
| Metod | Yol | Cavab |
|---|---|---|
| POST | /ws-ticket | `{ ticket, expires_at }` |

## Necə edəcəksən
1. Ticket = təsadüfi 32 bayt (base64url). JWT lazım deyil.
2. Redis: `ws_ticket:{ticket}` → `{ user_id, tenant_id, sid, role }`, TTL 30 san.
3. Bağlantı: `wss://.../api/v1/ws?ticket=...`. Server **atomar** olaraq oxuyur və silir (`GETDEL`). Niyə atomar? (Task 013-dəki nonce dərsini xatırla.)
4. Ticket etibarsızdırsa, upgrade-dən **əvvəl** rədd et (401), bağlantı açılmasın.
5. Bağlantı açılandan sonra access token-in bitməsi bağlantını bağlamalıdırmı? Qərar: bağlantı `sid`-ə bağlıdır, logout (020) və ya ban (018) bağlantını bağlayır. Token bitməsi bağlamır. Bu məqbuldur, çünki ticket artıq yoxlanıb.

## Qəbul meyarları
- [ ] Ticket bir dəfə işləyir, ikinci cəhd 401.
- [ ] 30 san.-dən sonra ticket işləmir.
- [ ] Access token URL-də heç yerdə istifadə olunmur.
