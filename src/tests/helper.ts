import { apiPrefix } from "@/common/constants/constants.js";
import { db } from "@/db/index.js";
import { tenants,  users,  events } from "@/db/schema.js";
import type { FastifyInstance } from "fastify";

type insertTenants = typeof tenants.$inferInsert
type insertUsers = typeof users.$inferInsert
type userInferce = typeof users.$inferSelect
type insertEvents = typeof events.$inferInsert
export const createTenant =async (overrides:Partial< insertTenants>={})=>{
const uniqueSuffix = crypto.randomUUID().slice(0, 8);
const defaultTenants:insertTenants ={
  slug: `demo-bet-${uniqueSuffix}`,
  config:{
    name: 'DemoBet',
    theme: 'dark',
    enabled_sports: ['football', 'basketball']
  },
  timezone:"UTC",
  rulesVersion:1


}

const [createdTenant] = await db.insert(tenants).values({ ...defaultTenants, ...overrides}).returning()


return createdTenant
}

export const createUser=async(tenantId:string,overrides:Partial<insertUsers>={})=>{
  const defaultUserValues:insertUsers={
    tenantId,
    externalUserId:`ext_${crypto.randomUUID()}`,
    nickname:'Nihal',
    role:'user',
    status:'active'
  }
  const [createdUser]= await db.insert(users).values({...defaultUserValues,...overrides}).returning()
  return createdUser
  
}

export const loginAs =async(app:FastifyInstance,user:Partial<userInferce>={})=>{
  
  const launchToken =  app.jwt.sign({
    tenant_id:user.tenantId,
    external_user_id:user.externalUserId,
    nickname:user.nickname,
    nonce:crypto.randomUUID()
  },{expiresIn:'60s'})
      const response = await app.inject({
      method:"POST",
      url:`${apiPrefix}/auth/exchange`,
      payload:{"launch_token":launchToken}
    })
  return response.json().data.access_token

}

export const createEvent =async(tenantId:string,overrides:Partial<insertEvents>={})=>{
  const defaultEvent:insertEvents={
    tenantId,
    league:"Spain",
    teams:{away:"Real",home:"Barcelona"},
    period:"1st half",
    score:{away:1,home:0},
    providerId:"prov_ev_1",
    status:"live",
    startAt:new Date(),


    sport:"football",
  }
  const [createdEvent] = await db.insert(events).values({...defaultEvent,...overrides}).returning()
  return createdEvent

}