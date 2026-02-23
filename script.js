const products = [
  { name: "Wireless Earbuds", price: 49 },
  { name: "Smart Watch", price: 89 },
  { name: "Portable Speaker", price: 39 }
];

const productContainer = document.getElementById("products");

products.forEach(product => {
  const card = document.createElement("div");
  card.classList.add("product-card");

  card.innerHTML = `
    <h3>${product.name}</h3>
    <p>$${product.price}</p>
    <button>Buy Now</button>
  `;

  productContainer.appendChild(card);
});
