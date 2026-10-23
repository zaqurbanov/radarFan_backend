import type { FastifyRequest } from "fastify";
export interface SuccessResponse<T> {
  data:T,
  request_id:string
}
export const successResponse = <T>(data:T,req:FastifyRequest):SuccessResponse<T> => {
  return{
    data,
    request_id: req.id

  }
  
};