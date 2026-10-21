# 062 — Səs vermək

**Status:** [ ] · **Faza:** 4 · **Əvvəl bitməli:** 061

## Qısaca
İstifadəçi bir səs verir, istəsə dəyişir. Sayğaclar həmişə dəqiq qalır.

## Saytda
Səsdən sonra: "RM · 62% / FCB · 38%", "Твой голос учтён. Можно изменить выбор."

## Qaydalar (sənəddən)
- Hər istifadəçinin **bir** səsi var, sorğu bağlanana qədər dəyişə bilər.
- Eyni varianta təkrar səs → sayğac **artmır**.
- Səs **verməzdən əvvəl** nəticələr görünmür.
- Bağlı sorğu səs qəbul etmir.

## Yeni cədvəl: `poll_votes`
| Sütun | İzah |
|---|---|
| poll_id, user_id | birlikdə əsas açar (bir adam = bir səs) |
| tenant_id | |
| option_id | hansı variant |
| created_at, updated_at | |

## Endpoint-lər
| Metod | Yol | Cavab |
|---|---|---|
| GET | /rooms/{id}/poll | sorğu, mənim səsim, (səs vermişəmsə) nəticələr |
| PUT | /polls/{id}/vote | `{ option_id }` → mənim səsim, saylar, faizlər |

## Addımlar (bir tranzaksiyada)
1. Sorğu açıqdır və vaxtı keçməyib? Yoxsa → 409.
2. `option_id` **bu** sorğuya aiddir? (Başqa sorğunun variantı ilə hiylə.)
3. Mövcud səsi kilidlə və oxu (`FOR UPDATE`):
   - səs yoxdur → yaz, variant +1, ümumi +1;
   - eyni variant → heç nə etmə;
   - fərqli variant → köhnə −1, yeni +1, ümumi dəyişmir.
4. Sorğu versiyasını +1, outbox-a qeyd (065).

## Demo
Saytda "Исходные голоса смоделированы". Demo sorğularda başlanğıc sayları seed-də qoy. Real tenant-da 0-dan başlayır.

## Hazır olduğunu necə yoxlayarsan
- [ ] Səs ver → dəyiş → yenə dəyiş: ümumi 1, saylar düzgün.
- [ ] Bağlı sorğuya səs → 409.
- [ ] Səs verməmiş istifadəçi nəticələri görmür.
- [ ] Eyni adamdan eyni anda 10 səs → ümumi 1.
