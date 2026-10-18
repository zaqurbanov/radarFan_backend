import type { FastifyInstance } from "fastify";
import { SessionExpiredError } from "../error/appErrors.js";

export const jwt_preHandler = (app:FastifyInstance)=>{
      app.addHook('preHandler',async(req,res)=>{
        try {
          await req.jwtVerify()
        } catch (error) {
          throw new SessionExpiredError();
          
        }
      })
}