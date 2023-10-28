import { Router, Request, Response } from 'express';
import { sayHello } from './endpoints/hello';
import { auth } from './endpoints/auth';

const router = Router();

router.get('/hello', sayHello);
router.get('/auth/:token', auth);

export default router;