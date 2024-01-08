import { productManager } from '../models/product.model.js';
import { socketServer } from '../index.js';

export const addProduct = async (req, res, next) => {
  try {
    const { body } = req;

    await productManager.addProduct(body);

    const products = await productManager.getProducts();
    socketServer.emit('populateProducts', products);
    res.json({ message: 'Successfully added product' });
  } catch (err) {
    res.json({ message: err.message });
  }
};
