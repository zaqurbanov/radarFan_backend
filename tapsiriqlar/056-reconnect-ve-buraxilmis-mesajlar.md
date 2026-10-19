# 056 — Reconnect və buraxılmış mesajlar

**Faza:** 4 · **Asılılıq:** 052, 048 · **Status:** [ ]

## Məqsəd
Bağlantı qopub bərpa olunanda istifadəçi heç bir mesajı itirməsin.

## Niyə
Sənəd (bölmə 4): "Yenidən qoşulmada müştəri last_sequence ötürür. Server buraxılmış mesajları qaytarır və ya bərpa tarixçəsinin müddəti bitibsə, snapshot yenilənməsini tələb edir. Tətbiq background-dan qayıtdıqda da sinxronizasiya aparılır. Bağlantı indikatoru mövcud tarixçəni gizlətmir."

## Necə edəcəksən
1. `GET /rooms/{id}/messages?after_sequence=N&limit=50`: N-dən sonrakı mesajlar, artan sıra ilə.
2. Buraxılan çox olsa (məs. 500)? Sənəd: "bərpa tarixçəsinin müddəti bitibsə, snapshot". Qayda: `last_sequence - N > 200` → `resync_required: true`. Müştəri son 50-ni yenidən yükləyir və "aradakı" mesajları atlayır.
3. Arada **moderasiya** dəyişiklikləri olubsa (mesaj gizlədilib), `after_sequence` onları qaytarmır, çünki köhnə mesajın sequence-i dəyişməyib. Həll yolları:
   - moderasiya hadisələrini də ayrıca sequence ilə saxlamaq;
   - resync zamanı yüklənmiş pəncərəni tam yeniləmək.
   Bu incə məqamdır. Fikirləş və mentora soruş.
4. WS abunəsinə `since_sequence` (048) ilə inteqrasiya: hansı yolu frontend istifadə edəcək? Birini seç, ikisini yox.

## Qəbul meyarları
- [ ] Müştəri seq=10-da qopur, bu vaxt 5 mesaj gəlir, qayıdanda 11–15-i alır.
- [ ] Çox geridə qalan müştəri `resync_required` alır.
