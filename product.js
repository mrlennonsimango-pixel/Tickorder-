// --- Products ---
const products = [
  { id: 1, name: "Brown Handbag", price: 120, image: "assets/Images/brownhandbag.jpg" },
  { id: 2, name: "Red Handbag", price: 120, image: "assets/Images/redhandbag.jpg" },
  { id: 3, name: "Pestal Green Handbag", price: 120, image: "assets/Images/greenhandbag.jpg" },
  { id: 4, name: "Black Handbag", price: 120, image: "assets/Images/blackhandbag.jpg" },
  { id: 5, name: "White Handbag", price: 120, image: "assets/Images/whitehandbag.jpg" }
];

// --- Cart ---
let cart = JSON.parse(localStorage.getItem("tickorderCart")) || [];

// --- DOM Elements ---
const container = document.getElementById("products");
const cartCounter = document.getElementById("cart-count"); // updated to match your HTML

// --- Update Cart Counter ---
function updateCartCounter() {
  cartCounter.textContent = cart.length;
}

// --- Add Product Cards ---
products.forEach(product => {
  const productBox = document.createElement("div");
  productBox.classList.add("product");

  productBox.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <h3>${product.name}</h3>
    <p>R${product.price}</p>
    <button>Add to Cart</button>
  `;

  const button = productBox.querySelector("button");
  button.addEventListener("click", () => addToCart(product.id));

  container.appendChild(productBox);
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
