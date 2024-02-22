import { Router } from 'express';
import {
  renderHomePage,
  renderProductsPage,
  renderProductPage,
  renderCartPage,
  renderLoginPage,
  renderRegisterPage,
} from '../controllers/views.controller.js';

import { checkAuth, checkNoAuth } from '../middleware/checkAuth.js';

const router = Router();

router.get('/', checkAuth, renderHomePage);
router.get('/products', checkAuth, renderProductsPage);
router.get('/product/:pid', checkAuth, renderProductPage);
router.get('/cart/:cid', checkAuth, renderCartPage);
router.get('/login', checkNoAuth, renderLoginPage);
router.get('/register', checkNoAuth, renderRegisterPage);

export default router;
