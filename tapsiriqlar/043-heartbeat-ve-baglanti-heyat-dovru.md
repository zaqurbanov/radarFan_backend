# 043 — Heartbeat və bağlantının həyat dövrü

**Faza:** 3 · **Asılılıq:** 039, 020 · **Status:** [ ]

## Məqsəd
Ölü bağlantılar aşkarlansın və təmizlənsin. Logout və ban zamanı bağlantılar bağlansın.

## Niyə
Sənəd (bölmə 9): "Reconnect zamanı jitter ilə exponential backoff istifadə edilir, maksimum interval 30 saniyədir. Heartbeat hər 20 saniyədədir; 60 saniyə aktivlik olmadıqda bağlantı itirilmiş sayılır."

Mobil WebView arxa plana keçəndə (istifadəçi başqa tətbiqə keçir) TCP bağlantısı "yarımçıq ölü" qalır. Server bilməsə, o "istifadəçini" otaqda aktiv sayır (presence, 046) və mesaj göndərməyə çalışır.

## Necə edəcəksən
1. Müştəri hər 20 san. `ping` göndərir (və ya server WS ping frame-ləri). Server hər bağlantının `last_seen_at`-ını yeniləyir.
2. Server tərəfində hər 10–15 san. yoxlama: `now - last_seen > 60s` → bağlantını bağla (close kod 4000 + səbəb).
3. Bağlantı bağlananda: reyestrdən sil, abunələri sil, presence-dən çıxar (046).
4. Logout (020) / ban (018) / sessiya dəyişməsi → `sid` üzrə bütün bağlantıları tap və bağla (close kod 4001 "session_ended"). Çox instansiyada bu siqnal pub/sub ilə gəlir (044).
5. Graceful shutdown (002): bütün bağlantılara "server_restart" (1012) göndər ki, müştərilər dərhal yenidən qoşulsun.
6. Reconnect backoff **müştərinin** işidir, amma server close kodları ilə ona ipucu verir: 4001 = yenidən qoşulma, yeni login lazımdır; 1012 = dərhal qoşul.

## Qəbul meyarları
- [ ] Ping göndərməyən bağlantı 60 san. sonra bağlanır.
- [ ] Logout-dan sonra bağlantı 4001 ilə bağlanır.
- [ ] Close kodlarının siyahısı sənədləşdirilib (frontend üçün).
