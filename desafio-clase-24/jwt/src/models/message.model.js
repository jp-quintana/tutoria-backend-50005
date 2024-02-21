import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

// esto hace que todas los instancias de este schema tengan una propiedad "id" que es igual a "_id" pero ya en string
messageSchema.virtual('id').get(function () {
  return this._id.toString();
});

// conservamos cualquier propiedad virtual (en nuestro caso id) cuando convertimos un doc de mongoose a json (ejemplo cuando enviamos la respuesta al cliente)
messageSchema.set('toJSON', { virtuals: true });

// conservamos cualquier propiedad virtual (en nuestro caso id) cuando convertimos un doc de mongoose a un objeto de javascript (lo mismo que antes pero esto se hace para el lado del server)
messageSchema.set('toObject', { virtuals: true });

export default mongoose.model('Message', messageSchema);
