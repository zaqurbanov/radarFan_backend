# RADAR.FAN / BetPulse — Backend tapşırıqları

Mənbələr: `RADAR-FAN-technical-spec-AZ.docx` + sayt (əsas versiya): https://betpulse-nihal-app.milanodiavolo.chatgpt.site/

Qayda: tapşırıqları **sıra ilə**, bir-bir et. Hər birini bitirəndə mentora göstər, review-dan sonra `[x]` qoy.
Faiz: həmin faza bitəndə backend-in təxminən neçə faizi hazırdır.

Artıq edilib (task-lardan əvvəl): `eventsRoutes`-un qeydiyyatı, `/auth/exchange`-də atomar nonce.

## Faza 0 — Təmiz təməl → 9%

- [x] [001 — Env validasiyası və secret-lər](001-env-validasiyasi-ve-secretler.md)
- [x] [002 — `server.ts`: düzgün start və graceful shutdown](002-server-start-ve-shutdown.md)
- [x] [003 — Lazımsız fayllar və importların təmizlənməsi](003-lazimsiz-fayllar-ve-importlar.md)
- [x] [004 — `.env` və git təhlükəsizliyi](004-env-ve-git-tehlukesizliyi.md)
- [x] [005 — Schema səliqəsi: adlar, `updated_at`, dairəvi import](005-schema-seliqesi.md)
- [ ] [006 — Docker Compose ilə lokal mühit](006-docker-compose-lokal-muhit.md)
- [ ] [007 — Migration və seed iş axını](007-migration-ve-seed-is-axini.md)
- [ ] [008 — Vahid cavab formatı](008-vahid-cavab-formati.md)
- [ ] [009 — Xəta kodları sistemi](009-xeta-kodlari-sistemi.md)
- [ ] [010 — Input validasiyası](010-input-validasiyasi.md)
- [ ] [011 — Request ID, logger və həssas məlumatların gizlədilməsi](011-request-id-logger-redaction.md)
- [ ] [012 — Test infrastrukturu](012-test-infrastrukturu.md)

## Faza 1 — Auth, tenant, istifadəçi → 18%

- [ ] [013 — Launch token və access token-in ayrılması](013-launch-ve-access-token-ayrilmasi.md)
- [ ] [014 — Tenant üzrə launch token doğrulaması (açar və issuer)](014-tenant-uzre-launch-token-dogrulamasi.md)
- [ ] [015 — Demo rejim və demo launch token](015-demo-rejim-ve-demo-launch-token.md)
- [ ] [016 — Vahid auth plugin və `req.user` tipi](016-vahid-auth-plugin.md)
- [ ] [017 — Rol əsaslı icazə](017-rol-esasli-icaze.md)
- [ ] [018 — İstifadəçi statusu (active / muted / banned)](018-istifadeci-statusu.md)
- [ ] [019 — Sessiyanın yenilənməsi (refresh)](019-sessiya-yenilenmesi.md)
- [ ] [020 — Logout və sessiya dəyişikliyi](020-logout-ve-sessiya-deyisikliyi.md)
- [ ] [021 — TenantConfig strukturu (white-label)](021-tenant-config-strukturu.md)
- [ ] [022 — Entitlement flags (icazə bayraqları)](022-entitlement-flags.md)
- [ ] [023 — `GET /me`: tam profil cavabı](023-get-me-tam.md)
- [ ] [024 — `PATCH /me`: ləqəbin dəyişdirilməsi](024-patch-me-ad-deyisme.md)

## Faza 2 — Feed və Nəbz (Пульс) → 29%

