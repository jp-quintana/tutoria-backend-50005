import express from 'express';

import { ProductManager } from './models/Product.js';

const productManager = new ProductManager();
const app = express();

app.get('/api/products/', async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts();

    console.log(products);

    if (limit > 0) {
      res.json(products.slice(0, limit));
    } else {
      res.json(products);
    }
  } catch (err) {
    res.json({ message: err.message });
  }
});

app.get('/api/products/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);

    res.json(product);
  } catch (err) {
    res.json({ message: err.message });
  }
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
