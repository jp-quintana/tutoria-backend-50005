import { cartDAO } from '../dao/cart/index.js';
import { productDAO } from '../dao/product/index.js';

export const renderHomePage = async (req, res, next) => {
  const products = await productDAO.getProducts();
  res.render('home', { title: 'Home', products, user: req.session.user });
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
    title: 'Products',
    products: products.payload,
    page: products.page,
    prevLink: products.prevLink,
    nextLink: products.nextLink,
  });
};

export const renderProductPage = async (req, res, next) => {
  const { pid } = req.params;

  const product = await productDAO.getProductById(pid);

  res.render('product', {
    title: 'Product',
    product,
  });
};

export const renderChatPage = (req, res, next) => {
  res.render('chat', { title: 'Chat' });
};

export const renderCartPage = async (req, res, next) => {
  const { cid } = req.params;

  const cart = await cartDAO.getCartById(cid);

  res.render('cart', { title: 'Cart', products: cart.products });
};

export const renderLoginPage = async (req, res, next) => {
  res.render('login', { title: 'Login' });
};

export const renderRegisterPage = async (req, res, next) => {
  res.render('register', { title: 'Register' });
};

export const renderRestorePasswordPage = async (req, res, next) => {
  res.render('restore-password', { title: 'Restore Password' });
};
