# 085 — Duel üçün XP

**Status:** [ ] · **Faza:** 6 · **Əvvəl bitməli:** 079, 083, 084

## Qısaca
Duel bitəndə XP-ni jurnala düzgün yaz və ən çətin halları test et.

## Qayda (sənəddən)
Hər düzgün cavab = **50 XP**, maksimum **150**. Saytda: 2 düzgün → "+100 XP".

## Nə edəcəksən
1. Miqdar = `düzgün × 50`. Qaydanı **duelin özündən** (başlayanda saxlanılan) götür, cari ayardan yox. Niyə? Admin oyun ortasında qaydanı dəyişsə, başlamış duel köhnə qayda ilə bitməlidir.
2. Mənbə: `battle` + duel ID. Əlavə: `{ correct, result }`.
3. `xp_eligible = false` → XP yoxdur, amma cavabda `awarded_xp: 0` qaytar.

## Ən çətin test: iki cihaz
Telefon və planşet **eyni anda** "Завершить баттл" basır.
- Birinci tranzaksiya duel-i kilidləyir.
- İkinci gözləyir, sonra "artıq bitib" görür və köhnə nəticəni qaytarır.
Bunu **mütləq** test et.

## Hazır olduğunu necə yoxlayarsan
- [ ] 0, 1, 2, 3 düzgün → 0, 50, 100, 150 XP.
- [ ] Eyni anda 10 bitirmə → bir jurnal sətri, balans bir dəfə artır.
