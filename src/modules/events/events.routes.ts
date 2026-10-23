import { limitHelper } from "@/common/helper/limit.helper.js";
import { jwt_preHandler } from "@/common/jwt/preHandler.js";
import { successResponse } from "@/common/responses/success.js";
import { db } from "@/db/index.js";
import { events, favorites, markets, outcomes, sportEnum } from "@/db/schema.js";
import { and, asc, eq, inArray, sql } from "drizzle-orm";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import {z} from "zod"


export async function eventsRoutes (rawApp:FastifyInstance){
const app = rawApp.withTypeProvider<ZodTypeProvider>()
  jwt_preHandler(app);

  app.get('/events',{
    schema:{
      querystring:z.object({
        sport:z.enum(sportEnum.enumValues).optional(),
        favorites:z.enum(['true','false']).optional(),
        limit:z.coerce.number().min(1).max(50).int().transform(String).optional(),
      })
    }
  },async (req)=>{
      const user =  req.user as{user_id:string,tenant_id:string}

        const {query} = req
        const limit = limitHelper(query.limit as string || '20')
//finds favorites matches for selected user

        const userFavs = await db.select({
          eventId:favorites.eventId,
        }).from(favorites)
        .where(
          and(
            eq(favorites.tenantId,user.tenant_id),
            eq(favorites.userId,user.user_id)
          )
        )
        const favEventIds = new Set(userFavs.map(f=>f.eventId))
        // Əgər "Seçilmişlər" filtri aktivdirsə və seçilmiş matç yoxdursa, boş siyahı qaytar
    if (query.favorites === "true" && favEventIds.size === 0) {
      const data ={items: [], next_cursor: null, server_time: new Date().toISOString()}
      return successResponse(data,req);
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


    const eventList  =  await db
    .select()
    .from(events)
    .where(and(...conditions))
    .orderBy(
      sql`CASE WHEN ${events.status} = 'live' THEN 0 ELSE 1 END`,
        asc(events.startAt)
    )
    .limit(limit)


    // Hər matçın market və əmsallarını (outcomes) yükləyirik
    const items = await Promise.all(
      eventList.map(async (ev) => {
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
      })
    );
const data = { items,
        next_cursor: null,
        server_time: new Date().toISOString(),}
        return successResponse(data,req);
  })
}