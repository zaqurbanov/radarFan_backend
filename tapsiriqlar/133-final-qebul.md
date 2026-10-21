# 133 — Final: backend hazırdır

**Status:** [ ] · **Faza:** 13 · **Əvvəl bitməli:** 001–132

## Qısaca
Backend-in hazır olduğunu **sübut et** və təhvil ver.

## Təhvil paketi (sənəd, bölmə 11)
| # | Nə | Harada |
|---|---|---|
| 1 | Mənbə kodu, təmiz əsas branch | git |
| 2 | Migration-lar, boş bazadan tam qalxır | `drizzle/` (007) |
| 3 | API sənədi | `openapi.json` (122) |
| 4 | WebSocket və bridge sxemləri | `docs/contracts/` (114) |
| 5 | Mühit ayarları (gizli açarlarsız) | `.env.example` (001) |
| 6 | Demo məlumatı | `db:seed` (007) |
| 7 | Avtomatik testlər, CI yaşıl | 123, 127 |
| 8 | İşə salma və buraxılış təlimatı | `README.md`, `docs/RELEASE.md` (128) |
| 9 | Yük testi hesabatı | 124 |
| 10 | Monitorinq və xəbərdarlıqlar | 125 |
| 11 | Moderator API-si | 066–069 |
| 12 | Açıq suallar siyahısı (məhsul sahibinə) | aşağıda |

## Sayt ↔ backend yoxlaması
Frontend-i backend-ə qoşaraq (və ya Postman ilə) saytın hər ekranını keç:
- [ ] **Пульс:** lent, filtrlər, seçilmişlər, əmsal → kupon, matç səhifəsi
- [ ] **Комьюнити:** hekayələr, çatlar siyahısı, otaq, sorğu, mesaj, ♡, Скрыть/Вернуть
- [ ] **Игры:** Quiz Battle (giriş → 3 sual → nəticə +XP +◈), Найди пару (yalnız açıq/bağlı), Прогноз матча (seçim → hesablama → ROI)
- [ ] **Мой фан:** coin, personaj, mağaza (al, geyin), statistika, profil (ad, XP tarixçəsi, seçilmişlər, demo sıfırlama)
- [ ] **Kupon:** bir neçə seçim, ümumi əmsal, "Проверить переход к партнёру"
- [ ] **Başlıq:** brend, XP, baş hərf

## Bukmeker inteqrasiyası
Bukmekerin materialları (tətbiq, bridge, açarlar, real mənbə, test hesabı) olmadan status: **"daxili MVP hazırdır, bukmeker inteqrasiyası gözləyir"**. Bunu dürüst yaz. Sənəd də belə deyir.

## Açıq suallar
Bütün task fayllarındakı "Açıq sual" bölmələrini bir siyahıya yığ və məhsul sahibinə təqdim et.

## Hazır olduğunu necə yoxlayarsan
- [ ] Təhvil paketinin 12 bəndi ✓.
- [ ] Saytın bütün ekranları backend ilə işləyir.
- [ ] Mentor yoxlaması keçib. 🎉
