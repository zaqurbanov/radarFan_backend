# 006 — Docker Compose ilə lokal mühit

**Faza:** 0 · **Asılılıq:** 001 · **Status:** [ ]

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
- [ ] Təmiz kompüterdə `docker compose up -d` + `npm run db:migrate` + `npm run dev` ilə server işləyir.
- [ ] Postgres və Redis versiyaları sabitdir (`latest` deyil).
