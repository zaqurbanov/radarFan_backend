# 037 — Seçilmişlər: `PUT/DELETE /favorites/{event_id}`

**Faza:** 2 · **Asılılıq:** 033 · **Status:** [ ]
(Köhnə `TASKS.md`: T16)

## Məqsəd
İstifadəçi matçı seçilmişlərə əlavə edə və silə bilsin.

## Niyə
- Sənəd (bölmə 3, Seçilmişlər): "Saxlama və silmə idempotentdir. UI optimistik yenilənə bilər, lakin xəta zamanı dəyişiklik geri qaytarılır. İlk təsdiqlənmiş saxlama save_match tapşırığını tamamlayır. Seçilmişlərdən silmə tapşırığın tamamlanmasını ləğv etmir."
- Sayt: kartda "♡ Сохранить", filtr "Избранное", profildə "Мои избранные", "0 избранных матчей".
- `favorites` cədvəli artıq var. PK (`tenant_id`, `user_id`, `event_id`), bu yaxşıdır.

## Endpoint-lər
| Metod | Yol | Cavab |
|---|---|---|
| PUT | /favorites/{event_id} | `{ saved: true, challenge_progress? }` |
| DELETE | /favorites/{event_id} | `{ saved: false }` |
| GET | /favorites | profil üçün siyahı (cursor) |

**Niyə PUT/DELETE, POST deyil?** PUT və DELETE HTTP-də təbiətən idempotentdir. Təkrar PUT eyni vəziyyəti yaradır. Burada Idempotency-Key lazım deyil.

## Necə edəcəksən
1. PUT: `INSERT ... ON CONFLICT DO NOTHING`. Təkrar xəta vermir.
2. Event bu tenant-a aid deyilsə → 404.
3. DELETE: mövcud deyilsə də 200 `saved: false` (idempotent).
4. `save_match` tapşırığı: **ilk** uğurlu saxlamada (task 091). Insert həqiqətən baş verdisə, bunu necə biləcəksən? (`RETURNING`.) Amma diqqət: sil + yenidən saxla = yenidən "ilk" deyil, çünki tapşırıq artıq tamamlanıb. Tapşırıq məntiqi bunu öz tərəfində idarə edir.
5. Bitmiş matçı seçilmişlərə əlavə etmək olarmı? Qərar ver.
6. Analitika: `match_saved` (task 119).

## Qəbul meyarları
- [ ] PUT iki dəfə → bir sətir, iki dəfə 200.
- [ ] DELETE mövcud olmayana → 200.
- [ ] Başqa tenant-ın event-i → 404.
- [ ] `/events?favorites=true` yalnız seçilmişləri qaytarır.
