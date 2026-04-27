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
        <img src="${product.image}" width="250">
        <h2>${product.name}</h2>
        <p>R${product.price}</p>
        <p>${product.description}</p>
        <p>${product.stock} in stock</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
});
