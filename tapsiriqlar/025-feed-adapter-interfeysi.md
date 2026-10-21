# 025 — Matç məlumatı üçün "adapter"

**Status:** [ ] · **Faza:** 2 · **Əvvəl bitməli:** 021

## Qısaca
Matçlar və əmsallar fərqli mənbələrdən gələ bilər (demo, bukmeker A, provayder B). Hamısını **eyni formaya** salan bir qat yarat.

## Niyə lazımdır?
- Hər bukmekerin məlumat mənbəyi fərqli ola bilər, sahə adları da fərqlidir (`HomeTeamName`, `home_team`, `team1`...).
- Kodun qalanı (lent, çat, proqnoz) mənbəni **bilməməlidir**. Yalnız bizim formanı tanıyır.
- Sənəd: mənbənin sahələri bizim modelə xəbərsiz əlavə olunmamalıdır.

## Analogiya
Elektrik adapteri kimi: rozetka fərqli ola bilər, amma cihaz həmişə eyni fişi görür.

## Nə edəcəksən
1. `src/modules/feed/` qovluğu yarat.
2. `types.ts`: bizim **ortaq** formalarımız:
   - **Matç:** mənbədəki ID, idman növü, liqa, ev sahibi, qonaq, status, hesab, dövr, başlama vaxtı.
   - **Bazar:** mənbədəki ID, tip (`football_1x2` və s.), qaydalar, status, versiya.
   - **Nəticə (outcome):** mənbədəki ID, açar (home/draw/away), qiymət, status, versiya.
3. Interfeys (`FeedProvider`), metodları:
   - `listEvents()`: dəyişmiş matçlar;
   - `getEvent(id)`: bir matç;
   - `healthCheck()`: mənbə işləyirmi.
4. `registry.ts`: tenant ayarına görə hansı provayderin işləyəcəyini seçir.

## Hazır olduğunu necə yoxlayarsan
- [ ] `feed` qovluğundan kənarda heç bir fayl konkret provayderi import etmir.
- [ ] Yeni provayder əlavə etmək = bir yeni fayl + registry-də bir sətir.
