# 052 — Mesaj tarixçəsi: `GET /rooms/{id}/messages`

**Faza:** 4 · **Asılılıq:** 051 · **Status:** [ ]

## Məqsəd
Otağa girəndə son mesajlar, yuxarı sürüşdürəndə köhnələri.

## Niyə
Sənəd (bölmə 4): "Girişdə son 50 görünən mesaj yüklənir; əvvəlkilər kursorla əlçatandır." Bölmə 8: → `items, next_cursor, last_sequence`.

## Endpoint
| Param | Qeyd |
|---|---|
| `limit` | default 50, max 50 |
| `before_sequence` | köhnə mesajlar üçün cursor |
| `after_sequence` | reconnect üçün (056) |

Cavab: `items[]` (id, sequence, user: {id, nickname, initials, is_demo}, text, status, like_count, liked_by_me, hidden_for_me, created_at), `next_cursor`, `last_sequence`.

## Necə edəcəksən
1. Cursor burada sadədir: sequence özü unikal və sıralıdır.
2. **"Son 50 görünən":** gizlədilmiş mesajlar sayılırmı? Sənəd: "Gizlədilmiş mətn bütün müştərilərdə «Mesaj moderator tərəfindən gizlədilib» etiketi ilə əvəz edilir". Deməli gizlədilmiş mesaj **siyahıda qalır**, amma `text` boşdur və etiket var. Sequence boşluğu olmasın deyə.
3. **Mətn gizlədilməsi serverdə olur.** Gizlədilmiş mesajın `text`-ini cavaba qoyub frontend-ə "göstərmə" demək olmaz. DevTools-da görünür.
4. İstifadəçi adları üçün join (N+1 olmasın!).
5. Şəxsi gizlətmə (060) və like (059) sahələri istifadəçiyə görə fərdiləşir.
6. Ban olunmuş istifadəçi oxuya bilərmi? Qərar ver.

## Qəbul meyarları
- [ ] Moderator gizlətdiyi mesajın mətni API cavabında yoxdur.
- [ ] Səhifələrin birləşməsində boşluq və dublikat yoxdur.
