class Product {
  constructor({ id, title, description, price, thumbnail, code, stock }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct({ title, description, price, thumbnail, code, stock }) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log('Se deben incluir todos los parametros!');
      return;
    }

    const existingCode = this.products.find((p) => p.code === code);

    if (existingCode) {
      console.log('Ya existe un producto con ese codigo!');
      return;
    }

    // Opcion 1

    const product = new Product({
      id: this.products.length + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });

    // Opcion 2

    // const product = {
    //   id: this.products.length + 1,
    //   title,
    //   description,
    //   price,
    //   thumbnail,
    //   code,
    //   stock,
    // };

    this.products.push(product);

    console.log(
      `El producto ${product.title} se ha agregado con exito con el id ${product.id}!`
    );
  }

  getProducts() {
    console.log(this.products);
  }

  getProductById(id) {
    const existingProduct = this.products.find(
      (p) => p.id.toString() === id.toString()
    );

    if (!existingProduct) {
      console.log(`Producto no encontrado`);
    } else {
      console.log(existingProduct);
    }
  }
}

const productManager = new ProductManager();

productManager.addProduct({
  title: 'NVIDIA GeForce RTX 3080',
  description:
    'High-performance gaming graphics card with ray tracing capabilities.',
  price: 799.99,
  thumbnail: 'graphics_card_image_url.jpg',
  code: 'RTX3080',
  stock: 50,
});

productManager.addProduct({
  title: 'Samsung 970 EVO Plus 1TB NVMe M.2 Internal SSD',
  description:
    'High-speed solid state drive for rapid data access and storage.',
  price: 149.99,
  thumbnail: 'ssd_image_url.jpg',
  code: 'RTX3080',
  stock: 100,
});

productManager.getProducts();

productManager.addProduct({
  title: 'Samsung 970 EVO Plus 1TB NVMe M.2 Internal SSD',
  description:
    'High-speed solid state drive for rapid data access and storage.',
  price: 149.99,
  thumbnail: 'ssd_image_url.jpg',
  code: '970EVOPLUS1TB',
  stock: 100,
});

productManager.addProduct({
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
