document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("all-products");

  if (!container) return;

  products.forEach(item => {
    const productCard = document.createElement("div");
    productCard.className = "product";

    productCard.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>R${item.price}</p>
      <button>Add to Cart</button>
    `;

    container.appendChild(productCard);
  });
});
