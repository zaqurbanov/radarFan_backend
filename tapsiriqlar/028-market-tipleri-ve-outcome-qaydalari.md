# 028 — Market tipləri və outcome qaydaları

**Faza:** 2 · **Asılılıq:** 027 · **Status:** [ ]

## Məqsəd
Hər market tipinin hansı nəticələrdən ibarət olduğunu və necə hesablandığını kodda bir yerdə təyin etmək.

## Niyə
- Sənəd (bölmə 3): "Futbol football_1x2 market type-dan istifadə edir: home, draw, away. MVP-də basketbol home və away variantları olan basketball_moneyline-dan və təchizatçının əlavə vaxtı nəzərə alma qaydasından istifadə edir. Həmişə üç eyni sütun göstərmək olmaz."
- Sayt: futbolda П1 / X / П2, basketbolda П1 / "X —" (deaktiv) / П2.
- Bu qaydalar 3 yerdə lazımdır: feed validasiyası (027), poll variantları (061), proqnoz hesablaşması (099).

## Qaydalar cədvəli
| market type | keys | Hesablaşma | Qeyd |
|---|---|---|---|
| football_1x2 | home, draw, away | 90 dəq. + əlavə vaxt (uzadılma yox) | `market_rules` |
| basketball_moneyline | home, away | əlavə vaxt (OT) daxil | heç-heçə yoxdur |

## Necə edəcəksən
1. `marketDefinitions` adlı bir konfiqurasiya obyekti: type → { allowed_keys, labels, settle(score) → winning key }.
2. Feed-dən gələn outcome-un açarı icazəli deyilsə, rədd et və logla (provayder xətası).
3. Etiketlər (П1/X/П2, "Победа хозяев") **frontend-in** lokallaşdırma işidir, backend `key` qaytarır. Yoxsa backend lokallaşdırılmış label da qaytarmalıdır? Fikirləş (sənəd: "message-i lokallaşdırır" = müştəri).
4. `market_rules` (mətn) kartda göstərilir. Hansı dildə? Tenant locale.

## Qəbul meyarları
- [ ] Basketbol market-inə `draw` outcome-u yazmaq mümkün deyil.
- [ ] `settle()` funksiyası üçün unit testlər: 2:1 → home, 1:1 → draw, basketbol OT.
