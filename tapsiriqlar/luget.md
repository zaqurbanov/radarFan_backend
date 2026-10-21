# Lüğət: çətin sözlərin sadə izahı

Task fayllarında bu sözlər tez-tez çıxır. Birini başa düşmürsənsə, əvvəl buraya bax.

---

### Tenant
Bir **müştəri şirkət** (bukmeker). Məsələn, "BetPulse" bir tenant-dır. Eyni server bir neçə bukmekerə xidmət edir, amma onların məlumatları **heç vaxt qarışmamalıdır**. Ona görə demək olar ki, hər cədvəldə `tenant_id` sütunu var.

### Tenant izolyasiyası
A bukmekerinin istifadəçisi B bukmekerinin məlumatını **görə bilməməlidir**. Hər sorğuda `tenant_id`-ni yoxlamaq bunu təmin edir. `tenant_id` həmişə **token-dən** götürülür, istifadəçinin göndərdiyi body və ya query-dən yox.

### Race condition (yarış vəziyyəti)
İki sorğu **eyni anda** gəlir və hər ikisi "hələ heç nə yoxdur" görüb eyni işi edir. Nəticə: ikiqat XP, mənfi balans, dublikat mesaj.
Nümunə: balansın 80 coin-dir. İki tabdan eyni anda 80 coin-lik əşya alırsan. İkisi də "80 var" görür, ikisi də alır, balans −80 olur.

### Atomar əməliyyat
"Ya hamısı, ya heç nə" və ya "yoxla və dəyiş **bir addımda**". Arada başqa sorğu girə bilmir. Race condition-a qarşı əsas silahdır.

### Tranzaksiya (transaction)
Bir neçə DB əməliyyatını bir paketə yığmaq. Biri uğursuz olsa, **hamısı geri qaytarılır** (rollback).
Nümunə: XP ver + tapşırığı "alınıb" et. XP yazıldı, amma status yazılmadısa, XP də ləğv olunur.

### Idempotent / idempotentlik
Eyni sorğunu **bir dəfə** də göndərsən, **on dəfə** də göndərsən, nəticə **eynidir**.
Nümunə: "Seçilmişlərə əlavə et" düyməsini 5 dəfə bassan, matç seçilmişlərdə bir dəfə olur.
Mobil internetdə sorğular tez-tez təkrar gedir, buna görə vacibdir.

### Idempotency-Key
Frontend-in hər "vacib" sorğuya qoşduğu unikal ID (UUID). Server bu ID-ni yadda saxlayır. Eyni ID ikinci dəfə gəlsə, işi **təkrar etmir**, əvvəlki cavabı qaytarır.

### Migration
DB sxemindəki dəyişikliyin **SQL faylı**. Ardıcıl nömrələnir (`0000`, `0001`...). Hər mühitdə (lokal, staging, production) eyni qaydada işlədilir. Tətbiq olunmuş migration **heç vaxt dəyişdirilmir**, yenisi yazılır.

### Seed
Boş bazanı **demo/test məlumatı** ilə doldurmaq üçün skript (tenant, 3 matç, suallar...).

### Unique constraint
DB qaydası: "bu sütun(lar)da eyni dəyər iki dəfə ola bilməz". Kodda səhv olsa belə, DB dublikatı **özü** bloklayır. Son müdafiə xəttidir.

### Partial unique index
Yalnız **müəyyən şərtdə** işləyən unique qayda.
Nümunə: "bir istifadəçinin yalnız bir **aktiv** duel-i ola bilər" (bitmiş duel-lər sayılmır).

### Index
DB-də axtarışı sürətləndirən struktur. Kitabın sonundakı "mövzular göstəricisi" kimidir.

### N+1 problemi
Siyahı üçün 1 sorğu, sonra **hər element üçün** ayrıca 1 sorğu. 20 matç = 21+ sorğu. Həlli: hamısını 2–3 toplu sorğu ilə almaq.

### Cursor pagination
"Səhifə 2" əvəzinə "**bu elementdən sonrakıları** ver". Canlı siyahıda (sıra dəyişəndə) dublikat və buraxılma olmur.

### Ledger (jurnal)
Mühasibat kitabı kimi: hər XP/coin hərəkəti **ayrıca sətir** kimi yazılır və **heç vaxt silinmir**. Balans = sətirlərin cəmi. "Bu 50 XP haradan gəldi?" sualına həmişə cavab var.

