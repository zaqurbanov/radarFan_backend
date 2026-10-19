import { db } from "./index.js";
import { tenants, events, markets, outcomes } from "./schema.js";
import { eq } from "drizzle-orm";
async function seed() {
    console.log("🌱 Seed prosesi başladı...");
    // 1. Demo tenant-ı tap və ya yarat
    let [tenant] = await db
        .select()
        .from(tenants)
        .where(eq(tenants.slug, "demo-bet"));
    if (!tenant) {
        [tenant] = await db
            .insert(tenants)
            .values({
            slug: "demo-bet",
            timezone: "UTC",
            config: {
                name: "DemoBet",
                theme: "dark",
                enabled_sports: ["football", "basketball"],
            },
        })
            .returning();
    }
    // 2. Sənəddəki 3 matçı əlavə edək
    const sampleMatches = [
        {
            providerId: "prov_ev_1",
            sport: "football",
            league: "La Liga",
            teams: { home: "Real Madrid", away: "Barselona" },
            status: "live",
            score: { home: 2, away: 1 },
            period: "2H 68'",
            editorialNote: "El Clasico-da yüksək temp! Real Madrid üstünlüyü qoruyur.",
            startAt: new Date(Date.now() - 60 * 60 * 1000),
            market: {
                providerId: "prov_mk_1",
                type: "football_1x2",
                rules: "Əsas vaxt (90 dəqiqə)",
                outcomes: [
                    { providerId: "prov_out_1", key: "home", price: "1.45" },
                    { providerId: "prov_out_2", key: "draw", price: "4.20" },
                    { providerId: "prov_out_3", key: "away", price: "6.50" },
                ],
            },
        },
        {
            providerId: "prov_ev_2",
            sport: "basketball",
            league: "NBA",
            teams: { home: "Boston", away: "Lakers" },
            status: "scheduled",
            score: null,
            period: null,
            editorialNote: "Əzəli rəqiblərin qarşılaşması bu gecə başlayır.",
            startAt: new Date(Date.now() + 3 * 60 * 60 * 1000),
            market: {
                providerId: "prov_mk_2",
                type: "basketball_moneyline",
                rules: "Əlavə vaxt (OT) daxil olmaqla",
                outcomes: [
                    { providerId: "prov_out_4", key: "home", price: "1.72" },
                    { providerId: "prov_out_5", key: "away", price: "2.15" },
                ],
            },
        },
        {
            providerId: "prov_ev_3",
            sport: "football",
            league: "Premier League",
            teams: { home: "Arsenal", away: "Liverpool" },
            status: "scheduled",
            score: null,
            period: null,
            editorialNote: "Çempionluq yarışında həlledici matç.",
            startAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
            market: {
                providerId: "prov_mk_3",
                type: "football_1x2",
                rules: "Əsas vaxt (90 dəqiqə)",
                outcomes: [
                    { providerId: "prov_out_6", key: "home", price: "2.10" },
                    { providerId: "prov_out_7", key: "draw", price: "3.40" },
                    { providerId: "prov_out_8", key: "away", price: "3.30" },
                ],
            },
        },
    ];
    for (const item of sampleMatches) {
        const [insertedEvent] = await db
            .insert(events)
            .values({
            tenantId: tenant.id,
            providerId: item.providerId,
            sport: item.sport,
            league: item.league,
            teams: item.teams,
            status: item.status,
            score: item.score,
            period: item.period,
            editorialNote: item.editorialNote,
            startAt: item.startAt,
        })
            .onConflictDoNothing()
            .returning();
        if (insertedEvent) {
            const [insertedMarket] = await db
                .insert(markets)
                .values({
                eventId: insertedEvent.id,
                providerId: item.market.providerId,
                type: item.market.type,
                rules: item.market.rules,
            })
                .returning();
            for (const out of item.market.outcomes) {
                await db.insert(outcomes).values({
                    marketId: insertedMarket.id,
                    providerId: out.providerId,
                    key: out.key,
                    price: out.price,
                });
            }
        }
    }
    console.log("✅ 3 test matçı, bazarlar və əmsallar uğurla əlavə edildi!");
    process.exit(0);
}
seed().catch((err) => {
    console.error("❌ Seed xətası:", err);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map