- [ ] [025 — Feed adapter interfeysi](025-feed-adapter-interfeysi.md)
- [ ] [026 — Demo feed provayderi (simulyasiya)](026-demo-feed-provayderi.md)
- [ ] [027 — Feed normallaşdırma və DB-yə yazılma (upsert)](027-feed-normallasdirma-ve-upsert.md)
- [ ] [028 — Market tipləri və outcome qaydaları](028-market-tipleri-ve-outcome-qaydalari.md)
- [ ] [029 — Əmsal versiyası və aktuallıq (15 saniyə)](029-emsal-aktualligi.md)
- [ ] [030 — `GET /events`: N+1 problemi](030-events-n-plus-1-helli.md)
- [ ] [031 — Cursor (keyset) pagination](031-cursor-pagination.md)
- [ ] [032 — Lentin sıralama qaydası](032-lent-siralama-qaydasi.md)
- [ ] [033 — `GET /events/{id}`](033-get-event-detal.md)
- [ ] [034 — Matç statistikası ("Центр матча")](034-mac-statistikasi.md)
- [ ] [035 — Redaksiya qeydi (editorial note)](035-redaksiya-qeydi.md)
- [ ] [036 — Idempotency-Key mexanizmi](036-idempotency-key-mexanizmi.md)
- [ ] [037 — Seçilmişlər: `PUT/DELETE /favorites/{event_id}`](037-secilmisler-put-delete.md)
- [ ] [038 — Feed əlçatmazlığı (503 FEED_UNAVAILABLE)](038-feed-elcatmazligi-503.md)

## Faza 3 — Real vaxt infrastrukturu → 37%

- [ ] [039 — WebSocket gateway](039-websocket-gateway.md)
- [ ] [040 — `POST /ws-ticket`: WebSocket autentifikasiyası](040-ws-ticket.md)
- [ ] [041 — Kanallar və abunəlik hüquqları](041-kanallar-ve-subscribe-huquqlari.md)
- [ ] [042 — Hadisə envelope-u, sequence, event_id](042-ws-envelope-sequence.md)
- [ ] [043 — Heartbeat və bağlantının həyat dövrü](043-heartbeat-ve-baglanti-heyat-dovru.md)
- [ ] [044 — Redis pub/sub: bir neçə server instansiyası](044-redis-pubsub-cox-instansiya.md)
- [ ] [045 — Outbox pattern](045-outbox-pattern.md)
- [ ] [046 — Presence: otaqdakı aktiv iştirakçılar](046-presence-aktiv-istirakcilar.md)
- [ ] [047 — `event.updated` və `odds.updated` yayımı](047-event-ve-odds-yayimi.md)
- [ ] [048 — Snapshot və resync](048-snapshot-ve-resync.md)
- [ ] [049 — Fon tapşırıqları (scheduler və queue)](049-fon-tapsiriqlari.md)

## Faza 4 — İcma (Комьюнити) → 53%

- [ ] [050 — Room cədvəli və otaqların yaradılması](050-room-cedveli.md)
- [ ] [051 — Message cədvəli və server sequence-i](051-message-cedveli-ve-sequence.md)
- [ ] [052 — Mesaj tarixçəsi: `GET /rooms/{id}/messages`](052-mesaj-tarixcesi-get.md)
- [ ] [053 — Mesaj göndərmə: `POST /rooms/{id}/messages`](053-mesaj-gonderme-post.md)
- [ ] [054 — Mesaj göndərmə rate limit](054-mesaj-rate-limit.md)
- [ ] [055 — Mesajın real vaxt yayımı](055-mesajin-real-vaxt-yayimi.md)
- [ ] [056 — Reconnect və buraxılmış mesajlar](056-reconnect-ve-buraxilmis-mesajlar.md)
- [ ] [057 — Otağın read_only olması](057-otagin-read-only-olmasi.md)
- [ ] [058 — Çat siyahısı ("Чаты матчей")](058-cat-siyahisi.md)
- [ ] [059 — Mesaj like (♡)](059-mesaj-like.md)
- [ ] [060 — Şəxsi gizlətmə ("Скрыть" / "Вернуть")](060-sexsi-gizletme.md)
- [ ] [061 — Poll cədvəli ("Кто победит?")](061-poll-cedveli.md)
- [ ] [062 — Səsvermə: `PUT /polls/{id}/vote`](062-sesverme.md)
- [ ] [063 — Faizlərin hesablanması (ən böyük qalıq üsulu)](063-faiz-hesabi-en-boyuk-qaliq.md)
- [ ] [064 — Poll-un bağlanması](064-poll-baglanmasi.md)
- [ ] [065 — `poll.updated`: alıcıya görə fərdiləşdirmə](065-poll-updated-ferdilesdirme.md)
- [ ] [066 — Şikayətlər: `POST /messages/{id}/reports`](066-sikayetler.md)
- [ ] [067 — Moderasiya: mesajın gizlədilməsi](067-moderasiya-gizletme.md)
- [ ] [068 — Moderasiya: göndərmənin müvəqqəti qadağası (mute)](068-moderasiya-mute.md)
- [ ] [069 — Moderasiya jurnalı və şikayət siyahısı](069-moderasiya-jurnali-ve-siyahi.md)
- [ ] [070 — Demo bot mesajları](070-demo-bot-mesajlari.md)
- [ ] [071 — Hekayələr (Stories)](071-hekayeler-stories.md)

