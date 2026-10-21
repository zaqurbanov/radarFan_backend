# 128 — Mühitlər, ehtiyat nüsxə, buraxılış

**Status:** [ ] · **Faza:** 12 · **Əvvəl bitməli:** 127

## Qısaca
Staging və production mühitləri, ehtiyat nüsxə və təhlükəsiz buraxılış qaydası.

## Mühitlər
| | Lokal | Staging | Production |
|---|---|---|---|
| APP_MODE | demo | demo və ya production | production |
| Matç mənbəyi | demo | bukmekerin test mənbəyi | real |
| Açarlar | lokal | ayrı | ayrı, secret manager-də |
| Baza | Docker | ayrı server | ayrı server + ehtiyat nüsxə |

## Vacib qaydalar

### Migration-lar geriyə uyğun olmalıdır
Sənəd: "buraxılışı geri qaytarmaq yeni XP qeydlərini pozmamalıdır". Yəni kodu geri qaytaranda **bazanı geri qaytarmırsan**.
Ona görə dəyişikliyi 3 addımda et:
1. Yeni sütun **əlavə et** (köhnə kod işləməyə davam edir);
2. Kodu dəyiş;
3. Köhnə sütunu **sil** (ayrı buraxılışda).

### Ehtiyat nüsxə
- Postgres: gündəlik avtomatik nüsxə + istənilən ana qayıtmaq imkanı (point-in-time recovery).
- **Bərpanı yoxla:** nüsxədən staging-ə bərpa et və işlədiyini gör. **Yoxlanmamış nüsxə = nüsxə yoxdur.**
- Nə qədər məlumat itirə bilərik (RPO) və nə qədər dayana bilərik (RTO): bukmekerlə razılaşdır.

### Production-da DB portu
DB üçün **heç bir port açma**. Backend DB-yə Docker-in daxili şəbəkəsi ilə servis adı ilə qoşulsun (`postgres:5432`). Docker Linux-da firewall (`ufw`) qaydalarını keçə bilər!

### Fasiləsiz buraxılış
WebSocket bağlantıları (043, 1012 kodu) və graceful shutdown (002).

## Nə edəcəksən
`docs/RELEASE.md`: buraxılış addımları, migration sırası, yoxlama, geri qaytarma.

## Hazır olduğunu necə yoxlayarsan
- [ ] Staging işləyir.
- [ ] Ehtiyat nüsxədən bərpa ən azı bir dəfə yoxlanıb və yazılıb.
- [ ] `docs/RELEASE.md` var.
