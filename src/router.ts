import { Router, Request, Response } from 'express';
import { sayHello } from './endpoints/hello';
import { getRaids, postRaid } from './endpoints/raids';
const router = Router();

router.get('/raids/:application', getRaids);
router.post('/raids', postRaid);
export default router;