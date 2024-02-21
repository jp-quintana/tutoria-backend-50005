import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import leanVirtuals from 'mongoose-lean-virtuals';

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
  category: { type: String, required: true },
});

// esto hace que todas los instancias de este schema tengan una propiedad "id" que es igual a "_id" pero ya en string
productSchema.virtual('id').get(function () {
  return this._id.toString();
});

// conservamos cualquier propiedad virtual (en nuestro caso id) cuando convertimos un doc de mongoose a json (ejemplo cuando enviamos la respuesta al cliente)
productSchema.set('toJSON', { virtuals: true });

// conservamos cualquier propiedad virtual (en nuestro caso id) cuando convertimos un doc de mongoose a un objeto de javascript (lo mismo que antes pero esto se hace para el lado del server)
productSchema.set('toObject', { virtuals: true });

// seteamos el paginate
productSchema.plugin(paginate);

// agregamos este plugin asi cuando usamos .lean() en una busqueda no perdemos la propiedad virtual que creamos (id).
productSchema.plugin(leanVirtuals);

export default mongoose.model('Product', productSchema);
