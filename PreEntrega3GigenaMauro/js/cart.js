// Obtener el carrito desde localStorage
const storedCart = JSON.parse(localStorage.getItem('cart')) || {};

const storedProducts = JSON.parse(localStorage.getItem('products')) || {};

// Función para quitar un producto del carrito
const removeFromCart = (productId) => {

};

// Función para actualizar la cantidad de un producto en el carrito
const updateQuantity = (productId, newQuantity) => {

};

// Función para generar las filas de la tabla
const generateCartRows = () => {
  const cartBody = document.getElementById('cartBody');

  // Iterar sobre los productos en el carrito
  for (const productId in storedCart) {
    const product = storedProducts.find((item) => item.id == productId);

    if (product) {
      const row = document.createElement('tr');
      row.classList.add('table-body-row');

      // Columna "Quitar"
      const removeColumn = document.createElement('td');
      removeColumn.classList.add('product-remove');
      const removeButton = document.createElement('button');
      removeButton.classList.add('btn');
      removeButton.textContent = 'X';
      // Agrega un evento al botón para quitar el producto del carrito
      removeButton.addEventListener('click', () => removeFromCart(productId));
      removeColumn.appendChild(removeButton);
      row.appendChild(removeColumn);

      // Columna "Imagen"
      const imageColumn = document.createElement('td');
      imageColumn.classList.add('product-image');
      const productImage = document.createElement('img');
      productImage.src = '.' + product.photo;
      productImage.alt = product.name;
      imageColumn.appendChild(productImage);
      row.appendChild(imageColumn);

      // Columna "Producto"
      const productColumn = document.createElement('td');
      productColumn.textContent = product.name;
      row.appendChild(productColumn);

      // Columna "Precio"
      const priceColumn = document.createElement('td');
      priceColumn.textContent = `$ ${product.price}`;
      row.appendChild(priceColumn);

      // Columna "Cantidad"
      const quantityColumn = document.createElement('td');
      quantityColumn.classList.add('product-quantity');
      const quantityInput = document.createElement('input');
      quantityInput.type = 'number';
      quantityInput.placeholder = '0';
      quantityInput.value = storedCart[productId];
      // Agrega un evento al input para actualizar la cantidad en el carrito
      quantityInput.addEventListener('change', (event) => updateQuantity(productId, event.target.value));
      quantityColumn.appendChild(quantityInput);
      row.appendChild(quantityColumn);

      // Columna "Total"
      const totalColumn = document.createElement('td');
      totalColumn.textContent = `$ ${product.price * storedCart[productId]}`;
      row.appendChild(totalColumn);

      // Agrega la fila a la tabla
      cartBody.appendChild(row);
    }
  }
};

// Llama a la función inicial para generar las filas de la tabla
generateCartRows();
