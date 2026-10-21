# 106 — "Мой фан" ekranı bir sorğu ilə

**Status:** [ ] · **Faza:** 8 · **Əvvəl bitməli:** 105, 094

## Qısaca
"Мой фан" ekranının **bütün** məlumatını bir endpoint qaytarsın.

## Saytda ("Мой фан")
Coin balansı, personaj (geyinilmiş əşyalar), ad, səviyyə ("Начинающий фанат · 0 новых предметов"), ROI qısa kartı, mağaza, "Как заработать монеты".

## Endpoint
`GET /me/fan` →
- coin balansı;
- personaj: baş hərflər + 4 slotda geyinilmiş əşyalar (şəkillərlə);
- səviyyə (094), yeni əşya sayı (103);
- proqnoz xülasəsi: ROI, nəticə, hesablanmış, gözləyən (100);
- qazanma qaydaları: başlanğıc coin, cavab başına coin, mükafatlı duel sayı (tenant ayarından).

## Nə edəcəksən
1. Bu, "bir ekran = bir sorğu" (BFF) endpoint-idir. **Yeni məntiq yazmır**, mövcud funksiyaları çağırır.
2. Personaj məlumatını ayrıca formatlama funksiyası et. Gələcəkdə çatda avatar kimi istifadə oluna bilər.

## Hazır olduğunu necə yoxlayarsan
- [ ] Bir sorğu "Мой фан" ekranının hər şeyini qaytarır.
- [ ] Rəqəmlər ayrı endpoint-lərlə uyğundur.
