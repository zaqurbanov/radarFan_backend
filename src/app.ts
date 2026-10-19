import Fastify, { type FastifyInstance } from "fastify"
import cors from '@fastify/cors'
import { authRoutes } from "@/modules/auth/auth.routes.js"
import jwt from '@fastify/jwt'
import { AppErrors } from "@/common/error/appErrors.js"
import { eventsRoutes } from "./modules/events/events.routes.js"
import { apiPrefix } from "./common/constants/constants.js"
import { env } from "./config/env.js"
import { db } from "./db/index.js"
import { redis } from "./config/redis.js"

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
  app.register(jwt,{secret:env.JWT_SECRET})
  app.register(authRoutes,{prefix:apiPrefix})
  app.register(eventsRoutes,{prefix:apiPrefix})

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


  app.decorate('db',db);
  app.decorate('redis',redis)

  const dbCloseFunction = async(instance:FastifyInstance)=>{
        await instance.db.$client.end()
        return 'DB connection closed'

  }

  const redisCloseFunction = async(instance:FastifyInstance)=>{
    await instance.redis.quit()
    return 'Redis connection closed'
  }
  
  app.addHook('onClose',async(instance)=>{
    instance.log.info('Shutting down...');
    try {

      const result  = await Promise.allSettled([

        dbCloseFunction(instance),
        redisCloseFunction(instance)

      ])
   
      result.forEach((result)=>{
        if(result.status === 'fulfilled'){
          instance.log.info(result.value)
        }else{
          instance.log.error(result.reason)
        }
      })
    } catch (error) {
      instance.log.error(error,'Failed to close db connection or redis connections');
    }
  })

  return app
}