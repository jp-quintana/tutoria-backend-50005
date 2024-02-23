import { userDAO } from '../dao/user/index.js';

export const register = async (req, res, next) => {
  req.session.user = {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    age: req.user.age,
    email: req.user.email,
  };

  res.redirect('/');
};

export const login = async (req, res, next) => {
  const { email, password } = req.user;

  const token = jwt.sign(
    { email, password, role: 'user' },
    process.env.TOKEN_SECRET,
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
};

export const logout = async (req, res, next) => {
  try {
    await req.session.destroy();

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

export const getCurrentUser = async (req, res, next) => {
  console.log(req.session.user);
  res.json({ user: req.session.user });
};
