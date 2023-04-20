import Router from 'express';
import {getUsers,addUser,loginUser} from './controller.js';
const router = Router();
router.get('/', getUsers);
router.post('/register',addUser);
router.post('/login',loginUser);
export default router;
