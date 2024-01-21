const socket = io();

socket.emit('connection');

// ===============================
// real time products
// ===============================

socket.on('populateProducts', (data) => {
  const table = document.getElementById('table');

  table.innerHTML = '';

  if (data.length > 0) {
    const firstProduct = data[0];

    const keys = Object.keys(firstProduct);

    const table = document.getElementById('table');
    const tableHeaderRow = table.insertRow();

    keys.forEach((key) => {
      const th = document.createElement('th');
      th.textContent = key;
      tableHeaderRow.appendChild(th);
    });

    data.forEach((product) => {
      const row = table.insertRow();

      keys.forEach((key) => {
        const cell = row.insertCell();
        cell.textContent = product[key];
      });
    });
  }
});

const form = document.getElementById('form');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const thumbnail = document.getElementById('thumbnail').value;
    const code = document.getElementById('code').value;
    const stock = document.getElementById('stock').value;
    const category = document.getElementById('category').value;

    const data = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
    };

    // Opcion via POST (HTTP) => lo ataja la ruta post /api/products en product.routes.js
    try {
      await fetch('http://localhost:8080/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      form.reset();
    } catch (err) {
      console.error('Error adding product:', err.message);
    }

    // // Opcion via websockets => lo ataja index.js en src
    // socket.emit('addProduct', data);
    // form.reset();
  });
}

// ===============================
// chat
// ===============================

socket.on('populateMessages', (data) => {
  const chat = document.getElementById('chat');

  chat.innerHTML = '';

  if (data.length > 0) {
    data.forEach((message) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${message.user}: ${message.message}`;
      chat.appendChild(listItem);
    });
  }
});

const chatForm = document.getElementById('chatForm');

if (chatForm) {
  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!email || !message) {
      alert('Email and message must not be empty!');
      return;
    }

    const data = {
      user: email,
      message,
    };

    socket.emit('addMessage', data);
  });
}
