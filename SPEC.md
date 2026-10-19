# RADAR.FAN – Texniki sənədin xülasəsi (backend üçün)

Mənbə: `RADAR-FAN-technical-spec-AZ.docx` (v1.0, 9 oktyabr 2026, məhsul sahibi Nihal Agasoy)
Front prototipi: https://betpulse-nihal-app.milanodiavolo.chatgpt.site/ (ən son versiya)

> Sənəddə yazılanlar "layihə qərarlarıdır", mövcud infrastruktur deyil. Konkret kitabxanaları və hostinqi proqramçı seçir.

---

## 1. Məhsul və MVP

B2B2C white-label idman icması mini tətbiqi bukmeker tərəfdaşın WebView-u daxilində işləyir. Hər tərəfdaş = ayrıca **tenant**.

**MVP daxilində:**
| Modul | Məzmun |
|---|---|
| Nəbz | Matç lenti, idman filtri (Hamısı/Futbol/Basketbol/Seçilmişlər), seçilmişlər, otaq aktivliyi, nəticələr |
| İcma | Matç başına çat otağı, "kim qalib gələcək" sorğusu, şikayət, moderasiya |
| Duel | Açıq demo bota qarşı 3 sual, nəticə, XP |
| Tapşırıqlar | Birdəfəlik "İsinmə" (3 tapşırıq), 100 XP claim |
| Texniki | Server auth, XP jurnalı, brend konfiqurasiyası, tərəfdaş adapteri, analitika |

**MVP xaricində:** real təkbətək duel (2-ci mərhələ), istilik xəritəsi, AI fərdiləşdirmə, şəxsi mesajlar, pul mükafatları, pul kisəsi, depozit, RADAR.FAN daxilində mərc qəbulu, Telegram Mini App, avatar ekranı və tam profil.

**Qadağa:** canlı məlumatı işarələmədən demo məlumatla əvəz etmək.
**Hipotez:** icma/oyun iştirakı geri qayıdışı və tərəfdaşa şüurlu keçidləri artırır. GGR təsiri eksperimentlə yoxlanılır.

---

## 2. Əsas qaydalar

### 2.1 Auth və tenant
- Konteyner imzalanmış **birdəfəlik launch token** verir. Sahələr: issuer, audience=`RADAR.FAN`, tenant_id, external_user_id, issued_at, expires_at, nonce, locale, entitlement flags. **TTL 60 san.**, nonce təkrar istifadə olunmaz.
- `POST /auth/exchange` launch token-i daxili sessiyaya çevirir. Access token **15 dəq.**, yaddaşda saxlanır (localStorage yox). Yenilənmə HttpOnly Secure cookie ilə (konteyner dəstəkləyirsə), əks halda bridge ilə yeni launch token.
- 401-də müştəri sessiyanı **bir dəfə** yeniləyib sorğunu təkrarlayır. Dəyişdirici sorğu yalnız eyni Idempotency-Key ilə təkrarlanır.
- "18+" etiketi girişi təsdiqləmir. Yaş/coğrafiya, self-exclusion, `betting_handoff` icazəsini **tərəfdaş** verir, server kupona keçiddən əvvəl yoxlayır.
- **Tenant həmişə yoxlanmış sessiyadan** götürülür (query/body-dən yox). Hər cədvəldə `tenant_id`. `external_user_id` tenant daxilində unikaldır.
- Rollar: `user`, `moderator`, `admin` (admin qiymətləri dəyişə bilməz).
- TenantConfig: tenant_id, name, logo_url, theme tokens, locale, timezone, enabled_sports, enabled_features, partner_adapter, feed_provider, XP rules version. Demo/production rejimi serverdə.

