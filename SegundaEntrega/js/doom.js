const cart = [];
const products = [
  {
    id: 1,
    name: "Frutilla",
    photo: "./img/product-img-1.jpg",
    price: 85,
  },
  {
    id: 2,
    name: "Uva",
    photo: "./img/product-img-2.jpg",
    price: 100,
  },
  {
    id: 3,
    name: "Limones",
    photo: "./img/product-img-3.jpg",
    price: 150,
  },
];

// iteracion de los objetos en la pagina
const productosContainer = document.getElementById("products");

products.forEach((producto) => {
  const productDiv = document.createElement("div");
  productDiv.classList.add("col-lg-4", "col-md-6", "text-center");

  const productItem = document.createElement("div");
  productItem.classList.add("single-product-item");

  const productImage = document.createElement("div");
  productImage.classList.add("product-image");

  const productLink = document.createElement("a");
  productLink.href = "single-product.html"; //futura página para ver el detalle del producto

  const productImg = document.createElement("img");
  productImg.src = producto.photo;
  productImg.alt = producto.name;

  productLink.appendChild(productImg);
  productImage.appendChild(productLink);
  productItem.appendChild(productImage);

  const productName = document.createElement("h3");
  productName.textContent = producto.name;

  const productPrice = document.createElement("p");
  productPrice.classList.add("product-price");
  productPrice.textContent = `$ ${producto.price}`;

  const addToCartLink = document.createElement("a");
  addToCartLink.href = "#";
  addToCartLink.classList.add("cart-btn", "addToCartBtn");

  addToCartLink.setAttribute("data-product-id", producto.id);

  const cartIcon = document.createElement("i");
  cartIcon.classList.add("bi", "bi-cart-plus-fill", "ms-3");

  addToCartLink.appendChild(cartIcon);
  addToCartLink.textContent = " AGREGAR AL CARRITO";

  productItem.appendChild(productName);
  productItem.appendChild(productPrice);
  productItem.appendChild(addToCartLink);

  addToCartLink.appendChild(cartIcon);

  productDiv.appendChild(productItem);
  productosContainer.appendChild(productDiv);
});


// la idea es crear la tabla del carrito tambien desde aqui para que se de forma
// automatica la actualziacion previo al envio de datos

//controlladores

// Función para agregar un producto al carrito
// desde el boton inferior escribiendo el id
function addToCart() {
  const productId = prompt(
    "Ingrese el ID del producto que desea agregar al carrito:"
  );
  const product = products.find((item) => item.id == productId);

  if (product) {
    cart.push(product);
    alert(`${product.name} se ha agregado al carrito.`);
  } else {
    alert("Producto no encontrado. Por favor, ingrese un ID válido.");
  }
}

// Función para agregar un producto al carrito
// desde los botones de cada producto
function addToCartProduct(event) {
  const productId = event.target.getAttribute("data-product-id");
  const product = products.find((item) => item.id == productId);

  if (product) {
    cart.push(product);
    alert(`${product.name} se ha agregado al carrito.`);
  } else {
    alert("Producto no encontrado. Por favor, ingrese un ID válido.");
  }
}

// Escuchar los clics en los botones "AGREGAR AL CARRITO"
const addToCartButtons = document.querySelectorAll(".addToCartBtn");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", addToCartProduct);
});


// Función para mostrar el contenido del carrito
function viewCart() {
  console.log("vacio");
  if (cart.length === 0) {
    alert("El carrito está vacío.");
  } else {
    let carritoTexto = "Carrito de Compras:\n";
    let total = 0;

    for (const item of cart) {
      carritoTexto += `${item.name} - Precio: $${item.price}\n`;
      total += item.price;
    }

    carritoTexto += `\nTotal: $${total}`;
    alert(carritoTexto);
  }
}

// Asignar eventos a los botones
document.getElementById("addProduct").addEventListener("click", addToCart);
document.getElementById("viewCart").addEventListener("click", viewCart);
