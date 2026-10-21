# 109 — Bukmekerə keçid: `POST /handoffs`

**Status:** [ ] · **Faza:** 9 · **Əvvəl bitməli:** 108, 036

## Qısaca
Kupondakı seçimləri qısa ömürlü, bir dəfəlik bir "bilet"ə (token) çevir. Bukmeker bu biletlə öz kuponunu açır.

## Saytda
"Проверить переход к партнёру →" → "Переход проверен ✓ · В рабочем продукте партнёр получит 2 выбранных исходов и откроет свой купон. В демо данные никуда не отправляются, ставки не размещаются."

## Qaydalar (sənəddən)
- Bilet 60 saniyə yaşayır, bir dəfə işləyir.
- Biletin içində yalnız "mənasız" ID var. İçinə baxmaqla heç nə öyrənmək olmur.
- **Biz mərc qəbul etmirik və mərcin qoyulduğunu təsdiqləmirik.**
- Bukmekerin "opened" cavabı = kupon **açıldı**, mərc qoyuldu demək **deyil**.

## Axın
```
Frontend → POST /handoffs → bilet + correlation_id
Frontend → (bridge) → bukmeker tətbiqi: "bu biletlə kupon aç"
Bukmekerin serveri → bizə: "bu bilet nədir?" (112)
Biz → seçimlər (bukmekerin öz ID-ləri ilə)
Bukmeker kuponu açır
```

## Yeni cədvəllər
**`handoffs`**
| Sütun | İzah |
|---|---|
| id, tenant_id, user_id | |
| token_hash | biletin özü yox, **hash-i** |
| correlation_id | bukmekerlə izləmə üçün unikal ID |
| status | `created` / `resolved` / `opened` / `rejected` / `failed` / `expired` |
| expires_at | yaranma + 60 saniyə |
| resolved_at | bukmeker nə vaxt istifadə etdi |
| client_result | bridge cavabı |
| created_at | |

**`handoff_selections`**: hər seçim üçün: matç, bazar, nəticə, **bukmekerin öz ID-ləri**, əmsal, versiya.

## Göndərilən
`{ selections: [{ outcome_id, odds_version }] }` (tək seçim də massivdə).

## Nə edəcəksən
1. Yoxlamalar → 110, 111.
2. Bilet: təsadüfi 32 bayt. Bazada hash.
3. Frontend bridge nəticəsini bizə bildirsin: `POST /handoffs/{id}/result` (analitika üçün).
4. Demo-da bilet yaranır, amma heç yerə getmir.
5. Komanda adları və düymə sırası ID kimi **istifadə olunmur**. Yalnız bukmekerin ID-ləri.

## Hazır olduğunu necə yoxlayarsan
- [ ] Bilet bazada açıq mətnlə saxlanmır.
- [ ] Cavabda və loglarda `correlation_id` var.
