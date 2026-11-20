/* ==========================================================
   INTΞRLUDE — Order now (JavaScript Method #2: mailto link)
   Shared by all 3 product pages. Each page's <form> carries the
   product info in data- attributes, so this file never changes.
   ========================================================== */

document.addEventListener("DOMContentLoaded", function () {
  var ORDER_EMAIL = "orders@examplewebsite142.com";
  var MIN_QTY = 1;
  var MAX_QTY = 10;

  var form = document.getElementById("orderForm");
  if (!form) {
    return; // not a product page
  }

  var productName = form.dataset.productName;
  var price = Number(form.dataset.price);

  var sizeSelect = document.getElementById("size");
  var qtyInput = document.getElementById("quantity");
  var minusBtn = document.getElementById("qtyMinus");
  var plusBtn = document.getElementById("qtyPlus");
  var totalOutput = document.getElementById("orderTotal");
  var statusBox = document.getElementById("orderStatus");

  function formatPeso(amount) {
    return "PHP " + amount.toLocaleString("en-PH");
  }

  function readQty() {
    return parseInt(qtyInput.value, 10);
  }

  function updateTotal() {
    var qty = readQty();
    if (qty >= MIN_QTY && qty <= MAX_QTY) {
      totalOutput.textContent = formatPeso(price * qty);
    }
    minusBtn.disabled = !(qty > MIN_QTY);
    plusBtn.disabled = !(qty < MAX_QTY);
  }

  function showStatus(message, isError) {
    statusBox.textContent = message;
    statusBox.classList.toggle("is-error", isError);
    statusBox.hidden = false;
  }

  function clearError(field) {
    field.classList.remove("is-invalid");
    field.removeAttribute("aria-invalid");
  }

  function markError(field, message) {
    field.classList.add("is-invalid");
    field.setAttribute("aria-invalid", "true");
    showStatus(message, true);
    field.focus();
  }

  // + / - buttons
  minusBtn.addEventListener("click", function () {
    var qty = readQty() || MIN_QTY;
    qtyInput.value = Math.max(MIN_QTY, qty - 1);
    clearError(qtyInput);
    updateTotal();
  });

  plusBtn.addEventListener("click", function () {
    var qty = readQty() || 0;
    qtyInput.value = Math.min(MAX_QTY, qty + 1);
    clearError(qtyInput);
    updateTotal();
  });

  qtyInput.addEventListener("input", function () {
    clearError(qtyInput);
    updateTotal();
  });

  sizeSelect.addEventListener("change", function () {
    clearError(sizeSelect);
  });

  // Order now -> open the visitor's email app with the order written
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var size = sizeSelect.value;
    var qty = readQty();

    if (!size) {
      markError(sizeSelect, "Please choose a size before ordering.");
      return;
    }
    if (isNaN(qty) || qty < MIN_QTY || qty > MAX_QTY) {
      markError(
        qtyInput,
        "Please enter a quantity from " + MIN_QTY + " to " + MAX_QTY + "."
      );
      return;
    }

    var subject = "Order: " + productName + " (Size " + size + ", Qty " + qty + ")";

    var body =
      "Hi INTERLUDE,\r\n\r\n" +
      "I would like to order the following:\r\n\r\n" +
      "Product: " + productName + "\r\n" +
      "Size: " + size + "\r\n" +
      "Quantity: " + qty + "\r\n" +
      "Price each: " + formatPeso(price) + "\r\n" +
      "Total: " + formatPeso(price * qty) + "\r\n" +
      "Product page: " + window.location.href + "\r\n\r\n" +
      "My details:\r\n" +
      "Full name: \r\n" +
      "Mobile number: \r\n" +
      "Delivery address: \r\n" +
      "Preferred payment method: \r\n\r\n" +
      "Thank you!";

    var mailtoLink =
      "mailto:" + ORDER_EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    showStatus(
      "Opening your email app with your order for " + qty + " × " +
        productName + " (size " + size + "). Add your name, mobile number " +
        "and delivery address, then press Send. If nothing opened, email us at " +
        ORDER_EMAIL + ".",
      false
    );

    window.location.href = mailtoLink;
  });

  updateTotal();
});
