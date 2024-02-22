import cartModel from '../../models/cart.model.js';

export class CartMongooseDAO {
  async getCarts() {
    return await cartModel.find();
  }

  async getCartById(id) {
    // aca podemos usar populate gracias a la referencia que establecimos en el schema de cart
    // eso hace que todos los productos dentro del carrito ya tengan sus propiedades
    // https://mongoosejs.com/docs/populate.html
    return await cartModel.findOne({ _id: id }).populate({
      path: 'products.product',
      model: 'Product',
      options: { lean: { virtuals: true } },
    });
  }

  async addCart() {
    const newCart = new cartModel();

    await newCart.save();
  }

  async addProductToCart({ cid, product }) {
    // buscamos carrito
    const cart = await cartModel.findOne({ _id: cid });

    // si no existe el carrito tiramos error
    if (!cart) throw new Error('Cart not found');

    const existingCartProductIndex = cart.products.findIndex(
      (item) => item.product.toString() === product.id
    );

    console.log(existingCartProductIndex);

    if (existingCartProductIndex >= 0) {
      cart.products[existingCartProductIndex].quantity++;
    } else {
      cart.products.push({
        product: product.id,
        quantity: 1,
      });
    }

    await cart.save();
  }

  async deleteProductFromCart({ cid, pid }) {
    // buscamos carrito
    let cart = await cartModel.findOne({ _id: cid });

    // si no existe el carrito tiramos error
    if (!cart) throw new Error('Cart not found');

    const existingCartProductIndex = cart.products.findIndex(
      (item) => item.product.toString() === pid
    );

    if (existingCartProductIndex < 0) throw new Error('Product is not in cart');

    cart.products.splice(existingCartProductIndex, 1);

    await cart.save();
  }

  async deleteCart(id) {
    return await cartModel.findOneAndDelete({ _id: id });
  }

  async updateProductQuantity({ cid, product, updatedQuantity }) {
    let cart = await cartModel.findOne({ _id: cid });

    // si no existe el carrito tiramos error
    if (!cart) throw new Error('Cart not found');

    const existingCartProductIndex = cart.products.findIndex(
      (item) => item.product.toString() === product.id
    );

    if (existingCartProductIndex < 0) throw new Error('Product is not in cart');

    cart.products[existingCartProductIndex].quantity =
      updatedQuantity <= 0 ? 1 : updatedQuantity;
    await cart.save();
  }

  async updateCart({ cid, updatedProducts }) {
    let cart = await cartModel.findOne({ _id: cid });

    // si no existe el carrito tiramos error
    if (!cart) throw new Error('Cart not found');

    cart.products = updatedProducts;

    return await cart.save();
  }
}
