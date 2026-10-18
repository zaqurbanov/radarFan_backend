// fix.ts
import { db } from './src/db/index.js';
import { sql } from 'drizzle-orm';

async function fix() {
  console.log("Köhnə tip və bağlı sütun silinir...");
  await db.execute(sql`DROP TYPE IF EXISTS user_role CASCADE;`);
  console.log("Hazırdır!");
  process.exit(0);
}

fix();