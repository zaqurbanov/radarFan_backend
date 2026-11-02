import { describe, expect, it } from "vitest";
import { createTenant, createUser } from "./helper.js";


describe("create User",()=>{

  it("should create a user in database",async()=>{
    const tenant = await createTenant({slug:"demo-bet-5"})
    const user = await createUser(tenant!.id as string,{
      nickname:"Zaur",
      role:"moderator",
      status:"active"
    })
    const user2 = await createUser(tenant!.id as string)
    expect(user?.tenantId).toBe(tenant?.id);
    expect(user2?.tenantId).toBe(tenant?.id);
    expect(user?.externalUserId).toBeDefined();
    expect(user?.nickname).toBe("Zaur");
    expect(user?.role).toBe("moderator");
    expect(user?.status).toBe("active");
  })
})