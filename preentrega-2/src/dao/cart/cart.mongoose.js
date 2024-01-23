import { productDAO } from '../product/index.js';
import cartModel from '../../models/cart.model.js';

export class CartMongooseDAO {
  async getCarts() {
    return await cartModel.find();
  }

  async getCartById(id) {
    // aca podemos usar populate gracias a la referencia que establecimos en el schema de cart
    // eso hace que todos los productos dentro del carrito ya tengan sus propiedades
    // https://mongoosejs.com/docs/populate.html
    return await cartModel
      .findOne({ _id: id })
      .populate({ path: 'products.product', model: 'Product' });
  }

  async addCart() {
    const newCart = new cartModel();

    await newCart.save();
  }

  async addProductToCart({ cid, pid }) {
    // buscamos carrito
    const cart = await this.getCartById(cid);

    // si no existe el carrito tiramos error
    if (!cart) throw new Error('Cart not found');

    // buscamos product
    const product = await productDAO.getProductById(pid);

    // si no existe el producto tiramos error
    if (!product) throw new Error('Product not found');

    // dado que populamos los productos cuando usamos getCartById todo los productos dentro de "cart" ya tienen todas sus propiedades!
    // probar con console.log(cart)
    const existingCartProductIndex = cart.products.findIndex(
      (item) => item.product.id === pid
    );

    if (existingCartProductIndex >= 0) {
      cart.products[existingCartProductIndex].quantity++;
    } else {
      // es importante guardar el product usando la propiedad "_id" ya que eso contiene el ObjectId de mongoose y lo necesitamos para usar la referencia que establecimos en el schema de cart
      // https://mongoosejs.com/docs/populate.html
      cart.products.push({
        product: product._id,
        quantity: 1,
      });
    }

    await cart.save();
  }

  async deleteProductFromCart({ cid, pid }) {
    // buscamos carrito
    let cart = await this.getCartById(cid);

    // si no existe el carrito tiramos error
    if (!cart) throw new Error('Cart not found');

    // dado populamos los productos cuando usamos getCartById todo los productos dentro de "cart" ya tienen todas sus propiedades!
    // probar con console.log(cart)
    cart.products = cart.products.filter((item) => item.product.id !== pid);

    await cart.save();
  }

  async deleteCart(id) {
    return await cartModel.findOneAndDelete({ _id: id });
  }
}