## Faza 5 — Quiz Battle (demo bot) → 62%

- [ ] [072 — Sual bankı və versiyalama](072-sual-banki.md)
- [ ] [073 — Battle vəziyyət maşını (state machine)](073-battle-veziyyet-masini.md)
- [ ] [074 — `POST /battles`: duelin başladılması](074-post-battles.md)
- [ ] [075 — `GET /battles/{id}`: snapshot və bərpa](075-get-battle-snapshot.md)
- [ ] [076 — Cavab qəbulu: `POST /battles/{id}/answers`](076-cavab-qebulu.md)
- [ ] [077 — Növbəti sual: `POST /battles/{id}/next`](077-novbeti-sual.md)
- [ ] [078 — Sual vaxtı və deadline emalı](078-deadline-emali.md)
- [ ] [079 — Battle-ın tamamlanması və nəticəsi](079-battle-neticesi.md)
- [ ] [080 — Gündəlik XP limiti (tenant timezone)](080-gundelik-xp-limiti.md)
- [ ] [081 — Abandoned duel və bağlantı itkisi](081-abandoned-duel.md)
- [ ] [082 — Battle WebSocket hadisələri](082-battle-ws-hadiseleri.md)

## Faza 6 — XP, coin, tapşırıqlar → 71%

- [ ] [083 — XpLedger: XP jurnalı](083-xp-ledger.md)
- [ ] [084 — Balans cache və uzlaşdırma](084-balans-cache-ve-uzlasdirma.md)
- [ ] [085 — Battle XP mükafatı](085-battle-xp-mukafati.md)
- [ ] [086 — Coin ledger (◈)](086-coin-ledger.md)
- [ ] [087 — Başlanğıc coin bonusu (300 ◈)](087-baslangic-coin-bonusu.md)
- [ ] [088 — Battle coin mükafatı (+20 ◈)](088-battle-coin-mukafati.md)
- [ ] [089 — Challenge tərifləri ("İsinmə")](089-challenge-terifleri.md)
- [ ] [090 — Challenge irəliləyişi](090-challenge-ireliyisi.md)
- [ ] [091 — Tapşırıq hadisələrinin bağlanması](091-tapsiriq-hadiselerinin-baglanmasi.md)
- [ ] [092 — Mükafatın alınması: `POST /challenges/{id}/claim`](092-claim.md)
- [ ] [093 — `challenge.updated` və `xp.updated` real vaxt hadisələri](093-challenge-ve-xp-ws.md)
- [ ] [094 — Fan səviyyəsi](094-fan-seviyyesi.md)
- [ ] [095 — XP tarixçəsi və profil sayğacları](095-xp-tarixcesi-ve-profil-statistikasi.md)

## Faza 7 — Digər oyunlar (Найди пару, Прогноз матча) → 76%

