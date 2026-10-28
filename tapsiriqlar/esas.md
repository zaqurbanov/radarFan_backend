# RADAR.FAN / BetPulse — Backend tapşırıqları

Mənbələr: `RADAR-FAN-technical-spec-AZ.docx` + sayt (əsas versiya): https://betpulse-nihal-app.milanodiavolo.chatgpt.site/

Qayda: tapşırıqları **sıra ilə**, bir-bir et. Hər birini bitirəndə mentora göstər, review-dan sonra `[x]` qoy.
Faiz: həmin faza bitəndə backend-in təxminən neçə faizi hazırdır.

Çətin sözlər üçün: [luget.md](luget.md)

İşarələr: `[x]` bitib · `[~]` işdədir · `[ ]` başlanmayıb

## Faza 0 — Təmiz təməl → 9%

- [x] [001 — Env validasiyası və secret-lər](001-env-validasiyasi-ve-secretler.md)
- [x] [002 — `server.ts`: düzgün start və graceful shutdown](002-server-start-ve-shutdown.md)
- [x] [003 — Lazımsız fayllar və importların təmizlənməsi](003-lazimsiz-fayllar-ve-importlar.md)
- [x] [004 — `.env` və git təhlükəsizliyi](004-env-ve-git-tehlukesizliyi.md)
- [x] [005 — Schema səliqəsi: adlar, `updated_at`, dairəvi import](005-schema-seliqesi.md)
- [x] [006 — Docker Compose ilə lokal mühit](006-docker-compose-lokal-muhit.md)
- [x] [007 — Migration və seed iş axını](007-migration-ve-seed-is-axini.md)
- [x] [008 — Bütün cavablar eyni formada](008-vahid-cavab-formati.md)
- [x] [009 — Xəta kodları sistemi](009-xeta-kodlari-sistemi.md)
- [x] [010 — Gələn məlumatın yoxlanması (validasiya)](010-input-validasiyasi.md)
- [x] [011 — Loglar: səliqəli və təhlükəsiz](011-request-id-logger-redaction.md)
- [ ] [012 — Avtomatik testlər üçün hazırlıq](012-test-infrastrukturu.md)

## Faza 1 — Auth, tenant, istifadəçi → 18%

- [ ] [013 — İki token növünü bir-birindən ayır](013-launch-ve-access-token-ayrilmasi.md)
- [ ] [014 — Hər bukmekerin öz açarı](014-tenant-uzre-launch-token-dogrulamasi.md)
- [ ] [015 — Demo rejim](015-demo-rejim-ve-demo-launch-token.md)
- [ ] [016 — Bütün route-lar üçün bir auth mexanizmi](016-vahid-auth-plugin.md)
- [ ] [017 — Rollar: user, moderator, admin](017-rol-esasli-icaze.md)
- [ ] [018 — İstifadəçi statusu: aktiv, susdurulmuş, bloklanmış](018-istifadeci-statusu.md)
- [ ] [019 — Sessiyanın yenilənməsi](019-sessiya-yenilenmesi.md)
- [ ] [020 — Çıxış (logout)](020-logout-ve-sessiya-deyisikliyi.md)
- [ ] [021 — Bukmekerin ayarları (TenantConfig)](021-tenant-config-strukturu.md)
- [ ] [022 — Bukmekerin verdiyi icazələr (entitlements)](022-entitlement-flags.md)
- [ ] [023 — `GET /me`: profilin tam cavabı](023-get-me-tam.md)
- [ ] [024 — Adı dəyişmək: `PATCH /me`](024-patch-me-ad-deyisme.md)

## Faza 2 — Feed və Nəbz (Пульс) → 29%

