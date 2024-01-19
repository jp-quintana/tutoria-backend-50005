import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

// esto hace que todas los instancias de este schema tengan una propiedad "id" que es igual a "_id" pero ya en string
messageSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// esto lo agregas para que cualquiera propiedad virtual que hayas agregado efectivamente llegue al cliente/front
messageSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Cart', messageSchema);
