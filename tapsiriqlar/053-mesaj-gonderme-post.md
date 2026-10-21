# 053 — Mesaj göndərmək: `POST /rooms/{id}/messages`

**Status:** [ ] · **Faza:** 4 · **Əvvəl bitməli:** 051, 036, 018

## Qısaca
Mesajı yoxla, dublikatsız saxla, hamıya yay, tapşırığı yenilə.

## Mətn qaydaları (sənəddən)
- Yalnız düz mətn. HTML, fayl, formatlama yoxdur.
- Boşluqları kəsdikdən sonra **1–240 simvol** (Unicode code point).
- Yalnız boşluqdan ibarət mesaj göndərilmir.
- Eyni `client_message_id` ilə təkrar → köhnə mesaj qaytarılır, yenisi yaranmır.

## Sayma tələsi
JavaScript-də `"😀".length` = **2**. Çünki JS mətni 16-bitlik hissələrlə sayır.
Düzgün sayma: `[...text].length`. Bu, code point sayır.
240 emoji yazılmış mesaj qəbul olunmalıdır.

## Addımlar (bir tranzaksiyada)
1. İstifadəçi susdurulmayıb? (018) Otaq açıqdır? (057)
2. Sürət limiti (054). Bunu tranzaksiyadan **əvvəl** yoxla.
3. Bu `client_message_id` ilə mesaj artıq var? → onu qaytar.
4. Sıra nömrəsi al (051), mesajı yaz.
5. Outbox-a "yayımla" qeydi yaz (055).
6. "Mesaj göndər" tapşırığını işarələ (091).
7. Commit.

## Diqqət
- Mətni "təmizləmə" (`<script>`-i silmə və s.). Olduğu kimi saxla. Frontend onu təhlükəsiz göstərir (`textContent`).
- Eyni anda iki eyni sorğu: biri yazır, digəri unique xətası alır. Bu xətanı tut və mövcud mesajı qaytar.
- Görünməz simvollar (`​` sıfır enli boşluq, `‮` yazı istiqamətini çevirən): onları "boşluq" saymalısanmı, rədd etməlisənmi? Qərar ver.

## Hazır olduğunu necə yoxlayarsan
- [ ] 240 emoji qəbul olunur, 241 → 400.
- [ ] Yalnız boşluq → 400.
- [ ] `<script>alert(1)</script>` olduğu kimi saxlanır və qaytarılır.
- [ ] Eyni `client_message_id` iki dəfə → bir mesaj.
- [ ] Susdurulmuş istifadəçi → 403.