### 2.2 Nəbz (lent)
- Sorğuda 20-dək matç (max 50) + cursor. Filtr dəyişəndə ilk karta qayıdır.
- Statuslar: `scheduled, live, finished, postponed, cancelled`. Hesab və oyun dövrü **müştəridə hesablanmır**.
- Sıralama: live → scheduled; qrup daxilində aktiv iştirakçı sayı ↓, sonra `start_at`, sonra `event_id`.
- Aktiv iştirakçı = otaqla bağlantısı aktiv və ya son 60 san.-də heartbeat göndərmiş **unikal** istifadəçi. Mövcud deyilsə: "Aktivlik məlumatı əlçatan deyil".
- Seçilmişlər: saxlama/silmə idempotent. İlk təsdiqlənmiş saxlama `save_match` tapşırığını tamamlayır, silmə geri qaytarmır.
- Bazarlar: `football_1x2` (home/draw/away), `basketball_moneyline` (home/away). Əmsal **decimal string** ("1.72"). Kartda `provider_event_id`, `provider_market_id`, `provider_outcome_id`, `market_rules`, `odds_version`. Suspended/əlçatmaz nəticə bloklanır, qiymət olmasa 0 yazılmır.
- Əmsal aktuallığı: server `updated_at`-dan **15 san.** Köhnə qiymət handoff üçün bağlanır.

### 2.3 Handoff (bukmekerə keçid)
- `POST /handoffs` → server yoxlayır: istifadəçi, event statusu, market, qiymət aktuallığı, tərəfdaş məhdudiyyətləri.
- Qiymət dəyişibsə `409 ODDS_CHANGED` (details: yeni qiymət + version). Suspension → `409 OUTCOME_UNAVAILABLE`.
- Uğur: qısaömürlü token (TTL 60 san., birdəfəlik) + `correlation_id`. UI adapter təsdiqinə qədər "Kupon açılır", 5 san. timeout-dan sonra təkrar/geri.
- RADAR.FAN mərc məbləğini qəbul etmir, mərcin qoyulmasını təsdiqləmir. `opened` ≠ mərc qoyuldu.

### 2.4 İcma
- Hər event üçün bir room (`tenant_id`, `event_id`). Girişdə son 50 mesaj, cursor ilə köhnələr. Yeni mesajlar/moderasiya WebSocket ilə. Sıralama server **sequence**-i ilə.
- Reconnect: müştəri `last_sequence` göndərir; server buraxılanı qaytarır və ya snapshot tələb edir.
- Mesaj: plain text, trim-dən sonra **1–240 Unicode code point**, müştəri `client_message_id` (UUID) yaradır, təkrar eyni ID dublikat yaratmır. Status: `pending, sent, failed`. DOM-a `textContent`.
- Rate limit: istifadəçi/tenant üzrə **10 san.-də 5, dəq.-də 30** → `429` + `retry_after_seconds`.
- `send_message` tapşırığı yalnız server mesajı qəbul edəndən sonra tamamlanır.
- Poll: room başına bir aktiv. Futbolda home/draw/away, basketbolda 2 variant. Bağlanma: event bitəndə/ləğv olanda/`closes_at`. Hər istifadəçinin **bir dəyişdirilə bilən səsi**. Səsdən əvvəl nəticə göstərilmir. Faizlər "ən böyük qalıq" üsulu ilə cəmi 100. Total 0 → "Hələ səs yoxdur".
- Moderasiya: şikayət səbəbləri `spam, abuse, other`. Moderator mesajı **gizlədir** və göndərməni müvəqqəti qadağan edir, hər əməliyyat jurnala yazılır. Şikayət müəllifləri iştirakçılara görünmür. Gizlədilmiş mətn: "Mesaj moderator tərəfindən gizlədilib".
- Bitmiş otaq `finished_at + 24 saat` sonra `read_only`. MVP-də şəxsi mesaj, əlavə, reaksiya, production-da saxta iştirakçı yoxdur.

### 2.4 Duel (Quiz Battle, demo bot)
- Startdan əvvəl: "Demo rəqib", 3 sual, max 150 XP. Bot real istifadəçi kimi göstərilmir.
- `POST /battles`: server 3 fərqli aktiv sual seçir, ardıcıllığı və qayda versiyasını sabitləyir. Müştəri yalnız cari sualı + 4 `option_id` alır. `correct_option_id` və izah **sual bağlanana qədər göndərilmir**.
- Hər sual **20 san.**, server `opened_at`/`deadline_at` qaytarır. Cavab deadline-dan əvvəl çatsa qəbul. Bir `question_id` = bir cavab. Eyni `request_id` → əvvəlki nəticə; dəyişmə cəhdi → `409 ANSWER_LOCKED`.
- Növbəti sual: "Növbəti sual" düyməsi və ya 10 san. sonra avtomatik. Vəziyyət serverdə, reload-da bərpa.
- Bot 3 sualdan **birinə** düzgün cavab verir (mövqe yaradılanda serverdə seçilir). `user>bot` victory, bərabər **draw**, az defeat.
- XP: düzgün cavab başına **50**, max **150**, completed zamanı **bir tranzaksiya** ilə. Tenant timezone-una görə sutkada ilk **3** tamamlanmış duel XP verir. Daily key və timezone versiyası start zamanı sabitlənir. Tenant başına bir aktiv duel.
- Bağlantı itəndə: cari sual deadline-da bağlanır, növbəti avtomatik açılmır. 5 dəq. sonra `abandoned` (XP/tapşırıq yox).

