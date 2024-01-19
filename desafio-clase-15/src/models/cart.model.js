import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  products: [
    {
      // aca creamos una referencia a nuestro schema de Producto. mongoose con esto sabe que el carrito va a tener productos creados con el productSchema permitiendonos acceder a metodos especiales
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

// esto hace que todas los instancias de este schema tengan una propiedad "id" que es igual a "_id" pero ya en string
cartSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// esto lo agregas para que cualquiera propiedad virtual que hayas agregado efectivamente llegue al cliente/front
cartSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Cart', cartSchema);
