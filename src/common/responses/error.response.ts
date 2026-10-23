import type { FastifyRequest } from "fastify"

export const errorResponse =(error:{message:string,code:string,retryable:boolean,details?:unknown},
  req:FastifyRequest
)=>{
  return{
    error:{
      message:error.message,
      code:error.code,
      retryable:error.retryable,
      details:error.details
    },
    request_id:req.id
  }
}