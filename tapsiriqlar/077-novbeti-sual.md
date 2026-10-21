# 077 — Növbəti sual: `POST /battles/{id}/next`

**Status:** [ ] · **Faza:** 5 · **Əvvəl bitməli:** 076

## Qısaca
"Следующий вопрос →" basanda növbəti sual açılsın. Basmasa, **10 saniyə sonra** özü açılsın.

## Saytda
1-ci və 2-ci sualdan sonra "Следующий вопрос →", 3-cüdən sonra "Завершить баттл".

## Nə edəcəksən
1. Cari sual bağlı deyilsə → 409. (Cavab vermədən keçmək olarmı? Qərar ver.)
2. Cari sual sonuncudursa → duel-i bitir (079). Ayrı endpoint lazım deyil.
3. **İki dəfə basmaq iki sual atlamasın.** Həlli: body-də `from_index` göndər ("mən 0-cı sualdan keçirəm"). Server artıq 1-ci sualdadırsa → heç nə etmə, vəziyyəti qaytar.
4. **10 saniyə avtomatik:** fon işi (049) eyni funksiyanı `from_index` ilə çağırır.
5. **İnternet kəsilibsə** avtomatik açma (sənəd: "reconnect-ədək dayandırılır"). İstifadəçinin bağlantısı varmı, WebSocket siyahısından yoxla.

## Hazır olduğunu necə yoxlayarsan
- [ ] Bağlı sualdan sonra `next` növbətini açır.
- [ ] Eyni `from_index` ilə iki `next` → bir keçid.
- [ ] Bağlantı varsa, 10 saniyə sonra özü açılır.
