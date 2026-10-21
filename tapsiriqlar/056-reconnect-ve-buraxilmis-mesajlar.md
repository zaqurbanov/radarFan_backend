# 056 — Yenidən qoşulanda buraxılmış mesajlar

**Status:** [ ] · **Faza:** 4 · **Əvvəl bitməli:** 052, 048

## Qısaca
Bağlantı qopub qayıdanda istifadəçi heç bir mesajı itirməsin.

## Necə
`GET /rooms/{id}/messages?after_sequence=10` → 10-dan sonrakı mesajlar, artan sıra ilə.

Çox geridə qalıbsa (məs. 200+ mesaj): `resync_required: true` → frontend son 50-ni yenidən yükləyir.

## Çətin hal: arada gizlədilmiş mesaj
İstifadəçi qopanda 8-ci mesajı görmüşdü. Bu vaxt moderator 8-ci mesajı gizlətdi. `after_sequence=10` 8-ci mesajı **qaytarmır** (nömrəsi dəyişməyib). Nəticə: istifadəçi gizli mesajı görməyə davam edir.

Həll yolları:
- moderasiya hadisələrini də ayrıca saxlamaq;
- bərpa zamanı ekrandakı mesajları tam yeniləmək.

Bu incə məsələdir. Fikirləş və mənimlə müzakirə et.

## Diqqət
WebSocket bərpası (048) və bu REST yolu: frontend **hansını** istifadə edəcək? Birini seç, ikisini qarışdırma.

## Hazır olduğunu necə yoxlayarsan
- [ ] 10-cu mesajda qopdu, 5 mesaj gəldi, qayıdanda 11–15-i alır.
- [ ] Çox geridə qalan `resync_required` alır.
