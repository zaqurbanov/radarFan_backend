# 091 — Tapşırıq hadisələrinin bağlanması

**Faza:** 6 · **Asılılıq:** 090, 037, 053, 079 · **Status:** [ ]

## Məqsəd
Uğurlu server hadisələri müvafiq tapşırığı tamamlasın: həmişəlik və geri qaytarılmadan.

## Niyə
Sənəd:
- "Uğurlu server hadisələri tapşırıqları həmişəlik tamamlayır; tamamlanmış viktorinada məğlubiyyət də complete_battle tapşırığını yerinə yetirir."
- "İlk təsdiqlənmiş saxlama save_match tapşırığını tamamlayır. Seçilmişlərdən silmə tapşırığın tamamlanmasını ləğv etmir."
- "send_message tapşırığı yalnız server mesajı qəbul etdikdən sonra tamamlanır."
- Abandoned battle tapşırığı tamamlamır (081).
- Bölmə 8: `POST /rooms/{id}/messages` cavabında `challenge_progress`.

## Hadisə → tapşırıq
| Hadisə | Tapşırıq | Harada |
|---|---|---|
| Favorite insert (yeni) | save_match | 037 |
| Mesaj qəbul olundu | send_message | 053 |
| Battle completed (istənilən nəticə) | complete_battle | 079 |

## Necə edəcəksən
1. Funksiya: `markTaskDone(tx, user, taskCode)`. Biznes tranzaksiyasının **daxilində** çağırılır. Niyə? Mesaj rollback olsa, tapşırıq da tamamlanmamalıdır.
2. Atomar yeniləmə: `UPDATE challenge_progress SET task_flags = jsonb_set(...), completed_count = completed_count + 1 WHERE ... AND task_flags->>'send_message' IS NULL`. Şərt təkrarı bloklayır.
3. 3/3 olanda `status = claimable`.
4. Aktiv challenge-ləri tap: istifadəçinin `in_progress` challenge-lərindən hansında bu `task_code` var?
5. Dəyişiklik olubsa → outbox `challenge.updated` (093).
6. Cavaba `challenge_progress` əlavə et (frontend "1/3" göstərsin).
7. **Alternativ dizayn:** domain events (mesaj modulu "message.sent" hadisəsi atır, challenge modulu dinləyir). Daha az bağlılıq, amma tranzaksiya sərhədi mürəkkəbləşir. Hansını seçirsən?

## Qəbul meyarları
- [ ] Mesaj göndər → `send_message` tamamlanır, ikinci mesaj sayğacı artırmır.
- [ ] Favorit əlavə et → sil → yenidən əlavə et: tapşırıq tamamlanmış qalır, sayğac 1.
- [ ] Məğlub olunmuş, amma tamamlanmış battle → `complete_battle` tamamlanır.
- [ ] Abandoned battle → tamamlanmır.
