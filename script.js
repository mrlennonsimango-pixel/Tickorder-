document.addEventListener("DOMContentLoaded", () => {

  // --- Cart ---
  let cart = JSON.parse(localStorage.getItem("tickorderCart")) || [];

  // --- DOM Elements ---
  const container = document.getElementById("products");
  const cartCounter = document.getElementById("cart-count");
  const searchInput = document.getElementById("search-input");
  const sortSelect = document.getElementById("sort-select");
  const toast = document.getElementById("toast");

  // --- Products should already be loaded from product.js ---
  let filteredProducts = [...products];

  // --- Update Cart Counter ---
  function updateCartCounter() {
    cartCounter.textContent = cart.length;
  }

  // --- Display Products ---
  function displayProducts(productsList) {
    container.innerHTML = "";
    productsList.forEach(product => {
      const productBox = document.createElement("div");
      productBox.classList.add("product");

      productBox.innerHTML = `
        <img class="product-img" src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>R${product.price}</p>
        <button>Add to Cart</button>
      `;

      productBox.querySelector("button").addEventListener("click", () => addToCart(product.id));

      container.appendChild(productBox);
    });
  }

  // --- Add to Cart ---
  function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem("tickorderCart", JSON.stringify(cart));
    updateCartCounter();

    // Animate cart icon
    const cartLink = document.getElementById("cart-link");
    cartLink.classList.add("cart-animate");
    setTimeout(() => cartLink.classList.remove("cart-animate"), 400);

    // Toast notification
    toast.textContent = `${product.name} added to cart`;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2000);
  }

  // --- Initial Display ---
  displayProducts(filteredProducts);
  updateCartCounter();

});
