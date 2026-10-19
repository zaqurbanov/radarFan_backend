# 125 — Monitorinq və alertlər

**Faza:** 12 · **Asılılıq:** 011 · **Status:** [ ]

## Məqsəd
Production-da nə baş verdiyini görmək və problemlərdən istifadəçilərdən əvvəl xəbər tutmaq.

## Niyə
Sənəd (bölmə 10): "Monitorinq: error rate, latency, WS qırılmaları, məlumat axınının lag-i, stale outcomes sayı, outbox gecikməsi, bridge xətaları, ledger/balance uyğunsuzluqları və moderasiya xətaları. Hər sorğunun request_id-si, handoff-un correlation_id-si var. Məlumat axınının əlçatmazlığına, 5xx artımına və XP verilməsinin mümkünsüzlüyünə alarmlar qurulmalıdır."

## Metriklər
| Metrik | Tip | Mənbə |
|---|---|---|
| http_requests_total{route,status} | counter | Fastify hook |
| http_request_duration_seconds{route} | histogram | |
| ws_connections | gauge | 039 |
| ws_disconnects_total{code} | counter | 043 |
| feed_lag_seconds{tenant} | gauge | 038 |
| stale_outcomes{tenant} | gauge | 029 |
| outbox_oldest_unpublished_seconds | gauge | 045 |
| message_delivery_seconds | histogram | 055 |
| bridge_results_total{status} | counter | 109 |
| ledger_balance_mismatches | gauge | 084 |
| xp_award_failures_total | counter | 085, 092 |

## Alertlər (minimum)
- Feed lag > 60 san.
- 5xx nisbəti > 2% (5 dəq.)
- XP verilməsi xətaları > 0
- Outbox gecikməsi > 10 san.
- Ledger uyğunsuzluğu > 0

## Necə edəcəksən
1. `prom-client` + `/metrics` endpoint (yalnız daxili şəbəkədən əlçatan!).
2. Prometheus + Grafana (docker-compose-a əlavə et lokal üçün) və ya hostinq provayderinin həlli.
3. **Label kardinallığı:** `user_id`-ni label etmə (milyonlarla seriya). `tenant_id` OK (az sayda).
4. Health endpoint-lərini genişləndir: `/health/live` (proses sağdır) və `/health/ready` (DB + Redis əlçatandır).

## Qəbul meyarları
- [ ] `/metrics` yuxarıdakı metrikləri verir.
- [ ] Ən azı 5 alert qaydası yazılıb.
- [ ] `/health/ready` DB düşəndə 503 qaytarır.
