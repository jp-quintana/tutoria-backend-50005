import { productManager } from '../models/product.model.js';

export const fetchProducts = async (req, res, next) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts(limit);
    res.json(products);
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const fetchProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);
    res.json(product);
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const { body } = req;

    const { title, id } = await productManager.addProduct(body);
    res.json({
      message: `El producto ${title} se ha agregado con exito con el id ${id}!`,
    });
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const editProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const { body } = req;

    const products = await productManager.editProduct(pid, body);

    res.json({
      message: `El producto se ha actualizado con exito!`,
      ...products,
    });
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;

    const products = await productManager.deleteProduct(pid);

    res.json({
      message: `El producto se ha borrado con exito!`,
      ...products,
    });
  } catch (err) {
    res.json({ message: err.message });
  }
};
