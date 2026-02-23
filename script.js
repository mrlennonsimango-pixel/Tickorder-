const products = [
  { id: 1, name: "Wireless Earbuds", price: 49 },
  { id: 2, name: "Smart Watch", price: 89 },
  { id: 3, name: "Portable Speaker", price: 39 }
];

let cart = [];

const productContainer = document.getElementById("products");

products.forEach(product => {
  const card = document.createElement("div");
  card.classList.add("product-card");

  const button = document.createElement("button");
  button.textContent = "Add to Cart";

  button.addEventListener("click", () => {
    addToCart(product.id);
  });

  card.innerHTML = `
    <h3>${product.name}</h3>
    <p>$${product.price}</p>
  `;

  card.appendChild(button);
  productContainer.appendChild(card);
});

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  alert(product.name + " added to cart!");
};
