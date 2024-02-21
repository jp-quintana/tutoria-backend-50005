import { CartFsDAO } from './cart.fs.js';
import { CartMongooseDAO } from './cart.mongoose.js';

let cartDAO;

const DAO_OPTION = process.env.DAO_OPTION;

switch (DAO_OPTION) {
  case 'mongoose':
    cartDAO = new CartMongooseDAO();
    break;
  case 'fs':
    cartDAO = new CartFsDAO();
    break;
  default:
    cartDAO = new CartMongooseDAO();
}

export { cartDAO };
