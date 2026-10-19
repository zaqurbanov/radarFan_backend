# 132 — Real duel: nəticə və XP

**Faza:** 13 · **Asılılıq:** 131, 085 · **Status:** [ ]

## Məqsəd
Real duel-in nəticəsini və hər iştirakçının mükafatını **dəqiq bir dəfə** hesablamaq.

## Niyə
Sənəd (bölmə 10):
- "Düzgün cavabların sayı qalibi müəyyən edir; bərabərlik draw verir. Birinci versiyada cavab sürəti tie-breaker kimi istifadə edilmir."
- "Üç sualdan sonra server hər iki müştərinin bağlı olub-olmamasından asılı olmayaraq oyunu tamamlayır."
- "İştirakçı ən azı bir dəfə cavab veribsə, tamamlanmış duel ümumi limitə uyğun XP verə bilər; heç cavab verməyibsə, 0 XP verilir və tapşırıq tamamlanmır."
- "Aborted zamanı mükafat verilmir və XP qazandıran oyun limiti sərf olunmur."
- "XP hər iştirakçı üçün ayrıca hesablanır və dəqiq bir dəfə verilir."

## Necə edəcəksən
1. Tamamlanma 3-cü sual bağlananda **server tərəfindən** (müştəri "finish" göndərmir).
2. Hər iştirakçı üçün ayrıca:
   - `result` (öz perspektivindən: victory/draw/defeat);
   - `answered_any = false` → 0 XP, challenge yox;
   - `xp_eligible` (öz gündəlik limiti, 080) → XP + coin;
   - ledger `source_id = battle_id`. Unique (user, battle, battle_id) hər istifadəçiyə bir qeyd.
3. `aborted` (server xətası, məs. job uğursuzluğu): mükafat yox, limit sərf olunmur. Nə vaxt abort edirsən? Məs. sual açıla bilmədi, DB xətası. Bunun siyahısını yaz.
4. Hər iki oyunçuya `battle.completed` (fərdiləşdirilmiş payload: öz `awarded_xp`-si).

## Qəbul meyarları
- [ ] 2:2 → hər ikisinə draw.
- [ ] Heç cavab verməyən oyunçu 0 XP, challenge tamamlanmır.
- [ ] Paralel tamamlanma tetikləri (job + son cavab) → hər oyunçuya bir ledger qeydi.
- [ ] Aborted → heç kimə XP, gündəlik limit dəyişmir.
