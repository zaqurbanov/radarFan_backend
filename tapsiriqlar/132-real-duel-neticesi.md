# 132 — Real duel: nəticə və XP

**Status:** [ ] · **Faza:** 13 · **Əvvəl bitməli:** 131, 085

## Qısaca
Nəticəni və hər oyunçunun mükafatını **dəqiq bir dəfə** hesabla.

## Qaydalar (sənəddən)
- Düzgün cavabların sayı qalibi təyin edir. Bərabərlik = heç-heçə. **Sürət nəzərə alınmır.**
- 3 sualdan sonra server oyunu **özü** bitirir, oyunçular qoşulu olmasa belə.
- Ən azı bir cavab vermiş oyunçu XP ala bilər (gündəlik limit daxilində).
- Heç cavab verməyən → 0 XP, tapşırıq tamamlanmır.
- Server xətası (`aborted`) → heç kimə mükafat yox, limit sərf olunmur.
- Hər oyunçunun XP-si ayrıca və dəqiq bir dəfə.

## Nə edəcəksən
1. 3-cü sual bağlananda **server** bitirir (frontend "bitir" göndərmir).
2. Hər oyunçu üçün ayrıca:
   - öz nəticəsi (qələbə/heç-heçə/məğlubiyyət);
   - heç cavab verməyibsə → 0 XP, tapşırıq yox;
   - öz gündəlik limiti (080) → XP + coin;
   - jurnal: mənbə `battle` + duel ID. Unique qayda hər oyunçuya bir sətir verir.
3. `aborted` nə vaxt olur? (Sual açıla bilmədi, baza xətası.) Siyahısını yaz.
4. Hər oyunçuya öz `battle.completed` bildirişi (öz XP-si ilə).

## Hazır olduğunu necə yoxlayarsan
- [ ] 2:2 → hər ikisinə heç-heçə.
- [ ] Heç cavab verməyən 0 XP alır, tapşırıq tamamlanmır.
- [ ] Bitirmə eyni anda iki yerdən tetiklənsə (fon işi + son cavab) → hər oyunçuya bir jurnal sətri.
- [ ] Aborted → heç kimə XP, limit dəyişmir.
