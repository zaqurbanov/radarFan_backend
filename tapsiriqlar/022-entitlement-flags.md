# 022 — Bukmekerin verdiyi icazələr (entitlements)

**Status:** [ ] · **Faza:** 1 · **Əvvəl bitməli:** 014

## Qısaca
Bukmeker launch token-də istifadəçinin icazələrini göndərir. Biz onları saxlayırıq və lazım olan yerdə yoxlayırıq.

## Niyə lazımdır?
- Bu, qumar qanunlarıdır. Yaşı çatmayan və ya **özünü mərcdən uzaqlaşdırmış** (self-exclusion) adama kupon göstərmək hüquqi problemdir.
- Sənəd: "18+" yazısı kifayət deyil. İcazəni **bukmeker** verir, biz **serverdə** yoxlayırıq.

## İcazələr
| İcazə | Yoxdursa |
|---|---|
| `betting_handoff` | Kupon və bukmekerə keçid bağlıdır |
| `predictions` | "Прогноз матча" bağlıdır (mərcə bənzəyir) |
| `community_write` | Çatda yaza bilmir |

## Harada saxlanır?
Yeni cədvəl: **`user_sessions`**
| Sütun | İzah |
|---|---|
| id | sessiya ID-si (`sid`, task 020) |
| tenant_id, user_id | |
| entitlements | icazələr (JSON) |
| locale | dil |
| created_at, expires_at | |

## Nə edəcəksən
1. Launch token-dəki icazələri yoxla, tanımadıqlarını at.
2. Sessiyada saxla.
3. `/me` cavabında qaytar ki, frontend düymələri gizlətsin.
4. **Server özü də yoxlamalıdır.** Frontend-in düyməni gizlətməsi təhlükəsizlik deyil, çünki istifadəçi sorğunu birbaşa göndərə bilər.

## Hazır olduğunu necə yoxlayarsan
- [ ] `betting_handoff` olmadan bukmekerə keçid → 403.
- [ ] `/me` icazələri qaytarır.

## Açıq sual
İcazələrin dəqiq siyahısı bukmekerlə razılaşdırılmalıdır.
