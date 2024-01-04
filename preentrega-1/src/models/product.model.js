import { promises as fsp } from 'fs';

const filePath = './src/data/products.json';

class Product {
  constructor({
    id,
    title,
    description,
    price,
    thumbnails,
    code,
    stock,
    category,
    status,
  }) {
    this.id = id.toString();
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnails = thumbnails;
    this.code = code;
    this.stock = stock;
    this.status = status;
    this.category = category;
  }
}

class ProductManager {
  async checkForFile() {
    try {
      const response = await fsp.readFile(filePath);

      const data = await JSON.parse(response);

      return data;
    } catch (e) {
      await fsp.writeFile(filePath, JSON.stringify([]));
      return [];
    }
  }

  async addProduct({
    title,
    description,
    price,
    thumbnails,
    code,
    stock,
    status,
    category,
  }) {
    if (
      !title ||
      !description ||
      !price ||
      !status ||
      !code ||
      !stock ||
      !category
    ) {
      throw new Error('Se deben incluir todos los parametros!');
    }

    const products = await this.checkForFile();

    const existingCode = products.find((p) => p.code === code);

    if (existingCode) {
      throw new Error('Ya existe un producto con ese codigo!');
    }

    const product = new Product({
      id: products.length + 1,
      title,
      description,
      price,
      thumbnails,
      category,
      status,
      code,
      stock,
    });

    products.push(product);
    await fsp.writeFile(filePath, JSON.stringify(products));

    return { title: product.title, id: product.id };
  }

  async editProduct(productId, productDetails) {
    // Las unicas propiedades que voy a permitir cambiar
    const allowedProperties = [
      'title',
      'description',
      'price',
      'thumbnails',
      'category',
      'code',
      'stock',
    ];

    // Todas las propiedades que recibo en el body
    const receivedProperties = Object.keys(productDetails);

    // Las propiedades que que recibo en el body que no permito cambiar
    const invalidProperties = receivedProperties.filter(
      (property) => !allowedProperties.includes(property)
    );

    if (invalidProperties.length > 0) {
      throw new Error(
        'Solo se permiten modificar las siguientes propiedades: title, description, price, code, stock, category, thumbnails!'
      );
    }

    const products = await this.checkForFile();

    const existingCode = products.find((p) => p.code === productDetails.code);

    if (existingCode) {
      throw new Error('Ya existe un producto con ese codigo!');
    }

    let existingProductIndex = products.findIndex((p) => p.id === productId);

    if (existingProductIndex < 0) {
      throw new Error('El producto que se quiere modificar no existe!');
    }

    const oldProduct = { ...products[existingProductIndex] };

    products[existingProductIndex] = {
      ...products[existingProductIndex],
      ...productDetails,
    };

    await fsp.writeFile(filePath, JSON.stringify(products));

    return { oldProduct, updatedProduct: products[existingProductIndex] };
  }

  async getProducts(limit) {
    const products = await this.checkForFile();
    if (limit > 0) {
      return products.slice(0, limit);
    } else {
      return products;
    }
  }

  async getProductById(id) {
    const products = await this.checkForFile();

    const existingProduct = products.find(
      (p) => p.id.toString() === id.toString()
    );

    if (!existingProduct) {
      throw new Error(`Producto no encontrado`);
    } else {
      return existingProduct;
    }
  }

  async deleteProduct(id) {
    const products = await this.checkForFile();

    const existingProduct = products.find(
      (p) => p.id.toString() === id.toString()
    );

    if (!existingProduct) {
      throw new Error(`Producto no encontrado`);
    } else {
      // Concateno los metodos fitler y map. Primero con el filter elimino el producto con el id que se recibio en el body. SEgundo con el map, modificamos el id de todos los productos que quedan para que el orden no se altere (1, 2, 3,...)!
      const updatedProducts = products
        .filter((p) => p.id !== id)
        .map((p, index) => {
          return { ...p, id: (index + 1).toString() };
        });

      await fsp.writeFile(filePath, JSON.stringify(updatedProducts));

      return { updatedProducts };
    }
  }
}

export const productManager = new ProductManager();
