document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("tickorderCart")) || [];

  const container = document.getElementById("products");
  const cartCounter = document.getElementById("cart-count");
  const floatingCounter = document.getElementById("floating-cart-count");
  const toast = document.getElementById("toast");

  let filteredProducts = [...products];

  function updateCartCounter() {
    cartCounter.textContent = cart.length;
    if (floatingCounter) floatingCounter.textContent = cart.length;
  }

  // Display all products on shop page
  function displayProducts(productsList) {
    container.innerHTML = "";

    productsList.forEach(product => {
      const productBox = document.createElement("div");
      productBox.classList.add("product");

      // Show main image for shop page (color does not matter here)
      const displayImage = product.image 
        ? product.image 
        : product.colors && product.colors[0] 
          ? product.colors[0].image 
          : "";

      const displayPrice = product.price 
        ? product.price 
        : product.colors && product.colors[0] 
          ? product.colors[0].price 
          : 0;

      productBox.innerHTML = `
        <img class="product-img" src="${displayImage}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>R${displayPrice}</p>
        <button>Add to Cart</button>
      `;

      // Click product goes to product page
      productBox.addEventListener("click", () => {
        localStorage.setItem("selectedProduct", product.id);
        window.location.href = "product.html";
      });

      const firstColor = product.colors && product.colors[0]
        ? product.colors[0]
        : { name: "", image: displayImage, price: displayPrice };

      productBox.querySelector("button").addEventListener("click", e => {
        e.stopPropagation();
        addToCart(product, firstColor, productBox);
      });

      container.appendChild(productBox);
    });
  }

  // Add to Cart
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

  // Initial render
  displayProducts(filteredProducts);
  updateCartCounter();
});
