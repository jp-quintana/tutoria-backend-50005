import { promises as fsp } from 'fs';

const filePath = './src/data/carts.json';

class Cart {
  constructor({ id }) {
    this.id = id.toString();
    this.products = [];
  }
}

class CartManager {
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

  async addCart() {
    const carts = await this.checkForFile();

    const newCart = new Cart({ id: carts.length + 1 });

    carts.push(newCart);
    await fsp.writeFile(filePath, JSON.stringify(carts));

    return { id: newCart.id };
  }

  async addProductToCart({ productId, cartId }) {
    const carts = await this.checkForFile();

    const cartIndex = carts.findIndex((c) => c.id === cartId);

    if (cartIndex < 0) {
      throw new Error(`El carrito no existe!`);
    }

    const productIndex = carts[cartIndex].products.findIndex(
      (p) => p.id === productId
    );

    if (productIndex < 0) {
      carts[cartIndex].products.push({ id: productId, quantity: 1 });
    } else {
      carts[cartIndex].products[productIndex].quantity++;
    }

    await fsp.writeFile(filePath, JSON.stringify(carts));

    return { cart: carts[cartIndex] };
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
}

export const cartManager = new CartManager();
