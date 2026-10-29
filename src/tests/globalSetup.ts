import is_checked_test_env from "@/common/helper/is_checked_test_env.js";
import { db } from "@/db/index.js";
import { migrate } from "drizzle-orm/node-postgres/migrator";

export default async function(){
  is_checked_test_env("globalSetup");
  try {
   await migrate(db,{migrationsFolder:"./drizzle"});
 } catch (error) {
   console.error("❌❌❌ Test bazası əlçatan deyil. docker compose -f docker-compose.test.yml up -d işlət");
   process.exit(1);
 }
}