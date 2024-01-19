import { productDAO } from '../dao/product.dao.js';
import { socketServer } from '../index.js';

export const addProduct = async (req, res, next) => {
  try {
    const { body } = req;

    await productDAO.addProduct(body);

    // const products = await ProductModel.getProducts();
    // socketServer.emit('populateProducts', products);
    res.json({ message: 'Successfully added product' });
  } catch (err) {
    res.json({ message: err.message });
  }
};
