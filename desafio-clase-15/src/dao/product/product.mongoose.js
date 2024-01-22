import productModel from '../../models/product.model.js';

export class ProductMongooseDAO {
  async getProducts(limit) {
    // agregamos un lean() para convertir los docs de mongoose de este arreglo a objetos de js para poder enviarlos al front y que no haya errores
    return await productModel.find().limit(limit).lean();
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
