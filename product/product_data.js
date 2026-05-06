document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("product-details");
    if (!container) return;

    const productId = localStorage.getItem("selectedProduct");

    if (!productId) {
        container.innerHTML = "<h2>No product selected</h2>";
        return;
    }

    const product = products.find(p => p.id == productId);

    if (!product) {
        container.innerHTML = "<h2>Product not found</h2>";
        return;
    }

   
let quantity = 1;

container.innerHTML = `
container.innerHTML = `
<div class="product-layout">

  <!-- IMAGE -->
  <div class="product-image">
    <img src="${product.image}" id="mainImage" onclick="zoomImage(this)">
  </div>

  <!-- INFO -->
  <div class="product-info">

    <h2>${product.name}</h2>

    <p class="price">R${product.price}</p>

    ${product.color ? `<p><strong>Color:</strong> ${product.color}</p>` : ""}

    <p class="description">${product.description}</p>

    <p class="${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
      ${product.stock > 0 ? 'In Stock' : 'Out of Stock'}
    </p>

    <!-- QUANTITY -->
    <div class="qty-box">
        <button onclick="changeQty(-1)">-</button>
        <span id="qty">1</span>
        <button onclick="changeQty(1)">+</button>
    </div>

    <p id="total">Total: R${product.price}</p>

    <!-- ACTIONS -->
    <div class="actions">
      <button class="btn-cart" onclick="addToCart(${product.id})">
        Add to Cart
      </button>
    </div>

  </div>

</div>
`;
    // ✅ NOW it's in the correct place
    if (product.stock === 0) {
        document.getElementById("qty").textContent = 0;

        const buttons = document.querySelectorAll("#product-details button");
        buttons.forEach(btn => {
            if (btn.textContent === "+" || btn.textContent === "-") {
                btn.disabled = true;
            }
        });
    }
});

function changeQty(amount) {

    let qtyEl = document.getElementById("qty");
    let totalEl = document.getElementById("total");

    let currentQty = parseInt(qtyEl.textContent);

    const productId = localStorage.getItem("selectedProduct");
    const product = products.find(p => p.id == productId);

    // increase/decrease
    currentQty += amount;

    // minimum is 1
    if (currentQty < 1) currentQty = 1;

    // 🚨 MAX LIMIT = STOCK
    if (currentQty > product.stock) {
    currentQty = product.stock;
        }

    qtyEl.textContent = currentQty;

    totalEl.textContent = "Total: R" + (product.price * currentQty);
}

function addToCart(id) {
    const product = products.find(p => p.id == id);
    if (!product) return;

    // 🚫 block if out of stock
    if (product.stock <= 0) {
        alert("This product is out of stock");
        return;
    }

    let qty = parseInt(document.getElementById("qty").textContent);

    // limit to stock
    if (qty > product.stock) {
        qty = product.stock;
    }

    let cart = JSON.parse(localStorage.getItem("tickorderCart")) || [];

    let existing = cart.find(item => item.id == product.id);

    if (existing) {
        // 🔥 FIX: prevent exceeding stock
        let newQty = existing.quantity + qty;

        if (newQty > product.stock) {
            existing.quantity = product.stock;
        } else {
            existing.quantity = newQty;
        }

    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: qty,
            image: product.image
        });
    }

    localStorage.setItem("tickorderCart", JSON.stringify(cart));

    updateCartUI();

    alert(product.name + " added to cart!");
}

function updateCartUI() {

  let cart = JSON.parse(localStorage.getItem("tickorderCart")) || [];

  const totalItems = cart.reduce((sum, item) => {
    return sum + (item.quantity || 1);
  }, 0);

  const cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.textContent = totalItems;

  const floating = document.getElementById("floating-cart-count");
  if (floating) floating.textContent = totalItems;
}
