document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("all-products");

  if (!container) return;

  products.forEach(item => {
    const productCard = document.createElement("a");
    productCard.href = `product.html?id=${item.id}`;
    productCard.className = "product-card-link";

    productCard.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>R${item.price}</p>
      <button>Add to Cart</button>
    `;

    container.appendChild(productCard);
  });
});
