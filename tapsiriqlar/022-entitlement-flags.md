# 022 — Entitlement flags (icazə bayraqları)

**Faza:** 1 · **Asılılıq:** 014 · **Status:** [ ]

## Məqsəd
Tərəfdaşın launch token-də verdiyi icazələr (yaş, ölkə, self-exclusion, mərcə keçid hüququ) saxlansın və lazım olan yerdə yoxlansın.

## Niyə
Sənəd (bölmə 6): "«18+» etiketi öz-özlüyündə girişi təsdiqləmir. Yaş və coğrafi uyğunluq, self-exclusion və betting_handoff icazəsini tərəfdaş verir; server kupona keçiddən əvvəl bunları yoxlayır. Sistem tərəfdaşın rədd cavabından yayınmağa çalışmır."

Bu, qumar tənzimləməsidir. Self-exclusion etmiş (özünü mərcdən uzaqlaşdırmış) şəxsə kupon göstərmək hüquqi problemdir.

## Cədvəllər
Entitlement-lər sessiyaya bağlıdır (hər launch-da yenilənə bilər). İki variant:
- access token-də saxlamaq (`ent: ["betting_handoff", ...]`): sadə, 15 dəq. köhnələ bilər;
- `user_sessions` cədvəli: `id (sid)`, `tenant_id`, `user_id`, `entitlements jsonb`, `locale`, `created_at`, `expires_at`.

Tövsiyə: `user_sessions` cədvəli. Task 020-dəki `sid` üçün də lazımdır, handoff (task 110) isə DB-dən təzə dəyəri oxuyur.

## Bayraqlar (ilkin siyahı)
| Bayraq | Təsir |
|---|---|
| `betting_handoff` | Kupon və handoff (task 107–110). Yoxdursa, frontend əmsal düymələrini gizlədir |
| `predictions` | "Прогноз матча" (task 097–101). ROI ekranı mərcə bənzəyir, self-exclusion olunmuş istifadəçidən gizlətmək məntiqlidir |
| `community_write` | Yazma hüququ |

## Necə edəcəksən
1. Launch token-in `entitlements` sahəsini validasiya et (naməlum bayraqları at).
2. `/me` cavabında `entitlements` qaytar ki, frontend UI-ı uyğunlaşdırsın.
3. **Server həmişə özü yoxlayır.** Frontend-in düyməni gizlətməsi təhlükəsizlik deyil.

## Qəbul meyarları
- [ ] `betting_handoff` olmadan `POST /handoffs` → 403 `ACCESS_DENIED`.
- [ ] `/me` entitlement-ləri qaytarır.

## Açıq suallar
- Bayraqların dəqiq siyahısı tərəfdaşla inteqrasiya müqaviləsində razılaşdırılır (sənəd belə deyir).
