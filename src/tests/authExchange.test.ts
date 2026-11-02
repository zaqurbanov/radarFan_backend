import  { buildApp } from "@/app.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createTenant, createUser } from "./helper.js";
import { apiPrefix } from "@/common/constants/constants.js";

describe('authExchange',()=>{
  let app:ReturnType<typeof buildApp>
  beforeAll(async ()=>{
    app = buildApp()
    await app.ready()
  })
  afterAll(async ()=>{
    await app.close()
  })

  it('correct launch token with access token',async()=>{
    const tenant = await createTenant({slug:"demo-bet-90"})
    const user  = await createUser(tenant!.id as string)
    const launchToken  = app.jwt.sign({
      tenant_id:user!.tenantId,
      external_user_id:user!.externalUserId,
      nickname:user!.nickname,
      nonce:crypto.randomUUID()
    },{expiresIn:'60s'})

    const res = await app.inject({
      method:"POST",
      url:`${apiPrefix}/auth/exchange`,
      payload:{"launch_token":launchToken}
    })
  

    expect(res.statusCode).toBe(200)
    expect(typeof res.json().data.access_token).toBe('string')
    expect(res.json().data.user.id).toBe(user!.id)
  })
  it('retry tenant',async()=>{
    const tenant  = await createTenant()
    const user =await createUser(tenant!.id as string)
    const launchToken  = app.jwt.sign({
      tenant_id:user!.tenantId,
      external_user_id:user!.externalUserId,
      nickname:user!.nickname,
      nonce:crypto.randomUUID()
    })
    const res  = await app.inject({
      method:"POST",
      url:`${apiPrefix}/auth/exchange`,
      payload:{"launch_token":launchToken}
    })
    const res2  = await app.inject({
      method:"POST",
      url:`${apiPrefix}/auth/exchange`,
      payload:{"launch_token":launchToken}
    })
    expect(res.statusCode).toBe(200)
    expect(res2.statusCode).toBe(401)
    expect(typeof res.json().data.access_token).toBe('string')
    expect(res.json().data.user.id).toBe(user!.id)
  })

  it('Fake token ',async()=>{
    const res = await app.inject({
      method:"POST",
      url:`${apiPrefix}/auth/exchange`,
      payload:{"launch_token":"fake token"}
    })
    expect(res.statusCode).toBe(401)
  })

})