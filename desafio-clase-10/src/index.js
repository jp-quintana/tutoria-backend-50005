import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

import viewsRoutes from './routes/views.routes.js';

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

const PORT = 8080;

const httpServer = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('addProduct', (data) => {
    console.log(data);
  });
});
