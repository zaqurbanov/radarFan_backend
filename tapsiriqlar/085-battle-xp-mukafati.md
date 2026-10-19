# 085 — Battle XP mükafatı

**Faza:** 6 · **Asılılıq:** 079, 083, 084 · **Status:** [ ]

## Məqsəd
079-dakı tamamlanma tranzaksiyasının XP hissəsini ledger ilə birləşdirmək və sınaqdan keçirmək.

## Niyə
Sənəd (bölmə 5): "Tamamlanmış duel üçün hər düzgün cavaba 50 XP, maksimum 150 XP verilir." Bölmə 11: "İlk completed zamanı 0-dan 150-dək XP verilir. Nəticənin yenidən yüklənməsi, paralel sorğular və iki cihaz mükafatı ikiqat etmir."
Sayt: 2 düzgün → "+100 XP", başlıq 50 XP → 150 XP.

## Necə edəcəksən
1. `amount = min(correct × rules_snapshot.xp_per_correct, max)`. Qaydalar battle-ın **snapshot-undan** (073), cari config-dən yox. Niyə? Admin oyun ortasında qaydanı dəyişsə, başlamış oyun köhnə qaydada bitməlidir.
2. `source_type = battle`, `source_id = battle_id`, `metadata = { correct, result }`.
3. `xp_eligible = false` → ledger-ə yazma (və ya 0), amma `awarded_xp: 0` qaytar.
4. Ən çətin test: **"iki cihaz"**. Telefon və planşet eyni anda "Завершить баттл" basır. İki tranzaksiya: birincisi `FOR UPDATE` ilə battle-ı kilidləyir, ikincisi gözləyir, sonra `state = completed` görür və mövcud nəticəni qaytarır. Bunu test et.

## Qəbul meyarları
- [ ] 0, 1, 2, 3 düzgün → 0, 50, 100, 150 XP.
- [ ] 10 paralel complete → bir ledger qeydi, balans bir dəfə artır.
