document.addEventListener("DOMContentLoaded", () => {
  // --- Cart ---
  let cart = JSON.parse(localStorage.getItem("tickorderCart")) || [];

  // --- DOM Elements ---
  const container = document.getElementById("products");
  const cartCounter = document.getElementById("cart-count");
  const floatingCounter = document.getElementById("floating-cart-count");
  const searchInput = document.getElementById("search-input");
  const sortSelect = document.getElementById("sort-select");
  const toast = document.getElementById("toast");
  const shopBtn = document.getElementById("shopBtn");
  const scrollUp = document.getElementById("scroll-up");
  const scrollDown = document.getElementById("scroll-down");

  // --- Products loaded from product.js ---
  let filteredProducts = [...products];

  // --- Update Cart Counter ---
  function updateCartCounter() {
    cartCounter.textContent = cart.length;
    if (floatingCounter) floatingCounter.textContent = cart.length;
  }

  // --- Display Products ---
  function displayProducts(productsList) {
    container.innerHTML = "";
    productsList.forEach(product => {
      const productBox = document.createElement("div");
      productBox.classList.add("product");

      const firstColor = product.colors[0]; // default color
      productBox.innerHTML = `
        <img class="product-img" src="${firstColor.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>R${firstColor.price}</p>
        <button>Add to Cart</button>
      `;

      // Click to view product details
      productBox.addEventListener("click", () => {
        localStorage.setItem("selectedProduct", product.id);
        window.location.href = "product.html";
      });

      // Add to cart button
      const addBtn = productBox.querySelector("button");
      addBtn.addEventListener("click", e => {
        e.stopPropagation();
        addToCart(product, firstColor, productBox);
      });

      container.appendChild(productBox);
    });
  }

  // --- Add to Cart with Fly Animation ---
  function addToCart(product, color, productBox) {
    cart.push({
      id: product.id,
      name: product.name,
      image: color.image,
      price: color.price,
      color: color.name
    });
    localStorage.setItem("tickorderCart", JSON.stringify(cart));
    updateCartCounter();

    // Fly animation
    const productImg = productBox.querySelector("img");
    const imgClone = productImg.cloneNode(true);
    imgClone.classList.add("flying-img");

    const imgRect = productImg.getBoundingClientRect();
    const cartLink = document.getElementById("cart-link");
    const cartRect = cartLink.getBoundingClientRect();

    Object.assign(imgClone.style, {
      position: "absolute",
      top: `${imgRect.top}px`,
      left: `${imgRect.left}px`,
      width: `${imgRect.width}px`,
      height: `${imgRect.height}px`,
      transition: "all 0.7s ease"
    });

    document.body.appendChild(imgClone);

    requestAnimationFrame(() => {
      Object.assign(imgClone.style, {
        top: `${cartRect.top}px`,
        left: `${cartRect.left}px`,
        width: "20px",
        height: "20px",
        opacity: 0.5
      });
    });

    imgClone.addEventListener("transitionend", () => imgClone.remove());

    // Toast
    toast.textContent = `${product.name} (${color.name}) added to cart`;
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
    if (value === "low") filteredProducts.sort((a, b) => a.colors[0].price - b.colors[0].price);
    else if (value === "high") filteredProducts.sort((a, b) => b.colors[0].price - a.colors[0].price);
    else if (value === "new") filteredProducts.sort((a, b) => b.id - a.id);
    displayProducts(filteredProducts);
  });

  // --- Initial Render ---
  displayProducts(filteredProducts);
  updateCartCounter();

  // --- Scroll Buttons ---
  if (shopBtn) {
    shopBtn.addEventListener("click", () => {
      container.scrollIntoView({ behavior: "smooth" });
    });
  }

  window.addEventListener("scroll", () => {
    scrollUp.style.display = window.scrollY > 200 ? "block" : "none";
    scrollDown.style.display = (window.innerHeight + window.scrollY) < document.body.offsetHeight - 50 ? "block" : "none";
  });

  scrollUp.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  scrollDown.addEventListener("click", () => {
    container.scrollIntoView({ behavior: "smooth" });
  });
});
