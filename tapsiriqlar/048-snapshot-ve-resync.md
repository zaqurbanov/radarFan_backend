# 048 — Snapshot və resync

**Faza:** 3 · **Asılılıq:** 042, 045 · **Status:** [ ]

## Məqsəd
Müştəri bağlantını itirəndə və ya sequence-də boşluq görəndə vəziyyəti etibarlı şəkildə bərpa etsin.

## Niyə
- Sənəd (bölmə 4): "Yenidən qoşulmada müştəri last_sequence ötürür. Server buraxılmış mesajları qaytarır və ya bərpa tarixçəsinin müddəti bitibsə, snapshot yenilənməsini tələb edir. Tətbiq background-dan qayıtdıqda da sinxronizasiya aparılır."
- Bölmə 9: "Sequence-də boşluq olarsa, müştəri snapshot tələb edir."
- Bölmə 11: "WS itkisi, snapshot bərpası ... yoxlanılıb".

## Dizayn
Abunə komandasına `since_sequence` (isteğe bağlı) əlavə et:
- Server həmin kanal üçün buraxılmış hadisələri **qısa müddətli buferdən** (Redis list/stream, son N hadisə və ya son 5 dəq.) qaytara bilirsə → göndərir, sonra canlı axın.
- Bilmirsə → `resync_required` hadisəsi, müştəri REST ilə snapshot alır (`GET /rooms/{id}/messages`, `GET /events/{id}`, `GET /battles/{id}`).

Otaq mesajları üçün xüsusi hal: mesajlar DB-dədir, `GET /rooms/{id}/messages?after_sequence=` (task 056) ilə həmişə bərpa olunur.

## Necə edəcəksən
1. Kanal başına bufer: Redis Stream (`XADD` + `MAXLEN ~ 500`) pub/sub-un əksik tərəfini də doldurur. Araşdır.
2. Hansı kanallar bufer tələb edir? `user:` (XP, challenge), `battle:` (vacib). `feed:` üçün snapshot daha sadədir.
3. Müştəri tərəfi qaydasını yaz (frontend üçün sənəd): boşluq → resync; background-dan qayıdış → resync.

## Qəbul meyarları
- [ ] Müştəri 3 hadisəni buraxıb `since_sequence` ilə qayıdanda həmin 3 hadisəni alır.
- [ ] Bufer köhnəlibsə `resync_required` alır.
