document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
    const container = document.getElementById("product-details");

    if (!container || typeof products === "undefined") return;

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

function addToCart(id) {
    const product = products.find(p => p.id == id);
    if (!product) return;

    alert(product.name + " added to cart!");
}
