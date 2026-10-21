# 078 — Sual vaxtı

**Status:** [ ] · **Faza:** 5 · **Əvvəl bitməli:** 076, 049

## Qısaca
Vaxt limiti (varsa) **serverdə** tətbiq olunsun.

## Ziddiyyət
- **Sənəd:** hər suala 20 saniyə. Server deadline-ı göndərir, frontend taymeri yalnız göstərir.
- **Sayt:** "Время ответа не ограничено" (vaxt limiti yoxdur).

## Həll
Qaydanı **ayarlanan** et: `question_time_limit_seconds` (boşdursa = limitsiz).
- Demo tenant: boş (sayt kimi).
- Real duel (task 131): məcburi 20.
Kod hər iki halı dəstəkləyir.

## Nə edəcəksən
1. Sual açılanda: `deadline_at = açılma vaxtı + limit` (limit yoxdursa, boş).
2. **Əsas qoruma:** cavab qəbulu (076) deadline-ı yoxlayır.
3. Deadline keçəndə cavab gəlməsə də sual bağlanmalıdır və frontend xəbər tutmalıdır ("vaxt bitdi"). Bunun üçün fon işi: deadline anında `sualı_bağla`. Artıq bağlıdırsa → heç nə.
4. Tolerans (məs. +0.5 saniyə şəbəkə üçün)? Sənəd: "deadline-dan **əvvəl** çatarsa qəbul edilir". Tolerans yoxdur.

## Hazır olduğunu necə yoxlayarsan
- [ ] 20 saniyəlik limitdə 21-ci saniyədə cavab rədd olunur (testdə vaxtı saxta et).
- [ ] Limitsiz tenant-da istənilən vaxt qəbul olunur.
- [ ] Deadline keçəndə WebSocket ilə "sual bağlandı" gəlir.

## Açıq sual
Demo-da vaxt limiti olsunmu?
