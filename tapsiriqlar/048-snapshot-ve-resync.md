# 048 — Bağlantı qopanda bərpa

**Status:** [ ] · **Faza:** 3 · **Əvvəl bitməli:** 042, 045

## Qısaca
Bağlantı qopub qayıdanda və ya sıra nömrəsində boşluq görünəndə frontend vəziyyəti etibarlı bərpa etsin.

## Niyə lazımdır?
- Metroda internet 10 saniyə kəsildi. Bu vaxt çatda 3 mesaj gəldi. Qayıdanda onlar görünməlidir.
- Sənəd: frontend son gördüyü sıra nömrəsini göndərir, server buraxılanları qaytarır. Çox köhnədirsə → "tam yenidən yüklə".

## Necə işləyir
Frontend abunə olanda `since_sequence` göndərir (son gördüyü nömrə):
- Server buraxılanları **qısa yaddaşdan** (son 500 hadisə və ya son 5 dəqiqə) tapa bilirsə → göndərir, sonra canlı davam edir.
- Tapa bilmirsə → `resync_required` göndərir. Frontend REST ilə hər şeyi yenidən yükləyir.

**Çat mesajları xüsusidir:** onlar bazadadır, həmişə REST ilə bərpa olunur (task 056).

## Nə edəcəksən
1. Kanallar üçün qısa yaddaş: Redis Stream (`XADD` + `MAXLEN ~ 500`). Araşdır.
2. Hansı kanallar bunu tələb edir? `user:` (XP itməsin) və `battle:` vacibdir. `feed:` üçün sadəcə yenidən yükləmə kifayətdir.
3. Frontend üçün qaydanı yaz: boşluq → bərpa; tətbiq arxa plandan qayıdanda → bərpa.

## Hazır olduğunu necə yoxlayarsan
- [ ] Frontend 3 mesaj buraxıb `since_sequence` ilə qayıdanda həmin 3 mesajı alır.
- [ ] Çox köhnə nömrə ilə qayıdanda `resync_required` alır.
