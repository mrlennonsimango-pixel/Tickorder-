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

    // Use first color image & price by default
    const firstColor = product.colors[0];

    productBox.innerHTML = `
      <img class="product-img" src="${firstColor.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>R${firstColor.price}</p>
      <button>Add to Cart</button>
    `;

    // Click product to view details
    productBox.addEventListener("click", () => {
      localStorage.setItem("selectedProduct", product.id);
      window.location.href = "product.html";
    });

    // Prevent button click from opening product page
    productBox.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart(product, firstColor, productBox);
    });

    container.appendChild(productBox);
  });
}

  // --- Add to Cart Function with Fly Animation ---
function addToCart(product, selectedColor, productBox) {
  cart.push({
    id: product.id,
    name: product.name,
    image: selectedColor.image,
    price: selectedColor.price,
    color: selectedColor.name
  });
  localStorage.setItem("tickorderCart", JSON.stringify(cart));
  updateCartCounter();

  // Fly-to-cart animation
  const productImg = productBox.querySelector("img");
  const imgClone = productImg.cloneNode(true);
  imgClone.classList.add("flying-img");

  const imgRect = productImg.getBoundingClientRect();
  const cartLink = document.getElementById("cart-link");
  const cartRect = cartLink.getBoundingClientRect();

  imgClone.style.position = "absolute";
  imgClone.style.top = `${imgRect.top}px`;
  imgClone.style.left = `${imgRect.left}px`;
  imgClone.style.width = `${imgRect.width}px`;
  imgClone.style.height = `${imgRect.height}px`;
  imgClone.style.transition = "all 0.7s ease";

  document.body.appendChild(imgClone);

  requestAnimationFrame(() => {
    imgClone.style.top = `${cartRect.top}px`;
    imgClone.style.left = `${cartRect.left}px`;
    imgClone.style.width = "20px";
    imgClone.style.height = "20px";
    imgClone.style.opacity = 0.5;
  });

  imgClone.addEventListener("transitionend", () => imgClone.remove());

  // Toast notification
  toast.textContent = `${product.name} (${selectedColor.name}) added to cart`;
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
  // --- Sort Products ---
sortSelect.addEventListener("change", () => {
  const value = sortSelect.value;
  if (value === "low") filteredProducts.sort((a, b) => a.colors[0].price - b.colors[0].price);
  else if (value === "high") filteredProducts.sort((a, b) => b.colors[0].price - a.colors[0].price);
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

  // --- Scroll Buttons ---
const scrollUp = document.getElementById("scroll-up");
const scrollDown = document.getElementById("scroll-down");

// Show buttons when scrolling
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollUp.style.display = "block";
  } else {
    scrollUp.style.display = "none";
  }

  // Show scroll down only if not at bottom
  if ((window.innerHeight + window.scrollY) < document.body.offsetHeight - 50) {
    scrollDown.style.display = "block";
  } else {
    scrollDown.style.display = "none";
  }
});

// Scroll to top
scrollUp.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Scroll to products section
scrollDown.addEventListener("click", () => {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
});
});
