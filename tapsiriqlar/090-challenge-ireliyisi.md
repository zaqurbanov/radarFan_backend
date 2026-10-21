# 090 — Tapşırıq irəliləyişi

**Status:** [ ] · **Faza:** 6 · **Əvvəl bitməli:** 089

## Qısaca
Hər istifadəçinin tapşırıq vəziyyəti bazada **daimi** saxlansın.

## Niyə lazımdır?
Prototipdə irəliləyiş səhifə yenilənəndə **itirdi**. Sənəd: yenidən yükləmədən və yenidən girişdən sonra saxlanmalıdır.

## Yeni cədvəl: `challenge_progress`
| Sütun | İzah |
|---|---|
| tenant_id, user_id, challenge_id | |
| period_key | `once` (gündəlik üçün tarix) |
| task_flags | JSON: `{ "save_match": "2026-10-21T...", "send_message": null, ... }` (tamamlanma vaxtı) |
| completed_count | neçəsi bitib |
| status | `in_progress` / `claimable` / `claimed` |
| claimed_at | |
| updated_at | |

Əsas açar (`user_id`, `challenge_id`, `period_key`).

## Endpoint
`GET /challenges` → hər tapşırıq toplusu: tapşırıqlar (bitib?), neçəsi bitib, faiz (`bitən / 3`), status, mükafat.

## Nə edəcəksən
1. Sətir nə vaxt yaranır? İlk tapşırıq hadisəsində və ya ilk `GET`-də.
2. Qərar ver: `completed_count`-u ayrıca saxla, yoxsa hər dəfə JSON-dan hesabla?

## Hazır olduğunu necə yoxlayarsan
- [ ] Çıxış və yenidən girişdən sonra irəliləyiş eynidir.
