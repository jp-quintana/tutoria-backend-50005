import { ProductFsDAO } from './product.fs.js';
import { ProductMongooseDAO } from './product.mongoose.js';

let productDAO;

const DAO_OPTION = process.env.DAO_OPTION;

switch (DAO_OPTION) {
  case 'mongoose':
    productDAO = new ProductMongooseDAO();
    break;
  case 'fs':
    productDAO = new ProductFsDAO();
    break;
  default:
    productDAO = new ProductMongooseDAO();
}

export { productDAO };
