

  export default  function is_checked_test_env(input: string="") {
    if(process.env.NODE_ENV !=="test") {
      throw new Error(`❌❌❌❌NODE_ENV is not test mode in ${input} ,please check it ❌❌❌❌`);
    }
    if(!process.env.DATABASE_URL?.includes("5433")) {
      throw new Error(`❌❌❌❌DATABASE_URL is not set in .env.test file in ${input} ❌❌❌❌`);
    }
  }