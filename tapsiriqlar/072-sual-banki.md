# 072 — Viktorina sualları

**Status:** [ ] · **Faza:** 5 · **Əvvəl bitməli:** 021

## Qısaca
Suallar serverdə saxlansın. Düzgün cavab frontend-ə **vaxtından əvvəl** getməsin.

## Niyə lazımdır?
- Prototipdə suallar və düzgün cavablar **frontend kodunda** idi. DevTools açan hər kəs bütün cavabları bilir və XP qazanır.
- Sənəd: cavablar **yalnız serverdə** yoxlanır.

## Saytdakı suallar
| Sual | Variantlar | Düzgün | İzah |
|---|---|---|---|
| Сколько игроков одной команды на поле в футболе? | 10 / 11 / 12 / 9 | 11 | 11 игроков, включая вратаря |
| Сколько очков даёт бросок из-за дуги в баскетболе? | 1 / 2 / 3 / 4 | 3 | Точный бросок из-за дуги приносит 3 очка |
| Что такое хет-трик? | 4 variant | Три гола одного игрока | Три гола одного игрока за матч |

## İki cədvəl: sual və onun versiyaları
**Niyə versiya?** Sənəd: "istifadədən sonra versiya dəyişməzdir". Admin sualdakı səhvi düzəldəndə **köhnə duellərin nəticəsi dəyişməməlidir**. Ona görə düzəliş = yeni versiya. Duel konkret **versiyaya** istinad edir.

**`questions`**
| Sütun | İzah |
|---|---|
| id, tenant_id | |
| sport | boşdursa = ümumi |
| locale | dil |
| status | `draft` / `active` / `retired` |
| current_version | cari versiya |

**`question_versions`**
| Sütun | İzah |
|---|---|
| id | duel buna istinad edir |
| question_id, version | |
| text | sual |
| options | 4 variant (JSON: `[{id: "a", text: "10"}, ...]`) |
| correct_option_id | düzgün variant |
| explanation | izah |

Unique (`question_id`, `version`).

## Nə edəcəksən
1. Seed: saytdakı 3 sual + ən azı 20 əlavə (rus dilində). Az sual olsa, eyni suallar təkrarlanacaq.
2. Frontend-ə gedən sual sxemində `correct_option_id` və `explanation` **olmasın** (task 010-dakı cavab sxemi).

## Hazır olduğunu necə yoxlayarsan
- [ ] Sualın cavabını dəyişmək yeni versiya yaradır, köhnə duellər dəyişmir.
- [ ] Heç bir endpoint açıq sual üçün düzgün cavabı qaytarmır (test).
