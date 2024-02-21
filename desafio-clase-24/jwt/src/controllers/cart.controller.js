import { cartDAO } from '../dao/cart/index.js';
import { productDAO } from '../dao/product/index.js';

export const getCarts = async (req, res, next) => {
  try {
    const carts = await cartDAO.getCarts();

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

    res.json({ cartProducts: cart.products });
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const addCart = async (req, res, next) => {
  try {
    await cartDAO.addCart();

    res.json({ message: 'Successfully added cart' });
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const addProductToCart = async (req, res, next) => {
  try {
    const { pid, cid } = req.params;

    const product = await productDAO.getProductById(pid);

    if (!product) throw new Error('Product not found');

    await cartDAO.addProductToCart({ product, cid });
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

export const updateProductQuantityInCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const product = await productDAO.getProductById(pid);

    if (!product) throw new Error('Product not found');

    await cartDAO.updateProductQuantity({
      cid,
      product,
      updatedQuantity: +quantity,
    });

    res.json({ message: 'Successfully updated product quantity in cart' });
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const updateCart = async (req, res, next) => {
  try {
    const { cid } = req.params;

    const updatedProducts = req.body;

    // chequeamos si todos los productos que se quieren agregar existen
    const productIds = updatedProducts.map((p) => p.product);

    let products = await productDAO.getProductsById(productIds);

    const nonExistingProductIds = productIds.filter(
      (pid) => !products.some((p) => p.id.toString() === pid)
    );

    if (nonExistingProductIds.length > 0)
      throw new Error(
        `Product with id ${nonExistingProductIds[0]} does not exist`
      );

    await cartDAO.updateCart({
      cid,
      updatedProducts,
    });

    res.json({ message: 'Successfully updated product quantity in cart' });
  } catch (err) {
    res.json({ error: err.message });
  }
};
