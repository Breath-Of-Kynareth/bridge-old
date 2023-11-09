import { Router, Request, Response } from 'express';
import { getRaids, postRaid } from './endpoints/raids';
const router = Router();

router.get('/raids/:application', getRaids);
router.post('/raids', postRaid);
export default router;