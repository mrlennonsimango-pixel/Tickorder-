// ============================
// browse.js - Full Browse All Page Only
// ============================

// Container
const browseContainer = document.getElementById('all-products');

if (browseContainer) {
  // Show all products as they are
  products.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('product'); // your existing CSS

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p class="price">R${item.price}</p>
      <button>Add to Cart</button>
    `;

    browseContainer.appendChild(card);
  });
}
