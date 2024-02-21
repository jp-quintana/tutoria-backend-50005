import { Router } from 'express';
import {
  register,
  login,
  logout,
  registerFail,
  loginWithGithub,
} from '../controllers/auth.controller.js';
import passport from 'passport';

const router = Router();

router.get('/fail-register', registerFail);

router.post(
  '/register',
  passport.authenticate('register', { failureRedirect: '/fail-register' }),
  register
);

router.post('/login', passport.authenticate('login'), login);
router.post('/logout', logout);
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/githubcallback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  loginWithGithub
);

export default router;
