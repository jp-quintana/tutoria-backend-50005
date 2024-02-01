import userModel from '../../models/user.model.js';

export class UserMongooseDAO {
  async addUser(obj) {
    const user = new userModel(obj);
    return await user.save();
  }
}
