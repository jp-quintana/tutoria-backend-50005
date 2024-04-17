import userModel from '../../models/user.model.js';
import cartModel from '../../models/cart.model.js';

export class UserMongooseDAO {
  async addUser(obj) {
    const user = new userModel(obj);

    const cart = new cartModel();

    user.cart = cart._id;

    await user.save();

    return user.toObject({ virtuals: true });
  }

  async getUserByEmail({ email }) {
    return await userModel.findOne({ email }).lean({ virtuals: true });
  }

  async getUserById(id) {
    return await userModel.findOne({ _id: id }).lean({ virtuals: true });
  }
}
