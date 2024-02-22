import userModel from '../../models/user.model.js';

export class UserMongooseDAO {
  async addUser(obj) {
    const user = new userModel(obj);
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
