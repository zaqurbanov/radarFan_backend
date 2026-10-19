# 072 — Sual bankı və versiyalama

**Faza:** 5 · Quiz Battle · **Asılılıq:** 021 · **Status:** [ ]

## Məqsəd
Viktorina sualları serverdə saxlansın. Düzgün cavab heç vaxt müştəriyə vaxtından əvvəl getməsin.

## Niyə
- Sənəd (bölmə 2): prototipdə "Cavablar və düzgün variant müştəri kodunda". MVP: "Cavabların yalnız serverdə yoxlanması". Kim DevTools açarsa, hər sualı bilir və XP qazanır.
- Bölmə 7: Question — id, tenant_id, version, text, options, correct_option_id, explanation, status; "istifadədən sonra versiya dəyişməzdir".
- Sayt sualları: "Сколько игроков одной команды на поле в футболе?" (10/11/12/9, düzgün 11, izah "11 игроков, включая вратаря"); "Сколько очков даёт бросок из-за дуги в баскетболе?" (1/2/3/4, düzgün 3); "Что такое хет-трик?" (düzgün: "Три гола одного игрока").

## Cədvəllər
**`questions`**
| Sütun | Tip | Qeyd |
|---|---|---|
| id | uuid PK | |
| tenant_id | uuid | |
| sport | enum NULL | NULL = ümumi |
| locale | varchar(10) | |
| difficulty | smallint NULL | |
| status | enum(`draft`, `active`, `retired`) | |
| current_version | int | |
| created_at, updated_at | | |

**`question_versions`**
| Sütun | Tip | Qeyd |
|---|---|---|
| id | uuid PK | battle bu id-yə istinad edir |
| question_id | uuid FK | |
| version | int | |
| text | varchar(300) | |
| options | jsonb | `[{id: "a", text: "10"}, ...]` 4 ədəd |
| correct_option_id | varchar(10) | |
| explanation | varchar(300) | |
| created_at | | |

UNIQUE (`question_id`, `version`).

**Niyə versiya cədvəli?** "İstifadədən sonra versiya dəyişməzdir". Admin sualdakı səhvi düzəldəndə (məs. düzgün cavab səhv idi), keçmiş battle-lar köhnə versiyaya istinad edir və nəticələri dəyişmir. Yeni battle-lar yeni versiyanı alır. **Battle `question_version_id`-yə istinad edir, `question_id`-yə yox.**

## Necə edəcəksən
1. Option id-ləri sabit (`a`, `b`, `c`, `d`) və ya UUID. **Variantların sırasını hər battle-da qarışdırmaq** istəyirsən? Onda sıra battle-a bağlı saxlanmalıdır (073).
2. Seed: saytdakı 3 sual + ən azı 20 əlavə (rus dilində, demo tenant locale-ı). Az sual olsa, eyni suallar təkrarlanacaq.
3. Response sxemi (010): sual müştəriyə gedəndə `correct_option_id` və `explanation` sxemdə **yoxdur**. Səhvən sızmasın.

## Qəbul meyarları
- [ ] Sualın düzgün cavabını dəyişmək yeni versiya yaradır, köhnə battle-ların nəticəsi dəyişmir.
- [ ] Heç bir müştəri endpoint-i açıq sual üçün `correct_option_id` qaytarmır (test).
