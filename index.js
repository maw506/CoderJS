// Variables para llevar un seguimiento de la lista de compras y el costo total
const productos = [
  {
    id: 1,
    nombre: "CHOCOLATE",
    precio: 50,
  },
  {
    id: 2,
    nombre: "ALFAJOR",
    precio: 80,
  },
  {
    id: 3,
    nombre: "PAPITAS",
    precio: 100,
  },
  {
    id: 4,
    nombre: "GALLETAS",
    precio: 80,
  },
  {
    id: 5,
    nombre: "COCA COLA",
    precio: 150,
  },
];
const listaCompras = [];
let costoTotal = 0;

// Función para agregar un producto a la lista
function agregarProducto(producto) {
  // Buscar si el producto ya está en la lista
  const productoExistente = listaCompras.find((item) => item.id === producto.id);

  if (productoExistente) {
    // Si el producto ya existe incrementa en +1 la cantidad y actualiza el precio
    productoExistente.cantidad++;
    productoExistente.precioTotal = productoExistente.cantidad * producto.precio;
  } else {
    // Si el producto no existe se agrega a la lista
    listaCompras.push({ ...producto, cantidad: 1, precioTotal: producto.precio });
  }

  // Actualiza el costo total
  costoTotal += producto.precio;

  // Llamar a la función para actualizar la lista de compras en la página
  actualizarListaCompras();
}


// Función para actualizar la lista de compras en la página
function actualizarListaCompras() {
  const listaComprasElement = document.getElementById("lista-compras");

  // Limpiar cualquier contenido previo en la lista
  listaComprasElement.innerHTML = "";

  // Recorrer la lista de compras y agregar cada producto
  listaCompras.forEach((producto) => {
    const row = document.createElement("div");
    row.classList.add("row");

    const cantidadCol = document.createElement("div");
    cantidadCol.classList.add("col-3", "text-center");
    cantidadCol.textContent = producto.cantidad;

    const productoCol = document.createElement("div");
    productoCol.classList.add("col-6");
    productoCol.textContent = producto.nombre;

    const precioCol = document.createElement("div");
    precioCol.classList.add("col-3");
    precioCol.textContent = "$" + producto.precioTotal;

    row.appendChild(cantidadCol);
    row.appendChild(productoCol);
    row.appendChild(precioCol);

    listaComprasElement.appendChild(row);
  });

  // Actualizar el costo total
  const totalElement = document.getElementById("total");
  totalElement.textContent = costoTotal;
}


// DECIDIR AGREGAR LOS EVENTOS DE LOS BOTONES PARA MAS DINAMISMO A PESAR DE QUE NO SE EVALUA EN ESTA INTANCIA

document.addEventListener("DOMContentLoaded", function () {
  const botonesAgregar = document.querySelectorAll("#añadir");

  botonesAgregar.forEach((boton, index) => {
    // El índice identifica qué producto se está agregando
    boton.addEventListener("click", function () {
      const producto = productos[index];
      agregarProducto(producto);
    });
  });
});

