# 081 — Abandoned duel və bağlantı itkisi

**Faza:** 5 · **Asılılıq:** 077, 043 · **Status:** [ ]

## Məqsəd
Tərk edilmiş duel-lər "asılı" qalmasın və heç bir mükafat verməsin.

## Niyə
Sənəd (bölmə 5): "Demo-da bağlantı itdikdə cari sual deadline üzrə bağlanır, lakin növbəti sualın avtomatik açılması reconnect-ədək dayandırılır. Bağlantısız 5 dəqiqədən sonra tamamlanmamış duel abandoned kimi bağlanır, XP və tapşırıq irəliləyişi vermir. Qəbul edilmiş cavablar və yekun diaqnostika üçün jurnala yazılır."

Bölmə 8: 410 `BATTLE_EXPIRED`.

**Niyə vacibdir?** Bir aktiv battle qaydası (073): asılı qalmış battle istifadəçinin yenisini başlamasına mane olur.

## Necə edəcəksən
1. "Bağlantısız" necə ölçülür? `battles.last_activity_at` hər cavab, next, snapshot, WS heartbeat ilə `battle:` kanalında yenilənir.
2. Job (049) hər dəqiqə: `state = active AND last_activity_at < now - 5 min` → `abandon()`. Və ya battle başına gecikmiş job (hər aktivlikdə yenidən planlanır). Hansı daha sadədir?
3. Abandoned battle-a sorğu → 410 `BATTLE_EXPIRED`.
4. İstifadəçi yeni battle başlayanda köhnəsi aktivdirsə və 5 dəq. keçibsə, ani abandon (lazy).
5. "Jurnala yazılır": cavablar `battle_answers`-də qalır, silinmir.

## Qəbul meyarları
- [ ] 5 dəq. aktivliksiz battle `abandoned` olur, XP/coin/challenge yoxdur.
- [ ] Ondan sonra yeni battle başlamaq mümkündür.
- [ ] Abandoned battle-a cavab → 410.
