import Router from 'express';
import {addTemporaryHint,VerifyCodeforcesHandle} from './controller.js';
import jwtAuth from "../middleware/jwtAuth.js";
const router = Router();
router.post('/',jwtAuth,addTemporaryHint);
router.post('/verify',jwtAuth,VerifyCodeforcesHandle);

export default router;
