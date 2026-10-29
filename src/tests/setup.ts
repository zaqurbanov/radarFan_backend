import { db } from "@/db/index.js";
import { reset } from "drizzle-seed";
import { beforeAll, beforeEach } from "vitest";
import * as schema from "../db/schema.js";
import is_checked_test_env from "@/common/helper/is_checked_test_env.js";
// import dotenv from "dotenv"

// dotenv.config({path:'.env.test'})
  beforeAll(async () => {
  is_checked_test_env("beforeAll");
  });

  beforeEach(async () => {
      is_checked_test_env("beforeEach");
      await reset(db, schema);
  });
