import { promises as fsp } from 'fs';

const filePath = './data/products.json';

export class Product {
  constructor({ id, title, description, price, thumbnail, code, stock }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

export class ProductManager {
  constructor() {
    this.products = [];
  }

  async checkForFile() {
    try {
      const response = await fsp.readFile(filePath);

      const data = await JSON.parse(response);

      this.products = data;
    } catch (e) {
      await fsp.writeFile(filePath, JSON.stringify([]));
    }
  }

  async addProduct({ title, description, price, thumbnail, code, stock }) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log('Se deben incluir todos los parametros!');
      return;
    }

    const existingCode = this.products.find((p) => p.code === code);

    if (existingCode) {
      console.log('Ya existe un producto con ese codigo!');
      return;
    }

    // Opcion 1

    const product = new Product({
      id: this.products.length + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });

    // Opcion 2

    // const product = {
    //   id: this.products.length + 1,
    //   title,
    //   description,
    //   price,
    //   thumbnail,
    //   code,
    //   stock,
    // };

    this.products.push(product);
    fsp.writeFile(filePath, JSON.stringify(this.products));

    console.log(
      `El producto ${product.title} se ha agregado con exito con el id ${product.id}!`
    );
  }

  getProducts() {
    console.log(this.products);
  }

  getProductById(id) {
    const existingProduct = this.products.find(
      (p) => p.id.toString() === id.toString()
    );

    if (!existingProduct) {
      console.log(`Producto no encontrado`);
    } else {
      console.log(existingProduct);
    }
  }
}
