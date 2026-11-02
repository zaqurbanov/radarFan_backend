import { expect, it } from "vitest";
import { describe } from "vitest";
import { createTenant } from "./helper.js";


describe('create tenant',()=>{




  it('should create a tenant in database',async ()=>{
    const tenant = await createTenant()
   const tenantA = await createTenant({slug:'demo-bet-2'})
   const tenantB = await createTenant({slug:'demo-bet-3'})
    expect(tenantA?.slug).toBe('demo-bet-2');
    expect(tenantB?.slug).toBe('demo-bet-3');

    expect(tenant?.id).toBeDefined();
    expect(tenant?.slug).toBeDefined();
  })
})