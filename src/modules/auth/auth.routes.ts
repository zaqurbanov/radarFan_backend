import type { FastifyInstance } from "fastify";

import  {tenants, users} from "@/db/schema.js" 
import { db } from "@/db/index.js";
import { and, eq } from "drizzle-orm";
import { AccessDenied, SessionExpiredError, UnauthorizedError } from "@/common/error/appErrors.js";
import { redis } from "@/config/redis.js";
import { env } from "@/config/env.js";
export async function authRoutes(app:FastifyInstance){

  // demo ucun yaradilan token
  app.post('/demo-launch-token',async(req,res)=>{
    
    let [tenant] = await db.select().from(tenants).where(eq(tenants.slug,'demo-bet'))
    if(!tenant){
      [tenant] = await db.insert(tenants).values({
        slug:'demo-bet',
       config: { name: 'DemoBet', theme: 'dark', enabled_sports: ['football', 'basketball'] },
        timezone:'UTC',
      }).returning()
    }
    // Sənədin tələbi: 60 saniyəlik birdəfəlik launch token
    const launchToken = app.jwt.sign({
      issuer: 'demo-bet',
      audience: 'RADAR.FAN',
      tenant_id: tenant!.id,
      external_user_id: 'ext_nihal_01',
      nickname: 'Nihal',
      nonce: crypto.randomUUID(),
      locale: 'az',
    }, { expiresIn: '60s' });

    return { data: { launch_token: launchToken }, req_id: req.id };
    
  })


  app.post('/auth/exchange',async(req,res)=>{
    const {launch_token} = req.body as {launch_token:string}

    if(!launch_token) throw new UnauthorizedError()

   const payload = app.jwt.verify<{
        tenant_id: string;
        external_user_id: string;
        nickname?: string;
        nonce: string;
      }>(launch_token);

      const nonceKey = `nonce:${payload.nonce}`;
      
     const result= await redis.set(nonceKey,'1','EX',60,'NX')
     if(!result) throw new SessionExpiredError()

      const [tenant] = await db.select().from(tenants).where(eq(tenants.id,payload.tenant_id))
      if (!tenant)  throw new AccessDenied()

      let [user] = await db.select().from(users).where(and(
        eq(users.externalUserId,payload.external_user_id),
        eq(users.tenantId,payload.tenant_id),
      ))
      if (!user) {
        [user] = await db.insert(users).values({
          tenantId: tenant.id,
          externalUserId: payload.external_user_id,
          nickname: payload.nickname || 'Fanat',
        }).returning();
      }

      // 15 dəqiqəlik daxili Access Token yaradırıq
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
      const accessToken = app.jwt.sign(
        { user_id: user!.id, tenant_id: tenant.id, role: user!.role },
        { expiresIn: env.ACCESS_TOKEN_TTL || '15m' }
      );

      return {
        data: {
          access_token: accessToken,
          expires_at: expiresAt,
          user: { id: user!.id, nickname: user!.nickname, role: user!.role, status: user!.status },
          config: tenant.config,
        },
        request_id: req.id,
      };
  })


  app.get('/me',async(req,res)=>{
      const decoded = await req.jwtVerify<{user_id:string,tenant_id:string}>()
      const [user] = await db.select().from(users).where(eq(users.id,decoded.user_id)) 
      if (!user) throw new AccessDenied()
      return {
        data: {
          user: { id: user.id, nickname: user.nickname, role: user.role, status: user.status },
          xp_balance: 0, // Mərhələ 5-də XpLedger cədvəlindən hesablanacaq
          challenge_summary: { completed_tasks: 0, total_tasks: 3, status: 'in_progress' },
        },
        request_id: req.id,
      }; 
  })
} 