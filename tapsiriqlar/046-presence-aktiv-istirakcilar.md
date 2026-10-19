# 046 — Presence: otaqdakı aktiv iştirakçılar

**Faza:** 3 · **Asılılıq:** 043, 044 · **Status:** [ ]

## Məqsəd
Hər otaqda həqiqətən aktiv olan unikal istifadəçilərin sayı.

## Niyə
- Sənəd (bölmə 3): "Aktiv iştirakçılar otaqla bağlantısı aktiv olan və ya son 60 saniyədə heartbeat göndərmiş unikal avtorizasiya olunmuş istifadəçilərdir. Hesabların və ya mesajların ümumi sayını otaqda olanların sayı kimi göstərmək olmaz. Metrika əlçatan deyilsə, «Aktivlik məlumatı əlçatan deyil» göstərilir."
- Bölmə 7: "Presence üçün TTL tətbiq edilir."
- Bölmə 9: `room.presence.updated` → `room_id, active_users`.
- Sayt: "1 284 фанатов · демо", "846 участников · демо". Bunlar demo rəqəmlərdir, real rejimdə həqiqi say olmalıdır. Lent sıralaması (032) da buna əsaslanır.

## Dizayn
Redis sorted set: `presence:{tenant}:room:{room_id}` → member = `user_id`, score = son aktivlik timestamp-ı.
- Abunə və ya heartbeat → `ZADD` (score = now)
- Say → `ZREMRANGEBYSCORE` (60 san.-dən köhnələri sil) + `ZCARD`
- **Unikal:** eyni istifadəçi 2 cihazdan qoşulsa, member eyni olduğu üçün bir dəfə sayılır.

## Necə edəcəksən
1. Abunə və heartbeat zamanı presence-i yenilə. Unsubscribe və ya bağlantı bağlananda: istifadəçinin başqa bağlantısı da bu otaqdadırsa, silmə!
2. `room.presence.updated` hər dəyişiklikdə göndərilsə, 1 000 nəfərlik otaqda saniyədə onlarla mesaj olur. **Throttle:** maksimum 5 san.-də bir, və yalnız rəqəm dəyişibsə.
3. `events.active_users` snapshot-u (032) üçün job hər 10–30 san. sayları DB-yə yazır.
4. Demo rejimdə: real say + demo "baza" rəqəmi? Yoxsa yalnız demo rəqəm + "демо" etiketi? Sənəd qaydası: işarələnməmiş saxta rəqəm olmaz. Tövsiyə: demo tenant-da `display_count = demo_base + real`, `is_demo: true`.
5. Redis əlçatmazdırsa → `active_users: null` → frontend "məlumat əlçatan deyil" yazır.

## Qəbul meyarları
- [ ] Bir istifadəçi iki tabdan qoşulanda say 1 artır.
- [ ] Bağlantı qopandan 60 san. sonra say azalır.
- [ ] Presence yeniləmələri throttle olunur.
