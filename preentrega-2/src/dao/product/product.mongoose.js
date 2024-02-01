import productModel from '../../models/product.model.js';

export class ProductMongooseDAO {
  async getProducts() {
    // agregamos un lean() para convertir los docs de mongoose de este arreglo a objetos de js para poder enviarlos al front y que no haya errores. agregamos el { virtual = true } asi cada doc no pierde el id (que tiene el mismo valor que _id) que seteamos en el schema!
    return await productModel.find().lean({ virtuals: true });
  }

  async getPaginatedProducts(query, paginationOptions) {
    const products = await productModel.paginate(
      { title: { $regex: query ? query : '', $options: 'i' } },
      { ...paginationOptions, lean: true }
    );

    const link = 'http://localhost:8080/products';

    products.prevLink = products.prevPage
      ? link +
        `?limit=${paginationOptions.limit}&page=${products.prevPage}${
          paginationOptions.sort ? `&sort=${paginationOptions.sort}` : ''
        }${query ? `&query=${query}` : ''}`
      : null;

    products.nextLink = products.nextPage
      ? link +
        `?limit=${paginationOptions.limit}&page=${products.nextPage}${
          paginationOptions.sort ? `&sort=${paginationOptions.sort}` : ''
        }${query ? `&query=${query}` : ''}`
      : null;

    products['payload'] = products.docs;

    delete products.docs;

    return products;
  }

  async getProductById(id) {
    // agregamos un lean() para convertir los docs de mongoose de este arreglo a objetos de js para poder enviarlos al front y que no haya errores. agregamos el { virtual = true } asi cada doc no pierde el id (que tiene el mismo valor que _id) que seteamos en el schema!
    return await productModel.findById(id).lean({ virtuals: true });
  }

  async getProductsById(productIds) {
    return await productModel
      .find({ _id: { $in: productIds } })
      .lean({ virtuals: true });
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
