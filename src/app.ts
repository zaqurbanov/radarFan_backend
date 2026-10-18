import Fastify from "fastify"
import cors from '@fastify/cors'
import { timestamp } from "drizzle-orm/pg-core"
import { authRoutes } from "@/modules/auth/auth.routes.js"
import jwt from '@fastify/jwt'
import { AppErrors } from "@/common/error/appErrors.js"

export const buildApp =()=>{
  const app =Fastify({
    logger:true,
    genReqId:()=>crypto.randomUUID()
  })
  app.setErrorHandler((error,request,reply)=>{
    if(error instanceof AppErrors){
      return reply.status(error.statusCode).send({error:error.message})
    }
    request.log.error(error)

    return reply.status(500).send({error:'Internal Server Error'})
  })

  
  app.register(cors,{origin:true})
  app.register(jwt,{secret:process.env.JWT_SECRET ||"secret"})
  app.register(authRoutes,{prefix:'/api/v1'})

  app.get('/api/v1/health',async(req,res)=>{
    return {
      data:{
        status:'ok',
        version:'1.0.0',
        timestamp:new Date().toISOString()
      },
      request_id:req.id
    }
  })

  return app
}