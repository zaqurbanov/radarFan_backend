# 045 — Outbox: "göndəriləcəklər qutusu"

**Status:** [ ] · **Faza:** 3 · **Əvvəl bitməli:** 044, 049

## Qısaca
Bazaya yazılan hər dəyişiklik real vaxt mesajı kimi **mütləq** yayılsın. Yazılmayan isə **heç vaxt** yayılmasın.

## Problem
Kod belədir: "mesajı bazaya yaz → Redis-ə yayımla". İki şey ayrı-ayrı olur:
- Bazaya yazıldı, yayımdan **əvvəl** server çökdü → mesaj bazadadır, heç kim görmədi.
- Yayımladın, sonra baza tranzaksiyası **ləğv oldu** → hamı mövcud olmayan mesajı gördü.

## Həll
1. Mesajı bazaya yazanda **eyni tranzaksiyada** `outbox_events` cədvəlinə "bunu yayımla" qeydi də yaz.
2. Ayrı bir proses ("relay") bu cədvəli oxuyur, Redis-ə yayımlayır, qeydi "göndərildi" işarələyir.

Nəticə: tranzaksiya uğurludursa, yayım **mütləq** olacaq. Ləğv olubsa, outbox qeydi də yoxdur.

## Yeni cədvəl: `outbox_events`
| Sütun | İzah |
|---|---|
| id | ardıcıl nömrə (sıra üçün) |
| event_id | unikal ID (dublikat aşkarlamaq üçün) |
| tenant_id | |
| channel | hansı kanala |
| type | hadisə tipi |
| payload | məlumat (JSON) |
| created_at | |
| published_at | göndərilib? (boşdursa, yox) |
| attempts | neçə cəhd edilib |

Index: yalnız göndərilməmişlər üçün (`WHERE published_at IS NULL`). Bu, "partial index"-dir.

## Nə edəcəksən
1. Relay hər 100–500 ms-də göndərilməmişləri götürür.
2. İki relay eyni qeydi götürməsin: `FOR UPDATE SKIP LOCKED` araşdır.
3. Köhnə göndərilmiş qeydləri silən fon tapşırığı.

## Diqqət
Relay bir mesajı bəzən **iki dəfə** göndərə bilər. Frontend `event_id` ilə dublikatı atır, buna görə problem deyil.

## Hazır olduğunu necə yoxlayarsan
- [ ] Mesaj tranzaksiyası ləğv olanda heç bir WebSocket mesajı getmir (test).
- [ ] Relay dayandırılıb yenidən işə salınanda yığılmış mesajlar göndərilir.
