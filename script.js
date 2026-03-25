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

  const floatingCounter = document.getElementById("floating-cart-count");
  if (floatingCounter) {
    floatingCounter.textContent = cart.length;
  }
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

      // Pass productBox for the fly-to-cart animation
      productBox.querySelector("button").addEventListener("click", () => addToCart(product.id, productBox));

      container.appendChild(productBox);
    });
  }

  // --- Add to Cart Function with Fly Animation ---
  function addToCart(id, productBox) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem("tickorderCart", JSON.stringify(cart));
    updateCartCounter();

    // Fly-to-cart animation
    const productImg = productBox.querySelector("img");
    const imgClone = productImg.cloneNode(true);
    imgClone.classList.add("flying-img"); // make sure this CSS exists
    const imgRect = productImg.getBoundingClientRect();
    const cartLink = document.getElementById("cart-link");
    const cartRect = cartLink.getBoundingClientRect();

    imgClone.style.top = `${imgRect.top}px`;
    imgClone.style.left = `${imgRect.left}px`;
    imgClone.style.width = `${imgRect.width}px`;
    imgClone.style.height = `${imgRect.height}px`;

    document.body.appendChild(imgClone);

    requestAnimationFrame(() => {
      imgClone.style.top = `${cartRect.top}px`;
      imgClone.style.left = `${cartRect.left}px`;
      imgClone.style.width = `20px`;
      imgClone.style.height = `20px`;
      imgClone.style.opacity = 0.5;
    });

    imgClone.addEventListener("transitionend", () => imgClone.remove());

    // Animate cart icon
    cartLink.classList.add("cart-animate");
    setTimeout(() => cartLink.classList.remove("cart-animate"), 400);

    // Toast notification
    toast.textContent = `${product.name} added to cart`;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2000);
  }

  // --- Search Filter ---
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    filteredProducts = products.filter(p => p.name.toLowerCase().includes(value));
    displayProducts(filteredProducts);
  });

  // --- Sort Products ---
  sortSelect.addEventListener("change", () => {
    const value = sortSelect.value;
    if (value === "low") filteredProducts.sort((a, b) => a.price - b.price);
    else if (value === "high") filteredProducts.sort((a, b) => b.price - a.price);
    else if (value === "new") filteredProducts.sort((a, b) => b.id - a.id);

    displayProducts(filteredProducts);
  });

  // --- Initial Display ---
  displayProducts(filteredProducts);
  updateCartCounter();
// --- Shop Button Scroll ---
const shopBtn = document.getElementById("shopBtn");

if (shopBtn) {
  shopBtn.addEventListener("click", () => {
    const productsSection = document.getElementById("products");
    productsSection.scrollIntoView({ behavior: "smooth" });
  });
                         }
});
