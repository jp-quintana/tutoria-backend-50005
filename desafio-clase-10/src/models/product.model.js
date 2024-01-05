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
    status,
  }) {
    this.id = id.toString();
    this.title = title;
    this.description = description;
    this.price = parseInt(price);
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = parseInt(stock);
    this.status = status || true;
    this.category = category;
  }
}

class ProductManager {
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

  async addProduct({
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    status,
    category,
  }) {
    if (!title || !description || !price || !code || !stock || !category) {
      throw new Error('Se deben incluir todos los parametros!');
    }

    const products = await this.checkForFile();

    const existingCode = products.find((p) => p.code === code);

    if (existingCode) {
      throw new Error('Ya existe un producto con ese codigo!');
    }

    const product = new Product({
      id: products.length + 1,
      title,
      description,
      price,
      thumbnail,
      category,
      status,
      code,
      stock,
    });

    products.push(product);
    await fsp.writeFile(filePath, JSON.stringify(products));

    return { title: product.title, id: product.id };
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
      throw new Error(`Producto no encontrado`);
    } else {
      return existingProduct;
    }
  }
}

export const productManager = new ProductManager();
