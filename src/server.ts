import { buildApp } from './app.js';
import shutdownHelper from './common/helper/shutdown.helper.js';
import { env } from './config/env.js';

const app = buildApp(); 


const start =async ()=>{
  const port = Number(env.PORT);

  try {
    await app.listen({
      port,
      host:'0.0.0.0'
    });
    app.log.info(`Server running on port ${port}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
    
  }
}

start();



process.on('SIGINT',()=>shutdownHelper('SIGINT',app));
process.on('SIGTERM',()=>shutdownHelper('SIGTERM',app));