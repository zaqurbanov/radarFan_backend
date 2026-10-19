# 023 — `GET /me`: tam profil cavabı

**Faza:** 1 · **Asılılıq:** 016, 021, 022 · (XP/coin hissəsi 083–095-dən sonra tamamlanır) · **Status:** [ ]

## Məqsəd
Frontend başlıq, profil və "Мой фан" ekranları üçün lazım olan hər şeyi bir sorğu ilə alsın.

## Niyə
- Sənəd (bölmə 8): `GET /me` → `user, xp_balance, challenge_summary`.
- Sayt: başlıqda **XP** (məs. "150 XP") və avatar baş hərfi "N". "Мой фан"-da **coin balansı** (◈ 360), səviyyə adı ("Начинающий фанат", "Новичок на радаре"), "N новых предметов". Profildə "2 завершённых игр · 0 избранных матчей".

## Cavab strukturu (hədəf)
- `user`: id, nickname, initials, role, status
- `tenant`: public config (021)
- `entitlements` (022)
- `xp_balance` (task 084)
- `coin_balance` (task 086)
- `level`: { code, title, next_threshold } (task 094)
- `challenge_summary`: { completed_tasks, total_tasks: 3, status } (task 090)
- `counters`: { completed_games, favorites, new_items } (task 095, 106)

**Qeyd:** `external_user_id` heç vaxt qaytarılmır. Sənəd: "Ləqəb email, telefon və tərəfdaş hesabının identifikatorunu açıqlamır."

## Necə edəcəksən
1. İndi mövcud sahələrlə başla, digərləri hazır olduqca əlavə et. Hardcode `xp_balance: 0` əvəzinə `null` + "hələ yoxdur" daha dürüstdür, yoxsa 0? Qərar ver.
2. Çoxlu ayrı sorğu olacaq. `Promise.all` ilə paralel et.
3. Response sxemi yaz (010) ki, artıq sahə sızmasın.

## Qəbul meyarları
- [ ] Cavabda `external_user_id` yoxdur.
- [ ] Bütün balanslar hazır olandan sonra saytdakı başlıq və profil məlumatları bir sorğu ilə doldurulur.
