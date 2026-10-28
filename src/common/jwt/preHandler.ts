import type { FastifyInstance } from "fastify";
import { SessionExpiredError } from "../error/appErrors.js";

export const jwt_preHandler = (app:FastifyInstance)=>{
      app.addHook('preHandler',async(req,res)=>{
        try {
          await req.jwtVerify()
        } catch (error) {
          throw new SessionExpiredError();

        }
        // Bu sorğunun sonrakı log sətirlərində user_id və tenant_id görünsün.
        // external_user_id (bukmekerdəki ID) həssasdır, ona görə yalnız daxili ID-ləri yazırıq.
        const user = req.user as { user_id: string; tenant_id: string }
        const log = req.log.child({ user_id: user.user_id, tenant_id: user.tenant_id })
        // "request completed" sətri reply.log ilə yazılır, ona görə ikisini də dəyişirik
        req.log = log
        res.log = log
      })
}
