import { productDAO } from '../dao/product.dao.js';

export const renderHomePage = async (req, res, next) => {
  const products = await productDAO.getProducts();
  console.log(products);
  res.render('home', { title: 'Home', products });
};

export const renderRealTimeProductsPage = (req, res, next) => {
  res.render('realTimeProducts', { title: 'Real Time Products' });
};

export const renderChatPage = (req, res, next) => {
  res.render('chat', { title: 'Chat' });
};
