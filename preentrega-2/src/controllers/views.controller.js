import { productDAO } from '../dao/product/index.js';

export const renderHomePage = async (req, res, next) => {
  const products = await productDAO.getProducts();
  res.render('home', { title: 'Home', products });
};

export const renderRealTimeProductsPage = (req, res, next) => {
  res.render('realTimeProducts', { title: 'Real Time Products' });
};

export const renderChatPage = (req, res, next) => {
  res.render('chat', { title: 'Chat' });
};