### WebSocket (WS)
Server ilə brauzer arasında **açıq qalan** bağlantı. Server istədiyi vaxt məlumat **göndərə** bilir (yeni mesaj, yeni hesab), frontend soruşmadan.

### Kanal (channel)
WebSocket-də "mövzu otağı". Məsələn `room:123`: 123 nömrəli çat otağının hadisələri. Müştəri lazım olan kanallara **abunə olur**.

### Pub/Sub
"Yayımla / abunə ol". Server A mesajı Redis-ə **yayımlayır**, bütün serverlər onu **alır** və öz istifadəçilərinə çatdırır. Bir neçə server olanda lazımdır.

### Outbox
DB-də "göndəriləcəklər qutusu" cədvəli. Mesajı DB-yə yazanda **eyni tranzaksiyada** "bunu yayımla" qeydi də yazılır. Ayrı bir proses qutunu boşaldıb yayımlayır. Beləcə "DB-də var, amma heç kim görmədi" və ya "hamı gördü, amma DB-də yoxdur" halları olmur.

### Sequence
Ardıcıl nömrə (1, 2, 3...). Mesajlar və hadisələr bununla sıralanır. Nömrədə boşluq (5-dən sonra 7) = nəsə itib, bərpa et.

### Snapshot / resync
Bağlantı qopub qayıdanda vəziyyəti **tam yenidən yükləmək**.

### Presence
"Kim hazırda otaqdadır" məlumatı (onlayn sayğacı).

### Heartbeat
Müştərinin hər N saniyədə göndərdiyi "mən hələ buradayam" siqnalı.

### Stale (köhnəlmiş) əmsal
15 saniyədən çox yenilənməyən əmsal. Onunla bukmekerə keçid **qadağandır**, çünki qiymət artıq dəyişmiş ola bilər.

### Handoff
İstifadəçini seçdiyi əmsalla **bukmekerin öz kuponuna** göndərmək. Biz mərc qəbul etmirik, yalnız ötürürük.

### Bridge
Bizim mini tətbiq (WebView) ilə bukmekerin mobil tətbiqi arasında **mesajlaşma kanalı**.

### Entitlement
Bukmekerin istifadəçiyə verdiyi **icazələr** (yaş, ölkə, mərcdən özünü uzaqlaşdırma və s.). Məsələn `betting_handoff` yoxdursa, kupona keçid bağlıdır.

### Launch token / Access token
- **Launch token:** bukmekerin verdiyi, 60 saniyə yaşayan, **bir dəfəlik** "giriş bileti".
- **Access token:** bizim verdiyimiz, 15 dəqiqə yaşayan "sessiya açarı". Bütün sorğularda istifadə olunur.

### Nonce
Bir dəfə istifadə olunan təsadüfi kod. Eyni token ikinci dəfə istifadə olunmasın deyə yoxlanır.

### State machine (vəziyyət maşını)
Obyektin mümkün vəziyyətləri və aralarındakı **icazəli keçidlər** cədvəli. Məsələn duel: `active → completed` olar, `completed → active` olmaz.

### Background job (fon tapşırığı)
İstifadəçi sorğusundan **asılı olmadan** işləyən kod: "5 dəqiqə sonra duel-i bağla", "hər gecə köhnə məlumatı sil".

### Lazy evaluation (tənbəl yoxlama)
Vəziyyəti vaxtında dəyişmək əvəzinə, **oxuyanda** yoxlamaq. Məsələn: "deadline keçibmi?" sualını cavab gələndə soruşmaq.

### Throttle / coalesce
Çox tez-tez gələn yeniləmələri **seyrəltmək**. Məsələn, saniyədə 50 əmsal dəyişikliyi əvəzinə yarım saniyədə bir, yalnız sonuncunu göndərmək.

### Feature flag
Funksiyanı kodu dəyişmədən **açıb-söndürmək** üçün konfiqurasiya bayrağı (məs. `shop: true`).

### BFF endpoint
"Backend for frontend": bir ekranın lazım olan **hər şeyini bir sorğu ilə** qaytaran endpoint.

### p95
"Sorğuların 95%-i bu vaxtdan sürətlidir". Məsələn p95 = 500 ms → 100 sorğudan 95-i yarım saniyədən tez cavablanır.
