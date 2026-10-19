# 053 — Mesaj göndərmə: `POST /rooms/{id}/messages`

**Faza:** 4 · **Asılılıq:** 051, 036, 018 · **Status:** [ ]

## Məqsəd
Mesajı validasiya et, dublikatsız saxla, real vaxtda yay, tapşırığı yenilə.

## Niyə
Sənəd (bölmə 4, Göndərmə):
- "Mətn HTML, fayl və formatlaşdırma olmadan plain text-dir; trim-dən sonra 1-dən 240-dək Unicode code point ola bilər. Yoxlama müştəridə və serverdə eynidir. Yalnız boşluqlardan ibarət sətir göndərilmir."
- "Müştəri UUID formatında client_message_id yaradır... Eyni ID ilə təkrar mövcud mesajı qaytarır, dublikat yaratmır."
- "send_message tapşırığı yalnız server mesajı qəbul etdikdən sonra tamamlanır."
- "Mətn DOM-a textContent ilə çıxarılır". Bu, frontend qaydasıdır, amma server də HTML-i "təmizləməməlidir". Mətn olduğu kimi saxlanır, çıxışda escape olunur.

Cavab: `message, challenge_progress`.

## Necə edəcəksən
1. **Uzunluq:** JS-də `"😀".length === 2` (UTF-16). Code point sayı: `[...text].length` və ya `Array.from`. Bəs `👨‍👩‍👧` (ailə emoji, 5 code point)? Sənəd **code point** deyir, ona görə grapheme saymırsan. Bu fərqi başa düş.
2. Trim: hansı boşluqlar? ` ` (non-breaking space), `​` (zero-width space) "boşluq"durmu? Yalnız ZWSP-dən ibarət mesaj "boş" mesajdır. Qərar ver.
3. Görünməz idarəedici simvolları (RTL override `‮` və s.) rədd etmək və ya silmək? Bu, spoofing üçün istifadə olunur.
4. Ardıcıllıq (bir tranzaksiyada):
   1. user status (018), otaq `open`-dir? (057)
   2. rate limit (054), tranzaksiyadan **əvvəl**
   3. `client_message_id` ilə mövcud mesaj varsa → onu qaytar (200, yeni yox)
   4. sequence al (051), insert
   5. outbox-a `room.message.created` (055)
   6. challenge `send_message` (091)
   7. commit
5. `client_message_id` dublikatı üçün unique constraint son müdafiədir. Paralel iki eyni sorğu: biri insert edir, digəri unique xətası alır → xətanı tut və mövcudu qaytar.
6. Idempotency-Key (036) burada da məcburidir (sənəd). `client_message_id` artıq eyni rolu oynayır. Hər ikisi lazımdırmı? Sənəd ikisini də deyir. Fikirləş və mentora soruş.
7. Analitika: `message_sent` commit-dən **sonra**, mətnsiz (bölmə 11).

## Qəbul meyarları
- [ ] 240 emoji qəbul olunur, 241 → 400.
- [ ] Yalnız boşluq → 400.
- [ ] `<script>alert(1)</script>` olduğu kimi saxlanır və qaytarılır (escape frontend-də).
- [ ] Eyni `client_message_id` iki dəfə → bir mesaj.
- [ ] Muted istifadəçi → 403 `USER_RESTRICTED`.
