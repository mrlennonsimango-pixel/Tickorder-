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
  function displayProducts(productsList) {
  container.innerHTML = "";

  // Group products by category
  const categories = {};
  productsList.forEach(product => {
    if (!categories[product.category]) categories[product.category] = [];
    categories[product.category].push(product);
  });

  // Render each category
  for (const category in categories) {
    // Category title
    const categoryTitle = document.createElement("h2");
    categoryTitle.textContent = category;
    categoryTitle.style.margin = "20px 0 10px 0";
    container.appendChild(categoryTitle);

    // Products row (flex)
    const productsRow = document.createElement("div");
    productsRow.style.display = "grid";
productsRow.style.gridTemplateColumns = "repeat(auto-fill, minmax(160px, 1fr))";
productsRow.style.gap = "15px";
productsRow.style.marginBottom = "30px";
    
    categories[category].forEach(product => {
      const productBox = document.createElement("div");
      productBox.classList.add("product");
      productBox.style.flex = "0 0 200px"; // width of each product box

      const displayImage = product.image 
  ? product.image 
  : "assets/Images/placeholder.jpg";

const displayPrice = product.price 
  ? product.price 
  : "0";

      productBox.innerHTML = `
        <img class="product-img" src="${displayImage}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>R${displayPrice}</p>
        <button>Add to Cart</button>
      `;

// ==========================
// CLICK PRODUCT TO OPEN PRODUCT PAGE
// ==========================
// Save selected product id to localStorage
// So product.html can load it individually
productBox.addEventListener("click", () => {
  localStorage.setItem("selectedProduct", product.id);
  window.location.href = "product.html";
});

      // Add to cart button
      const addBtn = productBox.querySelector("button");
      addBtn.addEventListener("click", e => {
        e.stopPropagation();
        addToCart(product, { name: "", image: displayImage, price: displayPrice }, productBox);
      });

      productsRow.appendChild(productBox);
    });

    container.appendChild(productsRow);
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
