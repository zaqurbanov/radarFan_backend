# 128 — Mühitlər, backup və buraxılış prosesi

**Faza:** 12 · **Asılılıq:** 127 · **Status:** [ ]

## Məqsəd
Staging və production mühitləri, ehtiyat nüsxə və təhlükəsiz buraxılış.

## Niyə
Sənəd (bölmə 10): "Mühitlər: local demo, test tərəfdaşı ilə staging və production. Məlumatlar və açarlar ayrılır. Miqrasiyalar versiyalanır; buraxılışın geri qaytarılması yeni XP qeydlərini pozmur. Ehtiyat nüsxə və bərpa testi production hazırlığına daxildir; RPO və RTO tərəfdaşın infrastrukturu ilə razılaşdırılır."
"Konkret kitabxanaları və hostinqi proqramçı tərəfdaşın mühiti daxilində seçir."

## Necə edəcəksən
1. **Mühitlər:**
   | | local | staging | production |
   |---|---|---|---|
   | APP_MODE | demo | demo / production | production |
   | Feed | demo | tərəfdaşın test feed-i | real |
   | Açarlar | lokal | ayrı | ayrı, secret manager |
   | DB | docker | ayrı instansiya | ayrı, backup ilə |
2. **Migration və geri qaytarma:** "buraxılışın geri qaytarılması yeni XP qeydlərini pozmur". Bu o deməkdir ki, kodu geri qaytaranda DB-ni geri qaytarmırsan. Ona görə migration-lar **geriyə uyğun** olmalıdır (expand/contract, 007): əvvəl sütun əlavə et (köhnə kod işləyir), sonra kodu dəyiş, sonra köhnə sütunu sil (ayrı buraxılış).
3. **Backup:** Postgres üçün avtomatik gündəlik snapshot + WAL arxivi (point-in-time recovery). Redis əsasən keşdir, amma BullMQ job-ları oradadır (AOF persistence).
4. **Bərpa testi:** backup-dan staging-ə bərpa et və sistemin işlədiyini yoxla. Yoxlanmamış backup = backup yoxdur.
5. **RPO/RTO:** "nə qədər məlumat itirə bilərik / nə qədər müddətə dayana bilərik", tərəfdaşla razılaşdırılmalıdır.
6. **Buraxılış təlimatı** (`docs/RELEASE.md`): addımlar, migration sırası, smoke test, geri qaytarma.
7. Zero-downtime deploy: WS bağlantıları (043, 1012 close kodu), graceful shutdown (002).

## Qəbul meyarları
- [ ] Staging mühiti işləyir.
- [ ] Backup-dan bərpa ən azı bir dəfə sınanıb və sənədləşdirilib.
- [ ] `docs/RELEASE.md` var.
