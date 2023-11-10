import { Router } from 'express';
import { getAllRosters, postNewRoster } from './endpoints/raids';
const router = Router();

router.get('/raids/:application', getAllRosters);
router.post('/raids', postNewRoster);
export default router;