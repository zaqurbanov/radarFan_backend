# 024 — `PATCH /me`: ləqəbin dəyişdirilməsi

**Faza:** 1 · **Asılılıq:** 023 · **Status:** [ ]

## Məqsəd
İstifadəçi ləqəbini dəyişə bilsin (saytda "Имя ✎" və profildə "Сохранить").

## Niyə
- Sayt: "Мой фан" → "Имя ✎" → profil ekranında ad sahəsi + "Сохранить".
- Sənəd ləqəbin dəyişməsini birbaşa təsvir etmir, amma deyir: "Ləqəb email, telefon və tərəfdaş hesabının identifikatorunu açıqlamır". Ad çatda hamıya görünür, ona görə moderasiya və validasiya lazımdır.

## Endpoint
| Metod | Yol | Body | Cavab |
|---|---|---|---|
| PATCH | /me | `{ nickname }` | yenilənmiş `user` |

## Qaydalar (təklif, məhsul sahibi ilə təsdiqlə)
- Trim-dən sonra 2–24 Unicode simvol.
- İcazə: hərf, rəqəm, boşluq, `_`, `-`, `.`. Emoji? Qərar.
- Email və ya telefona bənzəyən ad rədd olunur (`@`, 7+ rəqəm ardıcıllığı).
- Tenant daxilində unikallıq? Çatda iki "Nihal" çaşdırıcıdır, amma unikallıq tələbi sadə istifadəçini əsəbləşdirir. Qərar ver.
- Dəyişmə tezliyi limiti (məs. gündə 3 dəfə). Niyə? Moderatordan qaçmaq üçün tez-tez ad dəyişmə.

## Necə edəcəksən
1. Köhnə mesajlarda yeni ad görünməlidirmi? Əgər mesaj cədvəlində ad saxlanmırsa (yalnız `user_id`), avtomatik yeni ad görünür. Bu, task 051-in dizaynına təsir edir.
2. Ad dəyişikliyi tarixçəsini saxla (moderasiya üçün): `nickname_history` (user_id, old, new, changed_at) və ya audit log (task 069).

## Qəbul meyarları
- [ ] Boş və ya 1 simvollu ad → 400.
- [ ] Email formalı ad → 400.
- [ ] Ad dəyişəndən sonra `/me` və çatdakı mesajlar yeni adı göstərir.

## Açıq suallar
- Ad unikal olmalıdırmı? Emoji icazəlidirmi?
