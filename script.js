document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("tickorderCart")) || [];

  const container = document.getElementById("products");
  const cartCounter = document.getElementById("cart-count");
  const floatingCounter = document.getElementById("floating-cart-count");
  const toast = document.getElementById("toast");

  function updateCartCounter() {
    cartCounter.textContent = cart.length;
    if (floatingCounter) floatingCounter.textContent = cart.length;
  }

  // --- Display products grouped by category ---
  // ==========================
// DISPLAY PRODUCTS BY CATEGORY
// Each category gets its own grid
// ==========================
function displayProducts(productsList) {
  container.innerHTML = ""; // Clear previous content

  // Group products by category
  const categories = {};
  productsList.forEach(product => {
    const cat = product.category.trim(); // Ensure no extra spaces
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(product);
  });

// Loop through each category
for (const category in categories) {
  // --- Category title as clickable link ---
  const categoryLink = document.createElement("a");
  categoryLink.classList.add("category-title");
  categoryLink.textContent = category;
  categoryLink.href = `category.html?name=${encodeURIComponent(category)}`; // Pass category name in URL
  container.appendChild(categoryLink);

  // --- Category grid container ---
  const grid = document.createElement("div");
  grid.classList.add("category-grid"); // Each category has its own grid
  container.appendChild(grid);

  // --- Render products in this category ---
  categories[category].forEach(product => {
    const productBox = document.createElement("div");
    productBox.classList.add("product");

    const displayImage = product.image || "assets/Images/placeholder.jpg";
    const displayPrice = product.price || "0";

    productBox.innerHTML = `
      <img class="product-img" src="${displayImage}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>R${displayPrice}</p>
      <button>Add to Cart</button>
    `;

    // --- Click product to open product page ---
    productBox.addEventListener("click", () => {
      localStorage.setItem("selectedProduct", product.id);
      window.location.href = "product.html";
    });

    // --- Add to Cart button ---
    const addBtn = productBox.querySelector("button");
    addBtn.addEventListener("click", e => {
      e.stopPropagation();
      addToCart(product, { name: "", image: displayImage, price: displayPrice }, productBox);
    });

    grid.appendChild(productBox);
  });
}
}
  // --- Add to Cart ---
  function addToCart(product, color, productBox) {
    cart.push({
  id: product.id,
  name: product.name,
  image: product.image,
  price: product.price
});
    localStorage.setItem("tickorderCart", JSON.stringify(cart));
    updateCartCounter();

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

    toast.textContent = `${product.name} added to cart`;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2000);
  }

  // --- Initial render ---
  displayProducts(products);
  updateCartCounter();
});

