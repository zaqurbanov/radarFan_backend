# 114 — Bridge kontraktının sənədi

**Faza:** 9 · **Asılılıq:** 109, 019 · **Status:** [ ]

## Məqsəd
Frontend və tərəfdaş üçün bridge (konteyner ↔ mini app) müqaviləsini yazılı və versiyalı etmək.

## Niyə
Sənəd (bölmə 9): "Təklif olunan adapter interfeysi: getLaunchToken(), openBetSlip({handoffToken, correlationId}), closeMiniApp(), onSessionChanged(handler). Dəstəklənən transport-ları tərəfdaş seçir: native bridge və ya iframe üçün postMessage."
"Bridge mesajı: {version:"1", request_id, type:"OPEN_BETSLIP", payload:{handoff_token, correlation_id}}. Cavab: {version:"1", request_id, type:"OPEN_BETSLIP_RESULT", payload:{status:"opened"|"rejected"|"failed", reason_code}}."
"postMessage konkret icazə siyahısındakı targetOrigin-dən istifadə edir, event.origin və event.source-u yoxlayır."

Bölmə 11 (təhvil): "WS və bridge sxemlərini" təhvil verirsən.

## Bu task-da backend nə edir?
Bridge frontend ilə konteyner arasındadır, backend-dən keçmir. Amma:
1. `TenantConfig.partner_adapter` (021): `type`, `allowed_origins`. Frontend bunu `/auth/exchange` cavabından alır.
2. **JSON Schema** faylları: bütün bridge mesajları üçün (`docs/contracts/bridge/v1/*.json`). Frontend və tərəfdaş eyni sxemi istifadə edir.
3. WS protokolu üçün də eyni (`docs/contracts/ws/v1/`): envelope, hər hadisə tipi, komandalar, close kodları (043).
4. Bridge nəticəsini qəbul edən endpoint (109, `POST /handoffs/{id}/result`).
5. Versiyalama qaydası: `version: "1"`. Breaking change → "2", köhnə dəstəklənir.

## Qəbul meyarları
- [ ] `docs/contracts/` qovluğunda bridge və WS sxemləri var.
- [ ] Sxemlər kodda istifadə olunan tiplərlə uyğundur (mümkünsə tiplərdən avtomatik generasiya).
