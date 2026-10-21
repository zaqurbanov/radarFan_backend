# 032 — Lentin sıralaması

**Status:** [ ] · **Faza:** 2 · **Əvvəl bitməli:** 030 (aktivlik hissəsi 046-dan sonra)

## Qısaca
Lent sənəddəki qaydaya görə sıralansın.

## Qayda (sənəddən)
1. Əvvəl **canlı** (`live`), sonra **gözlənilən** (`scheduled`).
2. Eyni qrupda: **çox aktiv iştirakçısı olan** yuxarıda.
3. Sonra başlama vaxtı, sonra `id`.
4. **Bitmiş** matçlar əsas lentdə yoxdur, yalnız "Seçilmişlər"də görünür (əmsalları bağlı).

## İndiki problem
İndi yalnız "canlı əvvəl" var. `postponed`, `cancelled`, `finished` hamısı bir qrupa düşür və gözlənilənlərlə qarışır.

## Çətin hissə: aktiv iştirakçı sayı
Bu say Redis-dədir (task 046) və hər saniyə dəyişir. Cursor ilə necə birləşdirmək olar?

**Tövsiyə:** `events` cədvəlinə `active_users` sütunu əlavə et. Fon tapşırığı onu hər 10–30 saniyədə Redis-dən yeniləsin. Sıralama bazada olur və cursor işləyir. Sənəd "ilkin sıralama" deyir, bu kifayətdir.

## Cədvəl dəyişikliyi
`events`-ə:
- `status_rank`: statusdan **avtomatik** hesablanan rəqəm (live=0, scheduled=1...). Postgres-in "generated column" xüsusiyyətini araşdır.
- `active_users`: aktiv iştirakçı sayı.

Index: (`tenant_id`, `status_rank`, `active_users`, `start_at`, `id`).

## Hazır olduğunu necə yoxlayarsan
- [ ] Canlı matçlar həmişə gözlənilənlərdən əvvəldir.
- [ ] Eyni statusda çox aktiv olan yuxarıdadır.
- [ ] Bitmiş matç əsas lentdə yoxdur, seçilmişlərdə var.