- [ ] [025 — Matç məlumatı üçün "adapter"](025-feed-adapter-interfeysi.md)
- [ ] [026 — Demo matçlar (canlı simulyasiya)](026-demo-feed-provayderi.md)
- [ ] [027 — Matç məlumatını bazaya düzgün yazmaq](027-feed-normallasdirma-ve-upsert.md)
- [ ] [028 — Bazar tipləri və qaydaları](028-market-tipleri-ve-outcome-qaydalari.md)
- [ ] [029 — Köhnəlmiş əmsallar (15 saniyə qaydası)](029-emsal-aktualligi.md)
- [ ] [030 — `/events`: çoxlu sorğu problemi (N+1)](030-events-n-plus-1-helli.md)
- [ ] [031 — Lent səhifələməsi (cursor)](031-cursor-pagination.md)
- [ ] [032 — Lentin sıralaması](032-lent-siralama-qaydasi.md)
- [ ] [033 — Bir matçın səhifəsi: `GET /events/{id}`](033-get-event-detal.md)
- [ ] [034 — Matç statistikası](034-mac-statistikasi.md)
- [ ] [035 — Redaksiya qeydi](035-redaksiya-qeydi.md)
- [ ] [036 — Təkrar sorğulardan qorunma (Idempotency-Key)](036-idempotency-key-mexanizmi.md)
- [ ] [037 — Seçilmişlər: əlavə et və sil](037-secilmisler-put-delete.md)
- [ ] [038 — Matç mənbəyi dayananda](038-feed-elcatmazligi-503.md)

## Faza 3 — Real vaxt infrastrukturu → 37%

- [ ] [039 — WebSocket server](039-websocket-gateway.md)
- [ ] [040 — WebSocket üçün qısa bilet](040-ws-ticket.md)
- [ ] [041 — Kanallar və kim hansına qoşula bilər](041-kanallar-ve-subscribe-huquqlari.md)
- [ ] [042 — Real vaxt mesajlarının forması](042-ws-envelope-sequence.md)
- [ ] [043 — Ölü bağlantıları təmizləmək](043-heartbeat-ve-baglanti-heyat-dovru.md)
- [ ] [044 — Bir neçə server üçün Redis pub/sub](044-redis-pubsub-cox-instansiya.md)
- [ ] [045 — Outbox: "göndəriləcəklər qutusu"](045-outbox-pattern.md)
- [ ] [046 — Onlayn sayğacı (otaqda neçə nəfər var)](046-presence-aktiv-istirakcilar.md)
- [ ] [047 — Hesab və əmsal yeniləmələrinin yayımı](047-event-ve-odds-yayimi.md)
- [ ] [048 — Bağlantı qopanda bərpa](048-snapshot-ve-resync.md)
- [ ] [049 — Fon tapşırıqları](049-fon-tapsiriqlari.md)

## Faza 4 — İcma (Комьюнити) → 53%

- [ ] [050 — Çat otaqları](050-room-cedveli.md)
- [ ] [051 — Mesajlar cədvəli və sıra nömrəsi](051-message-cedveli-ve-sequence.md)
- [ ] [052 — Mesajları oxumaq: `GET /rooms/{id}/messages`](052-mesaj-tarixcesi-get.md)
- [ ] [053 — Mesaj göndərmək: `POST /rooms/{id}/messages`](053-mesaj-gonderme-post.md)
- [ ] [054 — Spam-a qarşı sürət limiti](054-mesaj-rate-limit.md)
- [ ] [055 — Yeni mesaj hamıya çatsın](055-mesajin-real-vaxt-yayimi.md)
- [ ] [056 — Yenidən qoşulanda buraxılmış mesajlar](056-reconnect-ve-buraxilmis-mesajlar.md)
- [ ] [057 — Bitmiş matçın otağı bağlanır](057-otagin-read-only-olmasi.md)
- [ ] [058 — Çatlar siyahısı](058-cat-siyahisi.md)
- [ ] [059 — Mesajı bəyənmək (♡)](059-mesaj-like.md)
- [ ] [060 — "Скрыть / Вернуть": yalnız özün üçün gizlətmək](060-sexsi-gizletme.md)
- [ ] [061 — Sorğu: "Кто победит?"](061-poll-cedveli.md)
- [ ] [062 — Səs vermək](062-sesverme.md)
- [ ] [063 — Faizlərin cəmi həmişə 100 olsun](063-faiz-hesabi-en-boyuk-qaliq.md)
- [ ] [064 — Sorğunun bağlanması](064-poll-baglanmasi.md)
- [ ] [065 — Səs verməyənlər real vaxtda da nəticəni görməsin](065-poll-updated-ferdilesdirme.md)
- [ ] [066 — Şikayətlər](066-sikayetler.md)
- [ ] [067 — Moderator mesajı hamı üçün gizlədir](067-moderasiya-gizletme.md)
- [ ] [068 — Moderator istifadəçini susdurur](068-moderasiya-mute.md)
- [ ] [069 — Moderator paneli: şikayətlər və jurnal](069-moderasiya-jurnali-ve-siyahi.md)
- [ ] [070 — Demo bot mesajları](070-demo-bot-mesajlari.md)
- [ ] [071 — Hekayələr (Stories)](071-hekayeler-stories.md)

