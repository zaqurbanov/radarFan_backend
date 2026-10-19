# 064 — Poll-un bağlanması

**Faza:** 4 · **Asılılıq:** 062, 049 · **Status:** [ ]

## Məqsəd
Poll vaxtında bağlansın və bağlandıqdan sonra səs qəbul etməsin.

## Niyə
Sənəd (bölmə 4): "Poll hadisə bitdikdə, ləğv edildikdə və ya closes_at vaxtında bağlanır."

## Necə edəcəksən
1. Üç tetikləyici:
   - event `finished` (feed upsert, 027),
   - event `cancelled`,
   - `closes_at` vaxtı (gecikmiş job, 049).
   Hər üçü eyni `closePoll(pollId, reason)` funksiyasını çağırsın. İdempotent: artıq bağlıdırsa, heç nə.
2. Səs yoxlaması (062) `status` və `closes_at`-ı **ikisini də** yoxlayır. Job gecikə bilər.
3. Bağlananda `poll.updated` (status: closed). Hamıya nəticələr göstərilsinmi, səs verməyənlərə də? Məntiqli: bəli, bağlanandan sonra hamıya. Qərar ver.
4. Matç `postponed` → poll açıq qalır? `closes_at` yenilənir?

## Qəbul meyarları
- [ ] Event finished olanda poll bağlanır və hadisə yayılır.
- [ ] `closes_at`-dan sonra səs → 409, hətta job hələ işləməyibsə də.
