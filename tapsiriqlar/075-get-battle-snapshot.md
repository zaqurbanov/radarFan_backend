# 075 — `GET /battles/{id}`: snapshot və bərpa

**Faza:** 5 · **Asılılıq:** 074 · **Status:** [ ]

## Məqsəd
Reload və ya reconnect-dən sonra battle tam bərpa olunsun.

## Niyə
Sənəd (bölmə 5): "Vəziyyət serverdə saxlanır və yenidən yüklənəndə bərpa edilir." Bölmə 8: → "cari snapshot və hazırdırsa nəticə".

## Cavab
- `battle_id`, `state`, `mode`, `opponent` { name: "Alex", is_bot: true }
- `progress`: { index: 1, total: 3 } (sayt: "1 / 3")
- `scores`: { user, bot }
- `current_question`: sual mətni + options (+ cavab verilibsə: `my_answer`, `correct_option_id`, `explanation`)
- `question_state`: open / closed
- `deadline_at`, `next_auto_at` (075/077)
- `result`, `awarded_xp`, `awarded_coins` (completed-dirsə)
- `server_time`

## Necə edəcəksən
1. Yalnız battle sahibi görə bilər (başqası → 404).
2. **Lazy evaluation:** snapshot oxunanda deadline keçibsə, sualı "bağlanmış" kimi göstər (və ya keçidi burada et, 078).
3. Bağlanmamış sual üçün düzgün cavab sızmasın. Sənəd: "Raund bitənədək correct_option_id, izah və gələcək suallar göndərilmir". Gələcək suallar da!
4. Müştəri bu cavabdan bütün ekranı qura bilməlidir: başqa sorğu lazım olmamalıdır.

## Qəbul meyarları
- [ ] Açıq sual zamanı snapshot-da `correct_option_id` yoxdur.
- [ ] Cavab veriləndən sonra snapshot `correct_option_id` + `explanation` göstərir.
- [ ] Gələcək suallar heç vaxt görünmür.
