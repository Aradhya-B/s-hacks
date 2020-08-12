import {log} from "./log.ts";
import {Application, Router} from 'https://deno.land/x/oak@v4.0.0/mod.ts';

const main = async () => {
  const app = new Application();
  const router = new Router();

  router.get('/', context => {
    context.response.body = 'Hello world!';

  });

  app.use(router.routes());

  await app.listen({port: 8000});
  log.info("Starting your Deno App");
};

export default main;
