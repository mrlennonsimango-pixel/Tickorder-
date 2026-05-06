document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("category-products"); // or "all-products"

  if (!container) return;

  const categoryName = new URLSearchParams(window.location.search).get("name");
  if (categoryName) {
    const title = document.getElementById("category-title");
    if (title) title.textContent = categoryName;
  }

  // Filter products by category if needed
  const displayProducts = categoryName 
    ? products.filter(p => p.category === categoryName)
    : products;

  displayProducts.forEach(product => {
    // Make the whole product clickable
    const productBox = document.createElement("div");
    productBox.classList.add("product");

    productBox.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>R${product.price}</p>
      <button class="add-to-cart-btn">Add to Cart</button>
    `;

    // Click anywhere on the product box (except Add to Cart) → go to product page
    productBox.addEventListener("click", () => {
  localStorage.setItem("selectedProduct", product.id);
  window.location.href = "product.html";
});

    // Add to cart button should not trigger navigation
    const addBtn = productBox.querySelector(".add-to-cart-btn");
    addBtn.addEventListener("click", e => {
      e.stopPropagation(); // prevent the card click
      let cart = JSON.parse(localStorage.getItem("tickorderCart")) || [];
      cart.push(product);
      localStorage.setItem("tickorderCart", JSON.stringify(cart));

      // Update header/floating cart counts
      const headerCount = document.getElementById("cart-count");
      const floatingCount = document.getElementById("floating-cart-count");
      if (headerCount) headerCount.textContent = cart.length;
      if (floatingCount) floatingCount.textContent = cart.length;
    });

    container.appendChild(productBox);
  });
});
