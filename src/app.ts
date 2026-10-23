import Fastify, { type FastifyError, type FastifyInstance } from "fastify"
import cors from '@fastify/cors'
import { authRoutes } from "@/modules/auth/auth.routes.js"
import jwt from '@fastify/jwt'
import { AppErrors } from "@/common/error/appErrors.js"
import { eventsRoutes } from "./modules/events/events.routes.js"
import { apiPrefix } from "./common/constants/constants.js"
import { env } from "./config/env.js"
import { db } from "./db/index.js"
import { redis } from "./config/redis.js"
import { successResponse } from "./common/responses/success.js"
import { errorResponse } from "./common/responses/error.response.js"
import { CustomErrorCodes } from "./common/constants/errorCodes.js"
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod"
// Fastify və kitabxanalar istifadəçi səhvini HTTP statusu ilə bildirir (400–499).
// Biz onu öz kataloqumuzdakı koda çeviririk ki, frontend həmişə YALNIZ bizim kodları görsün.
const clientErrorByStatus = {
  400: CustomErrorCodes.INVALID_INPUT,
  401: CustomErrorCodes.SESSION_EXPIRED,
  403: CustomErrorCodes.ACCESS_DENIED,
  404: CustomErrorCodes.NOT_FOUND,
  429: CustomErrorCodes.RATE_LIMITED,
} as const



export const buildApp =()=>{
  const app =Fastify({
    logger:true,
    genReqId:()=>crypto.randomUUID(),
  }).withTypeProvider<ZodTypeProvider>()

  app.setSerializerCompiler(serializerCompiler)
  app.setValidatorCompiler(validatorCompiler)

  app.setNotFoundHandler((request,reply)=>{
  return reply.status(404).send(errorResponse({
    message:CustomErrorCodes.NOT_FOUND.message,
    code:CustomErrorCodes.NOT_FOUND.code,
    retryable:CustomErrorCodes.NOT_FOUND.retryable
  },request))
})

  app.setErrorHandler((error:FastifyError,request,reply)=>{
    // 1) Bizim özümüzün atdığı xətadır (NotFoundError, SessionExpiredError...)
    if(error instanceof AppErrors){
    
      return reply.status(error.statusCode).send(errorResponse(error,request))
    }

    // 2) Kənardan gələn (Fastify, kitabxana), amma istifadəçi səhvi olan xətadır.
    //    Məsələn səhv JSON: Fastify özü 400 atır. Bunu 500 saymaq olmaz.
    const status = error.statusCode

      
      
      
      const fields = error.validation?.map(v => ({
  path: v.instancePath.replace(/^\//, ''),   // "/limit" → "limit"
  message: v.message,
}))
    if(typeof status === 'number' && status >= 400 && status < 500){
      const known = clientErrorByStatus[status as keyof typeof clientErrorByStatus] ?? CustomErrorCodes.INVALID_INPUT
      request.log.warn(error)   // istifadəçi səhvidir, error yox, warn səviyyəsi
      return reply.status(status).send(errorResponse({
        message:known.message,
        code:known.code,
        retryable:known.retryable,
        details:fields ? { in: error.validationContext, fields } : undefined,

      },request))
    }

    // 3) Qalan hər şey bizim səhvimizdir: loga yaz, istifadəçiyə sabit mətn ver
    request.log.error(error)

    return reply.status(500).send(
      errorResponse({
        message:CustomErrorCodes.INTERNAL.message,
        code:CustomErrorCodes.INTERNAL.code,
        retryable:CustomErrorCodes.INTERNAL.retryable
      },request)
    ) })

  app.addHook('onSend',async(request,reply,payload)=>{
reply.header('x-request-id',request.id)
return payload
  })

  
  app.register(cors,{origin:true})
  app.register(jwt,{secret:env.JWT_SECRET})
  app.register(authRoutes,{prefix:apiPrefix})
  app.register(eventsRoutes,{prefix:apiPrefix})

  app.get('/api/v1/health',async(req,res)=>{
    const data = {
          status:'ok',
        version:'1.0.0',
        timestamp:new Date().toISOString()
    }
    return successResponse(data,req);
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