document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const categoryName = params.get("name");
  const categoryTitle = document.getElementById("category-title");
  const container = document.getElementById("category-products");

  categoryTitle.textContent = categoryName;

  // Filter products by category
  const categoryProducts = products.filter(p => p.category === categoryName);

  categoryProducts.forEach(product => {
    const productBox = document.createElement("a");
productBox.href = `product.html?id=${product.id}`;
    productBox.classList.add("product-card-link");

    productBox.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>R${product.price}</p>
      <button class="add-to-cart-btn">Add to Cart</button>
    `;

    // Add to cart logic (same as main page)
    const addBtn = productBox.querySelector(".add-to-cart-btn");
    addBtn.addEventListener("click", e => {
      e.stopPropagation();
      let cart = JSON.parse(localStorage.getItem("tickorderCart")) || [];
      cart.push({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price
      });
      localStorage.setItem("tickorderCart", JSON.stringify(cart));

      // Update header/floating counters
      const headerCount = document.getElementById("cart-count");
      const floatingCount = document.getElementById("floating-cart-count");
      if (headerCount) headerCount.textContent = cart.length;
      if (floatingCount) floatingCount.textContent = cart.length;
    });

    container.appendChild(productBox);
  });
});
