import { productManager } from '../models/product.model.js';

export const homePage = async (req, res, next) => {
  const products = await productManager.getProducts();
  res.render('home', { title: 'Home', products });
};

export const realTimeProductsPage = (req, res, next) => {
  res.render('realTimeProducts', { title: 'Real Time Products' });
};
