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

    <button onclick="addToCart(${product.id})">
        Add to Cart
    </button>
`;
});

function changeQty(amount) {

    let qtyEl = document.getElementById("qty");
    let totalEl = document.getElementById("total");

    let qty = parseInt(qtyEl.textContent);

    qty += amount;

    if (qty < 1) qty = 1;

    qtyEl.textContent = qty;

    const productId = localStorage.getItem("selectedProduct");
    const product = products.find(p => p.id == productId);

    totalEl.textContent = "Total: R" + (product.price * qty);
        }

function addToCart(id) {
    const product = products.find(p => p.id == id);
    if (!product) return;

    let qty = document.getElementById("qty").textContent;

    let cart = JSON.parse(localStorage.getItem("tickorderCart")) || [];

    cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: Number(qty),
        image: product.image
    });

    localStorage.setItem("tickorderCart", JSON.stringify(cart));

    alert(product.name + " added to cart!");
         }
