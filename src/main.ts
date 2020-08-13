import {log} from "./log.ts";
import {Application} from 'https://deno.land/x/oak/mod.ts';
import router from './routes/routing.ts';

const main = async () => {
  const app = new Application();

  app.use(router.routes());

  await app.listen({port: 8000});
  log.info("Starting your Deno App");
};

export default main;
