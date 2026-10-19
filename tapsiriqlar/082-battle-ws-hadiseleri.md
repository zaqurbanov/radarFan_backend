# 082 — Battle WebSocket hadisələri

**Faza:** 5 · **Asılılıq:** 076–081, 045 · **Status:** [ ]

## Məqsəd
Battle-ın bütün keçidləri `battle:{id}` kanalı ilə real vaxtda gəlsin.

## Niyə
Sənəd (bölmə 9):
| Hadisə | Payload |
|---|---|
| `battle.question.opened` | battle_id, question, deadline_at |
| `battle.answer.ack` | request_id, accepted, server_received_at |
| `battle.question.closed` | scores və icazə verilən feedback |
| `battle.completed` | result, scores, awarded_xp, xp_balance |

"Real vaxt dueli üçün polling server deadline-larını əvəz etmir."

Demo-da REST cavabları kifayət edir, amma iki tab açıqdırsa və ya job (deadline, auto-next) keçid edirsə, müştəri bilməlidir. 2-ci mərhələdə (129+) isə bu hadisələr **əsas** kanaldır.

## Necə edəcəksən
1. Hər keçid funksiyası (073) outbox-a uyğun hadisəni yazır, bir yerdə.
2. `battle.question.opened` payload-ında **yalnız** cari sual (correct-siz).
3. `battle.question.closed`: "icazə verilən feedback". Demo-da düzgün cavab + izah; real-da isə hər iki oyunçu üçün bağlandıqdan sonra.
4. Kanal hüququ: yalnız iştirakçı (041).

## Qəbul meyarları
- [ ] Bir tabda cavab verəndə ikinci tab `battle.question.closed` alır.
- [ ] Heç bir `battle.question.opened` payload-ında `correct_option_id` yoxdur (test).
