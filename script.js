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

  function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("tickorderCart", JSON.stringify(cart));
  updateCartCounter();

  // --- Fly-to-cart animation ---
  const productBox = Array.from(document.querySelectorAll(".product")).find(box => {
    return box.querySelector("button").onclick?.toString().includes(`${id}`);
  });
  const productImg = productBox.querySelector("img");

  const imgClone = productImg.cloneNode(true);
  const imgRect = productImg.getBoundingClientRect();
  const cartLink = document.getElementById("cart-link");
  const cartRect = cartLink.getBoundingClientRect();

  imgClone.style.position = "fixed";
  imgClone.style.top = `${imgRect.top}px`;
  imgClone.style.left = `${imgRect.left}px`;
  imgClone.style.width = `${imgRect.width}px`;
  imgClone.style.height = `${imgRect.height}px`;
  imgClone.style.transition = "all 0.8s ease-in-out";
  imgClone.style.zIndex = "1000";
  document.body.appendChild(imgClone);

  requestAnimationFrame(() => {
    imgClone.style.top = `${cartRect.top}px`;
    imgClone.style.left = `${cartRect.left}px`;
    imgClone.style.width = `20px`;
    imgClone.style.height = `20px`;
    imgClone.style.opacity = 0.5;
  });

  imgClone.addEventListener("transitionend", () => imgClone.remove());

  // --- Animate cart icon ---
  cartLink.classList.add("cart-animate");
  setTimeout(() => cartLink.classList.remove("cart-animate"), 400);

  // --- Toast notification ---
  toast.textContent = `${product.name} added to cart`;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}
