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

// esto lo agregas para que cualquiera propiedad virtual que hayas agregado efectivamente llegue al cliente/front
productSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Product', productSchema);
