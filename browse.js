// ============================
// BROWSE ALL SCRIPT
// ============================

// Shuffle function to randomize products
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Get container and load more button
const browseContainer = document.getElementById('browse-all-products');
const loadMoreBtn = document.getElementById('load-more-btn');

// Make a shuffled copy of the products array
const shuffledProducts = shuffleArray(products.slice()); // assumes products array is defined in product.js

let productsPerPage = 8; // number of products to show per batch
let currentIndex = 0;

// Function to render products
function renderProducts() {
  const nextProducts = shuffledProducts.slice(currentIndex, currentIndex + productsPerPage);

  nextProducts.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('product'); // match your CSS

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p class="price">R${item.price}</p>
      <button>Add to Cart</button>
    `;

    browseContainer.appendChild(card);
  });

  currentIndex += productsPerPage;

  // Show or hide "Load More" button
  loadMoreBtn.style.display = currentIndex < shuffledProducts.length ? 'block' : 'none';
}

// Initial render
renderProducts();

// Event listener for "Load More"
loadMoreBtn.addEventListener('click', renderProducts);
