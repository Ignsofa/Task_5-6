import { Router } from 'express';

import { createCase, getCases, getCaseById, updateCase, deleteCase } from '../controllers/CaseController';
import { getUsers } from '../controllers/UserController';
import { checkJwt } from '../middleware/checkJwt';
import { checkRole } from '../middleware/checkRole';
import { validatorCreateCase } from '../middleware/validation/case/validatorCreateCase';
import { validatorUpdateCase } from '../middleware/validation/case/validatorUpdateCase';

import page404 from './pages/404';
import pageRoot from './pages/root';
import v1 from './v1/';

const router = Router();

router.use(`/v1`, v1);

router.post('/cases', [checkJwt, validatorCreateCase], createCase);

router.get('/cases', checkJwt, getCases);

router.get('/cases/:id', checkJwt, getCaseById);

router.put('/cases/:id', [checkJwt, validatorUpdateCase], updateCase);

router.delete('/cases/:id', [checkJwt, checkRole(['ADMINISTRATOR'])], deleteCase);

router.get('/users', [checkJwt, checkRole(['ADMINISTRATOR'])], getUsers);

router.use(pageRoot);
router.use(page404);

export default router;
