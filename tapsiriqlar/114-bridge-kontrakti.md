# 114 — Bridge müqaviləsini sənədləşdirmək

**Status:** [ ] · **Faza:** 9 · **Əvvəl bitməli:** 109, 019

## Qısaca
Bizim mini tətbiq ilə bukmekerin tətbiqi arasındakı mesajlaşma qaydalarını **yazılı** və **versiyalı** et.

## Bridge nədir?
Bizim tətbiq bukmekerin mobil tətbiqinin **içində** (WebView) açılır. Bir-biri ilə danışmaq üçün mesajlar göndərirlər:
- `getLaunchToken()`: bukmekerdən giriş bileti al;
- `openBetSlip(...)`: bukmekerə "bu kuponu aç" de;
- `closeMiniApp()`: tətbiqi bağla;
- `onSessionChanged(...)`: istifadəçi çıxdı/dəyişdi.

Mesaj forması (sənəddən):
```
{ version: "1", request_id, type: "OPEN_BETSLIP", payload: { handoff_token, correlation_id } }
```
Cavab: `opened` / `rejected` / `failed`.

## Bu task-da backend nə edir?
Bridge frontend ilə bukmeker arasındadır, backend-dən keçmir. Amma:
1. Bukmekerin icazəli ünvanları (`allowed_origins`) tenant ayarındadır (021). Frontend onları exchange cavabından alır.
2. **JSON sxem faylları:** bütün bridge mesajları üçün `docs/contracts/bridge/v1/`. Frontend və bukmeker eyni sxemi istifadə edir.
3. WebSocket protokolu üçün də: `docs/contracts/ws/v1/` (forma, bildiriş tipləri, əmrlər, bağlanma kodları).
4. Versiyalama: dəyişiklik köhnəni sındırırsa → "2", köhnəsi də dəstəklənir.

## Hazır olduğunu necə yoxlayarsan
- [ ] `docs/contracts/`-da bridge və WebSocket sxemləri var.
- [ ] Sxemlər koddakı tiplərlə uyğundur.
