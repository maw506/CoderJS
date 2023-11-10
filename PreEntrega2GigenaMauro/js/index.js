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
];
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
  {
    id: 4,
    name: "kiwi",
    photo: "./img/product-img-4.jpg",
    price: 200,
      },
  {
    id: 5,
    name: "Manzana verde",
    photo: "./img/product-img-5.jpg",
    price: 230,
      },
  {
    id: 6,
    name: "Frambuesas",
    photo: "./img/product-img-6.jpg",
    price: 300,
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
const addToCart = (event) => {
  event.preventDefault();
  const productId = prompt(
    "Ingrese el ID del producto que desea agregar al carrito:"
  );
  const product = products.find((item) => item.id == productId);

  if (product) {
    if (cart[productId]) {
      cart[productId]++; // Si el producto ya está en el carrito, incrementa la cantidad
    } else {
      cart[productId] = 1; // Si es la primera vez que se agrega, establece la cantidad en 1
    }
    alert(`${product.name} se ha agregado al carrito.`);
  } else {
    alert("Producto no encontrado. Por favor, ingrese un ID válido.");
  }
};
// Función para agregar un producto al carrito
// desde los botones de cada producto
const addToCartProduct = (event) => {
  event.preventDefault();
  const productId = event.target.getAttribute("data-product-id");
  const product = products.find((item) => item.id == productId);

  if (product) {
    if (cart[productId]) {
      cart[productId]++; // Si el producto ya está en el carrito, incrementa la cantidad
    } else {
      cart[productId] = 1; // Si es la primera vez que se agrega, establece la cantidad en 1
    }
alert(`${product.name} se ha agregado al carrito.`);
  } else {
    alert("Producto no encontrado. Por favor, ingrese un ID válido.");
  }
};

// Escuchar los clics en los botones "AGREGAR AL CARRITO" de cada producto
const addToCartButtons = document.querySelectorAll(".addToCartBtn");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", addToCartProduct);
});

// Función para mostrar el contenido del carrito
const viewCart = () => {
  if (cart.length === 0) {
    alert("El carrito está vacío.");
  } else {
    let carritoTexto = "Carrito de Compras:\n\n";
    let total = 0;
    let nroOrden = 1;

    for (const productId in cart) {
      const product = products.find((item) => item.id == productId);
      const count = cart[productId];
      carritoTexto += `${nroOrden}. ${product.name} x ${count} - Precio unitario: $${product.price}\n`;
      total += count * product.price;
      nroOrden++;
    }

    // Verificar si hay un cupón de descuento aplicado
    const appliedCoupon = coupons.find((coupon) => !coupon.isValid);

    if (appliedCoupon) {
      // Calcula el descuento en base al porcentaje indicado en el cupón
      const discountAmount = (appliedCoupon.porcDiscount / 100) * total;
      const discountedTotal = total - discountAmount;

      carritoTexto += `\nTotal: $${total}`;
      carritoTexto += `\n\nDescuento aplicado: -${appliedCoupon.porcDiscount}%`;
      carritoTexto += `\n\nTotal con descuento: $${discountedTotal}`;
    } else {
      carritoTexto += `\nTotal: $${total}`;
    }

    console.log(carritoTexto);
    alert(carritoTexto);
  }
};

// Función para aplicar un cupón de descuento
const applyCoupon = () => {
  const couponCode = prompt("Ingrese el código del cupón:");
  const coupon = coupons.find((item) => item.code === couponCode);

  if (coupon && coupon.isValid) {
    // Verificar si se ha utilizado algún cupón
    let couponUsed = false;
    for (const item of coupons) {
      if (!item.isValid) {
        couponUsed = true;
        break; // Si se encuentra un cupón utilizado, no es necesario continuar verificando
      }
    }

    if (couponUsed) {
      alert("Ya utilizó un cupón de descuento para esta compra.");
    } else {
      let total = 0;
      // Calcular el total antes del descuento
      for (const productId in cart) {
        const product = products.find((item) => item.id == productId);
        const count = cart[productId];
        total += count * product.price;
      }

      // Calcula el descuento en base al porcentaje indicado en el cupón
      const discountAmount = (coupon.porcDiscount / 100) * total;
      const discountedTotal = total - discountAmount;

      alert(`Se ha aplicado un descuento del ${coupon.porcDiscount}%`);
      console.log(`Total con descuento: $${discountedTotal}`);
      alert(`Total con descuento: $${discountedTotal}`);

      // Marca el cupón como no válido
      coupon.isValid = false;
    }
  } else {
    alert("Cupón no válido o ya ha sido utilizado.");
  }
};

// Asignar eventos a los botones
document.getElementById("addProduct").addEventListener("click", addToCart);
document.getElementById("viewCart").addEventListener("click", viewCart);
document.getElementById("applyCoupon").addEventListener("click", applyCoupon);
