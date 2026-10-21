# 125 — Monitorinq və xəbərdarlıqlar

**Status:** [ ] · **Faza:** 12 · **Əvvəl bitməli:** 011

## Qısaca
Production-da nə baş verdiyini gör və problemdən **istifadəçilərdən əvvəl** xəbər tut.

## Nəyi ölçəcəyik (sənəddən)
| Göstərici | Nə üçün |
|---|---|
| Sorğu sayı və xətalar (route, status üzrə) | xəta faizi |
| Sorğu müddəti | sürət |
| WebSocket bağlantı sayı və qopmalar | real vaxt sağlamlığı |
| Matç mənbəyinin gecikməsi | mənbə işləyirmi |
| Köhnəlmiş əmsal sayı | |
| Outbox gecikməsi | mesajlar ilişib qalırmı |
| Mesajın çatma müddəti | |
| Bridge nəticələri | keçidlər işləyirmi |
| Jurnal/balans uyğunsuzluğu | XP səhvləri |
| XP vermə xətaları | |

## Xəbərdarlıqlar (minimum)
- Mənbə gecikməsi > 60 saniyə
- 5xx xətaları > 2% (5 dəqiqə ərzində)
- XP vermə xətası > 0
- Outbox gecikməsi > 10 saniyə
- Jurnal uyğunsuzluğu > 0

## Nə edəcəksən
1. `prom-client` + `/metrics` endpoint. **Yalnız daxili şəbəkədən** əlçatan olsun!
2. Prometheus + Grafana (lokal üçün docker-compose-a əlavə et) və ya hostinqin öz alətləri.
3. **Diqqət:** `user_id`-ni ölçü etiketi etmə. Milyonlarla ayrı seriya yaranar, sistem çökər. `tenant_id` olar (az saydadır).
4. Sağlamlıq endpoint-ləri:
   - `/health/live`: proses işləyir;
   - `/health/ready`: DB və Redis əlçatandır.

## Hazır olduğunu necə yoxlayarsan
- [ ] `/metrics` yuxarıdakı göstəriciləri verir.
- [ ] Ən azı 5 xəbərdarlıq qaydası yazılıb.
- [ ] DB dayananda `/health/ready` → 503.
