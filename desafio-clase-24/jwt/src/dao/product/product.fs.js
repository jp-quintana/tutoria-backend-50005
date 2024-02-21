import { promises as fsp } from 'fs';

const filePath = './src/data/products.json';

class Product {
  constructor({
    id,
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
  }) {
    this.id = id.toString();
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.status = true;
    this.category = category;
  }
}

export class ProductFsDAO {
  async checkForFile() {
    try {
      const response = await fsp.readFile(filePath);

      const data = await JSON.parse(response);

      return data;
    } catch (e) {
      await fsp.writeFile(filePath, JSON.stringify([]));
      return [];
    }
  }

  async getProducts(limit) {
    const products = await this.checkForFile();
    if (limit > 0) {
      return products.slice(0, limit);
    } else {
      return products;
    }
  }

  async getProductById(id) {
    const products = await this.checkForFile();

    const existingProduct = products.find(
      (p) => p.id.toString() === id.toString()
    );

    if (!existingProduct) {
      throw new Error(`Product not found`);
    } else {
      return existingProduct;
    }
  }

  async addProduct(obj) {
    const products = await this.checkForFile();

    // const existingCode = products.find((p) => p.code === obj.code);

    // if (existingCode) {
    //   throw new Error('A product with that code already exists');
    // }

    const product = new Product({
      id: products.length + 1,
      ...obj,
    });

    products.push(product);

    await fsp.writeFile(filePath, JSON.stringify(products));
  }

  async editProduct({ id, obj }) {
    const products = await this.checkForFile();

    let existingProductIndex = products.findIndex((p) => p.id === id);

    if (existingProductIndex < 0) {
      return null;
    }

    // const existingCode = products.find((p) => p.code === obj.code);

    // if (existingCode) {
    //   throw new Error('A product with that code already exists');
    // }

    products[existingProductIndex] = {
      ...products[existingProductIndex],
      ...obj,
    };

    await fsp.writeFile(filePath, JSON.stringify(products));

    return products[existingProductIndex];
  }

  async deleteProduct(id) {
    const products = await this.checkForFile();

    const product = products.find((p) => p.id.toString() === id.toString());

    if (!product) {
      return null;
    } else {
      // Concateno los metodos fitler y map. Primero con el filter elimino el producto con el id que se recibio en el body. Segundo con el map, modificamos el id de todos los productos que quedan para que el orden no se altere (1, 2, 3,...)!
      const updatedProducts = products
        .filter((p) => p.id !== id)
        .map((p, index) => {
          return { ...p, id: (index + 1).toString() };
        });

      await fsp.writeFile(filePath, JSON.stringify(updatedProducts));

      return product;
    }
  }
}
