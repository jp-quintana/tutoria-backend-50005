import { userDAO } from '../dao/user/index.js';

export const register = async (req, res, next) => {
  try {
    await userDAO.addUser(req.body);

    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userDAO.getUserByEmail({ email });

    if (!user) throw new Error('User not found');

    if (user.password !== password) throw new Error('Credentials do not match');

    req.session.user = user;
    res.redirect('/');
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const logout = async (req, res, next) => {
  try {
    await req.session.destroy();

    res.status(200).json({ message: 'Logout successful' });
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};
