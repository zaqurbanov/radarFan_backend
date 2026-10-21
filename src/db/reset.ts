import { env } from "@/config/env.js";

import * as schema from './schema.js';
import {reset} from "drizzle-seed"; 
import { db } from "./index.js";
export const resetDreeze = async () => {

console.log("Reset starting...");
try {
  if(env.NODE_ENV !=="development" && env.NODE_ENV !=="test") {
    console.log("Reset is not allowed in production");
    process.exit(1);
  }
  console.log("your NODE_ENV is",env.NODE_ENV);
  await reset(db,schema);

  console.log("Reset successful"); 

  
} catch (error) {
  console.error("Reset error",error);
  process.exit(1);
}
}

resetDreeze()