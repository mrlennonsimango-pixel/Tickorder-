// --- Products ---
const products = [
  { id: 1, name: "Wireless Earbuds", price: 49 },
  { id: 2, name: "Smart Watch", price: 89 },
  { id: 3, name: "Portable Speaker", price: 39 }
];

// --- Cart ---
let cart = JSON.parse(localStorage.getItem("tickorderCart")) || [];

// --- DOM Elements ---
const productContainer = document.getElementById("products");
const cartCounter = document.getElementById("cart-counter");

// --- Update Cart Counter ---
function updateCartCounter() {
  cartCounter.textContent = cart.length;
}

// --- Add Product Cards ---
products.forEach(product => {
  const card = document.createElement("div");
  card.classList.add("product-card");

  const button = document.createElement("button");
  button.textContent = "Add to Cart";

  button.addEventListener("click", () => addToCart(product.id));

  card.innerHTML = `
    <h3>${product.name}</h3>
    <p>$${product.price}</p>
  `;

  card.appendChild(button);
  productContainer.appendChild(card);
});

// --- Add to Cart Function ---
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("tickorderCart", JSON.stringify(cart));
  updateCartCounter();
  alert(`${product.name} added to cart!`);
}

// --- Initialize Counter ---
updateCartCounter();


