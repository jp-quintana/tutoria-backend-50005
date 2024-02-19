import productModel from '../../models/product.model.js';

export class ProductMongooseDAO {
  async getProducts() {
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
    return await productModel
      .findOneAndUpdate({ _id: id }, obj)
      .lean({ virtuals: true });
  }

  async deleteProduct(id) {
    return await productModel
      .findOneAndDelete({ _id: id })
      .lean({ virtuals: true });
  }
}
