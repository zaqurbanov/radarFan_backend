# 074 — Duel başlatmaq: `POST /battles`

**Status:** [ ] · **Faza:** 5 · **Əvvəl bitməli:** 073, 080

## Qısaca
Yeni demo duel yarat: 3 sual seç, botun hansı suala düzgün cavab verəcəyini təyin et, qaydaları "dondur".

## Saytda (başlanğıc ekranı)
"ДЕМО-СОПЕРНИК · БОТ ALEX", "3 вопроса. Верный ответ — 50 XP и 20 ◈. Бот завершает демо с 1 очком.", "XP начисляются за первые 3 баттла".

## Endpoint-lər
| Metod | Yol | Cavab |
|---|---|---|
| GET | /battles/intro | Rəqib (Alex, bot), sual sayı, mükafat qaydaları, bu gün neçə XP-li duel qalıb |
| POST | /battles | duel ID, vəziyyət, **yalnız birinci sual** (düzgün cavabsız) |

## Addımlar (bir tranzaksiyada)
1. Aktiv duel artıq var? → onu qaytar (səhifə yenilənib). Və ya 409? Qərar ver.
2. Gündəlik limiti yoxla (080), `xp_eligible`-i və günü təyin et.
3. 3 **fərqli aktiv** sual seç (tenant + dil üzrə).
4. Bot hansı suala düzgün cavab verəcək: 0, 1 və ya 2, təsadüfi.
5. Qaydaları tenant ayarlarından götür və **duelə yaz** (XP 50, coin 20, vaxt limiti).
6. Birinci sualı aç.
7. Idempotency-Key məcburidir.

## Diqqət
Cavabda **heç vaxt**: düzgün cavab, izah, növbəti suallar.

## Hazır olduğunu necə yoxlayarsan
- [ ] Cavabda `correct_option_id` yoxdur.
- [ ] 3 sual fərqlidir.
- [ ] Eyni Idempotency-Key ilə 2 sorğu → bir duel.