### 2.5 Tapşırıqlar ("İsinmə")
- Birdəfəlik: `save_match`, `send_message`, `complete_battle` (sıra sərbəst, məğlubiyyət də sayılır). Faiz = `completed/3`.
- 3-ü bitəndə `claimable`. `POST /challenges/{id}/claim` **bir tranzaksiyada** 100 XP verir, status `claimed`. Təkrar claim əvvəlki nəticəni qaytarır.
- Ledger unikallığı: `tenant_id + user_id + source_type + source_id`.
- XP balansı = ledger cəmi. XP pul deyil. "Aktiv azarkeş" həddi 200 XP.

### 2.6 UI qaydaları (backend-ə təsir edənlər)
- Hər server ekranı: `loading / empty / error (retry) / ready`. Xəta əvvəlki məzmunu silmir.
- Navigation: 4 bölmə (Nəbz, İcma, Duel, Tapşırıqlar). Aktiv matç seçilmiş nəticədən ayrıdır. Başlıq: tərəfdaş brendi, ləqəb/baş hərflər, XP. Ləqəb email/telefon/tərəfdaş ID açmır.

---

## 3. REST API (`/api/v1`)

Pagination: cursor, `limit` default 20, max 50. Dəyişdirici sorğular (mükafat, mesaj, handoff) üçün **`Idempotency-Key` (UUID) məcburi**, ≥24 saat saxlanır.

| Endpoint | Giriş | Nəticə |
|---|---|---|
| POST /auth/exchange | launch_token | access_token, expires_at, user, config |
| GET /me | – | user, xp_balance, challenge_summary |
| GET /events | sport, favorites, cursor, limit | items, next_cursor, server_time |
| GET /events/{id} | – | event, markets, room_summary |
| PUT /favorites/{event_id} | – | saved: true |
| DELETE /favorites/{event_id} | – | saved: false |
| GET /rooms/{id}/messages | cursor, limit | items, next_cursor, last_sequence |
| POST /rooms/{id}/messages | client_message_id, text | message, challenge_progress |
| POST /messages/{id}/reports | reason, detail? | report_id, accepted |
| GET /rooms/{id}/poll | – | poll, my_vote, (səsdən sonra) aggregates |
| PUT /polls/{id}/vote | option_id | my_vote, counts, percentages |
| POST /battles | mode=demo | battle_id, state, current_question |
| GET /battles/{id} | – | snapshot (+ nəticə) |
| POST /battles/{id}/answers | question_id, option_id, request_id | accepted, demo-da feedback |
| POST /battles/{id}/next | – | current_question / completed |
| GET /challenges | – | items |
| POST /challenges/{id}/claim | – | award_id, awarded_xp, xp_balance |
| POST /handoffs | outcome_id, odds_version | handoff_token, expires_at, correlation_id |
| POST /ws-ticket | – | ticket, expires_at |
| GET /moderation/reports | cursor, status | şikayət siyahısı |
| POST /moderation/messages/{id}/hide | reason | status, audit_id |
| POST /moderation/users/{id}/mute | reason, expires_at | audit_id |
| POST /partner/v1/handoffs/resolve | (tərəfdaş backend) | handoff istifadəsi |

**Format:** uğur `{data, request_id}`, xəta `{error:{code,message,retryable,details}, request_id}`.
**Kodlar:** 400 `INVALID_INPUT` · 401 `SESSION_EXPIRED` · 403 `ACCESS_DENIED`/`USER_RESTRICTED` · 404 `NOT_FOUND` · 409 `ANSWER_LOCKED`/`CHALLENGE_NOT_READY`/`ODDS_CHANGED`/`OUTCOME_UNAVAILABLE`/`IDEMPOTENCY_CONFLICT` · 410 `BATTLE_EXPIRED` · 429 `RATE_LIMITED` · 503 `FEED_UNAVAILABLE`.
Eyni Idempotency-Key + başqa gövdə → `409 IDEMPOTENCY_CONFLICT`. `OpenAPI`-ni proqramçı tərtib edir.

