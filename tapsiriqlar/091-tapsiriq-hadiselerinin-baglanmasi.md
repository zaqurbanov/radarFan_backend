# 091 — Tapşırıqların avtomatik tamamlanması

**Status:** [ ] · **Faza:** 6 · **Əvvəl bitməli:** 090, 037, 053, 079

## Qısaca
Uğurlu hərəkət müvafiq tapşırığı **həmişəlik** tamamlasın.

## Hansı hərəkət hansı tapşırığı tamamlayır
| Hərəkət | Tapşırıq | Task |
|---|---|---|
| Matç seçilmişlərə **ilk dəfə** əlavə olundu | save_match | 037 |
| Mesaj **qəbul olundu** | send_message | 053 |
| Duel bitdi (**məğlubiyyət də**) | complete_battle | 079 |

## Qaydalar (sənəddən)
- Seçilmişdən silmək tapşırığı **geri qaytarmır**.
- Tərk edilmiş duel tapşırığı tamamlamır.

## Nə edəcəksən
1. Funksiya: `tapşırığı_işarələ(tx, user, kod)`. **Əsas əməliyyatın tranzaksiyasının içində** çağırılır. Niyə? Mesaj yazılmasa, tapşırıq da tamamlanmamalıdır.
2. Atomar yeniləmə: "bu tapşırıq hələ boşdursa, işarələ və sayğacı +1 et". Şərt təkrarı bloklayır.
3. 3/3 olanda → `claimable`.
4. Dəyişiklik olubsa → `challenge.updated` bildirişi (093).
5. Mesaj cavabına `challenge_progress` əlavə et (frontend "1/3" göstərsin).

## Hazır olduğunu necə yoxlayarsan
- [ ] Mesaj göndər → tapşırıq tamamlanır. İkinci mesaj sayğacı artırmır.
- [ ] Əlavə et → sil → yenidən əlavə et: tapşırıq tamamlanmış qalır, sayğac 1.
- [ ] Uduzulmuş, amma bitmiş duel → tamamlanır.
- [ ] Tərk edilmiş duel → tamamlanmır.
