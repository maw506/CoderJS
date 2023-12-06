const storedCoupons = JSON.parse(localStorage.getItem("coupons")) || [];

// Obtener la lista de cupones (usar predeterminados si no hay en localStorage)
const couponList =
  storedCoupons.length > 0 ? storedCoupons : generateDefaultCoupons();

// Función para generar dinámicamente la sección de cupones en HTML
function generateCouponSection() {
  const couponsContainer = document.getElementById("coupons");

  couponList.forEach((coupon) => {
    const couponDiv = document.createElement("div");
    couponDiv.classList.add(
      "container",
      "bg-success",
      "text-light",
      "border",
      "mt-5",
      "px-5",
      "py-5"
    );

    const couponTitle = document.createElement("h1");
    couponTitle.classList.add("text-center");
    couponTitle.textContent = `CUPON DE DESCUENTO ${coupon.id}`;

    const couponContent = document.createElement("div");
    couponContent.classList.add("row", "mt-4");

    const leftCol = document.createElement("div");
    leftCol.classList.add("col-6");

    const codeParagraph = document.createElement("p");
    codeParagraph.innerHTML = `<b>código:</b> ${coupon.code}`;

    const validityParagraph = document.createElement("p");
    validityParagraph.innerHTML = `<b>Validez:</b> ${
      coupon.isValid ? "Válido" : "No válido"
    }`;

    leftCol.appendChild(codeParagraph);
    leftCol.appendChild(validityParagraph);

    const rightCol = document.createElement("div");
    rightCol.classList.add("col-6");

    const discountParagraph = document.createElement("p");
    discountParagraph.innerHTML = `<b>Porcentaje de descuento:</b> ${coupon.porcDiscount}%`;

    rightCol.appendChild(discountParagraph);

    couponContent.appendChild(leftCol);
    couponContent.appendChild(rightCol);

    const buttonRow = document.createElement("div");
    buttonRow.classList.add("row", "text-center", "px-5", "mt-5");

    const useCouponButton = document.createElement("a");
    useCouponButton.classList.add("cart-btn");
    useCouponButton.textContent = "APLICAR DESCUENTO";

    buttonRow.appendChild(useCouponButton);

    couponDiv.appendChild(couponTitle);
    couponDiv.appendChild(couponContent);
    couponDiv.appendChild(buttonRow);

    couponsContainer.appendChild(couponDiv);
  });
}

function applyCouponDiscount(porcDiscount) {
  for (const productId in storedCart) {
    const product = storedProducts.find((item) => item.id == productId);
    if (product) {
      const discountedPrice = product.price * ((100 - porcDiscount) / 100);
      storedCart[productId] =
        (storedCart[productId] * discountedPrice) / product.price;
    }
  }
  localStorage.setItem("cart", JSON.stringify(storedCart));
}

// Llamar a la función para generar la sección de cupones al cargar la página
generateCouponSection();
