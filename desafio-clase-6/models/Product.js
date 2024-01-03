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

  // async addProduct({ title, description, price, thumbnail, code, stock }) {
  //   if (!title || !description || !price || !thumbnail || !code || !stock) {
  //     // console.log('Se deben incluir todos los parametros!');
  //     // return;

  //     throw new Error('Se deben incluir todos los parametros!');
  //   }

  //   const products = await checkForFile();

  //   const existingCode = products.find((p) => p.code === code);

  //   if (existingCode) {
  //     // console.log('Ya existe un producto con ese codigo!');
  //     // return;

  //     throw new Error('Ya existe un producto con ese codigo!');
  //   }

  //   // Opcion 1

  //   const product = new Product({
  //     id: products.length + 1,
  //     title,
  //     description,
  //     price,
  //     thumbnail,
  //     code,
  //     stock,
  //   });

  //   // Opcion 2

  //   // const product = {
  //   //   id: this.products.length + 1,
  //   //   title,
  //   //   description,
  //   //   price,
  //   //   thumbnail,
  //   //   code,
  //   //   stock,
  //   // };

  //   products.push(product);
  //   fsp.writeFile(filePath, JSON.stringify(products));

  //   return { title: product.title, id: product.id };

  //   // console.log(
  //   //   `El producto ${product.title} se ha agregado con exito con el id ${product.id}!`
  //   // );
  // }

  async getProducts() {
    return await this.checkForFile();
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
