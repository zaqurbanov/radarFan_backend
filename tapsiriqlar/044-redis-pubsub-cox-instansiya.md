# 044 — Redis pub/sub: bir neçə server instansiyası

**Faza:** 3 · **Asılılıq:** 042 · **Status:** [ ]

## Məqsəd
İstifadəçi A server-1-ə, istifadəçi B server-2-yə qoşulubsa, A-nın mesajı B-yə çatsın.

## Niyə
Sənəd (bölmə 10): tenant başına 1 000 eyni vaxtda istifadəçi, bir neçə tenant. Production-da ən azı 2 instansiya lazımdır (biri düşəndə xidmət dayanmasın). Yaddaşdakı reyestr (039) yalnız öz instansiyasının bağlantılarını bilir.

## Necə edəcəksən
1. Hər instansiya Redis-də bir pattern-ə abunə olur (`psubscribe rt:*`) və ya yalnız lokal müştərilərin abunə olduğu kanallara (`subscribe` dinamik). Hansı daha effektivdir? 1 000 otaq × 2 instansiya üçün düşün.
2. Yayım: `publish rt:t:{tenant}:room:{id} <envelope JSON>`. Hər instansiya alır və **öz** lokal abunəçilərinə göndərir.
3. **Diqqət:** ioredis-də abunə olan bağlantı başqa əmrlər işlədə bilmir. Pub/sub üçün **ayrıca** Redis client lazımdır.
4. Redis pub/sub "fire and forget"-dir: instansiya o anda qoşulmayıbsa, mesaj itir. Bu, sequence + resync (048) ilə kompensasiya olunur. Alternativ: Redis Streams. Fərqlərini oxu, amma MVP üçün pub/sub + resync kifayətdir.
5. Kontrol siqnalları da bu yolla: "sid X-in bağlantılarını bağla" (043).

## Qəbul meyarları
- [ ] Lokal olaraq iki server (`PORT=3001`, `PORT=3002`) qaldır, birinə qoşulan müştərinin mesajı digərinə qoşulana çatır.
