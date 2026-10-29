import { buildApp } from "@/app.js";
import { apiPrefix } from "@/common/constants/constants.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";




describe('helath check api',()=>{
  let app: ReturnType<typeof buildApp>;

  beforeAll(async ()=>{
    app = buildApp()
    await app.ready()
  })

  afterAll(async ()=>{
    await app.close()
  })
  it('should return 200',async ()=>{
    const response = await app.inject({
      method:'GET',
      url:`${apiPrefix}/health`
    })
    expect(response.statusCode).toBe(200)
  })

})