import { limitHelper } from "@/common/helper/limit.helper.js";
import { jwt_preHandler } from "@/common/jwt/preHandler.js";
import { db } from "@/db/index.js";
import { events, favorites, markets, outcomes } from "@/db/schema.js";
import { and, asc, eq, inArray, sql } from "drizzle-orm";
export async function eventsRoutes(app) {
    jwt_preHandler(app);
    app.get('/events', async (req) => {
        const user = req.user;
        const query = req.query;
        const limit = limitHelper(query.limit || '20');
        //finds favorites matches for selected user
        const userFavs = await db.select({
            eventId: favorites.eventId,
        }).from(favorites)
            .where(and(eq(favorites.tenantId, user.tenant_id), eq(favorites.userId, user.user_id)));
        const favEventIds = new Set(userFavs.map(f => f.eventId));
        // Əgər "Seçilmişlər" filtri aktivdirsə və seçilmiş matç yoxdursa, boş siyahı qaytar
        if (query.favorites === "true" && favEventIds.size === 0) {
            return {
                data: { items: [], next_cursor: null, server_time: new Date().toISOString() },
                request_id: req.id,
            };
        }
        // all events for spesific tenant and user 
        const conditions = [eq(events.tenantId, user.tenant_id)];
        //  if user select sport 
        if (query.sport) {
            conditions.push(eq(events.sport, query.sport));
        }
        //  is user select favorite
        if (query.favorites === "true") {
            conditions.push(inArray(events.id, Array.from(favEventIds)));
        }
        const eventList = await db
            .select()
            .from(events)
            .where(and(...conditions))
            .orderBy(sql `CASE WHEN ${events.status} = 'live' THEN 0 ELSE 1 END`, asc(events.startAt))
            .limit(limit);
        // Hər matçın market və əmsallarını (outcomes) yükləyirik
        const items = await Promise.all(eventList.map(async (ev) => {
            const [market] = await db
                .select()
                .from(markets)
                .where(eq(markets.eventId, ev.id));
            const marketOutcomes = market
                ? await db.select().from(outcomes).where(eq(outcomes.marketId, market.id))
                : [];
            return {
                ...ev,
                is_favorite: favEventIds.has(ev.id),
                active_participants: 0, // Mərhələ 3-də Redis-dən gələcək
                market: market
                    ? {
                        id: market.id,
                        provider_market_id: market.providerId,
                        type: market.type,
                        rules: market.rules,
                        status: market.status,
                        odds_version: market.version,
                        outcomes: marketOutcomes.map((o) => ({
                            id: o.id,
                            provider_outcome_id: o.providerId,
                            key: o.key,
                            price: o.price,
                            status: o.status,
                            updated_at: o.updatedAt,
                        })),
                    }
                    : null,
            };
        }));
        return {
            data: {
                items,
                next_cursor: null,
                server_time: new Date().toISOString(),
            },
            request_id: req.id,
        };
    });
}
//# sourceMappingURL=events.routes.js.map