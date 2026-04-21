document.addEventListener("DOMContentLoaded", () => {
const container = document.getElementById("all-products");
if (!container) return;

products.forEach(product => {
// Create a card wrapper
const productCard = document.createElement("div");
productCard.className = "product"; // keeps your current layout

productCard.innerHTML = `  
  <a href="product.html?id=${product.id}" class="product-link">  
    <img src="${product.image}" alt="${product.name}">  
    <h3>${product.name}</h3>  
    <p>R${product.price}</p>  
  </a>  
  <button class="add-to-cart-btn">Add to Cart</button>  
`;  

// Add to cart button logic  
const addBtn = productCard.querySelector(".add-to-cart-btn");  
addBtn.addEventListener("click", e => {  
  e.stopPropagation(); // prevent navigation if nested  
  let cart = JSON.parse(localStorage.getItem("tickorderCart")) || [];  
  cart.push(product);  
  localStorage.setItem("tickorderCart", JSON.stringify(cart));  

  // Update cart counters  
  const headerCount = document.getElementById("cart-count");  
  const floatingCount = document.getElementById("floating-cart-count");  
  if (headerCount) headerCount.textContent = cart.length;  
  if (floatingCount) floatingCount.textContent = cart.length;  
});  

container.appendChild(productCard);

});
});
