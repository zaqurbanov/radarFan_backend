# 124 — Yük testi

**Faza:** 12 · **Asılılıq:** 123 · **Status:** [ ]

## Məqsəd
Sistemin hədəf yükü daşıdığını ölçmək.

## Niyə
Sənəd (bölmə 10): "Qiymətləndirmə üçün hədəf yük profili: tenant başına 1 000 eyni vaxtda istifadəçi, 100 aktiv otaq və cəmi saniyədə 50 mesaj sorğusu. Bu, ölçülmüş məhsuldarlıq deyil, layihə yüküdür. Proqramçı pilotdan əvvəl onu yük testi ilə yoxlayır."
Hədəflər: REST p95 ≤ 500 ms; mesaj çatdırılması p95 ≤ 1 s; hesab/əmsal yenilənməsi p95 ≤ 2 s.

## Necə edəcəksən
1. Alət: **k6** (JS skriptləri, WebSocket dəstəyi). Alternativ: Artillery.
2. Ssenarilər:
   - 1 000 virtual istifadəçi: exchange → /me → /events (hər 15 san.) → otağa WS abunə.
   - 100 otaq, otaq başına ~10 yazıçı: ümumi 50 mesaj/san.
   - Mesaj çatdırılma gecikməsi: göndərən vaxtı mesaja yazır, alan müqayisə edir.
   - 200 paralel battle.
3. Staging-ə bənzər mühitdə (lokal laptop real nəticə vermir).
4. Darboğazları tap: DB connection pool ölçüsü, N+1 (030), Redis əmrləri, outbox gecikməsi (045).
5. Nəticələri yaz: hansı yükdə nə qırıldı, nəyi düzəltdin.

## Qəbul meyarları
- [ ] Hədəf yükdə üç p95 hədəfi ödənir (hesabat).
- [ ] Hesabatda ən azı bir tapılmış və düzəldilmiş darboğaz var.
