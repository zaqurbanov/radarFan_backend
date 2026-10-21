# 099 — Proqnozların hesablanması

**Status:** [ ] · **Faza:** 7 · **Əvvəl bitməli:** 098, 028, 049

## Qısaca
Matç bitəndə gözləyən proqnozlar avtomatik hesablansın.

## Saytda
- "Демо-расчёт использует показанный счёт матчей."
- Düymə: "**Рассчитать демо-прогнозы**". Demo matçlar heç vaxt bitmir, ona görə hesablamanı istifadəçi başladır.

## Qaydalar
| Hal | Status | Qaytarılan | Mənfəət |
|---|---|---|---|
| Seçdiyi nəticə qalib | won ("Верный") | 100 × əmsal | 100 × (əmsal − 1) |
| Uduzdu | lost ("Неверный") | 0 | −100 |
| Matç ləğv | void ("Возврат") | 100 | 0 |

Nümunə: 1.72 qalib → qaytarılan 172, mənfəət **+72**.

## Nə edəcəksən
1. **Real rejim:** matç `finished` olur → fon işi → həmin matçın gözləyən proqnozlarını hesabla. Artıq hesablanmışlara toxunma (idempotent).
2. Matç ləğv → hamısı `void`.
3. **Demo rejim:** `POST /predictions/demo-settle` cari hesabla hesablayır. **Yalnız demo tenant-da!**
   Niyə real rejimdə olmamalıdır? Canlı matçda istifadəçi yalnız qalib gələnləri "hesablatdıra" bilər.
4. Qalibi `qalibi_tap(hesab)` funksiyası (028) təyin edir.

## Diqqət: JavaScript-də pul hesablaması
`100 * 1.72` JS-də = `171.99999999999997`. **JS rəqəmləri ilə pul hesablama.**
Ya bazada hesabla (`numeric`), ya da `decimal.js` kitabxanasını istifadə et.

## Hazır olduğunu necə yoxlayarsan
- [ ] 1.72 qalib → qaytarılan **dəqiq** 172.00, mənfəət 72.00.
- [ ] Ləğv olunmuş matç → void, mənfəət 0.
- [ ] Hesablamanı iki dəfə işlət → nəticə dəyişmir.
- [ ] Production tenant-da demo-settle → 404.
