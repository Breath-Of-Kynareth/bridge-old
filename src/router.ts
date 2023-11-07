import { Router, Request, Response } from 'express';
import { sayHello } from './endpoints/hello';
import { auth } from './endpoints/auth';
import { getRaids, postRaid } from './endpoints/raids';
const router = Router();

router.get('/hello', sayHello);
router.get('/auth/:token', auth);
router.get('/auth/:token', auth);
router.get('/raids', getRaids);
router.post('/raids', postRaid);
export default router;