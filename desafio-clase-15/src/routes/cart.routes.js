import { Router } from 'express';
import {
  addCart,
  addProductToCart,
  deleteCart,
  deleteProductFromCart,
  getCartProducts,
  getCarts,
} from '../controllers/cart.controller.js';

const router = Router();

router.get('/', getCarts);
router.get('/:cid', getCartProducts);
router.post('/', addCart);
router.post('/:cid/product/:pid', addProductToCart);
router.delete('/:cid/product/:pid', deleteProductFromCart);
router.delete('/:cid', deleteCart);

export default router;
