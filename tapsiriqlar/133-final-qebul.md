# 133 — Final qəbul: backend 100%

**Faza:** 13 · **Asılılıq:** 001–132 · **Status:** [ ]

## Məqsəd
Backend-in hazır olduğunu sübut etmək və təhvil vermək.

## Niyə
Sənəd (bölmə 11, təhvil dəsti): "Proqramçı frontend/backend mənbə kodunu, miqrasiyaları, OpenAPI-ni, WS və bridge sxemlərini, məxfi məlumatlar olmadan mühit konfiqurasiyasını, demo üçün seed məlumatlarını, kritik ssenarilərin avtomatik yoxlamalarını və işə salma/buraxılış təlimatını təhvil verir."
"İnteqrasiya pilotundan əvvəl tərəfdaş bunları təqdim edir: konteyner və bridge, başlatmanı yoxlama açarları, hadisə və bazar uyğunlaşdırılması, məlumat axını və aktuallıq qaydaları, entitlement flags, brend/dil/timezone parametrləri, test hesabı, kupon callback-i və saxlama tələbləri. Bu məlumatlar olmadan daxili MVP-ni test məlumatları ilə reallaşdırmaq olar, lakin bukmeker inteqrasiyasını tamamlanmış hesab etmək olmaz."

## Təhvil yoxlama siyahısı
| # | Element | Harada |
|---|---|---|
| 1 | Mənbə kodu, təmiz `main` | git |
| 2 | Migration-lar, boş DB-dən tam qalxır | `drizzle/` (007) |
| 3 | OpenAPI | `openapi.json` (122) |
| 4 | WS və bridge sxemləri | `docs/contracts/` (114) |
| 5 | Mühit konfiqurasiyası (secret-siz) | `.env.example` (001) |
| 6 | Demo seed | `db:seed` (007): saytdakı bütün məlumatlar |
| 7 | Avtomatik testlər, CI yaşıl | 123, 127 |
| 8 | İşə salma və buraxılış təlimatı | `README.md`, `docs/RELEASE.md` (128) |
| 9 | Yük testi hesabatı | 124 |
| 10 | Monitorinq və alertlər | 125 |
| 11 | Moderator API | 066–069 |
| 12 | Açıq suallar siyahısı (məhsul sahibinə) | aşağıda |

## Sayt ↔ backend uyğunluq yoxlaması
Saytın hər ekranını frontend-i backend-ə qoşaraq (və ya Postman kolleksiyası ilə) keç:
- [ ] Пульс: lent, filtrlər, saxla, əmsal → kupon, "Статистика и события"
- [ ] Комьюнити: hekayələr, çat siyahısı, otaq, sorğu, mesaj, ♡, Скрыть/Вернуть
- [ ] Игры: Quiz Battle (intro → 3 sual → nəticə +XP +◈), Найди пару (yalnız flag), Прогноз матча (seçim → hesablaşma → ROI)
- [ ] Мой фан: coin, personaj, mağaza (alış, geyinmə), statistika, profil (ad, XP tarixçəsi, favoritlər, demo reset)
- [ ] Kupon: ekspres, ümumi əmsal, "Проверить переход к партнёру"
- [ ] Başlıq: brend, XP, baş hərf

## Tərəfdaş inteqrasiyası
Tərəfdaş materialları olmadan bu bənd "**daxili MVP hazırdır, bukmeker inteqrasiyası gözləyir**" statusundadır. Bunu dürüst qeyd et.

## Açıq suallar (yığılmış)
Bütün task fayllarındakı "Açıq suallar" bölmələrini bir siyahıya yığ və məhsul sahibinə təqdim et.

## Qəbul meyarları
- [ ] Yuxarıdakı 12 bəndin hamısı ✓.
- [ ] Saytın bütün ekranları backend ilə işləyir.
- [ ] Mentor review-u keçib. 🎉