---

## 4. Məlumat modeli

UUID id-lər, UTC ISO 8601. Hər tenant obyektində `tenant_id`.

| Obyekt | Sahələr | Məhdudiyyət |
|---|---|---|
| Tenant | id, slug, config, timezone, rules_version | slug unikal |
| User | id, tenant_id, external_user_id, nickname, role, status | (tenant, external_user_id) unikal |
| Event | id, tenant_id, provider_id, sport, teams, status, score, period, start_at, updated_at | (tenant, provider_id) unikal |
| Market | id, event_id, type, rules, status, version | tenant hadisəsinə aiddir |
| Outcome | id, market_id, provider_id, key, price, status, updated_at | qiymət versiyası feed-dən |
| Favorite | tenant_id, user_id, event_id, created_at | istifadəçi başına matç bir qeyd |
| Room | id, tenant_id, event_id, status | event başına bir otaq |
| Message | id, room_id, user_id, text, sequence, client_message_id, status, created_at | (room, sequence) və (user, client_message_id) unikal |
| Poll/Vote | poll: room_id, options, closes_at; vote: poll_id, user_id, option_id | poll+user başına bir vote |
| Question | id, tenant_id, version, text, options, correct_option_id, explanation, status | istifadədən sonra versiya dəyişməzdir |
| Battle | id, tenant_id, mode, state, rules_version, question_ids, daily_key, result | istifadəçi başına bir aktiv |
| BattleAnswer | battle_id, user_id, question_id, option_id, received_at, correct | sual başına bir cavab |
| ChallengeProgress | user_id, challenge_id, task_flags, status, claimed_at | istifadəçi başına bir vəziyyət |
| XpLedger | id, user_id, amount, source_type, source_id, created_at | mənbə üzrə unikal mükafat |
| Handoff | id, user_id, event_id, outcome_id, odds_version, status, correlation_id | birdəfəlik token + TTL |
| ModerationAction | actor_id, target_id, reason, action, created_at | dəyişdirilməz jurnal |

**İndekslər:** Event (tenant,status,start_at); Message (tenant,room,sequence); Favorite (tenant,user); Battle (tenant,user,state); XpLedger (tenant,user,created_at).
**Tranzaksiya:** claim və battle completion irəliləyiş qeydini kilidləyir, ledger+nəticəni atomar yazır. Balance cache ledger əsasında. Presence TTL ilə. Outbox və ya ekvivalent commit-dən sonra dərc üçün.
**Saxlanma müddətləri və silinmə** production-dan əvvəl tenant retention policy ilə (texniki rahatlıqla müəyyən edilmir).

---

## 5. WebSocket

- `/api/v1/ws`, auth: `POST /ws-ticket` ilə qısaömürlü birdəfəlik ticket. Access token URL-də yox.
- Reconnect: jitter ilə exponential backoff (max 30 san.). Heartbeat **20 san.**, 60 san. aktivlik yoxsa itmiş.
- Envelope: `{event_id, type, channel, sequence, emitted_at, payload}`. Müştəri komandası `request_id` ilə, ack/error alır.
- Kanallar: `event:{id}`, `room:{id}`, `battle:{id}`, `user:{id}`. Hüquq hər subscribe-da yoxlanır.
- Hadisələr: `event.updated`, `odds.updated`, `room.message.created`, `room.message.hidden`, `room.presence.updated`, `poll.updated`, `battle.question.opened`, `battle.answer.ack`, `battle.question.closed`, `battle.completed`, `challenge.updated`, `xp.updated`.
- Aşağı version yeni məlumatı əvəz etmir. Sequence boşluğu → snapshot. Səsdən əvvəl `poll.updated` yalnız status+version. Matçlar üçün 15 san. ehtiyat polling mümkündür.

