import { Router } from 'express';
import {
  renderHomePage,
  renderProductsPage,
  renderChatPage,
  renderProductPage,
  renderCartPage,
} from '../controllers/views.controller.js';

const router = Router();

router.get('/', renderHomePage);
router.get('/products', renderProductsPage);
router.get('/product/:pid', renderProductPage);
router.get('/cart/:cid', renderCartPage);
router.get('/chat', renderChatPage);
// router.get('/login', renderLoginPage);

export default router;
