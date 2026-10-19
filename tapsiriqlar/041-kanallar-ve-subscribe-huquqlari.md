# 041 — Kanallar və abunəlik hüquqları

**Faza:** 3 · **Asılılıq:** 040 · **Status:** [ ]

## Məqsəd
Müştəri kanallara abunə olsun, server hər abunədə hüququ yoxlasın.

## Niyə
Sənəd (bölmə 9): "Kanallar: event:{id}, room:{id}, battle:{id}, user:{id}. Hüquqlar hər subscribe zamanı yoxlanılır; müştəri başqa istifadəçinin user və ya battle kanalına abunə olmur."

Bölmə 6: "Oxuma, dəyişmə, WebSocket subscriptions, keş və fon tapşırıqları tenant-ı və hüquqları yoxlayır."

## Hüquq qaydaları
| Kanal | Kim abunə ola bilər |
|---|---|
| `event:{id}` | event bu tenant-dadırsa |
| `room:{id}` | otaq bu tenant-dadırsa (+ ban yoxdursa) |
| `battle:{id}` | yalnız battle iştirakçısı |
| `user:{id}` | yalnız `id === özü`. Bəlkə `user:me` kimi alias? |
| `lobby` / `feed` (əlavə) | lent kartlarının ümumi yenilənməsi, tenant üzrə |

**Kanal adlarında tenant:** `room:{id}` qlobal unikal UUID-dir, amma daxili yayım açarı (Redis pub/sub, 044) `t:{tenant}:room:{id}` olmalıdır. Niyə? Tenant izolyasiyasını iki qat qorumaq.

## Necə edəcəksən
1. Hər kanal tipi üçün `authorize(user, channelId)` funksiyası. Registry pattern.
2. Bir bağlantıda maksimum abunə sayı (məs. 50). Lentdə 20 kart = 20 `event:` kanalı? Yoxsa bir `feed` kanalı? Fikirləş: hər kartın ayrı kanalı bahadır; `feed:{tenant}` kanalı isə hamıya bütün dəyişiklikləri göndərir. Hibrid: lent üçün feed kanalı, Центр матча üçün event kanalı.
3. Abunə uğurlu → `ack` + kanalın cari `sequence`-i (resync üçün, 048).

## Qəbul meyarları
- [ ] Başqa istifadəçinin `user:{id}` kanalına abunə → `error` ACCESS_DENIED.
- [ ] Başqa tenant-ın otağına abunə → `error` NOT_FOUND.
- [ ] Hər hüquq qaydası üçün test.
