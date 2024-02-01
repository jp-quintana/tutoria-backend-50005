import { Router } from 'express';
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProduct,
  getProducts,
} from '../controllers/product.controller.js';

const router = Router();

router.get('/', getProducts);
router.get('/:pid', getProduct);
router.post('/', addProduct);
router.put('/:pid', editProduct);
router.delete('/:pid', deleteProduct);

export default router;
