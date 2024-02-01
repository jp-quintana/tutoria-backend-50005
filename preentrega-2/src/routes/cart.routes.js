import { Router } from 'express';
import {
  addCart,
  addProductToCart,
  deleteCart,
  deleteProductFromCart,
  getCartProducts,
  getCarts,
  updateProductQuantityInCart,
  updateCart,
} from '../controllers/cart.controller.js';

const router = Router();

router.get('/', getCarts);
router.get('/:cid', getCartProducts);
router.post('/', addCart);
router.post('/:cid/product/:pid', addProductToCart);
router.put('/:cid', updateCart);
router.put('/:cid/product/:pid', updateProductQuantityInCart);
router.delete('/:cid', deleteCart);
router.delete('/:cid/product/:pid', deleteProductFromCart);

export default router;
