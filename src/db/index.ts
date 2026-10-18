import { Pool } from "pg"; 

import 'dotenv/config';
import * as schema from './schema.js';
import { drizzle } from "drizzle-orm/node-postgres";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

export const db = drizzle(pool,{schema});