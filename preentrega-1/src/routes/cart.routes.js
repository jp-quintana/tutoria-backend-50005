import { Router } from 'express';
import {
  addCart,
  addProductToCart,
  getCartProducts,
} from '../controllers/cart.controller.js';

const router = Router();

router.get('/:cid', getCartProducts);
router.post('/', addCart);
router.post('/:cid/product/:pid', addProductToCart);

export default router;
