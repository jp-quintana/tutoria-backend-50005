import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  products: [
    {
      // aca creamos una referencia a nuestro schema de Producto. mongoose con esto sabe que el carrito va a tener productos creados con el cartSchema permitiendonos acceder a metodos especiales
      productId: {
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

// conservamos cualquier propiedad virtual (en nuestro caso id) cuando convertimos un doc de mongoose a json (ejemplo cuando enviamos la respuesta al cliente)
cartSchema.set('toJSON', { virtuals: true });

// conservamos cualquier propiedad virtual (en nuestro caso id) cuando convertimos un doc de mongoose a un objeto de javascript (lo mismo que antes pero esto se hace para el lado del server)
cartSchema.set('toObject', { virtuals: true });

export default mongoose.model('Cart', cartSchema);
