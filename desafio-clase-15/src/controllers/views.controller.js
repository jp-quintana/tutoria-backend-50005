import ProductModel from '../models/product.model.js';

export const homePage = async (req, res, next) => {
  const products = await ProductModel.getProducts();
  res.render('home', { title: 'Home', products });
};

export const realTimeProductsPage = (req, res, next) => {
  res.render('realTimeProducts', { title: 'Real Time Products' });
};
