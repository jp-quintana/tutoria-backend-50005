import { Router } from 'express';
import {
  renderHomePage,
  renderProductsPage,
  renderRealTimeProductsPage,
  renderChatPage,
  renderProductPage,
  renderCartPage,
} from '../controllers/views.controller.js';

const router = Router();

router.get('/', renderHomePage);
router.get('/products', renderProductsPage);
router.get('/product/:pid', renderProductPage);
router.get('/cart/:cid', renderCartPage);
router.get('/realtimeproducts', renderRealTimeProductsPage);
router.get('/chat', renderChatPage);

export default router;
