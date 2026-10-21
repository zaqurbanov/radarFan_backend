# 046 — Onlayn sayğacı (otaqda neçə nəfər var)

**Status:** [ ] · **Faza:** 3 · **Əvvəl bitməli:** 043, 044

## Qısaca
Hər otaqda **hazırda** aktiv olan unikal istifadəçilərin sayı.

## Saytda
"1 284 фанатов · демо", "846 участников · демо".

## Qaydalar (sənəddən)
- Aktiv = otağa bağlıdır **və ya** son 60 saniyədə "buradayam" göndərib.
- **Unikal:** bir adam iki tabdan qoşulsa, **bir** sayılır.
- Hesab sayını və ya mesaj sayını "onlayn" kimi göstərmək **qadağandır**.
- Məlumat yoxdursa → "Aktivlik məlumatı əlçatan deyil".

## Necə qurulur (Redis sorted set)
- Açar: `presence:{tenant}:room:{otaq}`
- Element: `user_id`, bal: son aktivlik vaxtı.
- Abunə və ya ping → vaxtı yenilə.
- Saymaq: 60 saniyədən köhnələri sil, qalanları say.
- Eyni `user_id` bir dəfə saxlanır → unikallıq avtomatikdir.

## Nə edəcəksən
1. Abunə və ping zamanı yenilə.
2. Bağlantı bağlananda: istifadəçinin **başqa** bağlantısı da həmin otaqdadırsa, silmə!
3. Sayğac dəyişəndə hamıya bildiriş göndərmə. **Maksimum 5 saniyədə bir**, yalnız rəqəm dəyişibsə. 1000 nəfərlik otaqda hər giriş-çıxışda bildiriş = selə dönər.
4. Lent sıralaması üçün (032): fon tapşırığı sayları hər 10–30 saniyədə `events.active_users`-ə yazsın.
5. Demo-da: `demo rəqəm + real say`, `is_demo: true`.
6. Redis işləmirsə → `active_users: null`.

## Hazır olduğunu necə yoxlayarsan
- [ ] Bir adam iki tabdan qoşulanda say 1 artır.
- [ ] Bağlantı qopandan 60 saniyə sonra say azalır.
