# 131 — Real duel: sinxron suallar

**Faza:** 13 · **Asılılıq:** 130, 078 · **Status:** [ ]

## Məqsəd
Hər iki oyunçuya eyni sual eyni anda, eyni deadline ilə.

## Niyə
Sənəd (bölmə 10): "Server eyni sualı hər iki oyunçuya 20 saniyəyə açır. Hər ikisi üçün sual bağlanana qədər düzgün cavab açıqlanmır."
"Bağlantının kəsilməsi taymeri dayandırmır. Buraxılmış cavab 0 alır; yenidən qoşulma snapshot-u bərpa edir."

**Demo-dan fərqlər:**
| | Demo | Real |
|---|---|---|
| Vaxt limiti | konfiq (sayt: yoxdur) | **məcburi 20 san.** |
| Sual bağlanması | cavab verəndə | **hər ikisi cavab verəndə və ya deadline-da** |
| Feedback | cavabdan dərhal sonra | **sual bağlanandan sonra** |
| Növbəti sual | düymə / 10 san. | server avtomatik (fasilə ilə) |

## Necə edəcəksən
1. Cavab (076) qəbul olunur, amma `correct` **gizli qalır**. Cavab: `accepted: true` + `battle.answer.ack`.
2. Sual bağlanma şərti: `answers_count = 2` **və ya** `now >= deadline_at`. Hər iki halda eyni idempotent `closeQuestion()`.
3. Bağlananda `battle.question.closed`: hər iki oyunçunun cavabları, düzgün cavab, hesab.
4. Növbəti sual: N saniyə fasilədən sonra job ilə.
5. **Saat ədalətliliyi:** `deadline_at` server vaxtıdır. Şəbəkə gecikməsi yüksək olan oyunçu dezavantajdadır. Sənəd tolerans vermir, bunu qəbul et.
6. Sürət tie-breaker deyil (132).

## Qəbul meyarları
- [ ] Bir oyunçu cavab verəndə digəri düzgün cavabı görmür (WS payload testi).
- [ ] Biri cavab vermirsə, sual 20 san. sonra bağlanır, ona 0.
- [ ] Bağlantısı qopan oyunçu qayıdanda snapshot düzgündür.
