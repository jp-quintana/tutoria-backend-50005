import { UserMongooseDAO } from './user.mongoose.js';

let userDAO;

const DAO_OPTION = process.env.DAO_OPTION;

switch (DAO_OPTION) {
  case 'mongoose':
    userDAO = new UserMongooseDAO();
    break;
  default:
    userDAO = new UserMongooseDAO();
}

export { userDAO };
