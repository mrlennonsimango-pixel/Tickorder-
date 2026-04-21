document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("all-products");
  if (!container) return;

  products.forEach(product => {

    const productCard = document.createElement("div");
    productCard.className = "product";

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>R${product.price}</p>
      <button class="add-to-cart-btn">Add to Cart</button>
    `;

    // ✅ ONLY NAVIGATION METHOD (CLEAN)
const clickableArea = productCard.querySelector("img");

clickableArea.addEventListener("click", () => {
  window.location.href = `product.html?id=${product.id}`;
});

    // Add to cart (no navigation)
    const addBtn = productCard.querySelector(".add-to-cart-btn");
    addBtn.addEventListener("click", e => {
      e.stopPropagation();

      let cart = JSON.parse(localStorage.getItem("tickorderCart")) || [];
      cart.push(product);
      localStorage.setItem("tickorderCart", JSON.stringify(cart));

      const headerCount = document.getElementById("cart-count");
      const floatingCount = document.getElementById("floating-cart-count");

      if (headerCount) headerCount.textContent = cart.length;
      if (floatingCount) floatingCount.textContent = cart.length;
    });

    container.appendChild(productCard);
  });
});
