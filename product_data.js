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
    <img src="${product.image}" width="250">

    <h2>${product.name}</h2>

    <p>R${product.price}</p>

    ${product.color ? `<p><strong>Color:</strong> ${product.color}</p>` : ""}

    <p>${product.description}</p>

    <p id="stock">Stock: ${product.stock}</p>

    <!-- QUANTITY CONTROLS -->
    <div style="margin:10px 0;">
        <button onclick="changeQty(-1)">-</button>
        <span id="qty">1</span>
        <button onclick="changeQty(1)">+</button>
    </div>

    <p id="total">Total: R${product.price}</p>
    
${product.stock > 0 
  ? `<button onclick="addToCart(${product.id})">
        Add to Cart
     </button>`
  : `<button disabled>
        Out of Stock
     </button>`
}
`;
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
        alert("Only " + product.stock + " items available in stock");
    }

    qtyEl.textContent = currentQty;

    totalEl.textContent = "Total: R" + (product.price * currentQty);
}

function addToCart(id) {
    const product = products.find(p => p.id == id);
    if (!product) return;

    let qty = parseInt(document.getElementById("qty").textContent);

    // 🚨 prevent overstock safety
    if (qty > product.stock) {
        qty = product.stock;
    }

    let cart = JSON.parse(localStorage.getItem("tickorderCart")) || [];

    cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: qty,
        image: product.image
    });

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
