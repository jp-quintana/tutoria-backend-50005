import bcrypt from 'bcrypt';

export const createHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const checkPassword = async (user, password) => {
  return await bcrypt.compare(password, user.password);
};
