# 042 — Real vaxt mesajlarının forması

**Status:** [ ] · **Faza:** 3 · **Əvvəl bitməli:** 041

## Qısaca
Serverdən gələn **bütün** real vaxt mesajları eyni formada olsun:
```
{ event_id, type, channel, sequence, emitted_at, payload }
```

## Hər sahə nə üçündür
| Sahə | Nə üçün |
|---|---|
| `event_id` | Unikal ID. Eyni mesaj iki dəfə gəlsə, frontend ikincisini atır |
| `type` | Nə baş verdi: `room.message.created` və s. |
| `channel` | Hansı kanal: `room:123` |
| `sequence` | Kanal daxilində 1, 2, 3... **Boşluq varsa** (5-dən sonra 7) → nəsə itib → bərpa et |
| `emitted_at` | Server vaxtı |
| `payload` | Məlumatın özü |

## Nə edəcəksən
1. Bütün mesaj tiplərini bir faylda təyin et (TypeScript "discriminated union").
2. Kanalın sıra nömrəsi haradan gəlir? Redis `INCR` sadə və sürətlidir. Amma Redis yenidən başlasa, sayğac sıfırlanır. Bu riski necə həll edərsən? Fikirləş.

## Diqqət
Kanal sıra nömrəsi ilə **mesajın** otaqdakı sıra nömrəsi fərqli şeylərdir. `room:` kanalına mesajdan başqa hadisələr də gedir (gizlətmə, sorğu, onlayn sayı).

## Hazır olduğunu necə yoxlayarsan
- [ ] Hər çıxan mesaj bu formadadır.
- [ ] Eyni kanalda sıra nömrələri ardıcıldır (test).
