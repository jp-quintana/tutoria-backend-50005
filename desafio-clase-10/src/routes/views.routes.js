import { Router } from 'express';
import {
  homePage,
  realTimeProductsPage,
} from '../controllers/views.controller.js';

const router = Router();

router.get('/', homePage);
router.get('/realtimeproducts', realTimeProductsPage);

export default router;
