import 'dotenv/config.js';

import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';

import passport from 'passport';
import { initializePassport } from './config/passport.js';

import viewsRoutes from './routes/views.routes.js';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';

import { connectToDB } from './db/mongo.js';

const app = express();

app.use(
  session({
    secret: process.env.EXPRESS_SECRET,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 15,
    }),
    resave: true,
    saveUninitialized: true,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

// se declara con "runtimeOptions: { allowProtoPropertiesByDefault: true }" activado para que no haya drama con mongoose
app.engine(
  'handlebars',
  handlebars.engine({ runtimeOptions: { allowProtoPropertiesByDefault: true } })
);
// se indica donde se van a guardar las vistas
app.set('views', 'src/views');
// se define cual se va a usar
app.set('view engine', 'handlebars');

app.use('/', viewsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  try {
    await connectToDB();
    console.log(`listening on port ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});
