const products = [
  {
    id: 1,
    name: "Brown Handbag",
    price: 120,
    image: "assets/Images/brownhandbag.jpg"
  },
  {
    id: 2,
    name: "Red Handbag",
    price: 150,
    image: "assets/Images/redhandbag.jpg"
  },
  {
    id: 3,
    name: "Pestal Green Handbag",
    price: 130,
    image: "assets/Images/greenhandbag.jpg"
  },
  {
    id: 4,
    name: "Black Handbag",
    price: 140,
    image: "assets/Images/blackhandbag.jpg"
  },
  {
    id: 5,
    name: "White Handbag",
    price: 135,
    image: "assets/Images/whitehandbag.jpg"
  }
];

const container = document.getElementById("products");

// Load current cart or start empty
let cart = JSON.parse(localStorage.getItem("tickorderCart")) || [];

products.forEach(product => {
  const productBox = document.createElement("div");
  productBox.classList.add("product");

  productBox.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <h3>${product.name}</h3>
    <p>R${product.price}</p>
    <button>Add to Cart</button>
  `;

  // Add click listener for "Add to Cart"
  const btn = productBox.querySelector("button");
  btn.addEventListener("click", () => {
    cart.push(product); // add product to cart array
    localStorage.setItem("tickorderCart", JSON.stringify(cart)); // save cart
    alert(`${product.name} added to cart!`);
    
    // Optional: update cart counter if you have one
    const counter = document.getElementById("cart-counter");
    if (counter) counter.textContent = `Cart: ${cart.length}`;
  });

  container.appendChild(productBox);
});
