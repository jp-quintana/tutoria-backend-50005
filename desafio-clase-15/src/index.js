import dotenv from 'dotenv';

import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

import viewsRoutes from './routes/views.routes.js';
import productRoutes from './routes/product.routes.js';

import ProductModel from './models/product.model.js';
import { connectToDB } from './db/mongo.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// se declara
app.engine('handlebars', handlebars.engine());
// se indica donde se van a guardar las vistas
app.set('views', 'src/views');
// se define cual se va a usar
app.set('view engine', 'handlebars');

app.use('/', viewsRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 8080;

const httpServer = app.listen(PORT, async () => {
  try {
    // conectamos a mongo
    await connectToDB();
    console.log(`listening on port ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});

export const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
  console.log('Nuevo cliente conectado');

  try {
    const products = await ProductModel.getProducts();
    socket.emit('populateProducts', products);
  } catch (err) {
    console.error('Error loading products:', err);
  }

  socket.on('addProduct', async (data) => {
    try {
      await ProductModel.addProduct(data);
      const products = await ProductModel.getProducts();
      socket.emit('populateProducts', products);
    } catch (err) {
      console.log(err);
    }
  });
});
