import {Router} from 'https://deno.land/x/oak/mod.ts';
import {getBill} from '../controllers/bills'

const router = new Router();

router.get('/', getBills);

export default router;
