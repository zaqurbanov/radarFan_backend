# 039 — WebSocket gateway

**Faza:** 3 · Real vaxt infrastrukturu · **Asılılıq:** 016 · **Status:** [ ]

## Məqsəd
`/api/v1/ws` ünvanında WebSocket serveri: bağlantı qəbulu, mesaj protokolu, bağlantıların reyestri.

## Niyə
- Sənəd (bölmə 4): "Yeni mesajlar və moderasiya dəyişiklikləri WebSocket vasitəsilə gəlir."
- Bölmə 9: hesab, əmsal, səs, battle, XP yenilənmələri real vaxtda.
- Bölmə 10: "qəbul edilmiş mesajın çatdırılmasının p95-i 1 saniyəyədək; hesab və əmsal yenilənməsinin p95-i 2 saniyəyədək". Polling ilə buna çatmaq bahadır.

## Necə edəcəksən
1. Kitabxana: `@fastify/websocket` (ws üzərində). Alternativ: Socket.IO. Sənəddə öz envelope formatı var (042), Socket.IO-nun öz protokolu isə buna mane olur. **Tövsiyə: `@fastify/websocket`.**
2. Modul: `src/modules/realtime/`:
   - `gateway.ts`: bağlantı qəbulu, mesaj parse
   - `connections.ts`: yaddaşda reyestr: `connectionId → { userId, tenantId, sid, channels:Set }`, əks indekslər `channel → Set<connectionId>`
   - `protocol.ts`: mesaj tipləri, validasiya
3. Müştəri → server komandaları: `subscribe`, `unsubscribe`, `ping`, `resync`. Hər birində `request_id`, cavab `ack` və ya `error` (bölmə 9: "Müştəri komandaları request_id ehtiva edir və ack və ya error alır").
4. Etibarsız JSON və ya naməlum komanda → `error` mesajı, bağlantı qırılmır. Çox səhv mesaj → bağla (sui-istifadədən qorunma).
5. Mesaj ölçüsü limiti (`maxPayload`, məs. 16 KB).

## Tələlər
- Yaddaşdakı reyestr yalnız **bir** server instansiyasında işləyir. İkinci instansiya əlavə edəndə task 044 lazımdır. İndidən elə dizayn et ki, "yayım" funksiyası bir interfeys arxasında olsun.
- Bağlantı bağlananda reyestrdən silinməsi unudulsa, yaddaş sızması olur.

## Öyrən
- WebSocket protokolu: upgrade, ping/pong frame-ləri, close kodları (1000, 1008, 4001...)

## Qəbul meyarları
- [ ] `wscat` ilə qoşulmaq, `ping` göndərmək və `pong` almaq mümkündür (auth 040-dan sonra).
- [ ] Etibarsız JSON bağlantını qırmır, `error` qaytarır.
