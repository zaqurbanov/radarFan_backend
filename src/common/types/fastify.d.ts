import type { redis } from '@/config/redis.ts';
import type { db } from '@/db/index.ts';
import { FastifyInstance } from 'fastify';
declare module 'fastify'{
  interface FastifyInstance{
    db: typeof db,
    redis: typeof redis
  }
} 