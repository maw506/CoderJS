// Obtener el carrito desde localStorage
const storedCart = JSON.parse(localStorage.getItem("cart")) || {};

const storedProducts = JSON.parse(localStorage.getItem("products")) || {};

// Función para quitar un producto del carrito
const removeFromCart = (productId) => {
  if (storedCart[productId]) {
    storedCart[productId]--;

    if (storedCart[productId] <= 0) {
      delete storedCart[productId];
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));

    generateCartRows();
  }
};

// Función para actualizar la cantidad de un producto en el carrito
const updateQuantity = (productId, newQuantity) => {
  storedCart[productId] = parseInt(newQuantity) || 0;

  localStorage.setItem("cart", JSON.stringify(storedCart));

  generateCartRows();
};

// Función para generar las filas de la tabla
const generateCartRows = () => {
  const cartBody = document.getElementById("cartBody");

  cartBody.innerHTML = "";

  // Iterar sobre los productos en el carrito
  for (const productId in storedCart) {
    const product = storedProducts.find((item) => item.id == productId);

    if (product) {
      const row = document.createElement("tr");
      row.classList.add("table-body-row");

      // Columna "Quitar"
      const removeColumn = document.createElement("td");
      removeColumn.classList.add("product-remove");
      const removeButton = document.createElement("button");
      removeButton.classList.add("btn");
      removeButton.textContent = "X";
      // Agrega un evento al botón para quitar el producto del carrito
      removeButton.addEventListener("click", () => removeFromCart(productId));
      removeColumn.appendChild(removeButton);
      row.appendChild(removeColumn);

      // Columna "Imagen"
      const imageColumn = document.createElement("td");
      imageColumn.classList.add("product-image");
      const productImage = document.createElement("img");
      productImage.src = "." + product.photo;
      productImage.alt = product.name;
      imageColumn.appendChild(productImage);
      row.appendChild(imageColumn);

      // Columna "Producto"
      const productColumn = document.createElement("td");
      productColumn.textContent = product.name;
      row.appendChild(productColumn);

      // Columna "Precio"
      const priceColumn = document.createElement("td");
      priceColumn.textContent = `$ ${product.price}`;
      row.appendChild(priceColumn);

      // Columna "Cantidad"
      const quantityColumn = document.createElement("td");
      quantityColumn.classList.add("product-quantity");
      const quantityInput = document.createElement("input");
      quantityInput.type = "number";
      quantityInput.placeholder = "0";
      quantityInput.value = storedCart[productId];
      // Agrega un evento al input para actualizar la cantidad en el carrito
      quantityInput.addEventListener("change", (event) =>
        updateQuantity(productId, event.target.value)
      );
      quantityColumn.appendChild(quantityInput);
      row.appendChild(quantityColumn);

      // Columna "Total"
      const totalColumn = document.createElement("td");
      totalColumn.classList.add("product-total"); // Nuevo identificador
      totalColumn.textContent = `$ ${product.price * storedCart[productId]}`;
      row.appendChild(totalColumn);

      // Agrega la fila a la tabla
      cartBody.appendChild(row);
    }
  }
};

// Función para pagar, actualmente limpia el carrito
const payButton = document.getElementById("payButton");

payButton.addEventListener("click", async (event) => {
  event.preventDefault();
  localStorage.removeItem("cart");
  storedCart = {};

  await Swal.fire({
    icon: "info",
    title: "Info",
    text: "Carrito limpiado. Gracias por tu compra.",
  }).then(() => {
    window.location.reload();
  });
});

// Obtener el contenedor donde se mostrará la tabla de resumen del pedido
const tableDataContainer = document.getElementById("tableData");

// Función para calcular el subtotal
const calculateSubtotal = () => {
  let subtotal = 0;

  for (const productId in storedCart) {
    const product = storedProducts.find((item) => item.id == productId);
    if (product) {
      subtotal += product.price * storedCart[productId];
    }
  }

  return subtotal;
};

// Función para generar la tabla de resumen del pedido
//en esta funcion quiero lograr que se haga de forma dinamica al
// momento de acmbiar el numero de canidad tqambien pero tenia algunos errores

const generateTableData = () => {
  const subtotal = calculateSubtotal();
  const shippingCost = 50;
  const total = subtotal + shippingCost;

  // Crear la nueva tabla
  const tableData = document.createElement("table");
  tableData.classList.add("total-table");

  // Cabecera de la tabla
  tableData.innerHTML = `
    <thead class="total-table-head">
      <tr class="table-total-row">
        <th>Total</th>
        <th>Precio</th>
      </tr>
    </thead>
    <tbody>
      <tr class="total-data">
        <td><strong>Subtotal:</strong></td>
        <td>$${subtotal.toFixed(2)}</td>
      </tr>
      <tr class="total-data">
        <td><strong>Envio:</strong></td>
        <td>$${shippingCost.toFixed(2)}</td>
      </tr>
      <tr class="total-data">
        <td><strong>Total a pagar:</strong></td>
        <td>$${total.toFixed(2)}</td>
      </tr>
    </tbody>
  `;

  // Limpiar el contenedor antes de agregar la nueva tabla
  tableDataContainer.innerHTML = "";

  // Agregar la nueva tabla al contenedor
  tableDataContainer.appendChild(tableData);
};

// Llama a la función inicial para generar las filas de la tabla
generateCartRows();
generateTableData();
