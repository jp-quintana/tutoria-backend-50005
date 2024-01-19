import productModel from '../models/product.model.js';

class ProductDAO {
  async addProduct({
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
  }) {
    const newProduct = new productModel({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
    });

    await newProduct.save();
  }
}

export const productDAO = new ProductDAO();
