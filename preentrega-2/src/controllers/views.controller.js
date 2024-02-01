import { productDAO } from '../dao/product/index.js';

export const renderHomePage = async (req, res, next) => {
  const products = await productDAO.getProducts();
  res.render('home', { title: 'Home', products });
};

export const renderProductsPage = async (req, res, next) => {
  const { limit, sort, page, query } = req.query;

  const paginationOptions = {
    limit: !limit ? 10 : limit,
    sort: sort ? { price: sort } : undefined,
    page: page ? page : 1,
  };

  const products = await productDAO.getPaginatedProducts(
    query,
    paginationOptions
  );

  res.render('products', {
    title: 'Home',
    products: products.payload,
    page: products.page,
    prevLink: products.prevLink,
    nextLink: products.nextLink,
  });
};

export const renderProduct = async (req, res, next) => {
  const { pid } = req.params;

  const product = await productDAO.getProductById(pid);

  res.render('product', {
    title: 'Product',
    product,
  });
};

export const renderRealTimeProductsPage = (req, res, next) => {
  res.render('realTimeProducts', { title: 'Real Time Products' });
};

export const renderChatPage = (req, res, next) => {
  res.render('chat', { title: 'Chat' });
};
