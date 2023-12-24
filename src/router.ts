import { Router } from 'express';
import { getAllRosters, postNewRoster, postModifiedRoster } from './endpoints/rosters';
import { getRanks } from './endpoints/ranks';
const router = Router();

router.get('/rosters/:application', getAllRosters);
router.post('/newRoster', postNewRoster);
router.post('/updateRoster', postModifiedRoster)
router.get('/ranks', getRanks);
export default router;