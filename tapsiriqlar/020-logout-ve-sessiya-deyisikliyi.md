# 020 — Çıxış (logout)

**Status:** [ ] · **Faza:** 1 · **Əvvəl bitməli:** 019

## Qısaca
İstifadəçi bukmekerdə çıxanda və ya başqa hesaba keçəndə bizdə köhnə sessiya qalmasın.

## Niyə lazımdır?
Nümunə: ailədə bir telefon. Ata çıxır, oğul daxil olur. Atanın açıq WebSocket bağlantısı hələ işləyirsə, oğul atanın bildirişlərini görür.

## Endpoint
`POST /auth/logout`: sessiyanı bitirir, açıq WebSocket bağlantılarını bağlayır.

## Problem
Access token **ləğv edilə bilmir**: 15 dəqiqə bitənədək işləyir. Seçimlər:
- Redis-də "qara siyahı" (ləğv olunmuş token-lər, bitənədək saxlanır);
- istifadəçidə `token_version` sayğacı: logout-da artır, köhnə versiyalı token rədd olunur.

Birini seç və səbəbini yaz.

## Nə edəcəksən
1. Hər token-ə sessiya ID-si (`sid`) əlavə et. WebSocket bağlantıları bu `sid` ilə qeyd olunacaq (task 043), logout-da həmin bağlantıları tapıb bağlamaq olacaq.
2. Logout endpoint-ini yaz.

## Hazır olduğunu necə yoxlayarsan
- [ ] Logout-dan sonra həmin access token ilə sorğu 401 alır.
- [ ] (WebSocket hazır olandan sonra) logout açıq bağlantını bağlayır.
