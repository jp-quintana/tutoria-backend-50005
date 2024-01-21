import { cartDAO } from '../dao/cart.dao.js';
import { productDAO } from '../dao/product.dao.js';

export const getCarts = async (req, res, next) => {
  try {
    const carts = await cartDAO.getCarts();

    // const products = await ProductModel.getProducts();
    // socketServer.emit('populateProducts', products);
    res.json({ carts });
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const getCartProducts = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await cartDAO.getCartById(cid);

    if (!cart) throw new Error('Cart not found');

    // const products = await ProductModel.getProducts();
    // socketServer.emit('populateProducts', products);
    res.json({ cartProducts: cart.products });
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const addCart = async (req, res, next) => {
  try {
    await cartDAO.addCart();

    // const products = await ProductModel.getProducts();
    // socketServer.emit('populateProducts', products);
    res.json({ message: 'Successfully added cart' });
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const addProductToCart = async (req, res, next) => {
  try {
    const { pid, cid } = req.params;

    await cartDAO.addProductToCart({ pid, cid });
    res.json({ message: 'Successfully added product to cart' });
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const deleteProductFromCart = async (req, res, next) => {
  try {
    const { pid, cid } = req.params;

    await cartDAO.deleteProductFromCart({ pid, cid });
    res.json({ message: 'Successfully deleted product from cart' });
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const deleteCart = async (req, res, next) => {
  try {
    const { cid } = req.params;

    const deletedCart = await cartDAO.deleteCart(cid);

    if (!deletedCart) throw new Error('Cart not found');

    res.json({ message: 'Successfully deleted cart' });
  } catch (err) {
    res.json({ error: err.message });
  }
};
