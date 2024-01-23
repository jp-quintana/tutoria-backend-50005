import messageModel from '../models/message.model.js';

class MessageDAO {
  async getMessages() {
    // agregamos un lean() para convertir los docs de mongoose de este arreglo a objetos de js para poder enviarlos al front y que no haya errores
    return await messageModel.find().lean();
  }
  async addMessage(obj) {
    const newMessage = new messageModel(obj);
    await newMessage.save();
  }
}

export const messageDAO = new MessageDAO();
