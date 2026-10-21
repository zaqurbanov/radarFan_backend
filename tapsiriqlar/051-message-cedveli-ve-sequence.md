# 051 — Mesajlar cədvəli və sıra nömrəsi

**Status:** [ ] · **Faza:** 4 · **Əvvəl bitməli:** 050

## Qısaca
Mesajlar ardıcıl nömrə ilə, dublikatsız saxlansın.

## Niyə vaxtla (`created_at`) sıralamaq olmaz?
- Eyni millisaniyədə iki mesaj gələ bilər.
- Bir neçə serverin saatı azca fərqli ola bilər.
- Nömrədə boşluq (5-dən sonra 7) = "mesaj itib" deməkdir. Vaxtla bunu bilmək mümkün deyil.

## Yeni cədvəl: `messages`
| Sütun | İzah |
|---|---|
| id | |
| tenant_id | |
| room_id | hansı otaq |
| user_id | kim yazıb |
| sequence | otaqdakı nömrəsi: 1, 2, 3... |
| client_message_id | frontend-in verdiyi unikal ID |
| text | mətn (240 simvola qədər, amma emoji 4 bayt olduğu üçün sütun daha geniş) |
| status | `visible` / `hidden_by_moderator` / `deleted` |
| is_demo | demo bot mesajı |
| like_count | like sayı (task 059) |
| created_at | |
| hidden_at, hidden_by | moderasiya (task 067) |

- Unique (`room_id`, `sequence`), unique (`user_id`, `client_message_id`).
- Index (`tenant_id`, `room_id`, `sequence`).
- **Ad saxlanmır**, yalnız `user_id`. Ad dəyişəndə köhnə mesajlarda yeni ad görünür.

## Ən vacib sual: sıra nömrəsini necə almaq?
| Üsul | Problem |
|---|---|
| `MAX(sequence) + 1` | İki eyni anda gələn mesaj eyni nömrəni alır → xəta |
| Redis `INCR` | Mesaj yazılmasa da nömrə artır → boşluq |
| **`UPDATE rooms SET last_sequence = last_sequence + 1 RETURNING`**, mesajla **eyni tranzaksiyada** | Otaq sətri qısa müddət kilidlənir, saniyədə 50 mesaj üçün problem deyil |

**Tövsiyə: sonuncu.** Niyə işləyir? `UPDATE` sətri kilidləyir. İkinci mesaj birincinin bitməsini gözləyir. Tranzaksiya ləğv olsa, nömrə də geri qayıdır, boşluq olmur.

## Hazır olduğunu necə yoxlayarsan
- [ ] Eyni anda 100 mesaj göndər → nömrələr 1-dən 100-ə qədər, boşluqsuz, dublikatsız (test).
