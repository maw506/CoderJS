const cart = {};
const coupons = [
  {
    id: 1,
    code: "descuento",
    porcDiscount: 15,
    isValid: true,
  },
  {
    id: 2,
    code: "descuento_2",
    porcDiscount: 50,
    isValid: true,
  },
  {
    id: 3,
    code: "descuento_3",
    porcDiscount: 30,
    isValid: false,
  },
];
const products = [
  {
    id: 1,
    name: "Frutilla",
    photo: "./img/product-img-1.jpg",
    price: 85,
    cant: 100,
  },
  {
    id: 2,
    name: "Uva",
    photo: "./img/product-img-2.jpg",
    price: 100,
    cant: 100,
  },
  {
    id: 3,
    name: "Limones",
    photo: "./img/product-img-3.jpg",
    price: 150,
    cant: 100,
  },
  {
    id: 4,
    name: "kiwi",
    photo: "./img/product-img-4.jpg",
    price: 200,
    cant: 10,
  },
  {
    id: 5,
    name: "Manzana verde",
    photo: "./img/product-img-5.jpg",
    price: 230,
    cant: 15,
  },
  {
    id: 6,
    name: "Frambuesas",
    photo: "./img/product-img-6.jpg",
    price: 300,
    cant: 100,
  },
];

const orderSummary = {
  subtotal: 0,
  shippingCost: 500,
  total: 0,
  discount: 0,
};

// Obtener productos desde localStorage al cargar la página
const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
const storedCoupons = JSON.parse(localStorage.getItem("coupons")) || [];
let storedCart = JSON.parse(localStorage.getItem("cart")) || {};

console.log('cart',storedCart);
console.log('coupons',storedCoupons);
console.log('products',storedProducts);

// Verificar si el carrito está vacío y, si es así, inicializarlo con un objeto vacío
if (Object.keys(storedCart).length === 0) {
  storedCart = {};
}

if (products.length > 0) {
  localStorage.setItem("products", JSON.stringify(products));
}

// Guardar datos en localStorage al cargar la página (opcional, solo si el carrito estaba vacío inicialmente)
if (Object.keys(storedCart).length === 0) {
  localStorage.setItem("cart", JSON.stringify(storedCart));
}

if (!localStorage.getItem("orderSummary")) {
  localStorage.setItem("orderSummary", JSON.stringify(orderSummary));
}

// iteracion de los objetos en la pagina
const productosContainer = document.getElementById("products");

storedProducts.forEach((producto) => {
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

// Función para agregar un producto al carrito desde los botones de cada producto
const addToCartProduct = async (event) => {
  event.preventDefault();
  const productId = event.target.getAttribute("data-product-id");
  const product = storedProducts.find((item) => item.id == productId);

  if (product) {
    // Mostrar la alerta de confirmación
    const result = await Swal.fire({
      title: "¿Agregar al carrito?",
      text: `¿Deseas agregar ${product.name} al carrito?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "ACEPTAR",
      cancelButtonText: "CANCELAR",
      confirmButtonColor: "green",
      cancelButtonColor: "red",
    });

    if (result.isConfirmed) {
      if (storedCart[productId]) {
        storedCart[productId]++; // Si el producto ya está en el carrito, incrementa la cantidad
      } else {
        storedCart[productId] = 1; // Si es la primera vez que se agrega, establece la cantidad en 1
      }

      // Guardar el carrito actualizado en localStorage
      localStorage.setItem("cart", JSON.stringify(storedCart));

      console.log("Carrito actualizado:", storedCart);

      await Swal.fire({
        icon: "success",
        title: "Producto agregado al carrito",
        text: `${product.name} se ha agregado al carrito.`,
      });
    }
  } else {
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "Producto no encontrado. Por favor, ingrese un ID válido.",
    });
  }
};

// Escuchar los clics en los botones "AGREGAR AL CARRITO" de cada producto
const addToCartButtons = document.querySelectorAll(".addToCartBtn");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", addToCartProduct);
});

console.log(storedProducts);
console.log(storedCoupons);
console.log(storedCart);
