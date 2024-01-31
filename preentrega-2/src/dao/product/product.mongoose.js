import productModel from '../../models/product.model.js';

export class ProductMongooseDAO {
  async getProducts(query, paginationOptions) {
    // if (!query && !paginationOptions) {
    //   return await productModel.find().lean();
    // }

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
    return await productModel.findById(id).lean();
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
