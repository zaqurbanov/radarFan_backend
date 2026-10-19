# 062 — Səsvermə: `PUT /polls/{id}/vote`

**Faza:** 4 · **Asılılıq:** 061 · **Status:** [ ]

## Məqsəd
İstifadəçi bir səs verir, istədikdə dəyişir. Sayğaclar həmişə dəqiq qalır.

## Niyə
Sənəd (bölmə 4): "İstifadəçinin bağlanışadək dəyişə biləcəyi bir səsi var. Eyni option üçün təkrar sayğacı artırmır. Səsvermədən əvvəl nəticəsiz variantlar, sonra real counts və faizlər göstərilir."
Bölmə 11: "Təkrar səs sayğacı artırmır; səsin dəyişməsi onu options arasında köçürür. Bağlanmış poll dəyişiklikləri rədd edir."
Sayt: səsdən sonra "RM · 62% / FCB · 38%", "Твой голос учтён. Можно изменить выбор. Исходные голоса смоделированы."

## Cədvəl
**`poll_votes`**
| Sütun | Tip |
|---|---|
| poll_id | uuid FK |
| user_id | uuid FK |
| tenant_id | uuid |
| option_id | uuid FK → poll_options |
| created_at, updated_at | timestamptz |

PK (`poll_id`, `user_id`). "Poll istifadəçisi başına bir vote".

## Endpoint-lər
| Metod | Yol | Cavab |
|---|---|---|
| GET | /rooms/{id}/poll | poll, my_vote, (səs veribsə) counts + percentages |
| PUT | /polls/{id}/vote | `{ option_id }` → my_vote, counts, percentages |

## Necə edəcəksən (tranzaksiya)
1. Poll `open` və `closes_at > now`? Yoxsa 409 (`POLL_CLOSED`).
2. `option_id` bu poll-a aiddir? (Başqa poll-un option-u ilə hiylə.)
3. Mövcud səsi `SELECT ... FOR UPDATE` ilə oxu:
   - yoxdur → insert, yeni option `+1`, total `+1`;
   - eyni option → heç nə (idempotent);
   - fərqli option → köhnə `-1`, yeni `+1`, total dəyişmir.
4. `poll.version + 1`, outbox `poll.updated` (065).
5. **Race:** iki paralel səs eyni istifadəçidən (iki tab). `FOR UPDATE` olmadan ikisi də "səs yoxdur" görüb insert edir, biri PK xətası alır, amma sayğac artıb ola bilər. Tranzaksiya sırasını düşün.
6. **Demo:** "Исходные голоса смоделированы". Demo poll-larda başlanğıc sayğaclar seed-də (məs. 62/38 nisbətində). Real tenant-da 0-dan başlayır.

## Qəbul meyarları
- [ ] Səs ver → dəyiş → dəyiş: total 1, sayğaclar düzgün.
- [ ] Bağlı poll-a səs → 409.
- [ ] Səs verməmiş istifadəçi `GET` ilə counts görmür.
- [ ] Eyni istifadəçidən 10 paralel səs → total 1.