## 6. Tərəfdaş bridge
Adapter: `getLaunchToken()`, `openBetSlip({handoffToken, correlationId})`, `closeMiniApp()`, `onSessionChanged(handler)`. Mesaj: `{version:"1", request_id, type:"OPEN_BETSLIP", payload}` → cavab `OPEN_BETSLIP_RESULT` (`opened|rejected|failed`, reason_code). `postMessage`-də targetOrigin icazə siyahısı, `event.origin`/`event.source` yoxlanır. Tərəfdaş imzalanmış webhook göndərə bilər (imza, timestamp, təkrar event_id yoxlanır).

## 7. Qeyri-funksional hədəflər
- Yük: tenant başına 1 000 eyni vaxtda istifadəçi, 100 aktiv otaq, saniyədə 50 mesaj.
- p95: REST ≤500 ms · mesaj çatdırılması ≤1 s · hesab/əmsal yenilənməsi ≤2 s · UI ilkin yüklənmə ≤3 s.
- Production: HTTPS/WSS, CORS/CSP, input validasiyası, rate limits, rol auditi, tenant üzrə ayrı secret, loqlarda token və mesaj mətni yox. Müştəri `xp_delta` göndərmir və düzgün cavabı təyin etmir.
- Monitorinq: error rate, latency, WS qırılmaları, feed lag, stale outcomes, outbox gecikməsi, bridge xətaları, ledger/balance uyğunsuzluğu. Hər sorğuda `request_id`, handoff-da `correlation_id`.
- Mühitlər: local demo, staging, production. Miqrasiyalar versiyalanır.

## 8. Analitika
Hadisələr: `app_opened, tab_viewed, match_viewed, match_saved, room_entered, message_sent, poll_voted, battle_started, battle_completed, challenge_claimed, outcome_selected, handoff_requested, betslip_opened, handoff_failed`. Mesaj mətni, token, email, telefon **yoxdur**. `message_sent` və `challenge_claimed` commit-dən sonra serverdə. Funnel: matça baxış → nəticə seçimi → handoff → təsdiqlənmiş kupon açılışı.

## 9. İş ardıcıllığı
avtorizasiya və tenant → feed normallaşdırma və lent → seçilmişlər və otaqlar → sorğular və moderasiya → server viktorinası → ledger və tapşırıqlar → handoff → analitika/yük/inteqrasiya. 2-ci mərhələ (real duel) ayrıca qiymətləndirilir.

---

# 10. Front prototip ↔ Sənəd müqayisəsi

Front: **BetPulse**, rus dilində, tünd mövzu, mobil kimi. Baxdığım ekranlar: Пульс (lent), чат/сообщество, Игры (siyahı, Quiz Battle giriş), Мой фан (profil+mağaza), Моя статистика, Демо-купон, Центр матча. **Baxmadığım ekranlar:** "Найди пару", "Прогноз матча" oyun axını, mağazadan alış, Quiz Battle-ın daxili sualları.

## 10.1 Uyğun gələnlər
- Filtrlər: Все / Футбол / Баскетбол / Избранное.
- Kart: liqa, komandalar, hesab, dövr, "ДЕМО LIVE", redaksiya qeydi, fan sayı, outcome-lar (П1/X/П2; basketbolda X yoxdur).
- Saxla (♡), "В чат →", otaq üzrə ayrıca çat, "Кто победит?" sorğusu.
- Quiz Battle: demo-bot Alex, 3 sual, 50 XP / düzgün cavab, "bot 1 xalla bitirir", XP ilk 3 battle üçün.
- Mesajlarda "демо" etiketi (bot açıq işarələnib).
- Kupon ekranı "demo / real mərc yoxdur" qeydi ilə.

