import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createEvent, createTenant, createUser, loginAs, } from "./helper.js";
import  { buildApp } from "@/app.js";
import { apiPrefix } from "@/common/constants/constants.js";


describe('create event',async()=>{
let app:ReturnType<typeof buildApp>
  
  beforeAll(async ()=>{
    app = buildApp()
    await app.ready()
  })
  afterAll(async ()=>{
    await app.close()
  })
it('should create a event in database',async()=>{
    const tenant1 =await createTenant({slug:'demo-betforEvent-4'})
    const tenant2 =await createTenant({slug:'demo-betforEvent-5'})
    const user1 = await createUser(tenant1!.id as string)
    const eventForTenant2 = await createEvent(tenant2!.id as string)
    
    const tokenForUser1 = await loginAs(app,user1)
    const event = await createEvent(tenant1!.id as string)
    

    const res= await app.inject({
      method:"GET",
      url:`${apiPrefix}/events`,
      headers:{"Authorization":`Bearer ${tokenForUser1}`}
    })
    expect(event?.id).toBeDefined();
    expect(event?.tenantId).toBe(tenant1?.id);
    expect(res.statusCode).toBe(200)
    
  })





})