- [ ] [096 — "Найди пару": server tərəfi lazımdırmı?](096-find-pair-qerari.md)
- [ ] [097 — Proqnoz (prediction) cədvəli](097-prediction-cedveli.md)
- [ ] [098 — Proqnoz vermə: `POST /predictions`](098-proqnoz-verme.md)
- [ ] [099 — Proqnoz hesablaşması (settlement)](099-proqnoz-hesablasmasi.md)
- [ ] [100 — Proqnoz statistikası və ROI](100-roi-statistikasi.md)
- [ ] [101 — Proqnoz tarixçəsi](101-proqnoz-tarixcesi.md)

## Faza 8 — Мой фан və mağaza → 80%

- [ ] [102 — Mağaza kataloqu](102-magaza-kataloqu.md)
- [ ] [103 — İnventar (qarderob)](103-inventar.md)
- [ ] [104 — Əşya alışı: `POST /shop/items/{id}/purchase`](104-alis.md)
- [ ] [105 — Əşyanın geyinilməsi (slotlar)](105-geyinme.md)
- [ ] [106 — Persona (avatar) API](106-persona-api.md)

## Faza 9 — Kupon və handoff → 86%

- [ ] [107 — Kupon (ekspres) modeli](107-kupon-modeli.md)
- [ ] [108 — Kupon API](108-kupon-api.md)
- [ ] [109 — `POST /handoffs`: bukmekerə keçid](109-post-handoffs.md)
- [ ] [110 — Handoff yoxlamaları](110-handoff-yoxlamalari.md)
- [ ] [111 — `ODDS_CHANGED` və `OUTCOME_UNAVAILABLE` axını](111-odds-changed-outcome-unavailable.md)
- [ ] [112 — Tərəfdaş endpoint-i: `POST /partner/v1/handoffs/resolve`](112-partner-resolve-endpoint.md)
- [ ] [113 — Tərəfdaş webhook-u](113-partner-webhook.md)
- [ ] [114 — Bridge kontraktının sənədi](114-bridge-kontrakti.md)

## Faza 10 — Admin → 89%

- [ ] [115 — Admin: tenant konfiqurasiyası](115-admin-tenant-konfiqurasiyasi.md)
- [ ] [116 — Admin: sual bankı](116-admin-sual-banki.md)
- [ ] [117 — Admin: redaksiya qeydləri, hekayələr, mağaza](117-admin-redaksiya-hekayeler-magaza.md)
- [ ] [118 — Demo sıfırlama ("Сбросить демо")](118-demo-sifirlama.md)

## Faza 11 — Analitika → 90%

- [ ] [119 — Analitika hadisələri](119-analitika-hadiseleri.md)
- [ ] [120 — Server tərəfli hadisələr və funnel](120-server-hadiseleri-ve-funnel.md)

## Faza 12 — Production hazırlığı → 96%

- [ ] [121 — Təhlükəsizlik: CORS, CSP, başlıqlar, global rate limit](121-tehlukesizlik.md)
- [ ] [122 — OpenAPI spesifikasiyası](122-openapi.md)
- [ ] [123 — Kritik ssenari testləri (qəbul meyarları)](123-kritik-ssenari-testleri.md)
- [ ] [124 — Yük testi](124-yuk-testi.md)
- [ ] [125 — Monitorinq və alertlər](125-monitorinq-ve-alertler.md)
- [ ] [126 — Məlumatların saxlanma müddəti və silinməsi](126-retention-ve-silinme.md)
- [ ] [127 — Docker image və CI](127-docker-image-ve-ci.md)
- [ ] [128 — Mühitlər, backup və buraxılış prosesi](128-muhitler-backup-buraxilis.md)

## Faza 13 — 2-ci mərhələ: real duel və final qəbul → 100%

- [ ] [129 — Real duel: matchmaking növbəsi](129-matchmaking-novbesi.md)
- [ ] [130 — Real duel: hazırlıq təsdiqi (ready)](130-ready-tesdiqi.md)
- [ ] [131 — Real duel: sinxron suallar](131-sinxron-suallar.md)
- [ ] [132 — Real duel: nəticə və XP](132-real-duel-neticesi.md)
- [ ] [133 — Final qəbul: backend 100%](133-final-qebul.md)
