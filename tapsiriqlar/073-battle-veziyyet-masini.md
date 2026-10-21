# 073 — Duelin vəziyyətləri (kod yazmazdan əvvəl plan)

**Status:** [ ] · **Faza:** 5 · **Əvvəl bitməli:** 072

## Qısaca
Duelin bütün vəziyyətlərini və hansından hansına keçmək olar, **əvvəlcə kağızda** dəqiq yaz.

## Niyə lazımdır?
Duel-də çoxlu "bəs əgər..." var: iki tab, səhifəni yeniləmək, internet kəsilməsi, gec cavab, iki dəfə "bitir" basmaq. Sənəd: bunların heç biri qaydaları pozmamalıdır.
Plan olmasa, kod `if`-lər cəngəlliyinə çevrilir.

## Vəziyyətlər
**Duel:** `active` → `completed` (bitdi) və ya `abandoned` (tərk edildi)
**Hər sual:** `pending` (gözləyir) → `open` (açıqdır) → `closed` (bağlıdır)

```
Duel yarandı → Sual 1 açıq → (cavab və ya vaxt bitdi) → Sual 1 bağlı
     → ("Növbəti" və ya 10 san.) → Sual 2 açıq → ... → Sual 3 bağlı
     → ("Завершить баттл") → completed (XP verilir)

5 dəqiqə əlaqə yoxdur → abandoned (XP yoxdur)
```

## Cədvəllər
**`battles`**
| Sütun | İzah |
|---|---|
| id, tenant_id, user_id | |
| mode | `demo` / `real` |
| state | `active` / `completed` / `abandoned` |
| rules_version, rules_snapshot | **başlayanda** qaydalar (XP, coin, vaxt) |
| daily_key | gün (`2026-10-21`), gündəlik limit üçün |
| xp_eligible | XP verəcəkmi (gündəlik limit) |
| bot_correct_index | bot hansı suala düzgün cavab verəcək (0, 1, 2) |
| current_index | cari sual |
| user_score, bot_score | xallar |
| result | `victory` / `draw` / `defeat` |
| started_at, completed_at, last_activity_at | |

- **Qayda:** bir istifadəçinin bir **aktiv** duel-i. Partial unique index: (`tenant_id`, `user_id`) yalnız `state = active` olanda.

**`battle_questions`**: hər duelin 3 sualı
| Sütun | İzah |
|---|---|
| battle_id, index (0–2) | əsas açar |
| question_version_id | hansı sualın hansı versiyası |
| option_order | variantların qarışdırılmış sırası |
| state | `pending` / `open` / `closed` |
| opened_at, deadline_at, closed_at | |

**`battle_answers`**: cavablar
| Sütun | İzah |
|---|---|
| battle_id, user_id, question_index | əsas açar (bir suala bir cavab) |
| option_id | seçilən |
| request_id | təkrar sorğunu tanımaq üçün |
| received_at | serverə çatma vaxtı |
| correct | düzgündürmü |

## Nə edəcəksən
1. Keçid funksiyaları: `sualı_aç`, `cavabı_qəbul_et`, `sualı_bağla`, `növbəti`, `bitir`, `tərk_edilmiş_et`.
2. Hər funksiya **əvvəlcə cari vəziyyəti yoxlayır**. Uyğun deyilsə → xəta.
3. Hər funksiya tranzaksiyada işləyir və duel sətrini kilidləyir (`FOR UPDATE`).
4. Bu funksiyalar HTTP-dən asılı olmasın. Sonra fon işləri də onları çağıracaq.
5. **Diaqramı özün yenidən çək və kod yazmazdan əvvəl mənə göstər.**

## Hazır olduğunu necə yoxlayarsan
- [ ] Hər keçid üçün test: düzgün vəziyyətdən keçir, səhvdən xəta verir.
- [ ] Bir istifadəçinin iki aktiv duel-i DB səviyyəsində mümkün deyil.
