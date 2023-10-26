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
  productLink.href = "single-product.html"; //futura pagina para ver el detalle del producto

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
  addToCartLink.classList.add("cart-btn");

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