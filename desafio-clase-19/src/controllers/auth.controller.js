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
