# 037 — Seçilmişlər: əlavə et və sil

**Status:** [ ] · **Faza:** 2 · **Əvvəl bitməli:** 033

## Qısaca
İstifadəçi matçı seçilmişlərə əlavə edə və silə bilsin.

## Saytda
Kartda "♡ Сохранить", filtr "Избранное", profildə "Мои избранные".

## Endpoint-lər
| Metod | Yol | Cavab |
|---|---|---|
| PUT | /favorites/{event_id} | `{ saved: true }` |
| DELETE | /favorites/{event_id} | `{ saved: false }` |
| GET | /favorites | profil üçün siyahı |

**Niyə PUT/DELETE, POST deyil?** PUT və DELETE təbiətən **idempotentdir**: 5 dəfə göndərsən də nəticə eynidir. Burada Idempotency-Key lazım deyil.

## Qaydalar (sənəddən)
- Təkrar əlavə və təkrar silmə **xəta vermir**.
- **İlk** əlavə "save_match" tapşırığını tamamlayır (task 091).
- Silmək tapşırığı **geri qaytarmır**.

## Nə edəcəksən
1. PUT: `INSERT ... ON CONFLICT DO NOTHING`.
2. DELETE: yoxdursa da 200 qaytar.
3. Matç bu tenant-ın deyilsə → 404.
4. Əlavənin **həqiqətən** baş verdiyini bilmək üçün `RETURNING` istifadə et (tapşırıq üçün lazım olacaq).
5. Fikirləş: bitmiş matçı seçilmişlərə əlavə etmək olarmı?

## Hazır olduğunu necə yoxlayarsan
- [ ] PUT iki dəfə → bazada bir sətir, iki dəfə 200.
- [ ] Olmayan seçilmişi DELETE → 200.
- [ ] Başqa tenant-ın matçı → 404.
- [ ] `/events?favorites=true` yalnız seçilmişləri qaytarır.
