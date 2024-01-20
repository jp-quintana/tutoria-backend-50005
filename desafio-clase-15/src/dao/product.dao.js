import productModel from '../models/product.model.js';

class ProductDAO {
  async getProducts(limit) {
    return await productModel.find().limit(limit);
  }

  async getProductById(id) {
    return await productModel.findById(id);
  }

  async addProduct(obj) {
    const newProduct = new productModel(obj);

    await newProduct.save();
  }

  async editProduct({ id, obj }) {
    return await productModel.findOneAndUpdate({ _id: id }, obj);
  }

  async deleteProduct(id) {
    return await productModel.findOneAndDelete({ _id: id });
  }
}

export const productDAO = new ProductDAO();
