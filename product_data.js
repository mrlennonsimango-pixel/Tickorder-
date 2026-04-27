document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("product-details");
    if (!container) return;

    const productId = localStorage.getItem("selectedProduct");

    if (!productId) {
        container.innerHTML = "<h2>No product selected</h2>";
        return;
    }

    const product = products.find(p => p.id == productId);

    if (!product) {
        container.innerHTML = "<h2>Product not found</h2>";
        return;
    }

    container.innerHTML = `
  <div class="product-view">

    <div class="product-image-section">
      <img src="${product.image}" class="main-image">
    </div>

    <div class="product-info-section">

      <h1>${product.name}</h1>

      <p class="price">R${product.price}</p>

      ${product.color ? `<p><strong>Color:</strong> ${product.color}</p>` : ""}

      <p class="stock ${product.stock > 0 ? 'in-stock' : 'out-stock'}">
        ${product.stock > 0 ? product.stock + " in stock" : "Out of stock"}
      </p>

      <div class="description-box">
        <h3>Description</h3>
        <p>${product.description}</p>
      </div>

      <button onclick="addToCart(${product.id})" class="add-btn">
        Add to Cart
      </button>

    </div>

  </div>
`;
});
