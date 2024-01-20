import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  category: String,
});

// esto hace que todas los instancias de este schema tengan una propiedad "id" que es igual a "_id" pero ya en string
productSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// conservamos cualquier propiedad virtual (en nuestro caso id) cuando convertimos un doc de mongoose a json (ejemplo cuando enviamos la respuesta al cliente)
productSchema.set('toJSON', { virtuals: true });

// conservamos cualquier propiedad virtual (en nuestro caso id) cuando convertimos un doc de mongoose a un objeto de javascript (lo mismo que antes pero esto se hace para el lado del server)
productSchema.set('toObject', { virtuals: true });

export default mongoose.model('Product', productSchema);
