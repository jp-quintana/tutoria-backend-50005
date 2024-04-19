import { Router } from 'express';
import passport from 'passport';

import {
  renderHomePage,
  renderProductsPage,
  renderProductPage,
  renderCartPage,
  renderLoginPage,
  renderRegisterPage,
} from '../controllers/views.controller.js';

import { noAuth } from '../middleware/auth.js';

const router = Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  renderHomePage
);
router.get(
  '/products',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  renderProductsPage
);
router.get(
  '/product/:pid',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  renderProductPage
);
router.get(
  '/cart/:cid',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  renderCartPage
);
router.get('/login', noAuth, renderLoginPage);
router.get('/register', noAuth, renderRegisterPage);

export default router;
