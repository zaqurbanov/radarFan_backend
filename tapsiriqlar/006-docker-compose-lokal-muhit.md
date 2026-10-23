# 006 — Docker Compose ilə lokal mühit

**Faza:** 0 · **Asılılıq:** 001 · **Status:** [x] Həll olunub

## Məqsəd
Bir əmrlə (`docker compose up`) Postgres və Redis qalxsın. Hər kəs (və CI) eyni versiyalarla işləsin.

## Niyə
- Sənəd (bölmə 10): "Mühitlər: local demo, test tərəfdaşı ilə staging və production". Local demo təkrarlana bilən olmalıdır.
- Testlər (task 012) ayrıca, təmizlənə bilən DB tələb edir.

## Necə edəcəksən
1. `docker-compose.yml` yarat: `postgres` (versiyanı sabitlə, məs. 16) və `redis` (məs. 7).
2. Postgres üçün volume qoş ki, məlumat konteyner silinəndə itməsin.
3. Healthcheck əlavə et (`pg_isready`, `redis-cli ping`).
4. Test üçün ayrıca DB: ikinci servis və ya eyni Postgres-də ikinci baza (`radarfan_test`). Hansını seçirsən və niyə?
5. `.env.example`-də `DATABASE_URL` və `REDIS_URL`-i compose-a uyğun yaz.
6. Backend-in özünü hələ konteynerə qoyma (task 127). İndi yalnız asılılıqlar.

## Öyrən
- Docker Compose: `volumes`, `healthcheck`, `depends_on.condition`

## Qəbul meyarları
- [x] `docker compose up -d` + `npm run db:migrate` + `npm run dev` ilə server qalxır.
- [x] Postgres (`15-alpine`) və Redis (`7-alpine`) versiyaları sabitdir.

---

## Bağlanış qeydi: nə edildi
- `docker-compose.yml` **`backend/` qovluğundadır** (repo daxilində). `name: radarfan` yazılıb ki, volume adı (`radarfan_pgdata`) qovluq adından asılı olmasın.
- Portlar yalnız `127.0.0.1`-ə bağlıdır (`127.0.0.1:5432`, `127.0.0.1:6379`).
- Hər iki servisdə **healthcheck** var (`pg_isready`, `redis-cli ping`).
- `docker-compose.test.yml` (`name: radarfan-test`): yalnız `postgres_test` (port 5433, volume yoxdur, hər dəfə təmiz). Ayrıca test Redis **yoxdur**: testlər dev Redis-in 1 nömrəli bazasını istifadə edir.
- `.env.test`: test bazasına (`localhost:5433`) və `NODE_ENV=test`-ə yönəlib (repoda saxlanılır, yalnız lokal test dəyərləri).

## Bilməli olduğun məsələlər
- Compose layihə adını qovluqdan götürür. Faylı köçürəndə volume adı dəyişdi və baza boş qaldı (sonradan 007-də bilərəkdən sıfırlandı). Buna görə `name:` yazılıb.
- Redis bazaları ayrıdır, amma **pub/sub kanalları ortaqdır**. Task 044-dən sonra testlərdə yayımlanan mesaj dev serverinə də çata bilər.
- `docker compose down -v` bütün volume-ları silir. Test compose və dev compose **ayrı layihələrdir**, `--remove-orphans` bayrağına diqqət et.
- Production-da DB üçün heç bir port açma (task 128).
