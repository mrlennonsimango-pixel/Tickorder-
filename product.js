const products = [
  { 
    id: 1,
    name: "Handbag - Brown",
    category: "handbags",
    image: "assets/Images/brownhandbag.jpg",
    price: 120,
    color: "Brown",
    description: "Stylish and durable handbag."
  },
  { 
    id: 2,
    name: "Handbag - Red",
    category: "handbags",
    image: "assets/Images/redhandbag.jpg",
    price: 150,
    color: "Red",
    description: "Stylish and durable handbag."
  },
  { 
    id: 3,
    name: "Handbag - Green",
    category: "handbags",
    image: "assets/Images/greenhandbag.jpg",
    price: 130,
    color: "Green",
    description: "Stylish and durable handbag."
  },
  { 
    id: 4,
    name: "Handbag - Black",
    category: "handbags",
    image: "assets/Images/blackhandbag.jpg",
    price: 140,
    color: "Black",
    description: "Stylish and durable handbag."
  },
  { 
    id: 5,
    name: "Handbag - White",
    category: "handbags",
    image: "assets/Images/whitehandbag.jpg",
    price: 135,
    color: "White",
    description: "Stylish and durable handbag."
  },
  { 
    id: 6,
    name: "Gamazine 20L",
    category: "paints",
    image: "assets/Images/gamazine-20l.jpg",
    price: 399,
    description: "Perfect for feature walls, ceilings, facades, and residential or commercial projects."
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  const selectedProduct = products.find(p => p.id == productId);

  if (!selectedProduct) {
    document.body.innerHTML = "<h2>Product not found</h2>";
    return;
  }

  document.getElementById("product-name").textContent = selectedProduct.name;
  document.getElementById("product-image").src = selectedProduct.image;
  document.getElementById("product-price").textContent = "R" + selectedProduct.price;
  document.getElementById("product-description").textContent = selectedProduct.description;
});
