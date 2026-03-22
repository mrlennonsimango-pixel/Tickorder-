document.addEventListener("DOMContentLoaded", () => {

  // --- Products ---
  const products = [
    { id: 1, name: "Brown Handbag", price: 120, weight: 1, image: "assets/Images/brownhandbag.jpg" },
    { id: 2, name: "Red Handbag", price: 150, weight: 1, image: "assets/Images/redhandbag.jpg" },
    { id: 3, name: "Pestal Green Handbag", price: 130, weight: 1, image: "assets/Images/greenhandbag.jpg" },
    { id: 4, name: "Black Handbag", price: 140, weight: 1, image: "assets/Images/blackhandbag.jpg" },
    { id: 5, name: "White Handbag", price: 135, weight: 1, image: "assets/Images/whitehandbag.jpg" }
  ];

  // --- Cart ---
  let cart = JSON.parse(localStorage.getItem("tickorderCart")) || [];

  // --- DOM Elements ---
  const container = document.getElementById("products");
  const cartCounter = document.getElementById("cart-count");
  const searchInput = document.getElementById("search-input");
  const sortSelect = document.getElementById("sort-select");

  let filteredProducts = [...products];

  // --- Update Cart Counter ---
  function updateCartCounter() {
    cartCounter.textContent = cart.length;
  }

  // --- Display Products ---
  function displayProducts(productsList) {
    container.innerHTML = "";
    productsList.forEach(product => {
      const productBox = document.createElement("div");
      productBox.classList.add("product");

      productBox.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>R${product.price}</p>
        <button>Add to Cart</button>
      `;

      const button = productBox.querySelector("button");
      button.addEventListener("click", () => addToCart(product.id));

      container.appendChild(productBox);
    });
  }

  // --- Initial Display ---
  displayProducts(filteredProducts);

  // --- Search Filter ---
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    filteredProducts = products.filter(p => p.name.toLowerCase().includes(value));
    displayProducts(filteredProducts);
  });

  // --- Sort Products ---
  sortSelect.addEventListener("change", () => {
    const value = sortSelect.value;
    if (value === "low") filteredProducts.sort((a,b) => a.price - b.price);
    else if (value === "high") filteredProducts.sort((a,b) => b.price - a.price);
    else if (value === "new") filteredProducts.sort((a,b) => b.id - a.id);

    displayProducts(filteredProducts);
  });

  // --- Add to Cart ---
  function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem("tickorderCart", JSON.stringify(cart));
    updateCartCounter();
    alert(`${product.name} added to cart!`);
  }

  // --- Initialize Counter ---
  updateCartCounter();

});
