import {
  validateAddProduct,
  validateEditProduct,
} from '../utils/validation.js';
import { productDAO } from '../dao/product/index.js';

export const getProducts = async (req, res, next) => {
  try {
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

    res.json({ status: 'success', ...products });
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;

    const product = await productDAO.getProductById(pid);

    if (!product) throw new Error('Product not found');

    res.json({ product });
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const addProduct = async (req, res, next) => {
  const { body } = req;
  try {
    const missingProperty = validateAddProduct(body);

    if (missingProperty)
      throw new Error(`Missing property: ${missingProperty}`);

    await productDAO.addProduct(body);

    res.json({ message: 'Successfully added product' });
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const editProduct = async (req, res, next) => {
  try {
    const { body, params } = req;
    const { pid } = params;

    const validatedProduct = validateEditProduct(body);

    if (Object.keys(validatedProduct).length === 0)
      throw new Error(
        'Must include at least one of the following properties:  title, description, price, thumbnail, code, stock, category'
      );

    const updatedProduct = await productDAO.editProduct({
      id: pid,
      obj: validatedProduct,
    });

    if (!updatedProduct) throw new Error('Product not found');

    res.json({ message: 'Successfully edited product' });
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;

    const deletedProduct = await productDAO.deleteProduct(pid);

    if (!deletedProduct) throw new Error('Product not found');

    res.json({ message: 'Successfully deleted product' });
  } catch (err) {
    res.json({ error: err.message });
  }
};