## Faza 5 — Quiz Battle (demo bot) → 62%

- [ ] [072 — Viktorina sualları](072-sual-banki.md)
- [ ] [073 — Duelin vəziyyətləri (kod yazmazdan əvvəl plan)](073-battle-veziyyet-masini.md)
- [ ] [074 — Duel başlatmaq: `POST /battles`](074-post-battles.md)
- [ ] [075 — Duelin vəziyyəti: `GET /battles/{id}`](075-get-battle-snapshot.md)
- [ ] [076 — Cavab vermək: `POST /battles/{id}/answers`](076-cavab-qebulu.md)
- [ ] [077 — Növbəti sual: `POST /battles/{id}/next`](077-novbeti-sual.md)
- [ ] [078 — Sual vaxtı](078-deadline-emali.md)
- [ ] [079 — Duelin sonu və nəticə](079-battle-neticesi.md)
- [ ] [080 — Gündə yalnız 3 duel XP verir](080-gundelik-xp-limiti.md)
- [ ] [081 — Tərk edilmiş duel](081-abandoned-duel.md)
- [ ] [082 — Duel üçün real vaxt bildirişləri](082-battle-ws-hadiseleri.md)

## Faza 6 — XP, coin, tapşırıqlar → 71%

- [ ] [083 — XP jurnalı (ledger)](083-xp-ledger.md)
- [ ] [084 — Balans: tez göstər, amma yoxla](084-balans-cache-ve-uzlasdirma.md)
- [ ] [085 — Duel üçün XP](085-battle-xp-mukafati.md)
- [ ] [086 — Coin jurnalı (◈)](086-coin-ledger.md)
- [ ] [087 — Başlanğıc coin (300 ◈)](087-baslangic-coin-bonusu.md)
- [ ] [088 — Duel üçün coin (+20 ◈)](088-battle-coin-mukafati.md)
- [ ] [089 — Tapşırıqlar: "İsinmə"](089-challenge-terifleri.md)
- [ ] [090 — Tapşırıq irəliləyişi](090-challenge-ireliyisi.md)
- [ ] [091 — Tapşırıqların avtomatik tamamlanması](091-tapsiriq-hadiselerinin-baglanmasi.md)
- [ ] [092 — Mükafatı almaq: `POST /challenges/{id}/claim`](092-claim.md)
- [ ] [093 — XP və tapşırıq bildirişləri](093-challenge-ve-xp-ws.md)
- [ ] [094 — Fan səviyyəsi](094-fan-seviyyesi.md)
- [ ] [095 — XP tarixçəsi və profil sayğacları](095-xp-tarixcesi-ve-profil-statistikasi.md)

## Faza 7 — Digər oyunlar (Найди пару, Прогноз матча) → 76%

