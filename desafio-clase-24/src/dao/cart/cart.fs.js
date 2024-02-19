import { promises as fsp } from 'fs';
import { productDAO } from '../product/index.js';

const filePath = './src/data/carts.json';

class Cart {
  constructor({ id }) {
    this.id = id.toString();
    this.products = [];
  }
}

export class CartFsDAO {
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

  async getCarts() {
    return await this.checkForFile();
  }

  async getCartById(id) {
    const carts = await this.checkForFile();

    const existingCart = carts.find((c) => c.id.toString() === id.toString());

    if (!existingCart) {
      throw new Error(`Carrito no encontrado`);
    } else {
      return existingCart;
    }
  }

  async addCart() {
    const carts = await this.checkForFile();

    const newCart = new Cart({ id: carts.length + 1 });

    carts.push(newCart);
    await fsp.writeFile(filePath, JSON.stringify(carts));

    return { id: newCart.id };
  }

  async addProductToCart({ cid, pid }) {
    const carts = await this.checkForFile();

    const cartIndex = carts.findIndex((c) => c.id === cid);

    if (cartIndex < 0) {
      throw new Error(`Cart not found`);
    }

    const products = await productDAO.getProducts();

    if (!products.find((p) => p.id === pid))
      throw new Error('Product not found');

    const productIndex = carts[cartIndex].products.findIndex(
      (p) => p.id === pid
    );

    if (productIndex < 0) {
      carts[cartIndex].products.push({ id: pid, quantity: 1 });
    } else {
      carts[cartIndex].products[productIndex].quantity++;
    }

    await fsp.writeFile(filePath, JSON.stringify(carts));
  }

  async deleteProductFromCart({ cid, pid }) {
    const carts = await this.checkForFile();

    const cartIndex = carts.findIndex((c) => c.id === cid);

    if (cartIndex < 0) {
      throw new Error(`Cart not found`);
    }

    carts[cartIndex].products = carts[cartIndex].products.filter(
      (p) => p.id !== pid
    );

    await fsp.writeFile(filePath, JSON.stringify(carts));
  }

  async deleteCart(id) {
    const carts = await this.checkForFile();

    const cartIndex = carts.findIndex((c) => c.id === id);

    if (cartIndex < 0) {
      throw new Error(`Cart not found`);
    }

    const cartToDelete = carts[cartIndex];

    const updatedCarts = carts.filter((c) => c.id !== id);

    await fsp.writeFile(filePath, JSON.stringify(updatedCarts));

    return cartToDelete;
  }
}
