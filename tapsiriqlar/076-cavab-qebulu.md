# 076 — Cavab vermək: `POST /battles/{id}/answers`

**Status:** [ ] · **Faza:** 5 · **Əvvəl bitməli:** 075

## Qısaca
Cavabı serverdə yoxla, **bir dəfə** qəbul et, nəticəni qaytar.

## Saytda
"11 ✓" + "Верно! 11 игроков, включая вратаря." və ya "Не угадал. Точный бросок из-за дуги приносит 3 очка."

## Göndərilən
`{ question_index, option_id, request_id }`

## Qaydalar (sənəddən)
- Bir suala **bir** cavab.
- Eyni `request_id` ilə təkrar → əvvəlki nəticə (idempotent).
- Fərqli cavabla ikinci cəhd → 409 `ANSWER_LOCKED`.
- Deadline-dan sonra gəlsə → qəbul olunmur.

## Addımlar (bir tranzaksiyada, duel kilidli)
1. Duel aktivdir və bu istifadəçinindir? (yoxsa 404; tərk edilibsə 410)
2. Bu, **cari** açıq sualdır? (köhnə və ya gələcək sual → 409)
3. Bu suala cavab artıq var?
   - eyni `request_id` → köhnə nəticəni qaytar;
   - fərqli → 409 `ANSWER_LOCKED`.
4. Deadline varsa və keçibsə → `accepted: false`, 0 xal.
5. `option_id` bu sualın variantıdır? (yoxsa 400)
6. Cavabı yaz, düzgündürsə xal +1.
7. **Bot:** bu sual botun "düzgün" sualıdırsa → bot xalı +1.
8. Sualı bağla.
9. Cavab: qəbul olundu, düzgündür?, düzgün cavab, izah, ilkin XP, xallar, növbəti var?

## Diqqət
- `provisional_xp` yalnız **göstərmək** üçündür. Balans yalnız duel bitəndə dəyişir (sənəd).
- Frontend `correct: true` göndərsə, **nəzərə alma**.
- Vaxt həmişə **server** saatıdır.

## Hazır olduğunu necə yoxlayarsan
- [ ] Eyni `request_id` ilə 2 sorğu → eyni cavab, bir qeyd.
- [ ] Başqa variantla ikinci cavab → 409.
- [ ] Eyni anda 2 fərqli cavab → biri qəbul, digəri 409 (test).
