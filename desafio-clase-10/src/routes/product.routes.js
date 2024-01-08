import { Router } from 'express';
import { addProduct } from '../controllers/product.controller.js';

const router = Router();

router.post('/', addProduct);

export default router;
