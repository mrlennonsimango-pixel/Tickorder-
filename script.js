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
      const categoryTitle = document.createElement("h2");
      categoryTitle.textContent = category;
      categoryTitle.style.margin = "20px 0 10px 0";
      container.appendChild(categoryTitle);

      const productsRow = document.createElement("div");
      productsRow.style.display = "flex";
      productsRow.style.flexWrap = "wrap";
      productsRow.style.gap = "20px";

      categories[category].forEach(product => {
        const productBox = document.createElement("div");
        productBox.classList.add("product");
        productBox.style.flex = "0 0 200px";

        const displayImage = product.image || (product.colors && product.colors[0].image) || "";
        const displayPrice = product.price || (product.colors && product.colors[0].price) || 0;

        productBox.innerHTML = `
          <img class="product-img" src="${displayImage}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p>R${displayPrice}</p>
          <button>Add to Cart</button>
        `;

        // Go to individual product page
        productBox.addEventListener("click", () => {
          window.location.href = product.link;
        });

        // Add to cart
        const addBtn = productBox.querySelector("button");
        const firstColor = product.colors && product.colors[0] ? product.colors[0] : { name: "", image: displayImage, price: displayPrice };
        addBtn.addEventListener("click", e => {
          e.stopPropagation();
          addToCart(product, firstColor, productBox);
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
      image: color.image,
      price: color.price,
      color: color.name
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
