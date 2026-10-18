import 'dotenv/config';
import { buildApp } from './app.js';

const start =async ()=>{
  const app = buildApp(); 
  const port = Number(process.env.PORT) || 3286;

  try {
     app.listen({
      port,
      host:'0.0.0.0'
    });
    app.log.info(`Server running on port ${port}`);
    console.log(`Server running on port ${port}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

start();