## 10.2 Sənəddə OLMAYAN, frontda OLAN (qərar lazımdır)
| # | Frontda | Sənəd | Risk |
|---|---|---|---|
| F1 | **Мой фан**: profil, ad dəyişmə (✎), mağaza, qarderob (forma, baş geyimi, aksesuar, fon) | Avatar və tam profil MVP-dən kənardır | Əhatə genişlənir: ən azı Item/Inventory cədvəlləri və `PATCH /me` |
| F2 | **Валюта ◈ (coin)**: 300 start, +20 düzgün cavaba, mağazada xərclənir | Yalnız XP var. Pul kisəsi MVP xaricindədir | Yeni ledger (Coin) lazımdır. "Pul deyil, mübadilə olunmur" demək olar, amma sənədə əlavə olunmalıdır |
| F3 | **Прогноз матча** + **Моя статистика**: 100 ед. "stavka" kimi, ROI, çıxarış, tarixçə | RADAR.FAN-da mərc qəbulu MVP-dən kənardır, rəsmi olaraq mərc qəbul etmir | **Ən böyük risk.** UI mərc kimi görünür. Hüquqi/tərəfdaş baxımından məhsul sahibindən aydın cavab lazımdır |
| F4 | **Найди пару** mini-oyun | Yalnız Quiz Battle | Yeni oyun, yeni backend yoxdur. Yoxsa tamamilə front-lokal |
| F5 | **Демо-купон ekspres** (bir neçə matç, ümumi əmsal) | Handoff **bir** outcome üçündür (`POST /handoffs` tək `outcome_id`) | Çox outcome handoff-u API-də yoxdur |
| F6 | **Центр матча**: sahiblik, zərbələr, çərçivəyə zərbələr | Event modelində statistika yoxdur | Feed provayderdən gələcəkmi? Model və endpoint lazımdır |
| F7 | Mesajda **♡** (like) | Reaksiyalar MVP-dən kənardır | Çıxarmaq və ya sənədə əlavə etmək |
| F8 | Hər mesajda **«Скрыть»** düyməsi (adi istifadəçi görür) | Gizlətmə yalnız moderatordur. Adi istifadəçi yalnız **şikayət** edə bilər | Hüquq səhvi. Ya "şikayət" olmalıdır, ya yalnız moderatora görünməlidir |
| F9 | Sorğu futbolda yalnız 2 variant (RM / FCB) | Futbolda "uyğun hallarda" home/draw/away | Aydınlaşdır |

## 10.3 Sənəddən FƏRQLİ olanlar
| # | Front | Sənəd |
|---|---|---|
| D1 | Naviqasiya: **Пульс / Комьюнити / Игры / Мой фан** | Nəbz / İcma / Duel / **Tapşırıqlar**. "İsinmə" tapşırıq UI-ı frontda görmədim, claim ekranı yoxdur |
| D2 | Dil **rus**, brend **BetPulse** | Sənəd RADAR.FAN, Azərbaycan dilində. Brend, dil `TenantConfig`-dən gəlməlidir (`locale`, `name`) |
| D3 | Başlangıc XP **50** | Yeni istifadəçi **0 XP** (sənədin cədvəli) |
| D4 | Quiz-də "**vaxt məhdud deyil**" | Hər sual **20 san.**, server deadline-ı |
| D5 | "XP ilk 3 battle üçün **bu demoda**" | Tenant timezone-una görə **sutkada** ilk 3 |
| D6 | Düzgün cavaba **XP + coin** | Yalnız XP |
| D7 | Oyunlar siyahısı "Игры" ekranında | Sənəddə "Duel" ayrıca bölmədir |
| D8 | Aktiv iştirakçı kimi "1 284 фанатов · демо" | Sənəd: yalnız real unikal aktiv istifadəçi, hesabın/mesajın ümumi sayı olmaz. Demo rejimdə işarələnib, production-da real metrika olmalıdır |
| D9 | Proqnoz "Прогноз попадает в твою статистику" | Sənəd: "Viktorinadakı qələbələr mərc nəticəsinin proqnozu kimi istifadə edilmir" ilə qarşılıqlı əlaqə yoxdur, amma statistika funksiyası ümumiyyətlə yoxdur |

## 10.4 Qərar üçün sual siyahısı (məhsul sahibinə: Nihal)
1. **F3**: "Прогноз матча" və "ROI statistikası" MVP-də qalır, yoxsa çıxarılır? Qalırsa, "mərc qəbulu yoxdur" qaydası ilə necə uzlaşır?
2. **F1/F2**: Mağaza və coin MVP-yə daxildirmi? (Sənəd: pul kisəsi xaricdədir.) Daxildirsə, ayrıca bir spec lazımdır.
3. **F5**: Handoff tək outcome yoxsa ekspres (çox outcome) olacaq?
4. **F6**: Matç statistikası (sahiblik, zərbələr) feed provayderdən gəlirmi?
5. **D1**: "İsinmə" tapşırıqları hansı ekranda göstərilir?
6. **D4**: Qaydada 20 san. deyilir, frontda yoxdur. Hansı doğrudur?
7. **F8**: Mesaj gizlətmə kimə açıqdır?
