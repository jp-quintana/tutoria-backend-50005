import { Router } from 'express';

import {
  fetchProducts,
  fetchProduct,
  addProduct,
  editProduct,
  deleteProduct,
} from '../controllers/product.controller.js';

const router = Router();

router.get('/', fetchProducts);

router.get('/:pid', fetchProduct);

router.post('/', addProduct);

router.put('/:pid', editProduct);

router.delete('/:pid', deleteProduct);

export default router;
