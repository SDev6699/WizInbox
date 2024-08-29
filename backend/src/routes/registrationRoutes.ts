import { Router } from 'express';
import { registerUserController, checkEmailAvailabilityController } from '../controllers/registrationController';

const router = Router();

router.post('/register', registerUserController);
router.post('/check-username', checkEmailAvailabilityController);

export default router;
