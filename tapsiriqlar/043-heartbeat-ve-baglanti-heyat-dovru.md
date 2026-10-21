# 043 — Ölü bağlantıları təmizləmək

**Status:** [ ] · **Faza:** 3 · **Əvvəl bitməli:** 039, 020

## Qısaca
Cavab verməyən bağlantılar tapılıb bağlansın. Logout və ban zamanı bağlantılar dərhal bağlansın.

## Niyə lazımdır?
Telefonda istifadəçi başqa tətbiqə keçir. Bağlantı "yarımölü" qalır: server onu canlı sanır. Nəticə: onlayn sayğacı səhvdir, server boşuna mesaj göndərir.

## Qaydalar (sənəddən)
- Frontend hər **20 saniyədə** "buradayam" (`ping`) göndərir.
- **60 saniyə** səs yoxdursa → bağlantı ölüdür.
- Yenidən qoşulma tədricən artan gözləmə ilə olur (maks. 30 saniyə). Bu, frontend-in işidir.

## Nə edəcəksən
1. Hər bağlantının "son görünmə" vaxtını saxla.
2. Hər 10–15 saniyədə yoxla: 60 saniyədən köhnədirsə → bağla.
3. Bağlantı bağlananda: siyahıdan sil, abunələri sil, onlayn sayından çıxar.
4. Logout, ban → həmin sessiyanın **bütün** bağlantılarını tap və bağla.
5. Server dayananda bütün bağlantılara "restart" kodu göndər ki, frontend dərhal yenidən qoşulsun.

## Bağlanma kodları (frontend üçün sənədləşdir)
| Kod | Mənası | Frontend nə etsin |
|---|---|---|
| 4000 | Səs-səmir yox idi | yenidən qoşul |
| 4001 | Sessiya bitdi (logout/ban) | **qoşulma**, yenidən giriş et |
| 1012 | Server yenidən başlayır | dərhal qoşul |

## Hazır olduğunu necə yoxlayarsan
- [ ] `ping` göndərməyən bağlantı 60 saniyədən sonra bağlanır.
- [ ] Logout-dan sonra bağlantı 4001 ilə bağlanır.
