# 093 — XP və tapşırıq bildirişləri

**Status:** [ ] · **Faza:** 6 · **Əvvəl bitməli:** 091, 092, 045

## Qısaca
XP, coin və tapşırıq dəyişəndə istifadəçinin **bütün açıq cihazları** bilsin.

## Bildirişlər (`user:{id}` kanalı)
| Bildiriş | İçində |
|---|---|
| `xp.updated` | jurnal ID, yeni XP balansı |
| `coins.updated` | jurnal ID, yeni coin balansı (saytdan) |
| `challenge.updated` | tapşırıq ID, tapşırıqlar, status |

Başlıqdakı XP ("50 XP" → "150 XP") hər yerdə yenilənməlidir.

## Nə edəcəksən
1. Jurnala yazanda eyni tranzaksiyada outbox-a qeyd.
2. Frontend: eyni jurnal ID-ni ikinci dəfə görsə → atır.
3. `user:` kanalı bərpa yaddaşı tələb edir (048). XP bildirişi itməsin.

## Hazır olduğunu necə yoxlayarsan
- [ ] Duel bitəndə ikinci tabdakı başlıq yeni XP-ni göstərir.
