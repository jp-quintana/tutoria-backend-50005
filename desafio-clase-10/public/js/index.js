const socket = io();

// socket.emit('connect');

const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // socket.emit('addProduct');
});
