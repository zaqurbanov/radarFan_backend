import 'dotenv/config';
import {z} from 'zod';



  const envSchema =z.object({
  JWT_SECRET:z.string("JWT_SECRET is required").min(32,"JWT_SECRET must be minimum 32 characters long , please Check .env file"),
  PORT:z.coerce.number().default(3333),
  DATABASE_URL:z.string("Database URL is required, please Check .env file"),
  REDIS_URL:z.string("Redis URL is required, please Check .env file").min(1,"Redis URL must be minimum 1 characters long , please Check .env file"),
})
export const env  = envSchema.parse(process.env);

