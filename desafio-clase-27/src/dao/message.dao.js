import messageModel from '../models/message.model.js';

class MessageDAO {
  async getMessages() {
    // agregamos un lean() para convertir los docs de mongoose de este arreglo a objetos de js para poder enviarlos al front y que no haya errores. agregamos el { virtual = true } asi cada doc no pierde el id (que tiene el mismo valor que _id) que seteamos en el schema!
    return await messageModel.find().lean({ virtuals: true });
  }
  async addMessage(obj) {
    const newMessage = new messageModel(obj);
    await newMessage.save();
  }
}

export const messageDAO = new MessageDAO();
