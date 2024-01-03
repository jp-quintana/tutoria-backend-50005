import { ProductManager } from './models/Product.js';

const productManager = new ProductManager();

// Esto se llama immediately-invoked asynchronous function expression (IIFE).
// Lo podemos usar acá para invocar una función sin asignarla a una variable, y el () al final hace que se llame de inmediato. Es util acá porque al ser una funcion ahora puedo usar el async/await.
// Sin contenido quedaria asi: (async () => {})();
(async () => {
  await productManager.checkForFile();

  await productManager.addProduct({
    title: 'NVIDIA GeForce RTX 3080',
    description:
      'High-performance gaming graphics card with ray tracing capabilities.',
    price: 799.99,
    thumbnail: 'graphics_card_image_url.jpg',
    code: 'RTX3080',
    stock: 50,
  });

  await productManager.addProduct({
    title: 'Samsung 970 EVO Plus 1TB NVMe M.2 Internal SSD',
    description:
      'High-speed solid state drive for rapid data access and storage.',
    price: 149.99,
    thumbnail: 'ssd_image_url.jpg',
    code: 'RTX3080',
    stock: 100,
  });

  productManager.getProducts();

  await productManager.addProduct({
    title: 'Samsung 970 EVO Plus 1TB NVMe M.2 Internal SSD',
    description:
      'High-speed solid state drive for rapid data access and storage.',
    price: 149.99,
    thumbnail: 'ssd_image_url.jpg',
    code: '970EVOPLUS1TB',
    stock: 100,
  });

  await productManager.addProduct({
    title: 'AMD Ryzen 9 5900X 12-Core Processor',
    description:
      'High-performance processor ideal for gaming and content creation.',
    price: 549.99,
    thumbnail: 'cpu_image_url.jpg',
    code: 'RYZEN5900X',
    stock: 30,
  });

  productManager.getProducts();

  productManager.getProductById(1);
  productManager.getProductById(2);
  productManager.getProductById(100);
})();
