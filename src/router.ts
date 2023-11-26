import { Router } from 'express';
import { getAllRosters, postNewRoster, postModifiedRoster } from './endpoints/rosters';
const router = Router();

router.get('/rosters/:application', getAllRosters);
router.post('/newRoster', postNewRoster);
router.post('/updateRoster', postModifiedRoster)
export default router;