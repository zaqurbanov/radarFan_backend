import { buildApp } from "@/app.js";
import { afterAll, beforeAll, describe, it } from "vitest";
import { createTenant, createUser, loginAs } from "./helper.js";
import { apiPrefix } from "@/common/constants/constants.js";
import { expect } from "vitest";



describe('loginAs',()=>{
  let app:ReturnType<typeof buildApp>
  beforeAll(async ()=>{
    app = buildApp()
    await app.ready()
  })

  afterAll(async ()=>{
    await app.close()
  })

  it('get access token',async()=>{
    const tenant = await createTenant({slug:"demo-bet-5"})
    const user = await createUser(tenant!.id as string,{
      nickname:"Zaur",
      role:"moderator",
      status:"active"
    })
    const accessToken = await loginAs(app,user)
    expect(typeof accessToken).toBe('string');

    const me = await app.inject({
        method:"GET",
        url:`${apiPrefix}/me`,
        headers:{authorization:`Bearer ${accessToken}`},
    })
    expect(me.statusCode).toBe(200)
    expect(me.json().data.user.id).toBe(user!.id)
    expect(me.json().data.user.nickname).toBe(user?.nickname)


  })
})