# 081 — Tərk edilmiş duel

**Status:** [ ] · **Faza:** 5 · **Əvvəl bitməli:** 077, 043

## Qısaca
Yarımçıq qalmış duel "asılı" qalmasın və mükafat verməsin.

## Qayda (sənəddən)
- İnternet kəsiləndə cari sual vaxtı bitəndə bağlanır, amma **növbəti sual avtomatik açılmır**.
- **5 dəqiqə** əlaqə yoxdursa → duel `abandoned` olur.
- XP yox, coin yox, tapşırıq yox.
- Verilmiş cavablar silinmir (tarixçə üçün).

## Niyə vacibdir?
"Bir aktiv duel" qaydası (073): asılı qalmış duel yeni duel başlamağa mane olur.

## Nə edəcəksən
1. Hər hərəkətdə (cavab, növbəti, vəziyyət sorğusu, WebSocket ping) `last_activity_at`-ı yenilə.
2. Fon işi hər dəqiqə: aktiv + 5 dəqiqədən çox səssiz → `abandoned`.
3. Tərk edilmiş duelə sorğu → 410 `BATTLE_EXPIRED`.
4. Yeni duel başlayanda köhnəsi 5 dəqiqədən çox səssizdirsə → dərhal tərk edilmiş et.

## Hazır olduğunu necə yoxlayarsan
- [ ] 5 dəqiqə səssiz duel `abandoned` olur, mükafat yoxdur.
- [ ] Sonra yeni duel başlamaq olur.
- [ ] Tərk edilmiş duelə cavab → 410.
