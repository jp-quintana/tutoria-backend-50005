import { Router } from 'express';
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProduct,
  getProducts,
} from '../controllers/product.controller.js';

const router = Router();

router.post('/', addProduct);

export default router;
