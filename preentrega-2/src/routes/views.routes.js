import { Router } from 'express';
import {
  renderHomePage,
  renderProductsPage,
  renderRealTimeProductsPage,
  renderChatPage,
  renderProduct,
} from '../controllers/views.controller.js';

const router = Router();

router.get('/', renderHomePage);
router.get('/products', renderProductsPage);
router.get('/product/:pid', renderProduct);
router.get('/realtimeproducts', renderRealTimeProductsPage);
router.get('/chat', renderChatPage);

export default router;
