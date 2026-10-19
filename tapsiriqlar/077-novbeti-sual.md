# 077 — Növbəti sual: `POST /battles/{id}/next`

**Faza:** 5 · **Asılılıq:** 076 · **Status:** [ ]

## Məqsəd
İstifadəçi "Следующий вопрос →" basanda növbəti sual açılsın. Basmasa, 10 san. sonra avtomatik.

## Niyə
Sənəd (bölmə 5): "İstifadəçi «Növbəti sual» düyməsini basır; əməl olmadıqda növbəti sual 10 saniyə sonra açılır." Bölmə 8: `POST /battles/{id}/next` → "gövdə yoxdur, yalnız demo" → current_question və ya completed.
Sayt: "Следующий вопрос →" (1-ci və 2-ci sualdan sonra), sonuncudan sonra "Завершить баттл".

## Necə edəcəksən
1. Cari sual `closed` deyilsə → 409 (cavab vermədən keçmək olmaz; yoxsa olar, "skip" = 0 xal? Qərar ver).
2. Cari sual sonuncudursa → `complete` (079). Yoxsa ayrıca `POST /battles/{id}/complete`? Saytda ayrı düymə var ("Завершить баттл"). Sənəd isə `next` → "completed" deyir. Bir endpoint kifayətdir: sonuncudan sonra `next` = complete.
3. **İdempotentlik:** iki dəfə basmaq (iki tab) iki sual atlamamalıdır. Necə? Body-də `from_index` qəbul et: "mən 0-cı sualdan keçirəm". Əgər `current_index` artıq 1-dirsə, heç nə etmə, snapshot qaytar.
4. **10 san. avtomatik:** gecikmiş job (049) `{battle_id, from_index}` ilə. Eyni idempotent funksiyanı çağırır. Və ya lazy: snapshot (075) oxunanda `closed_at + 10s < now` → açılmış say.
5. **Bağlantı itəndə:** sənəd: "növbəti sualın avtomatik açılması reconnect-ədək dayandırılır" (081). Job işləyəndə istifadəçinin bağlantısı varmı (presence/WS reyestri)? Yoxdursa açma.

## Qəbul meyarları
- [ ] Bağlı sualdan sonra `next` növbətini açır.
- [ ] Eyni `from_index` ilə iki `next` → bir keçid.
- [ ] Bağlantı varsa, 10 san. sonra avtomatik açılır.
