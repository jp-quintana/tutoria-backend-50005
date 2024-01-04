import express from 'express';

import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';

const app = express();
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
