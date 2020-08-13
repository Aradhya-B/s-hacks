import {Router} from 'https://deno.land/x/oak/mod.ts';
import getBills from '../controllers/getBills.ts';

const router = new Router();

router.get('/bills', getBills);

export default router;
