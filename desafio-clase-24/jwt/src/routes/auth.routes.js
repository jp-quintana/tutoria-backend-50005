import { Router } from 'express';
import {
  register,
  login,
  logout,
  registerFail,
  loginWithGithub,
  getCurrentUser,
} from '../controllers/auth.controller.js';
import passport from 'passport';

const router = Router();

router.post(
  '/register',
  passport.authenticate('register', {
    session: false,
    failureRedirect: '/fail-register',
  }),
  register
);

router.post(
  '/login',
  passport.authenticate('login', {
    session: false,
  }),
  login
);

router.post('/logout', logout);

router.get('/current', getCurrentUser);

router.get('/fail-register', registerFail);

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
