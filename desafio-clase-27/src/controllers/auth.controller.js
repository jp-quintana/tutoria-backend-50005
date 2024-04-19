import { userDAO } from '../dao/user/index.js';
import { checkPassword, createHash } from '../utils/bcrypt.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
  try {
    const { first_name, last_name, email, age, password, role } = req.body;

    const existingUser = await userDAO.getUserByEmail({
      email,
    });

    if (existingUser) {
      throw new Error('Email address is already in use.');
    }

    const encryptedPassword = await createHash(password);

    const newUser = await userDAO.addUser({
      first_name,
      last_name,
      email,
      age,
      role,
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { first_name, last_name, email, role: newUser.role },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h',
      }
    );

    res
      .cookie('coderCookieToken', token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      })
      .redirect('/');
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await userDAO.getUserByEmail({ email });

    if (!existingUser) {
      throw new Error('A user with that email does not exist.');
    }

    const isMatch = await checkPassword(existingUser, password);

    if (!isMatch) {
      throw new Error(
        'Sorry, your email or password is incorrect. Please try again.'
      );
    }

    const token = jwt.sign(
      {
        first_name: existingUser.first_name,
        last_name: existingUser.last_name,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h',
      }
    );

    res
      .cookie('coderCookieToken', token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      })
      .redirect('/');
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie('coderCookieToken').redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const registerFail = async (req, res, next) => {
  res.status(400).send({ error: 'Failed to register' });
};

export const loginWithGithub = async (req, res, next) => {
  req.session.user = req.user;
  res.redirect('/');
};

export const getCurrentUser = async (req, res, next) => {
  res.json({ user: req.user });
};
