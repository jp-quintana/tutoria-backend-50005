import { cartManager } from '../models/cart.model.js';
import { productManager } from '../models/product.model.js';

export const addCart = async (req, res, next) => {
  try {
    const { id } = await cartManager.addCart();

    res.json({
      message: `El carrito se ha agregado con exito con el id ${id}`,
    });
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const addProductToCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;

    // Si no existe el producto, este metodo ya arroja error y va al catch!
    await productManager.getProductById(pid);

    const cart = await cartManager.addProductToCart({
      cartId: cid,
      productId: pid,
    });

    res.json({
      message: `El producto con id ${pid} se ha agregado al carrito con id ${cid}`,
      ...cart,
    });
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const getCartProducts = async (req, res, next) => {
  try {
    const { cid } = req.params;

    const cart = await cartManager.getCartById(cid);

    // Usamos un Promise.all para poder usar async/await en el map!
    // https://midu.dev/como-usar-async-await-con-array-prototype-map/
    cart.products = await Promise.all(
      cart.products.map(async (p) => {
        const cartDetails = await productManager.getProductById(p.id);

        return { ...p, ...cartDetails };
      })
    );

    res.json({ products: cart.products });
  } catch (err) {
    res.json({ message: err.message });
  }
};
