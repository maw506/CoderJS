const storedCoupons = JSON.parse(localStorage.getItem("coupons")) || [];

const generateDefaultCoupons = () => {
  return [
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
};

if (storedCoupons.length === 0) {
  const defaultCoupons = generateDefaultCoupons();
  localStorage.setItem("coupons", JSON.stringify(defaultCoupons));
  console.log("Generando cupones predeterminados:", defaultCoupons);
}

// Obtener la lista de cupones (usar predeterminados si no hay en localStorage)
const couponList =
  storedCoupons.length > 0 ? storedCoupons : generateDefaultCoupons();

// Función para generar dinámicamente la sección de cupones en HTML
const generateCouponSection = () => {
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
    useCouponButton.classList.add("cart-btn", "btn-discount");
    useCouponButton.textContent = "APLICAR DESCUENTO";
    useCouponButton.setAttribute("data-index", coupon.id);

    buttonRow.appendChild(useCouponButton);

    couponDiv.appendChild(couponTitle);
    couponDiv.appendChild(couponContent);
    couponDiv.appendChild(buttonRow);

    couponsContainer.appendChild(couponDiv);
  });
};

// Función para aplicar descuento
const applyCouponDiscount = (porcDiscount) => {
  const orderSummary = JSON.parse(localStorage.getItem("orderSummary")) || {
    subtotal: 0,
    shippingCost: 100,
    total: 0,
    discount: 0,
  };

  // Verificar si subtotal está definido
  if (orderSummary.hasOwnProperty("subtotal")) {
    const discountedSubtotal = orderSummary.subtotal * (1 - porcDiscount / 100);

    // Redondear el resultado a dos decimales
    orderSummary.subtotal = parseFloat(discountedSubtotal.toFixed(2));
    orderSummary.discount = porcDiscount;
    orderSummary.total = orderSummary.subtotal + orderSummary.shippingCost;

    // Guardar orderSummary actualizado en el localStorage
    localStorage.setItem("orderSummary", JSON.stringify(orderSummary));
  } else {
    console.error(
      "Error: El resumen del pedido no tiene la propiedad 'subtotal'."
    );
  }
};

// Evento para aplicar descuento al hacer clic en el botón
const useCouponButtons = document.querySelectorAll(".btn-discount");
useCouponButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const index = button.getAttribute("data-index");
    const selectedCoupon = couponList.find((coupon) => coupon.id == index);

    if (selectedCoupon && selectedCoupon.isValid) {
      const porcDiscount = selectedCoupon.porcDiscount;
      applyCouponDiscount(porcDiscount);
      showDiscountAppliedAlert(porcDiscount);
    } else {
      showInvalidCouponAlert();
    }
  });
});

// Función para mostrar una alerta cuando se aplica el descuento
function showDiscountAppliedAlert(porcDiscount) {
  Swal.fire({
    icon: "success",
    title: "Descuento aplicado",
    text: `Se aplicó un descuento del ${porcDiscount}% a tu compra.`,
  });
}

// Función para mostrar una alerta cuando se aplica un descuento inválido
function showInvalidCouponAlert() {
  Swal.fire({
    icon: "error",
    title: "Cupón no válido",
    text: "Este cupón no puede ser aplicado. Por favor, verifica la validez del cupón.",
  });
}

generateCouponSection();
