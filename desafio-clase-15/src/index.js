import 'dotenv/config.js';

import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

import viewsRoutes from './routes/views.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';

import { connectToDB } from './db/mongo.js';
import { productDAO } from './dao/product/index.js';
import { messageDAO } from './dao/message.dao.js';

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
app.use('/api/carts', cartRoutes);

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
  // obtenemos de donde estamos recibiendo la peticion
  const urlArr = socket.request.headers.referer.split('/'); // => '[ 'http:', '', 'localhost:8080', 'pathname' ]'
  const pathname = urlArr[urlArr.length - 1].replace('?', ''); // => 'pathname'

  if (pathname === 'realtimeproducts') {
    try {
      const products = await productDAO.getProducts();
      socket.emit('populateProducts', products);
    } catch (err) {
      console.error('Error loading products:', err);
    }
  }

  socket.on('addProduct', async (data) => {
    try {
      await productDAO.addProduct(data);
      const products = await productDAO.getProducts();
      socket.emit('populateProducts', products);
    } catch (err) {
      console.log(err);
    }
  });

  if (pathname === 'chat') {
    try {
      const messages = await messageDAO.getMessages();
      socket.emit('populateMessages', messages);
    } catch (err) {
      console.error('Error loading messages:', err);
    }
  }

  socket.on('addMessage', async (data) => {
    try {
      await messageDAO.addMessage(data);
      const messages = await messageDAO.getMessages();
      socket.emit('populateMessages', messages);
    } catch (err) {
      console.log(err);
    }
  });
});