- [ ] [096 — "Найди пару": backend lazımdırmı?](096-find-pair-qerari.md)
- [ ] [097 — Proqnozlar cədvəli](097-prediction-cedveli.md)
- [ ] [098 — Proqnoz vermək: `POST /predictions`](098-proqnoz-verme.md)
- [ ] [099 — Proqnozların hesablanması](099-proqnoz-hesablasmasi.md)
- [ ] [100 — Proqnoz statistikası və ROI](100-roi-statistikasi.md)
- [ ] [101 — Proqnoz tarixçəsi](101-proqnoz-tarixcesi.md)

## Faza 8 — Мой фан və mağaza → 80%

- [ ] [102 — Mağaza kataloqu](102-magaza-kataloqu.md)
- [ ] [103 — Qarderob (alınmış əşyalar)](103-inventar.md)
- [ ] [104 — Əşya almaq](104-alis.md)
- [ ] [105 — Əşyanı geyinmək](105-geyinme.md)
- [ ] [106 — "Мой фан" ekranı bir sorğu ilə](106-persona-api.md)

## Faza 9 — Kupon və handoff → 86%

- [ ] [107 — Kupon (bir neçə seçim)](107-kupon-modeli.md)
- [ ] [108 — Kupon endpoint-ləri](108-kupon-api.md)
- [ ] [109 — Bukmekerə keçid: `POST /handoffs`](109-post-handoffs.md)
- [ ] [110 — Bukmekerə keçiddən əvvəl yoxlamalar](110-handoff-yoxlamalari.md)
- [ ] [111 — Əmsal dəyişəndə nə olur](111-odds-changed-outcome-unavailable.md)
- [ ] [112 — Bukmekerin serveri üçün endpoint](112-partner-resolve-endpoint.md)
- [ ] [113 — Bukmekerdən gələn bildirişlər (webhook)](113-partner-webhook.md)
- [ ] [114 — Bridge müqaviləsini sənədləşdirmək](114-bridge-kontrakti.md)

## Faza 10 — Admin → 89%

- [ ] [115 — Admin: bukmekerin ayarları](115-admin-tenant-konfiqurasiyasi.md)
- [ ] [116 — Admin: viktorina sualları](116-admin-sual-banki.md)
- [ ] [117 — Admin: redaksiya qeydləri, hekayələr, mağaza](117-admin-redaksiya-hekayeler-magaza.md)
- [ ] [118 — "Сбросить демо"](118-demo-sifirlama.md)

## Faza 11 — Analitika → 90%

- [ ] [119 — Analitika: istifadəçi hərəkətlərini toplamaq](119-analitika-hadiseleri.md)
- [ ] [120 — Server tərəfli hadisələr və "huni" (funnel)](120-server-hadiseleri-ve-funnel.md)

## Faza 12 — Production hazırlığı → 96%

- [ ] [121 — Təhlükəsizlik yoxlaması](121-tehlukesizlik.md)
- [ ] [122 — API sənədi (OpenAPI / Swagger)](122-openapi.md)
- [ ] [123 — Ən vacib ssenarilərin testləri](123-kritik-ssenari-testleri.md)
- [ ] [124 — Yük testi](124-yuk-testi.md)
- [ ] [125 — Monitorinq və xəbərdarlıqlar](125-monitorinq-ve-alertler.md)
- [ ] [126 — Məlumat nə qədər saxlanır və necə silinir](126-retention-ve-silinme.md)
- [ ] [127 — Docker image və avtomatik yoxlama (CI)](127-docker-image-ve-ci.md)
- [ ] [128 — Mühitlər, ehtiyat nüsxə, buraxılış](128-muhitler-backup-buraxilis.md)

## Faza 13 — 2-ci mərhələ: real duel və final qəbul → 100%

- [ ] [129 — Real duel: rəqib axtarışı (növbə)](129-matchmaking-novbesi.md)
- [ ] [130 — Real duel: "hazıram" təsdiqi](130-ready-tesdiqi.md)
- [ ] [131 — Real duel: eyni sual, eyni anda](131-sinxron-suallar.md)
- [ ] [132 — Real duel: nəticə və XP](132-real-duel-neticesi.md)
- [ ] [133 — Final: backend hazırdır](133-final-qebul.md)
