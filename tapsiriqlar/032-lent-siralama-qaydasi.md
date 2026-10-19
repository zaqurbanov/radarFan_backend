# 032 — Lentin sıralama qaydası

**Faza:** 2 · **Asılılıq:** 030; aktiv iştirakçı hissəsi 046-dan sonra · **Status:** [ ]

## Məqsəd
Lent sənəddəki qaydaya görə sıralansın.

## Niyə
Sənəd (bölmə 3): "İlkin sıralama: live scheduled-dan əvvəl; qrup daxilində aktiv iştirakçıların sayı azalan sıra ilə, sonra start_at və event_id. Bitmiş matçlar seçilmişlərdə və otağın tarixçəsində əlçatandır; onlar üçün yeni nəticələrin açılması söndürülür. Fərdiləşdirilmiş sıralama MVP-dən sonrakı ayrıca tapşırıqdır."

İndiki kod: `CASE WHEN live THEN 0 ELSE 1` + `start_at`. `postponed`, `cancelled`, `finished` də "1" qrupuna düşür və scheduled-larla qarışır.

## Qərar verməli olduğun məsələlər
1. **Statuslar üçün rank:** live=0, scheduled=1, postponed=2? finished və cancelled əsas lentdə ümumiyyətlə görünsünmü? Sənəd: bitmiş matçlar "seçilmişlərdə və otağın tarixçəsində". Deməli əsas lentdə yoxdur, `favorites=true` filtrində var.
2. **Aktiv iştirakçı sayı** Redis-dədir (task 046) və saniyədə dəyişir. Cursor ilə necə birləşir? Variantlar:
   - (a) hər N saniyədə bir "snapshot" sıralama hesabla və Redis-də saxla (sorted set), cursor = mövqe + snapshot id;
   - (b) sıralamanı DB-dəki `events.active_users_snapshot` sütunu ilə et (fon job hər 10–30 san. yeniləyir);
   - (c) yalnız birinci səhifəni aktivliyə görə sırala.
   Tövsiyə: (b), sadə və cursor ilə işləyir. Sənəd buna icazə verir ("ilkin sıralama").
3. Sıralamanı DB-də generated column (`status_rank`) ilə etsən, index-ə daxil edə bilərsən. Araşdır.

## Cədvəl dəyişikliyi
`events`: `status_rank smallint GENERATED ALWAYS AS (...) STORED`, `active_users int NOT NULL default 0`.
Index: (`tenant_id`, `status_rank`, `active_users DESC`, `start_at`, `id`). Sənəddəki `tenant/status/start_at` index-ini bununla əvəz edə bilərsən.

## Qəbul meyarları
- [ ] live matçlar həmişə scheduled-dan əvvəldir.
- [ ] Eyni statusda çox aktiv olan yuxarıdadır.
- [ ] Bitmiş matç əsas lentdə yoxdur, `favorites=true`-da var və outcome-ları `available: false`-dir.
