import { Router } from 'express';
import {
  renderHomePage,
  renderRealTimeProductsPage,
  renderChatPage,
} from '../controllers/views.controller.js';

const router = Router();

router.get('/', renderHomePage);
router.get('/realtimeproducts', renderRealTimeProductsPage);
router.get('/chat', renderChatPage);

export default router;
