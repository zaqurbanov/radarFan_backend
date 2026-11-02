import { describe, expect, it } from "vitest";
import { createEvent, createTenant, } from "./helper.js";


describe('create event',async()=>{

  it('should create a event in database',async()=>{
    const tenant1 =await createTenant({slug:'demo-betforEvent-4'})
    const event = await createEvent(tenant1!.id as string)
    console.log(event);
    expect(event?.id).toBeDefined();

  })





})