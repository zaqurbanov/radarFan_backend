# 076 — Cavab qəbulu: `POST /battles/{id}/answers`

**Faza:** 5 · **Asılılıq:** 075 · **Status:** [ ]

## Məqsəd
Cavabı serverdə yoxla, bir dəfə qəbul et, nəticəni qaytar.

## Niyə
Sənəd (bölmə 5): "Cavab serverə deadline_at-dan əvvəl çatarsa qəbul edilir. Bir question_id üçün bir cavab mümkündür. Eyni request_id ilə təkrar əvvəlki nəticəni qaytarır; artıq qəbul edilmiş cavabı dəyişmək cəhdi ANSWER_LOCKED yaradır."
"Birinci mərhələdə cavabdan və ya vaxt bitdikdən sonra server düzgün variantı və izahı göstərir."
Bölmə 8 nümunəsi: `{battle_id, question_id, accepted:true, correct:true, provisional_xp:50, explanation:"Qapıçı daxil olmaqla 11 oyunçu", next_available:true}`.
Sayt: "11 ✓" + "Верно! 11 игроков, включая вратаря." / "Не угадал. Точный бросок из-за дуги приносит 3 очка."

## Body
`{ question_index (və ya question_id), option_id, request_id }`

## Necə edəcəksən (tranzaksiya, battle `FOR UPDATE`)
1. Battle aktiv və sahibi bu user? Yoxsa 404 / 410 `BATTLE_EXPIRED` (abandoned).
2. Göndərilən sual **cari** açıq sualdır? Köhnə sual → 409 `ANSWER_LOCKED`; gələcək sual → 409.
3. Bu sual üçün cavab var?
   - eyni `request_id` → əvvəlki nəticə (idempotent);
   - fərqli `request_id` → 409 `ANSWER_LOCKED`.
4. `deadline_at` varsa və `now > deadline_at` → rədd (gec cavab). Nə qaytarırsan? Sual bağlanır, 0 xal, `accepted: false`.
5. `option_id` bu sualın variantlarından biridir? Yoxsa 400.
6. Insert answer, `correct` hesabla, `user_score` yenilə. **Bot cavabı**: bu sual `bot_correct_index`-dirsə `bot_score + 1`.
7. Sualı `closed` et (demo-da cavab = sualın bağlanması).
8. Cavab: accepted, correct, correct_option_id, explanation, provisional_xp, scores, `next_available`, son sualdırsa `can_complete: true`.
9. WS: `battle.answer.ack`, `battle.question.closed` (082).
10. **`provisional_xp`** yalnız göstərmək üçündür. Sənəd: "Oyun zamanı ilkin xallar göstərilə bilər, lakin ümumi balans yalnız tamamlanmadan sonra dəyişir."

## Tələlər
- Müştəri `correct: true` göndərsə, nəzərə alınmır. Bölmə 10: "Müştəri xp_delta göndərmir və düzgün cavabı təyin etmir; server belə sahələri nəzərə almır."
- Vaxt həmişə server saatıdır.

## Qəbul meyarları
- [ ] Eyni `request_id` ilə 2 sorğu → eyni cavab, bir qeyd.
- [ ] Başqa variantla ikinci cavab → 409 `ANSWER_LOCKED`.
- [ ] 2 paralel fərqli cavab → biri qəbul, digəri 409 (test).
- [ ] Deadline-dan sonra cavab → `accepted: false`.
