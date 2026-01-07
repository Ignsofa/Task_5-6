import { Router } from 'express';

import { createCase, getCases, deleteCase } from '../controllers/CaseController';
import { getUsers } from '../controllers/UserController';
import { validatorCreateCase } from '../middleware/validation/case/validatorCreateCase';

import page404 from './pages/404';
import pageRoot from './pages/root';
import v1 from './v1/';

const router = Router();

router.use(`/v1`, v1);

router.post('/cases', validatorCreateCase, createCase);
router.get('/cases', getCases);
router.delete('/cases/:id', deleteCase);
router.get('/users', getUsers);
router.use(pageRoot);
router.use(page404);

export default router;
