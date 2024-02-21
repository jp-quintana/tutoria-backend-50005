import { userDAO } from '../dao/user/index.js';

export const register = async (req, res, next) => {
  // try {
  //   const user = await userDAO.addUser(req.body);

  //   // ya en el add user se chequea si el email ya existe!

  //   if (
  //     user.email === 'adminCoder@coder.com' &&
  //     user.password === 'adminCod3r123'
  //   ) {
  //     user.isAdmin = true;
  //   } else {
  //     user.isAdmin = false;
  //   }

  req.session.user = {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    age: req.user.age,
    email: req.user.email,
  };

  // req.session.user = user;

  res.redirect('/');
  // res.status(201).json({ message: 'User created' });
  // } catch (err) {
  //   console.error(err);
  //   res.status(400).json({ error: err.message });
  // }
};

export const login = async (req, res, next) => {
  // try {
  //   const { email, password } = req.body;

  //   const user = await userDAO.getUserByEmail({ email });

  //   if (!user) throw new Error('User not found');

  //   if (user.password !== password) throw new Error('Credentials do not match');

  //   if (
  //     user.email === 'adminCoder@coder.com' &&
  //     user.password === 'adminCod3r123'
  //   ) {
  //     user.isAdmin = true;
  //   } else {
  //     user.isAdmin = false;
  //   }

  //   console.log(user);

  req.session.user = {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    age: req.user.age,
    email: req.user.email,
  };

  res.redirect('/');
  //   // res.status(200).json({ user });
  // } catch (err) {
  //   console.error(err);
  //   res.status(400).json({ error: err.message });
  // }
};

export const logout = async (req, res, next) => {
  try {
    await req.session.destroy();

    // res.status(200).json({ message: 'Logout successful' });
    res.redirect('/login');
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
