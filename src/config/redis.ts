import {Redis} from "ioredis";

import 'dotenv/config';
 

 export const redis  = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

 redis.on('error', err => console.log('Redis Client Error', err));
 redis.on('connect',()=>console.log('Redis Client Connected'));