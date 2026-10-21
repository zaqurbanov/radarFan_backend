# 131 — Real duel: eyni sual, eyni anda

**Status:** [ ] · **Faza:** 13 · **Əvvəl bitməli:** 130, 078

## Qısaca
Hər iki oyunçuya eyni sual, eyni anda, eyni deadline ilə.

## Demo ilə fərqlər
| | Demo | Real |
|---|---|---|
| Vaxt limiti | ayarlanır (sayt: yoxdur) | **məcburi 20 saniyə** |
| Sual nə vaxt bağlanır | cavab verəndə | **hər ikisi cavab verəndə və ya vaxt bitəndə** |
| Düzgün cavab nə vaxt görünür | cavabdan dərhal sonra | **sual bağlananda** (hər ikisi üçün) |
| Növbəti sual | düymə / 10 san. | server avtomatik açır |

## Qaydalar (sənəddən)
- İnternet kəsilməsi taymeri **dayandırmır**.
- Cavab verməyən → 0 xal.
- Yenidən qoşulanda vəziyyət bərpa olunur.

## Nə edəcəksən
1. Cavab qəbul olunur, amma **düzgün olub-olmadığı gizli qalır**. Cavab: `accepted: true` + `battle.answer.ack`.
2. Sual bağlanır: iki cavab gəlib **və ya** deadline keçib. Hər iki hal eyni idempotent funksiyanı çağırır.
3. Bağlananda `battle.question.closed`: hər iki oyunçunun cavabı, düzgün cavab, hesab.
4. Növbəti sual qısa fasilədən sonra fon işi ilə.
5. Sürət heç-heçəni pozmaq üçün istifadə olunmur (132).

## Hazır olduğunu necə yoxlayarsan
- [ ] Biri cavab verəndə digəri düzgün cavabı görmür (WebSocket testi).
- [ ] Biri cavab vermirsə, sual 20 saniyədə bağlanır, ona 0.
- [ ] Qopub qayıdan oyunçu düzgün vəziyyəti görür.
