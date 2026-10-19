# 057 — Otağın read_only olması

**Faza:** 4 · **Asılılıq:** 050, 049 · **Status:** [ ]

## Məqsəd
Bitmiş matçın otağı 24 saat sonra yalnız oxunsun.

## Niyə
Sənəd (bölmə 4): "Bitmiş otaq finished_at-dan 24 saat sonra read_only olur. Tarixçə oxuna bilər, mesaj göndərmək və yeni səs vermək olmaz."

## Necə edəcəksən
1. İki yanaşma:
   - **Job:** event `finished` olanda `finished_at + 24h` üçün gecikmiş job (049) → `rooms.status = read_only` + WS `room.status.updated`.
   - **Hesablanan:** `read_only = event.finished_at + 24h < now()`. Job lazım deyil, amma WS bildirişi getmir.
   Tövsiyə: hər ikisi. Yazma zamanı **hesablanan** yoxlama (etibarlı), job isə status sütununu və bildirişi yeniləyir (rahatlıq).
2. `cancelled` matç: otaq dərhal read_only? `postponed`? Qərar ver.
3. Read_only otağa mesaj → 409? 403? Yeni kod `ROOM_READ_ONLY` əlavə et (009).

## Qəbul meyarları
- [ ] `finished_at`-dan 24 saat 1 dəq. sonra mesaj → rədd (vaxtı test üçün manipulyasiya et, fake timers).
- [ ] Read_only otaqda tarixçə oxunur.
