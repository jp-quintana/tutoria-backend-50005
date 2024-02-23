import { Router } from 'express';
import {
  renderHomePage,
  renderProductsPage,
  renderProductPage,
  renderCartPage,
  renderLoginPage,
  renderRegisterPage,
} from '../controllers/views.controller.js';

const router = Router();

router.get('/', renderHomePage);
router.get('/products', renderProductsPage);
router.get('/product/:pid', renderProductPage);
router.get('/cart/:cid', renderCartPage);
router.get('/login', renderLoginPage);
router.get('/register', renderRegisterPage);

export default router;
